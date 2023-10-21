import React from 'react'
import { Header, Tab } from 'semantic-ui-react'
import * as ds from './dataset'
import Title from './Title'
import RecipeList from './RecipeList'

const recipeCategories: [ds.ItemCategory, string][] = [
  [ds.ItemCategory.HEAL, '回復'],
  [ds.ItemCategory.ATTACK, '攻撃'],
  [ds.ItemCategory.BUFF, '強化'],
  [ds.ItemCategory.DEBUFF, '弱体'],
  [ds.ItemCategory.WEAPON, '武器'],
  [ds.ItemCategory.ARMOUR, '防具'],
  [ds.ItemCategory.JEWELRY, '装飾品'],
]

const Recipes: React.FC<{ recipes: ds.Recipe[] }> = ({ recipes }) => {
  return <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={
    recipeCategories.map(([c, d]) => ({
      menuItem: { key: c, content: d },
      render: () => <Tab.Pane>
        <RecipeList recipes={recipes.filter(r => r.category === c)} />
      </Tab.Pane>
    }))
  } />
}

const Home: React.FC = () => {
  return <>
    <Title>どれをつくろう？</Title>
    <Header as='h2'>レシピ</Header>
    <Recipes recipes={ds.recipes} />
  </>
}

export default Home
