import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { Database } from '../src/models/supabase.types'
import cliProgress from 'cli-progress'
import pLimit from 'p-limit'
import * as dotenv from 'dotenv'

dotenv.config()
// Ensure you have these in your .env
const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// Common headers to bypass basic blocks
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/118.0',
  Referer: 'https://conanclassic.com/',
  Origin: 'https://conanclassic.com',
  'Content-Type': 'application/json',
}

interface VideoJson {
  id: string
  title: string
  slug: string
  thumb: {
    url: string | null
    id: string
    alt: string | null
  }
  duration: string | null
  videoType: string
}

// Helper: Construct the Akamai URL from metadata
function buildManualUrl(id: string, publishOn: string, thumbName: string): string {
  // 1. Parse the Date
  const pubDate = new Date(publishOn)

  // 2. Adjust for "TV Time" (If published between midnight and 4AM, subtract 1 day)
  if (pubDate.getHours() < 4) {
    pubDate.setDate(pubDate.getDate() - 1)
  }

  // 3. Format Date parts
  const year = pubDate.getFullYear()
  const month = String(pubDate.getMonth() + 1).padStart(2, '0')
  const day = String(pubDate.getDate()).padStart(2, '0')
  const shortYear = String(year).slice(2)

  // 4. Extract Segment Name from Thumbnail
  // Example Input: "0580_comedy_2_c.jpg" -> Output: "Comedy_2"
  let segment = thumbName
    .replace(/^\d+_/, '') // Remove leading numbers (0580_)
    .replace(/_c\.\w+$/, '') // Remove trailing _c.jpg
    .replace(/\.\w+$/, '') // Remove extension if _c wasn't there

  // Capitalize the first letter (comedy_2 -> Comedy_2)
  if (segment.length > 0) {
    segment = segment.charAt(0).toUpperCase() + segment.slice(1)
  }

  // 5. Build the Final URL
  return `http://ak.storage.teamcococdn.com/cdn/${year}-${month}/${id}-CONAN_${month}${day}${shortYear}_${segment}-1080p.mp4`
}

// Helper: Verify if a URL is valid (returns 200 OK)
async function checkUrlExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: HEADERS })
    return res.ok // True if 200-299
  } catch (error) {
    return false
  }
}

// Helper: Fetch Metadata needed for reconstruction if Truman fails
async function fetchMetadata(id: string) {
  try {
    const query = `
      query GetReconstructData($id: ID!) {
        findRecord(id: $id) {
          ... on MetaInterface { publishOn }
          ... on Video { thumb { name } }
        }
      }
    `
    const res = await fetch('https://conanclassic.com/graphql', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ query, variables: { id } }),
    })
    const json = await res.json()
    return json?.data?.findRecord
  } catch (e) {
    return null
  }
}

async function importVideos() {
  const jsonPath = resolve(import.meta.dirname, '../all_videos.json')
  const rawData = readFileSync(jsonPath, 'utf-8')
  const videos: VideoJson[] = JSON.parse(rawData)

  console.log(`Found ${videos.length} videos to import`)

  const progressBar = new cliProgress.SingleBar(
    {
      format:
        'Fetching |{bar}| {percentage}% | {value}/{total} | ETA: {eta_formatted} | Processing: {ids}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic,
  )

  progressBar.start(videos.length, 0, { ids: '' })

  const CONCURRENCY = 1
  const BATCH_SIZE = 50
  const limit = pLimit(CONCURRENCY)
  let completed = 0
  let inserted = 0

  const inProgress = new Set<string>()

  const updateProgressIds = () => {
    const ids = Array.from(inProgress).slice(0, 5).join(', ')
    progressBar.update(completed, { ids: ids || 'waiting...' })
  }

  const fetchVideo = async (video: VideoJson) => {
    inProgress.add(video.id)
    updateProgressIds()

    let src: string | null = null

    // --- ATTEMPT 1: Truman JSON Endpoint ---

    const trumanReq = await fetch(`https://conanclassic.com/_truman/d/${video.id}`, {
      headers: HEADERS,
    })
    if (trumanReq.ok) {
      const trumanData = await trumanReq.json()
      // Try HD mp4 first, then any source
      src =
        trumanData?.meta?.src?.hd?.src ||
        trumanData?.meta?.src?.hls?.src ||
        trumanData?.meta?.src?.[0]?.src
    }

    inProgress.delete(video.id)
    completed++
    updateProgressIds()

    return {
      id: video.id,
      title: video.title || null,
      slug: video.slug || null,
      duration: video.duration || null,
      video_type: video.videoType || null,
      src: src || null, // Will be null if both attempts fail
    }
  }

  for (let i = 0; i < videos.length; i += BATCH_SIZE) {
    const batchVideos = videos.slice(i, i + BATCH_SIZE)
    const batchIds = batchVideos.map((v) => v.id)

    // Log less frequently to keep UI clean, or use progress bar only
    // console.log(`\n📦 Batch ${Math.floor(i / BATCH_SIZE) + 1}`)

    const rows = await Promise.all(batchVideos.map((video) => limit(() => fetchVideo(video))))

    const { error } = await supabase.from('videos').upsert(rows, { onConflict: 'id' })

    if (error) {
      console.error(`\n❌ Error inserting batch:`, error)
      console.error(`Failed batch IDs: ${batchIds.join(', ')}`)
      // Optional: Don't exit process, just log failure and continue
      // process.exit(1)
    } else {
      inserted += rows.length
    }
  }

  progressBar.stop()
  console.log(`\n✅ Import complete! Inserted ${inserted}/${videos.length} videos.`)
}

importVideos().catch(console.error)
