import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import Root from './Root'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        Component: lazy(() => import('./Home')),
      },
      {
        path: 'settings',
        Component: lazy(() => import('./Settings')),
      },
      {
        path: 'materials/:materialName',
        Component: lazy(() => import('./Material')),
      },
      {
        path: 'recipes/:recipeName',
        Component: lazy(() => import('./Recipe')),
      },
    ],
  }
]

export default routes
