import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ds from './dataset';

const RecipeList: React.FC = () => {
  const [category, setCategory] = useState<ds.ItemCategory>(ds.ItemCategories[0])

  const recipes = ds.recipes.filter(r => r.category === category)

  return <>
    <ul>
      {ds.ItemCategories.map(c =>
        <li><a onClick={() => setCategory(c)}>{c}</a></li>
      )}
    </ul>
    <ul>
      {recipes.map(r =>
        <li><Link to={`/recipes/${r.name}`}>{r.name}</Link></li>
      )}
    </ul >
  </>
}

const Home: React.FC = () => {
  return <>
    <RecipeList />
  </>
}

export default Home
