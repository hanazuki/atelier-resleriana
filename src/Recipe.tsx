import React, { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { Card, Divider, Header } from 'semantic-ui-react'
import * as ds from './dataset'

type Configuration = {
  alchemist1: ds.Alchemist
  alchemist2: ds.Alchemist
  extraIngredient: ds.Ingredient
}

const search = (recipe: ds.Recipe, desiredEffects: (string | null)[]): Configuration[] => {
  const configs: Configuration[] = []

  for (const alchemist1 of ds.alchemists) {
    if (!recipe.colors.includes(alchemist1.color1)) continue

    for (const alchemist2 of ds.alchemists) {
      if (alchemist1.color2 !== alchemist2.color1) continue
      if (alchemist1.name === alchemist2.name) continue

      for (const extraIngredient of ds.ingredients) {
        if (alchemist2.color2 !== extraIngredient.color) continue
        if (!recipe.category.startsWith(extraIngredient.effectType)) continue

        const possibleEffects = [
          ...alchemist1.effects,
          ...alchemist2.effects,
          ...extraIngredient.effects,
        ]

        if (desiredEffects.every(e => e === null || possibleEffects.includes(e))) {
          configs.push({ alchemist1, alchemist2, extraIngredient })
        }
      }
    }
  }

  return configs
}

interface EffectChooserProps {
  effects: string[]
  possibleEffects: string[]
  selectedEffects: string[]
  select: (effect: string) => void
  deselect: (effect: string) => void
}

const EffectChooser: React.FC<EffectChooserProps> = ({ effects, possibleEffects, selectedEffects, select, deselect }) => {
  return <ul>
    {effects.map(effect => {
      const selected = selectedEffects.includes(effect)
      const possible = possibleEffects.includes(effect)

      return <li key={effect}>
        <label>
          <input type='checkbox' checked={selected} onChange={(e) => e.target.checked ? select(effect) : deselect(effect)} />
          {possible ? effect : <s>{effect}</s>}
        </label>
      </li>
    })}
  </ul>
}

const icon = (category: ds.ItemCategory) => {
  switch (category) {
    case ds.ItemCategory.HEAL: return '💊'
    case ds.ItemCategory.ATTACK: return '💣'
    case ds.ItemCategory.BUFF: return '🔺'
    case ds.ItemCategory.DEBUFF: return '🔻'
    case ds.ItemCategory.WEAPON: return '🗡'
    case ds.ItemCategory.ARMOUR: return '🛡'
    case ds.ItemCategory.JEWELRY: return '💍'
  }
}

const effectsOfConfigurations = (isConsumable: boolean, configs: Configuration[]): string[] =>
  Array.from(configs.reduce((effects, method) => {
    if (isConsumable) {
      effects.add(method.alchemist1.effects[0])
      effects.add(method.alchemist1.effects[1])
      effects.add(method.alchemist2.effects[0])
      effects.add(method.alchemist2.effects[1])
      if (method.extraIngredient.effectType == ds.ItemType.CONSUMABLE) {
        for (const eff of method.extraIngredient.effects) effects.add(eff)
      }
    } else {
      effects.add(method.alchemist1.effects[2])
      effects.add(method.alchemist2.effects[2])
      if (method.extraIngredient.effectType == ds.ItemType.EQUIPMENT) {
        for (const eff of method.extraIngredient.effects) effects.add(eff)
      }
    }
    return effects
  }, new Set<string>())).sort((a, b) => a === b ? 0 : a.split('').reverse() < b.split('').reverse() ? -1 : 1)


const AlchemistCard: React.FC<{ alchemist: ds.Alchemist, isConsumable: boolean }> = ({ alchemist, isConsumable }) => {
  return <Card>
    <Card.Content>
      <Card.Header>{alchemist.name}</Card.Header>
      <Card.Meta>{alchemist.title}</Card.Meta>
      <Card.Description>
        {(isConsumable ? alchemist.effects.slice(0, 2) : [alchemist.effects[2]]).map(eff =>
          <div key={eff}>{eff}</div>
        )}
      </Card.Description>
    </Card.Content>
    <Card.Content extra textAlign='right'>
      +0%
    </Card.Content>
  </Card>
}

const IngredientCard: React.FC<{ ingredient: ds.Ingredient }> = ({ ingredient }) => {
  return <Card>
    <Card.Content>
      <Card.Header>{ingredient.name}</Card.Header>
      <Card.Description>
        {ingredient.effects.map(eff =>
          <div key={eff}>{eff}</div>
        )}
      </Card.Description>
    </Card.Content>
  </Card>
}

interface RecipeProps {
  recipe: ds.Recipe
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const isConsumable = recipe.category.startsWith(ds.ItemType.CONSUMABLE)

  const [desiredEffects, setDesiredEffects] = useState<string[]>([])
  const selectDesiredEffect = useCallback((effect: string) => {
    if (desiredEffects.length < (isConsumable ? 6 : 4)) {
      setDesiredEffects([...desiredEffects, effect])
    }
  }, [desiredEffects, isConsumable])
  const deselectDesiredEffect = useCallback((effect: string) => {
    setDesiredEffects(desiredEffects.filter(eff => eff !== effect))
  }, [desiredEffects])

  const [, allEffects] = useMemo(() => {
    const configs = search(recipe, [])
    const effects = effectsOfConfigurations(isConsumable, configs)
    return [configs, effects]
  }, [recipe, isConsumable])

  const [candidateConfigs, candidateEffects] = useMemo(() => {
    const configs = search(recipe, desiredEffects)
    const effects = effectsOfConfigurations(isConsumable, configs)
    return [configs, effects]
  }, [recipe, desiredEffects, isConsumable])

  return <>
    <Helmet>
      <title>{recipe.name}</title>
    </Helmet>
    <Header as='h2'>{icon(recipe.category)}{recipe.name}</Header>
    <Header as='h2'>素材</Header>
    <ul>
      {recipe.ingredients.map(i =>
        <li key={i.name}><Link to={`/ingredients/${i.name}`}>{i.name}</Link> ({i.count})</li>
      )}
    </ul>
    <h2>特性</h2>
    <EffectChooser
      effects={allEffects}
      possibleEffects={candidateEffects}
      selectedEffects={desiredEffects}
      select={selectDesiredEffect}
      deselect={deselectDesiredEffect} />
    <h2>編成 ({candidateConfigs.length})</h2>
    {candidateConfigs.map(config => <div key={`${config.alchemist1.name}${config.alchemist1.title}${config.alchemist2.name}${config.alchemist2.name}${config.extraIngredient.name}`}>
      <Card.Group centered itemsPerRow={3}>
        <AlchemistCard alchemist={config.alchemist1} isConsumable={isConsumable} />
        <AlchemistCard alchemist={config.alchemist2} isConsumable={isConsumable} />
        <IngredientCard ingredient={config.extraIngredient} />
      </Card.Group>
      <Divider />
    </div >)
    }
  </>
}

const RecipeWrapper: React.FC = () => {
  const { recipeName } = useParams()
  const recipe = ds.recipes.find(r => r.name === recipeName)
  if (!recipe) {
    return null
  }
  return <Recipe recipe={recipe} />
}

export default RecipeWrapper
