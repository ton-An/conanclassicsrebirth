import type { MessageSchema } from '../i18n/schema'
import type { Failure } from './failure'

/**
 * Connects failures to i18n translations, to avoid missing translations.
 *
 * If a new failure is added, it must be added to the MessageSchema["errors"] object.
 */

export type FailureCategory = keyof MessageSchema['errors']

export type FailureId<Category extends FailureCategory> = Category extends FailureCategory
  ? keyof MessageSchema['errors'][Category]
  : never

export type AnyFailureId = {
  [Category in FailureCategory]: FailureId<Category>
}[FailureCategory]

export type FailureTranslation<
  Category extends FailureCategory,
  Id extends FailureId<Category>,
> = MessageSchema['errors'][Category][Id]

export type ValidFailure<Category extends FailureCategory> = {
  readonly category: Category
  readonly id: FailureId<Category>
}

export type AnyFailure = {
  [Category in FailureCategory]: Failure<Category>
}[FailureCategory]
