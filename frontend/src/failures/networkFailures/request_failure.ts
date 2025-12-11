import { NetworkFailure } from './networkFailure'

/** Failure for network requests. */
export class RequestFailure extends NetworkFailure {
  readonly id = 'request' as const
}
