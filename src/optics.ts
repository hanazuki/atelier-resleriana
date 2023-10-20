import * as Optic from '@fp-ts/optic'

const isDefined = <T>(v: T): v is Exclude<T, undefined> => v !== undefined

export const keyOrDefault = <S extends object, Key extends keyof S>(
  key: Key,
  fallback: () => Exclude<S[Key], undefined>
): Optic.Lens<S, Exclude<S[Key], undefined>> =>
  Optic.lens(
    (s) => {
      const v = s[key]
      return isDefined(v) ? v : fallback()
    },
    (b) => (s) => ({ ...s, [key]: b }),
  )
