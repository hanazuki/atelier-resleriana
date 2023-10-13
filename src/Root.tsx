import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

const Navbar: React.FC = () => {
  return <Menu fixed='top' inverted>
    <Container style={{ fontSize: '1.2em' }}>
      <Menu.Item as={Link} to='/' title='ホーム'>🏠</Menu.Item>
      <Menu.Item as={Link} to='/settings' title='設定'>⚙</Menu.Item>
    </Container>
  </Menu>
}

const Root: React.FC = () => {
  return <>
    <Navbar />
    <Container style={{ paddingBlock: '5em 1em', scrollPaddingBlockStart: '5em' }}>
      <Outlet />
    </Container>
  </>
}

export default Root
