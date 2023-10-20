import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import GlobalSettingsProvider from './GlobalSettingsProvider'
import Root from './Root';
import 'semantic-ui-css/semantic.min.css';

const App: React.FC = () => {
  const router = createHashRouter([
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
          path: 'recipes/:recipeName',
          Component: lazy(() => import('./Recipe')),
        },
      ],
    }
  ])

  return <React.StrictMode>
    <GlobalSettingsProvider>
      <RouterProvider router={router} />
    </GlobalSettingsProvider>
  </React.StrictMode>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
