import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { Database } from '../src/models/supabase.types'

// Use service role key for admin operations (insert/upsert)
// Get this from Supabase Dashboard > Settings > API > service_role key
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_KEY)

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

async function importVideos() {
  // Read the JSON file
  const jsonPath = resolve(import.meta.dirname, '../all_videos.json')
  const rawData = readFileSync(jsonPath, 'utf-8')
  const videos: VideoJson[] = JSON.parse(rawData)

  console.log(`Found ${videos.length} videos to import`)

  // Transform to match database schema
  const rows = videos.map((video) => ({
    id: video.id,
    title: video.title || null,
    slug: video.slug || null,
    duration: video.duration || null,
    video_type: video.videoType || null,
  }))

  // Insert in batches of 500 (Supabase has limits)
  const BATCH_SIZE = 500
  let inserted = 0

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE)

    const { error } = await supabase.from('videos').upsert(batch, { onConflict: 'id' }) // upsert to handle re-runs gracefully

    if (error) {
      console.error(`Error inserting batch ${i / BATCH_SIZE + 1}:`, error)
      process.exit(1)
    }

    inserted += batch.length
    console.log(`Inserted ${inserted}/${videos.length} videos`)
  }

  console.log('✅ Import complete!')
}

importVideos().catch(console.error)
