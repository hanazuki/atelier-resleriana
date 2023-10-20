import React, { createContext, useContext } from "react"
import { GlobalSettings as pb_GlobalSettings } from "./gen/settings_pb"
import { useLocalStorage } from "./hooks"
import { PlainMessage } from '@bufbuild/protobuf'
import { Encode as encode64, Decode as decode64 } from 'arraybuffer-encoding/base64/url'

export type GlobalSettings = PlainMessage<pb_GlobalSettings>

const Context = createContext<{
  globalSettings: GlobalSettings,
  setGlobalSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>,
} | undefined>(undefined)

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalSettings, setGlobalSettings] = useLocalStorage<GlobalSettings>(
    'atelier_resleriana_settings_pb',
    new pb_GlobalSettings(),
    s => pb_GlobalSettings.fromBinary(new Uint8Array(decode64(s))),
    v => encode64(new pb_GlobalSettings(v).toBinary()),
  )

  return <Context.Provider value={{ globalSettings, setGlobalSettings }}>
    {children}
  </Context.Provider>
}

export default Provider

export const useGlobalSettings = (): [GlobalSettings, React.Dispatch<React.SetStateAction<GlobalSettings>>] => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('BUG: useGlobalSettings must appear inside GlobalSettingsProvider')
  }

  return [context.globalSettings, context.setGlobalSettings]
}
