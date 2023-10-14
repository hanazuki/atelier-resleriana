import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { useLocalStorage } from './hooks';
import { GlobalSettings } from './global';
import Root from './Root';
import Home from './Home'
import Settings from './Settings'
import Recipe from './Recipe'
import 'semantic-ui-css/semantic.min.css';

const App: React.FC = () => {
  const [globalSettings, setGlobalSettings] = useLocalStorage<GlobalSettings>('atelier_resleriana_settings', {
    alchemists: {},
  })

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
          element: <Settings settings={globalSettings} setSettings={setGlobalSettings} />
        },
        {
          path: 'recipes/:recipeName',
          element: <Recipe settings={globalSettings} />
        },
      ],
    }
  ])

  return <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
