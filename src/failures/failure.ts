/** Base class for all failures. */
export abstract class Failure {
  abstract readonly category: string
  abstract readonly id: string
}
