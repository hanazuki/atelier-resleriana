import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header, List, Segment } from 'semantic-ui-react'
import Title from './Title'
import * as ds from './dataset'

interface EffectProps {
  effectName: string
}

const Effect: React.FC<EffectProps> = ({ effectName }) => {
  const alchemists = useMemo(
    () => ds.alchemists.filter(a => a.effects.includes(effectName)),
    [effectName]
  )

  const materials = useMemo(
    () => ds.materials.filter(m => m.effects.includes(effectName)),
    [effectName]
  )

  return <>
    <Title>特性: {effectName}</Title>
    <Header as='h2'>特性: {effectName}</Header>

    <Header as='h3' attached='top'>錬金術師</Header>
    <Segment attached='bottom'>
      <List>
        {alchemists.map(a => <List.Item key={`${a.name}/${a.title}`}>
          {a.name}【{a.title}】
        </List.Item>)}
      </List>
    </Segment>

    <Header as='h3' attached='top'>素材</Header>
    <Segment attached='bottom'>
      <List>
        {materials.map(m => <List.Item key={m.name}>
          <Link to={`/materials/${m.name}`}>{m.name}</Link>
        </List.Item>)}
      </List>
    </Segment>
  </>
}

const EffectWrapper: React.FC<Omit<EffectProps, 'effectName'>> = (props) => {
  const { effectName } = useParams()
  if (effectName === undefined) {
    return null
  }
  return <Effect effectName={effectName} {...props} />
}

export default EffectWrapper
