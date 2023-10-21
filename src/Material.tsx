import React from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import Title from './Title'
import * as ds from './dataset'

interface MaterialProps {
  material: ds.Material
}

const Material: React.FC<MaterialProps> = ({ material }) => {
  return <>
    <Title>{material.name}</Title>
    <Header as='h2'>{material.name}</Header>
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
