import { Failure } from '../failure'

/** Base class for all network failures. */
export abstract class NetworkFailure extends Failure<'network'> {
  readonly category = 'network' as const
}
