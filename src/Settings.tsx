import React from 'react'
import { Button, Card, Checkbox, Divider, Dropdown, List, Tab } from 'semantic-ui-react'
import { Helmet } from 'react-helmet'
import * as Optic from '@fp-ts/optic'
import { AlchemistSettings, GlobalSettings, _alchemist } from './global'
import * as ds from './dataset'

interface SettingsProps {
  settings: GlobalSettings
  setSettings: (s: GlobalSettings) => void
}


const Settings: React.FC<SettingsProps> = ({ settings: globalSettings, setSettings: setGlobalSettings }) => {
  const alchemistSettings = () => {
    const rarityIncreaseOptions = [
      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80,
    ].map(i => ({
      key: `p${i}`,
      value: i,
      text: `+${i}%`,
    }))

    return ds.alchemists.map(a => {
      const _a = _alchemist(a.name, a.title)
      const s: AlchemistSettings = Optic.get(_a)(globalSettings)

      const setUnlocked = (unlocked: boolean): void => {
        setGlobalSettings(Optic.replace(_a.at('unlocked'))(unlocked)(globalSettings))
      }

      const setRarityIncrease = (chance: number): void => {
        setGlobalSettings(Optic.replace(_a.at('rarityIncrease'))(chance)(globalSettings))
      }

      return <Card key={`${a.name}/${a.title}`}>
        <Card.Content>
          <Card.Header style={{ display: 'flex' }}><div style={{ flex: 1 }}>{a.name}</div><div style={{ letterSpacing: '-.5em' }} title={`星${a.rarity}`}>{'⭐'.repeat(a.rarity)}</div></Card.Header>
          <Card.Meta>{a.title}</Card.Meta>
        </Card.Content>
        <Card.Content extra style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Checkbox toggle checked={s.unlocked} onChange={(_e, data) => setUnlocked(!!data.checked)} aria-label='解放済み' />
          </div>
          <div>
            <Dropdown inline options={rarityIncreaseOptions} value={s.rarityIncrease} onChange={(_e, data) => setRarityIncrease(Number(data.value))} aria-label='ギフトボーナス' />
          </div>
        </Card.Content>
      </Card>
    })
  }

  const panes = [
    {
      menuItem: { content: '錬金術師' },
      render: () => <Tab.Pane>
        <Card.Group>
          {alchemistSettings()}
        </Card.Group>
      </Tab.Pane>,
    },
    {
      menuItem: { content: '設定管理' },
      render: () => <Tab.Pane>
        <Button negative onClick={() => setGlobalSettings({ alchemists: {} })}>💣 設定を初期化 💣</Button>
        <Divider />
        <List>
          <List.Item>Repo: <a href="https://github.com/hanazuki/atelier-resleriana">https://github.com/hanazuki/atelier-resleriana</a></List.Item>
          <List.Item>Commit: {import.meta.env.GIT_COMMIT_SHA}</List.Item>
          <List.Item>Legal notices: <a href="./vendor.LICENSE.txt">vendor.LICENSE.txt</a></List.Item>
        </List>
      </Tab.Pane>
    },
  ]

  return <>
    <Helmet>
      <title>設定</title>
    </Helmet>
    <Tab panes={panes} />
  </>
}

export default Settings
