import { Failure } from './failure'

export class RequestFailure extends Failure {
  readonly category = 'network' as const
  readonly id = 'request_failure' as const
}
