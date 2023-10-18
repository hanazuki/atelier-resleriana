import React from 'react';
import { Link } from 'react-router-dom';
import { Header, List, Tab } from 'semantic-ui-react'
import * as ds from './dataset';
import Title from './Title';

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
    <Title>どれをつくろう？</Title>
    <Header as='h2'>レシピ</Header>
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={
      recipeCategories.map(([c, d]) => {
        return {
          menuItem: { key: c, content: d },
          render: () => {
            const recipes: Record<string, ds.Recipe[]> = {}
            for (const recipe of ds.recipes.filter(r => r.category === c)) {
              (recipes[recipe.series] ||= []).push(recipe)
            }

            return <Tab.Pane>
              {Object.entries(recipes).map(([series, rs]) =>
                <React.Fragment key={series}>
                  <Header as='h3'>{series}</Header>
                  <List>
                    {rs.map(r =>
                      <List.Item key={r.name}>
                        <Link to={`/recipes/${r.name}`}>{r.name}</Link>
                      </List.Item>
                    )}
                  </List>
                </React.Fragment>
              )}
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
