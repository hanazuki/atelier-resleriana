import { render } from 'preact'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import routes from './routes'

const App = () => {
  const router = createHashRouter(routes)
  return <RouterProvider router={router} />
}

render(<App />, document.getElementById('root')!)
