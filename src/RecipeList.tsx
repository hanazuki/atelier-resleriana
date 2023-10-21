import React from 'react'
import { Link } from 'react-router-dom'
import { Header, List } from 'semantic-ui-react'
import * as ds from './dataset'

const RecipeList: React.FC<{ recipes: ds.Recipe[] }> = ({ recipes }) => {
  const rs: Record<string, ds.Recipe[]> = {}
  for (const recipe of recipes) {
    (rs[recipe.series] ||= []).push(recipe)
  }

  return Object.entries(rs).map(([series, rs]) =>
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
  )
}

export default RecipeList
