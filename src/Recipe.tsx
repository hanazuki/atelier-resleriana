import React, { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { Card, Checkbox, Divider, Grid, Header, Icon, Input, List, Message, Segment } from 'semantic-ui-react'
import * as Optic from '@fp-ts/optic'
import * as ds from './dataset'
import { GlobalSettings, AlchemistSettings, _alchemist } from './global';

type Configuration = {
  recipe: ds.Recipe
  alchemist1: ds.Alchemist
  alchemist2: ds.Alchemist
  extraIngredient: ds.Ingredient
}

const search = (
  recipe: ds.Recipe,
  desiredEffects: (string | null)[],
  alchemistSettings: (alchemist: ds.Alchemist) => AlchemistSettings,
): Configuration[] => {
  const configs: Configuration[] = []

  for (const alchemist1 of ds.alchemists) {
    if (!alchemistSettings(alchemist1).unlocked) continue;
    if (!recipe.colors.includes(alchemist1.color1)) continue

    for (const alchemist2 of ds.alchemists) {
      if (!alchemistSettings(alchemist2).unlocked) continue;
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
          configs.push({ recipe, alchemist1, alchemist2, extraIngredient })
        }
      }
    }
  }

  return configs.sort(
    (a, b) => {
      const ria = alchemistSettings(a.alchemist1).rarityIncrease + alchemistSettings(a.alchemist2).rarityIncrease
      const rib = alchemistSettings(b.alchemist1).rarityIncrease + alchemistSettings(b.alchemist2).rarityIncrease
      return rib - ria
    }
  )
}

interface EffectChooserProps {
  effects: string[]
  possibleEffects: string[]
  selectedEffects: string[]
  select: (effect: string) => void
  deselect: (effect: string) => void
}

const EffectChooser: React.FC<EffectChooserProps> = ({ effects, possibleEffects, selectedEffects, select, deselect }) => {
  const [filter, setFilter] = useState<string>('');

  const filteredEffects = effects.filter(eff => eff.includes(filter))

  return <>
    <Input icon='search' placeholder='フィルタ' value={filter} onChange={(_e, data) => setFilter(data.value)} />
    <List>
      {filteredEffects.map(effect => {
        const selected = selectedEffects.includes(effect)
        const possible = possibleEffects.includes(effect)

        return <List.Item key={effect}>
          <Checkbox checked={selected} onChange={(_e, data) => data.checked ? select(effect) : deselect(effect)} label={<label>{possible ? effect : <s>{effect}</s>}</label>} />
        </List.Item>
      })}
    </List>
  </>
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


const AlchemistCard: React.FC<{
  alchemist: ds.Alchemist,
  isConsumable: boolean,
  rarityIncrease: number,
  desiredEffects: string[],
}> = ({ alchemist, isConsumable, rarityIncrease, desiredEffects }) => {
  return <Card>
    <Card.Content>
      <Card.Header>{alchemist.name}</Card.Header>
      <Card.Meta>{alchemist.title}</Card.Meta>
      <Card.Description>
        {(isConsumable ? alchemist.effects.slice(0, 2) : [alchemist.effects[2]]).map(eff =>
          <div key={eff}>{desiredEffects.includes(eff) ? <strong>{eff}</strong> : eff}</div>
        )}
      </Card.Description>
    </Card.Content>
    <Card.Content extra textAlign='right'>
      +{rarityIncrease}%
    </Card.Content>
  </Card>
}

const IngredientCard: React.FC<{
  ingredient: ds.Ingredient,
  desiredEffects: string[],
}> = ({ ingredient, desiredEffects }) => {
  return <Card>
    <Card.Content>
      <Card.Header>{ingredient.name}</Card.Header>
      <Card.Description>
        {ingredient.effects.map(eff =>
          <div key={eff}>{desiredEffects.includes(eff) ? <strong>{eff}</strong> : eff}</div>
        )}
      </Card.Description>
    </Card.Content>
  </Card>
}

const maxCandidatesToShow = 100

interface RecipeProps {
  recipe: ds.Recipe
  settings: GlobalSettings
}

const Recipe: React.FC<RecipeProps> = ({ recipe, settings }) => {
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

  const alchemistSettings = (alchemist: ds.Alchemist) =>
    Optic.get(_alchemist(alchemist.name, alchemist.title))(settings)

  const [, allEffects] = useMemo(() => {
    const configs = search(recipe, [], alchemistSettings)
    const effects = effectsOfConfigurations(isConsumable, configs)
    return [configs, effects]
  }, [recipe, isConsumable])

  const [candidateConfigs, candidateEffects] = useMemo(() => {
    const configs = search(recipe, desiredEffects, alchemistSettings)
    const effects = effectsOfConfigurations(isConsumable, configs)
    return [configs, effects]
  }, [recipe, desiredEffects, isConsumable])

  return <>
    <Helmet>
      <title>{recipe.name}</title>
    </Helmet>
    <Header as='h2'>{icon(recipe.category)}{recipe.name}</Header>
    <Header as='h3' attached='top'>素材</Header>
    <Segment attached>
      <List>
        {recipe.ingredients.map(i =>
          <List.Item key={i.name}><Link to={`/ingredients/${i.name}`}>{i.name}</Link> ({i.count})</List.Item>
        )}
      </List>
    </Segment>

    <Grid style={{ marginTop: '1rem' }} stackable>
      <Grid.Column width={4}>
        <Header as='h3' attached='top'>特性</Header>
        <Segment attached>
          <EffectChooser
            effects={allEffects}
            possibleEffects={candidateEffects}
            selectedEffects={desiredEffects}
            select={selectDesiredEffect}
            deselect={deselectDesiredEffect} />
        </Segment>
      </Grid.Column>
      <Grid.Column width={12}>
        <Header as='h3' attached='top'>編成 ({candidateConfigs.length})</Header>
        <Segment attached>
          {candidateConfigs.map((config, i) => {
            const as1 = alchemistSettings(config.alchemist1)
            const as2 = alchemistSettings(config.alchemist2)

            return <div key={`${config.alchemist1.name}${config.alchemist1.title}${config.alchemist2.name}${config.alchemist2.name}${config.extraIngredient.name}`}>
              {i > 0 ? <Divider /> : null}
              <Card.Group centered itemsPerRow={3}>
                <AlchemistCard alchemist={config.alchemist1} isConsumable={isConsumable}
                  rarityIncrease={as1.rarityIncrease} desiredEffects={desiredEffects} />
                <AlchemistCard alchemist={config.alchemist2} isConsumable={isConsumable}
                  rarityIncrease={as2.rarityIncrease} desiredEffects={desiredEffects} />
                <IngredientCard ingredient={config.extraIngredient}
                  desiredEffects={desiredEffects} />
              </Card.Group>
            </div >
          }).filter(e => e !== null).slice(0, maxCandidatesToShow)}
        </Segment>
        {candidateConfigs.length > maxCandidatesToShow
          ? <Message warning attached='bottom'>
            <Icon name='warning' />
            他{candidateConfigs.length - maxCandidatesToShow}パターン省略
          </Message>
          : null}
      </Grid.Column>
    </Grid>
  </>
}

const RecipeWrapper: React.FC<Omit<RecipeProps, 'recipe'>> = (props) => {
  const { recipeName } = useParams()
  const recipe = ds.recipes.find(r => r.name === recipeName)
  if (!recipe) {
    return null
  }
  return <Recipe recipe={recipe} {...props} />
}

export default RecipeWrapper
