import React from 'react'
import { Button, Card, Checkbox, Divider, Dropdown, List, Tab } from 'semantic-ui-react'
import * as Optic from '@fp-ts/optic'
import { _alchemist, _ui } from './global'
import * as ds from './dataset'
import Title from './Title'
import { useGlobalSettings } from './GlobalSettingsProvider'
import { GlobalSettings as pb_GlobalSettings } from './gen/settings_pb'

const toDataURL = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', e => resolve(e.target!.result as string))
    reader.addEventListener('error', e => reject(e.target!.error))
    reader.readAsDataURL(blob)
  })

const UISettings: React.FC = () => {
  const [globalSettings, setGlobalSettings] = useGlobalSettings()

  const _prefersShapes = _ui.at('prefersShapes')

  return <>
    <List>
      <List.Item>
        <Checkbox toggle label="色以外で区別する"
          checked={Optic.get(_prefersShapes)(globalSettings)}
          onChange={(_e, data) => setGlobalSettings(Optic.replace(_prefersShapes)(!!data.checked)(globalSettings))} />
      </List.Item>
    </List>
  </>
}

const Settings: React.FC = () => {
  const [globalSettings, setGlobalSettings] = useGlobalSettings()

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
      const s = Optic.get(_a)(globalSettings)

      const setDisabled = (disabled: boolean): void => {
        setGlobalSettings(Optic.replace(_a.at('disabled'))(disabled)(globalSettings))
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
            <Checkbox toggle checked={!s.disabled} onChange={(_e, data) => setDisabled(!data.checked)} aria-label='解放済み' />
          </div>
          <div>
            <Dropdown inline options={rarityIncreaseOptions} value={s.rarityIncrease} onChange={(_e, data) => setRarityIncrease(Number(data.value))} aria-label='ギフトボーナス' />
          </div>
        </Card.Content>
      </Card>
    })
  }

  const exportSettings = async () => {
    const url = toDataURL(new Blob(
      [new pb_GlobalSettings(globalSettings).toBinary()],
      { type: 'application/x-protobuf' },
    ))

    const a = document.createElement('a')
    a.href = await url
    a.download = 'atelier-resleriana.data'
    a.style.display = 'none'
    document.body.append(a)
    a.click()
    setTimeout(() => { a.remove() }, 0)
  }

  const importSettings = async (files: FileList) => {
    const file = files[0]
    if (file !== null) {
      const reader = new FileReader()
      reader.addEventListener('load', e => {
        const data = e.target!.result as ArrayBuffer
        setGlobalSettings(pb_GlobalSettings.fromBinary(new Uint8Array(data)))
      })
      reader.readAsArrayBuffer(file)
    }
  }

  const panes = [
    {
      menuItem: { key: 'alchemists', content: '錬金術師' },
      render: () => <Tab.Pane>
        <Card.Group>
          {alchemistSettings()}
        </Card.Group>
      </Tab.Pane>,
    },
    {
      menuItem: { key: 'ui', content: 'UI' },
      render: () => <Tab.Pane>
        <UISettings />
      </Tab.Pane>,
    },
    {
      menuItem: { key: 'management', content: '設定管理' },
      render: () => {
        return <Tab.Pane>
          <Button onClick={exportSettings}>設定をエクスポート</Button>
          <Button as='label'>
            <input type='file' style={{ display: 'none' }}
              onChange={(e) => e.target.files && importSettings(e.target.files)} />
            設定をインポート
          </Button>
          <Button negative onClick={() => setGlobalSettings({ alchemists: {} })}>💣 設定を初期化 💣</Button>
          <Divider />
          <List>
            <List.Item>Repo: <a href="https://github.com/hanazuki/atelier-resleriana">https://github.com/hanazuki/atelier-resleriana</a></List.Item>
            <List.Item>Commit: {import.meta.env.GIT_COMMIT_SHA}</List.Item>
            <List.Item>Legal notices: <a href="./assets/vendor.LICENSE.txt">vendor.LICENSE.txt</a></List.Item>
          </List>
        </Tab.Pane >
      }

    },
  ]

  return <>
    <Title>設定</Title>
    <Tab panes={panes} />
  </>
}

export default Settings
