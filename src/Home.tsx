import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ds from './dataset';
import * as css from './Home.css'
import { Helmet } from 'react-helmet';

const recipeCategories: [ds.ItemCategory, string][] = [
  [ds.ItemCategory.HEAL, '回復'],
  [ds.ItemCategory.ATTACK, '攻撃'],
  [ds.ItemCategory.BUFF, '強化'],
  [ds.ItemCategory.DEBUFF, '弱体'],
  [ds.ItemCategory.WEAPON, '武器'],
  [ds.ItemCategory.ARMOUR, '防具'],
  [ds.ItemCategory.JEWELRY, '装飾品'],
]

const RecipeList: React.FC = () => {
  const [category, setCategory] = useState<ds.ItemCategory>(ds.ItemCategory.HEAL)

  const recipes = ds.recipes.filter(r => r.category === category)

  return <>
    <Helmet>
      <title>どれをつくろう？</title>
    </Helmet>
    <ul className={css.nav}>
      {recipeCategories.map(([c, d]) =>
        <li className={css.navItem} key={c}><a onClick={() => setCategory(c)}>{d}</a></li>
      )}
    </ul>
    <ul>
      {recipes.map(r =>
        <li key={r.name}><Link to={`/recipes/${r.name}`}>{r.name}</Link></li>
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
