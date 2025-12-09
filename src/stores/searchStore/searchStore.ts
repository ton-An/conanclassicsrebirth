// stores/dataStore.ts

import { Failure } from '@/failures/failure'
import {
  SearchFailure,
  SearchInitial,
  SearchLoaded,
  SearchLoading,
  SearchState,
} from './searchStates'
import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/models/supabase.types'
import { RequestFailure } from '@/failures/request_failure'

const supabase = createClient<Database>(
  'https://bljkukzzfpicscafgxsv.supabase.co',
  'sb_publishable_oE3bb-NmhGGXd7_NDKu9AQ_IcLSP2vI',
)

export const useSearchStore = defineStore('search', {
  state: (): { state: SearchState } => ({
    state: new SearchInitial(),
  }),
  actions: {
    async search(query: string) {
      this.state = new SearchLoading()

      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .ilike('title', `%${query}%`)
        .limit(50)

      this.state = new SearchLoaded(data ?? [])

      if (error instanceof Failure) {
        this.state = new SearchFailure(new RequestFailure())
      }
    },
  },
})
