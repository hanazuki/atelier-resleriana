import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';

import Home from './Home'
import Recipe from './Recipe'
import './index.css'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/recipes/:recipeName',
    element: <Recipe />
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
