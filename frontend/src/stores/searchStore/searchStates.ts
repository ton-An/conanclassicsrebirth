import { Failure } from '@/failures/failure'
import type { Tables } from '@/models/supabase.types'

export abstract class SearchState {}

export class SearchInitial extends SearchState {}

export class SearchLoading extends SearchState {}

export class SearchLoaded extends SearchState {
  constructor(public readonly videos: Tables<'videos'>[]) {
    super()
  }
}

export class SearchFailure extends SearchState {
  failure: Failure

  constructor(failure: Failure) {
    super()
    this.failure = failure
  }
}
