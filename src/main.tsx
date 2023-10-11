import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import Home from './Home'
import Settings from './Settings'
import Recipe from './Recipe'
import './index.css'

const App: React.FC = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'settings',
          element: <Settings />
        },
        {
          path: 'recipes/:recipeName',
          element: <Recipe />
        },
      ],
    }
  ])

  return <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
