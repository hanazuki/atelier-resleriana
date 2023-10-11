import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Menu: React.FC = () => {
  return <nav>
    <div><Link to="/">🏠</Link></div>
    <div><Link to="/settings">⚙️</Link></div>
  </nav>
}

const Root: React.FC = () => {
  return <>
    <Menu />
    <Outlet />
  </>
}

export default Root
