import React, { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Checkbox, Divider, Grid, Header, Icon, Input, List, Message, Segment } from 'semantic-ui-react'
import * as Optic from '@fp-ts/optic'
import * as ds from './dataset'
import { _alchemist, _ui } from './global';
import Title from './Title';
import { useGlobalSettings, GlobalSettings } from './GlobalSettingsProvider';

type Configuration = {
  recipe: ds.Recipe
  alchemist1: ds.Alchemist
  alchemist2: ds.Alchemist
  extraIngredient: ds.Material
}

type Synthesis = {
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

const _disabled = (alchemist: ds.Alchemist) =>
  _alchemist(alchemist.name, alchemist.title).at('disabled')
const _rarityIncrease = (alchemist: ds.Alchemist) =>
  _alchemist(alchemist.name, alchemist.title).at('rarityIncrease')

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

const search = (
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
    <Input icon='filter' placeholder='フィルタ' value={filter} onChange={(_e, data) => setFilter(data.value)} />
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

const effectsOfSyntheses = (syntheses: Synthesis[]): string[] => {
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

const colorCode = {
  'R': 'rgb(82% 12% 12%)',
  'B': 'rgb(12% 12% 82%)',
  'G': 'rgb(12% 82% 12%)',
  'Y': 'rgb(82% 82% 12%)',
  'P': 'rgb(82% 12% 82%)',
} as const

const colorName = {
  'R': '赤',
  'B': '青',
  'G': '緑',
  'Y': '黄',
  'P': '紫',
} as const

const prefersShapes = (): boolean => {
  const [globalSettings] = useGlobalSettings()
  return Optic.get(_ui.at('prefersShapes'))(globalSettings)
}

const ColorIcon: React.FC<{ color: ds.Color }> = ({ color }) => {
  if (prefersShapes()) {
    return <span>{`<${colorName[color]}>`}</span>
  }

  return <svg viewBox='0 0 10 10' style={{ display: 'inline-block', width: '1.2em', height: '1.2em', verticalAlign: 'text-bottom' }} role='graphics-symbol'>
    <title>{colorName[color]}</title>
    <polygon points='0,5 5,0 10,5 5,10' fill={colorCode[color]} />
  </svg>
}
const ColorIcon2: React.FC<{ color1: ds.Color, color2: ds.Color }> = ({ color1, color2 }) => {
  if (prefersShapes()) {
    return <span>{`<${colorName[color1]}|${colorName[color2]}>`}</span>
  }

  return <svg viewBox='0 0 10 10' style={{ display: 'inline-block', width: '1.2em', height: '1.2em', verticalAlign: 'text-bottom' }} role='graphics-symbol'>
    <title>{colorName[color1]}|{colorName[color2]}</title>
    <polygon points='0,5 5,0 5,10' fill={colorCode[color1]} />
    <polygon points='10,5 5,10 5,0' fill={colorCode[color2]} />
  </svg>
}

const AlchemistCard: React.FC<{
  alchemist: ds.Alchemist,
  rarityIncrease: number,
  effects: { name: string; active: boolean }[],
  desiredEffects: string[],
}> = ({ alchemist, rarityIncrease, effects, desiredEffects }) => {
  return <Card>
    <Card.Content>
      <Card.Header>{alchemist.name}</Card.Header>
      <Card.Meta>{alchemist.title}</Card.Meta>
      <Card.Description>
        {effects.map(({ name }) =>
          <div key={name}>{desiredEffects.includes(name) ? <strong>{name}</strong> : name}</div>
        )}
      </Card.Description>
    </Card.Content>
    <Card.Content extra style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1 }}><ColorIcon2 color1={alchemist.color1} color2={alchemist.color2} /></div>
      <div>+{rarityIncrease}%</div>
    </Card.Content>
  </Card>
}

const IngredientCard: React.FC<{
  ingredient: ds.Material,
  effects: { name: string; active: boolean }[],
  desiredEffects: string[],
}> = ({ ingredient, effects, desiredEffects }) => {
  return <Card>
    <Card.Content>
      <Card.Header>{ingredient.name}</Card.Header>
      <Card.Description>
        {effects.map(({ name }) =>
          <div key={name}>{desiredEffects.includes(name) ? <strong>{name}</strong> : name}</div>
        )}
      </Card.Description>
    </Card.Content>
    <Card.Content extra style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1 }}><ColorIcon color={ingredient.color} /></div>
    </Card.Content>
  </Card>
}

const maxCandidatesToShow = 100

interface RecipeProps {
  recipe: ds.Recipe
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const [globalSettings] = useGlobalSettings()

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
    const syntheses = search(recipe, [], globalSettings)
    const effects = effectsOfSyntheses(syntheses)
    return [syntheses, effects]
  }, [recipe, globalSettings])

  const [candidateSyntheses, candidateEffects] = useMemo(() => {
    const syntheses = search(recipe, desiredEffects, globalSettings)
    const effects = effectsOfSyntheses(syntheses)
    return [syntheses, effects]
  }, [recipe, desiredEffects, globalSettings])

  return <>
    <Title>{recipe.name}</Title>
    <Header as='h2'>{icon(recipe.category)}{recipe.name}</Header>
    <Header as='h3' attached='top'>素材</Header>
    <Segment attached>
      <List>
        {recipe.ingredients.map(i =>
          <List.Item key={i.material}><Link to={`/materials/${i.material}`}>{i.material}</Link> ({i.count})</List.Item>
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
        <Header as='h3' attached='top' style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>編成 ({candidateSyntheses.length})</div>
          <div>{recipe.colors.map(c => <ColorIcon key={c} color={c} />)}</div>
        </Header>
        <Segment attached>
          {candidateSyntheses.map((synthesis, i) => {
            return <div key={`${synthesis.config.alchemist1.name}${synthesis.config.alchemist1.title}${synthesis.config.alchemist2.name}${synthesis.config.alchemist2.name}${synthesis.config.extraIngredient.name}`}>
              {i > 0 ? <Divider /> : null}
              <Card.Group centered itemsPerRow={3}>
                <AlchemistCard alchemist={synthesis.config.alchemist1} effects={synthesis.effects.alchemist1}
                  rarityIncrease={synthesis.rarityIncrease.alchemist1} desiredEffects={desiredEffects} />
                <AlchemistCard alchemist={synthesis.config.alchemist2} effects={synthesis.effects.alchemist2}
                  rarityIncrease={synthesis.rarityIncrease.alchemist2} desiredEffects={desiredEffects} />
                <IngredientCard ingredient={synthesis.config.extraIngredient}
                  effects={synthesis.effects.extraIngredient} desiredEffects={desiredEffects} />
              </Card.Group>
            </div >
          }).filter(e => e !== null).slice(0, maxCandidatesToShow)}
        </Segment>
        {candidateSyntheses.length > maxCandidatesToShow
          ? <Message warning attached='bottom'>
            <Icon name='warning' />
            他{candidateSyntheses.length - maxCandidatesToShow}パターン省略
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
