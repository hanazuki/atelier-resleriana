import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header, List, Segment } from 'semantic-ui-react'
import Title from './Title'
import * as ds from './dataset'
import RecipeList from './RecipeList'

interface MaterialProps {
  material: ds.Material
}

const Material: React.FC<MaterialProps> = ({ material }) => {
  const recipes = ds.recipes
    .filter(r => r.ingredients.some(i => i.material === material.name))

  return <>
    <Title>{material.name}</Title>
    <Header as='h2'>{material.name}</Header>

    <Header as='h3' attached='top'>特性</Header>
    <Segment attached='bottom'>
      <List>
        {material.effects.map(e => <List.Item key={e}>
          <Link to={`/effects/${e}`}>{e}</Link>
        </List.Item>)}
      </List>
    </Segment>

    <Header as='h3' attached='top'>採集場所</Header>
    <Segment attached='bottom'></Segment>

    <Header as='h3' attached='top'>レシピ</Header>
    <Segment attached='bottom'>
      <RecipeList recipes={recipes} />
    </Segment>
  </>
}

const MaterialWrapper: React.FC<Omit<MaterialProps, 'material'>> = (props) => {
  const { materialName } = useParams()
  const material = ds.materials.find(r => r.name === materialName)
  if (!material) {
    return null
  }
  return <Material material={material} {...props} />
}

export default MaterialWrapper
