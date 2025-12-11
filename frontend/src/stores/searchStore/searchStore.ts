// stores/dataStore.ts

import { createClient } from '@supabase/supabase-js'
import { defineStore } from 'pinia'

import { Failure } from '@/failures/failure'
import { RequestFailure } from '@/failures/networkFailures/request_failure'
import type { Database } from '@/models/supabase.types'

import {
  SearchFailure,
  SearchInitial,
  SearchLoaded,
  SearchLoading,
  SearchState,
} from './searchStates'

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_SERVICE_KEY!,
)

export const useSearchStore = defineStore('search', {
  state: (): { state: SearchState } => ({
    state: new SearchInitial(),
  }),
  actions: {
    async search(query: string) {
      this.state = new SearchLoading()

      const { data, error } = await supabase.from('videos').select('*').ilike('title', `%${query}%`)

      const sortedData = data?.sort((a, b) => {
        return (b.src?.length ?? 0) - (a.src?.length ?? 0)
      })

      this.state = new SearchLoaded(sortedData ?? [])

      if (error instanceof Failure) {
        this.state = new SearchFailure(new RequestFailure())
      }
    },
  },
})
