import * as Optic from '@fp-ts/optic'
import * as ds from './dataset'

import { GlobalSettings } from './GlobalSettingsProvider'
import { _alchemist } from './global'

const _disabled = (alchemist: ds.Alchemist) =>
  _alchemist(alchemist.name, alchemist.title).at('disabled')
const _rarityIncrease = (alchemist: ds.Alchemist) =>
  _alchemist(alchemist.name, alchemist.title).at('rarityIncrease')

const compatibleEffects: Map<ds.ItemCategory, Set<string>> = (() => {
  const compatibleEffects = new Map<ds.ItemCategory, Set<string>>()

  for (const [, itemCategory] of Object.entries(ds.ItemCategory)) {
    let categories: ds.EffectCategory[]

    if (itemCategory.startsWith(ds.ItemType.EQUIPMENT)) {
      categories = [ds.EffectCategory.ATTACK, ds.EffectCategory.BUFF, ds.EffectCategory.DEBUFF, ds.EffectCategory.HEAL]
    } else {
      switch (itemCategory) {
        case ds.ItemCategory.ATTACK:
          categories = [ds.EffectCategory.ATTACK, ds.EffectCategory.DEBUFF]
          break
        case ds.ItemCategory.BUFF:
          categories = [ds.EffectCategory.BUFF]
          break
        case ds.ItemCategory.DEBUFF:
          categories = [ds.EffectCategory.DEBUFF]
          break
        case ds.ItemCategory.HEAL:
          categories = [ds.EffectCategory.BUFF, ds.EffectCategory.HEAL]
          break
        default:
          throw null; // unreachable
      }
    }

    for (const effect of ds.effects) {
      if (!categories.includes(effect.category)) continue
      if (!itemCategory.startsWith(effect.itemType)) continue
      (compatibleEffects.get(itemCategory) || (() => {
        const s = new Set<string>()
        compatibleEffects.set(itemCategory, s)
        return s
      })()).add(effect.name)
    }
  }

  return compatibleEffects
})()

const isCompatibleEffect = (itemCategory: ds.ItemCategory, effect: string): boolean =>
  !!compatibleEffects.get(itemCategory)?.has(effect)

type ConfigurationProps = {
  recipe: ds.Recipe
  alchemist1: ds.Alchemist
  alchemist2: ds.Alchemist
  extraIngredient: ds.Material
}

export class Configuration implements ConfigurationProps {
  recipe: ds.Recipe
  alchemist1: ds.Alchemist
  alchemist2: ds.Alchemist
  extraIngredient: ds.Material

  constructor({ recipe, alchemist1, alchemist2, extraIngredient }: ConfigurationProps) {
    this.recipe = recipe
    this.alchemist1 = alchemist1
    this.alchemist2 = alchemist2
    this.extraIngredient = extraIngredient
  }

  get alchemist1Effective(): boolean {
    return this.recipe.colors.includes(this.alchemist1.color1)
  }

  get alchemist2Effective(): boolean {
    return this.alchemist1.color2 === this.alchemist2.color1
  }

  get extraIngredientEffective(): boolean {
    return this.alchemist2.color2 === this.extraIngredient.color
  }

  synthesize(settings: GlobalSettings): Synthesis {
    const itemCategory = this.recipe.category
    const isConsumable = itemCategory.startsWith(ds.ItemType.CONSUMABLE)

    const alchemistEffects = (alchemist: ds.Alchemist) =>
      isConsumable ? alchemist.effects.slice(0, 2) : [alchemist.effects[2]]
    const ingredientEffects = (ingredient: ds.Material) =>
      isConsumable === (ingredient.effectType === ds.ItemType.CONSUMABLE) ? ingredient.effects : []

    const effects = {
      alchemist1: alchemistEffects(this.alchemist1).map(name =>
        ({ name, active: this.alchemist1Effective && isCompatibleEffect(itemCategory, name) })),
      alchemist2: alchemistEffects(this.alchemist2).map(name =>
        ({ name, active: this.alchemist2Effective && isCompatibleEffect(itemCategory, name) })),
      extraIngredient: ingredientEffects(this.extraIngredient).map(name =>
        ({ name, active: this.extraIngredientEffective && isCompatibleEffect(itemCategory, name) })),
    }

    const rarityIncrease = {
      alchemist1: Optic.get(_rarityIncrease(this.alchemist1))(settings),
      alchemist2: Optic.get(_rarityIncrease(this.alchemist2))(settings),
    }

    return {
      config: this,
      effects,
      rarityIncrease,
    }
  }
}

type EffectExpressions = { name: string; active: boolean }[]

export type Synthesis = {
  config: Configuration
  effects: {
    alchemist1: EffectExpressions
    alchemist2: EffectExpressions
    extraIngredient: EffectExpressions
  }
  rarityIncrease: {
    alchemist1: number
    alchemist2: number
  }
}

type Cmp = -1 | 0 | 1

const cmp = <T,>(a: T, b: T): Cmp =>
  a === b ? 0 : a < b ? -1 : 1

const cmpEffects = (a: string, b: string): Cmp => {
  const split = (eff: string): string[] => {
    const m = /【(?<cond>.*)】$/.exec(eff)
    const cond = m ? m.groups!.cond! : ''
    eff = eff.slice(0, m?.index)
    return [eff.split('').reverse().join(''), cond]
  }

  return cmp(split(a), split(b))
}

const possibleEffects = (synthesis: Synthesis) => {
  return [
    ...synthesis.effects.alchemist1,
    ...synthesis.effects.alchemist2,
    ...synthesis.effects.extraIngredient,
  ].filter(({ active }) => active)
}

export const search = (
  recipe: ds.Recipe,
  desiredEffects: (string | null)[],
  settings: GlobalSettings,
  allowIneffectiveAlchemists: boolean
): Synthesis[] => {
  const syntheses: Synthesis[] = []

  for (const alchemist1 of ds.alchemists) {
    if (Optic.get(_disabled(alchemist1))(settings)) continue;
    if (!allowIneffectiveAlchemists && !recipe.colors.includes(alchemist1.color1)) continue

    for (const alchemist2 of ds.alchemists) {
      if (Optic.get(_disabled(alchemist2))(settings)) continue;
      if (!allowIneffectiveAlchemists && alchemist1.color2 !== alchemist2.color1) continue
      if (alchemist1.name === alchemist2.name) continue

      for (const extraIngredient of ds.materials) {
        if (alchemist2.color2 !== extraIngredient.color) continue
        if (!recipe.category.startsWith(extraIngredient.effectType)) continue

        const config = new Configuration({ recipe, alchemist1, alchemist2, extraIngredient })
        const synthesis = config.synthesize(settings)
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
    for (const { name: eff } of possibleEffects(s)) {
      effects.add(eff)
    }
  }

  return Array.from(effects).sort(cmpEffects)
}
