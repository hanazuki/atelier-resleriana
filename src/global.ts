import * as Optic from '@fp-ts/optic'
import { keyOrDefault } from './optics'

export type AlchemistSettings = {
  unlocked: boolean
  rarityIncrease: number
}

export type GlobalSettings = {
  alchemists: {
    [k: `${string}/${string}`]: AlchemistSettings
  }
}

export const _alchemist = (name: string, title: string) =>
  Optic.id<GlobalSettings>().at('alchemists')
    .compose(keyOrDefault(`${name}/${title}`, () => ({
      unlocked: true,
      rarityIncrease: 0,
    })))
