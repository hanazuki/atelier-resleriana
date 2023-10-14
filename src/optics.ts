import * as Optic from '@fp-ts/optic'

export const keyOrDefault = <S extends object, Key extends keyof S & (string | symbol)>(key: Key, fallback: () => S[Key]): Optic.Lens<S, S[Key]> =>
  Optic.lens(
    (s) => Object.prototype.hasOwnProperty.call(s, key) ? s[key] : fallback(),
    (b) => (s) => ({ ...s, [key]: b }),
  )
