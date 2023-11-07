import * as Optic from '@fp-ts/optic'
import * as ds from './dataset'

import { GlobalSettings } from './GlobalSettingsProvider'
import { _alchemist } from './global'

const _disabled = (alchemist: ds.Alchemist) =>
  _alchemist(alchemist.name, alchemist.title).at('disabled')
const _rarityIncrease = (alchemist: ds.Alchemist) =>
  _alchemist(alchemist.name, alchemist.title).at('rarityIncrease')

export type Configuration = {
  recipe: ds.Recipe
  alchemist1: ds.Alchemist
  alchemist2: ds.Alchemist
  extraIngredient: ds.Material
}

export type Synthesis = {
  config: Configuration
  effects: {
    alchemist1: { name: string; active: boolean }[]
    alchemist2: { name: string; active: boolean }[]
    extraIngredient: { name: string; active: boolean }[]
  }
  rarityIncrease: {
    alchemist1: number
    alchemist2: number
  }
}

const synthesize = (config: Configuration, settings: GlobalSettings): Synthesis => {
  const isConsumable = config.recipe.category.startsWith(ds.ItemType.CONSUMABLE)

  const alchemistEffects = (alchemist: ds.Alchemist) =>
    isConsumable ? alchemist.effects.slice(0, 2) : [alchemist.effects[2]]
  const ingredientEffects = (ingredient: ds.Material) =>
    isConsumable === (ingredient.effectType === ds.ItemType.CONSUMABLE) ? ingredient.effects : []

  const effects = {
    alchemist1: alchemistEffects(config.alchemist1).map(name => ({ name, active: true })),
    alchemist2: alchemistEffects(config.alchemist2).map(name => ({ name, active: true })),
    extraIngredient: ingredientEffects(config.extraIngredient).map(name => ({ name, active: true })),
  }

  const rarityIncrease = {
    alchemist1: Optic.get(_rarityIncrease(config.alchemist1))(settings),
    alchemist2: Optic.get(_rarityIncrease(config.alchemist2))(settings),
  }

  return {
    config,
    effects,
    rarityIncrease,
  }
}


type Cmp = -1 | 0 | 1

const cmp = <T,>(a: T, b: T): Cmp =>
  a === b ? 0 : a < b ? -1 : 1

const cmpEffects = (a: string, b: string): Cmp => {
  const split = (eff: string): string[] => {
    const m = /【(?<cond>.*)】$/.exec(eff)
    const cond = m ? m.groups!.cond : ''
    eff = eff.slice(0, m?.index)
    return [eff.split('').reverse().join(''), cond]
  }

  return cmp(split(a), split(b))
}

const possibleEffects = (synthesis: Synthesis) => [
  ...synthesis.effects.alchemist1,
  ...synthesis.effects.alchemist2,
  ...synthesis.effects.extraIngredient,
]

export const search = (
  recipe: ds.Recipe,
  desiredEffects: (string | null)[],
  settings: GlobalSettings,
): Synthesis[] => {
  const syntheses: Synthesis[] = []

  for (const alchemist1 of ds.alchemists) {
    if (Optic.get(_disabled(alchemist1))(settings)) continue;
    if (!recipe.colors.includes(alchemist1.color1)) continue

    for (const alchemist2 of ds.alchemists) {
      if (Optic.get(_disabled(alchemist2))(settings)) continue;
      if (alchemist1.color2 !== alchemist2.color1) continue
      if (alchemist1.name === alchemist2.name) continue

      for (const extraIngredient of ds.materials) {
        if (alchemist2.color2 !== extraIngredient.color) continue
        if (!recipe.category.startsWith(extraIngredient.effectType)) continue

        const config = { recipe, alchemist1, alchemist2, extraIngredient }
        const synthesis = synthesize(config, settings)
        const effects = possibleEffects(synthesis)

        if (desiredEffects.every(e => e === null || effects.some(({ name }) => name === e))) {
          syntheses.push(synthesis)
        }
      }
    }
  }

  return syntheses.sort(
    (a, b) => (() => {
      const effa = possibleEffects(a).filter(({ name }) => desiredEffects.includes(name))
      const effb = possibleEffects(b).filter(({ name }) => desiredEffects.includes(name))
      return cmp(effb.length, effa.length)
    })() || (() => {
      const ria = a.rarityIncrease.alchemist1 + a.rarityIncrease.alchemist2
      const rib = b.rarityIncrease.alchemist1 + b.rarityIncrease.alchemist2
      return cmp(rib, ria)
    })()
  )
}

export const effectsOfSyntheses = (syntheses: Synthesis[]): string[] => {
  const effects = new Set<string>()
  for (const s of syntheses) {
    for (const { name: eff } of [
      ...s.effects.alchemist1,
      ...s.effects.alchemist2,
      ...s.effects.extraIngredient
    ]) {
      effects.add(eff)
    }
  }

  return Array.from(effects).sort(cmpEffects)
}
