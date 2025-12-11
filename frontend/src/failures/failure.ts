import type { FailureCategory, FailureId } from './failureTypes'

/** Base class for all failures. */
export abstract class Failure<Category extends FailureCategory = FailureCategory> {
  abstract readonly category: Category
  abstract readonly id: FailureId<Category>
}
