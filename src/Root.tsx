import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Container, Loader, Menu } from 'semantic-ui-react'
import GlobalSettingsProvider from './GlobalSettingsProvider'

const Navbar: React.FC = () => {
  return <Menu fixed='top' inverted>
    <Container style={{ fontSize: '1.2em' }}>
      <Menu.Item as={Link} to='/' title='ホーム'>🏠</Menu.Item>
      <Menu.Item as={Link} to='/settings' title='設定'>⚙</Menu.Item>
    </Container>
  </Menu>
}

const Root: React.FC = () => {
  return <GlobalSettingsProvider>
    <Navbar />
    <Container style={{ paddingBlock: '5em 1em', scrollPaddingBlockStart: '5em' }}>
      <Suspense fallback={<Loader active>読み込み中</Loader>}>
        <Outlet />
      </Suspense>
    </Container>
  </GlobalSettingsProvider>
}

export default Root
