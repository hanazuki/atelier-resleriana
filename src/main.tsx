import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import routes from './routes'

const App: React.FC = () => {
  const router = createHashRouter(routes)

  return <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
