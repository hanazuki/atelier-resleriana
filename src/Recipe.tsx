import React, { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Checkbox, Divider, Grid, Header, Icon, Input, List, Message, Segment } from 'semantic-ui-react'
import * as Optic from '@fp-ts/optic'
import * as ds from './dataset'
import { _ui } from './global';
import Title from './Title';
import { useGlobalSettings } from './GlobalSettingsProvider';
import * as syn from './synthesis'

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
    <Input icon='filter' placeholder='フィルタ' value={filter} onChange={(_e, data) => setFilter(data.value)} style={{ width: '100%' }} />
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

const usePrefersShapes = (): boolean => {
  const [globalSettings] = useGlobalSettings()
  return Optic.get(_ui.at('prefersShapes'))(globalSettings)
}

const ColorIcon: React.FC<{ color: ds.Color }> = ({ color }) => {
  const prefersShapes = usePrefersShapes()
  if (prefersShapes) {
    return <span>{`<${colorName[color]}>`}</span>
  }

  return <svg viewBox='0 0 10 10' style={{ display: 'inline-block', width: '1.2em', height: '1.2em', verticalAlign: 'text-bottom' }} role='graphics-symbol'>
    <title>{colorName[color]}</title>
    <polygon points='0,5 5,0 10,5 5,10' fill={colorCode[color]} />
  </svg>
}
const ColorIcon2: React.FC<{ color1: ds.Color, color2: ds.Color }> = ({ color1, color2 }) => {
  const prefersShapes = usePrefersShapes()
  if (prefersShapes) {
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
        {effects.map(({ name, active }) => {
          const nameHtml = active
            ? desiredEffects.includes(name)
              ? <strong>{name}</strong>
              : name
            : <s>{name}</s>
          return <div key={name}>{nameHtml}</div>
        })}
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
        {effects.map(({ name, active }) => {
          const nameHtml = active
            ? desiredEffects.includes(name)
              ? <strong>{name}</strong>
              : name
            : <s>{name}</s>

          return <div key={name}>{nameHtml}</div>
        })}
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

  const [allowIneffectiveAlchemists, setAllowIneffectiveAlchemists] = useState<boolean>(true);

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
    const syntheses = syn.search(recipe, [], globalSettings, allowIneffectiveAlchemists)
    const effects = syn.effectsOfSyntheses(syntheses)
    return [syntheses, effects]
  }, [recipe, globalSettings, allowIneffectiveAlchemists])

  const [candidateSyntheses, candidateEffects] = useMemo(() => {
    const syntheses = syn.search(recipe, desiredEffects, globalSettings, allowIneffectiveAlchemists)
    const effects = syn.effectsOfSyntheses(syntheses)
    return [syntheses, effects]
  }, [recipe, desiredEffects, globalSettings, allowIneffectiveAlchemists])

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
          <List>
            <List.Item>
              <Checkbox toggle label="ギフトカラーの一致しない錬金術師を使う"
                checked={allowIneffectiveAlchemists}
                onChange={(_e, data) => setAllowIneffectiveAlchemists(!!data.checked)} />
            </List.Item>
          </List>
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
