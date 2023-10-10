import React from 'react';
import { Link, useParams } from 'react-router-dom';
import * as ds from './dataset'

const Recipe: React.FC = () => {
  const { recipeName } = useParams()
  const recipe = ds.recipes.find(r => r.name === recipeName)

  if (!recipe) {
    return <>
    </>
  }

  return <>
    <h1>{recipe.name}</h1>
    <h2>素材</h2>
    <ul>
      {recipe.ingredients.map(i =>
        <li><Link to={`/ingredients/${i.name}`}>{i.name}</Link></li>
      )}
    </ul>
  </>
}

export default Recipe
