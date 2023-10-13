import React from 'react';
import { Link } from 'react-router-dom';
import { Header, List, Tab } from 'semantic-ui-react'
import * as ds from './dataset';
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
  return <>
    <Helmet>
      <title>どれをつくろう？</title>
    </Helmet>
    <Header as='h2'>レシピ</Header>
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={
      recipeCategories.map(([c, d]) => {
        return {
          menuItem: { key: c, content: d },
          render: () => {
            const recipes = ds.recipes.filter(r => r.category === c)
            return <Tab.Pane>
              <List as='ul'>
                {recipes.map(r =>
                  <List.Item key={r.name} as='li'>
                    <Link to={`/recipes/${r.name}`}>{r.name}</Link>
                  </List.Item>
                )}
              </List>
            </Tab.Pane>
          }
        }
      })
    } />
  </>
}

const Home: React.FC = () => {
  return <>
    <RecipeList />
  </>
}

export default Home
