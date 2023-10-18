import React, { createContext, useContext } from "react"
import { GlobalSettings } from "./global"
import { useLocalStorage } from "./hooks"

const Context = createContext<{
  globalSettings: GlobalSettings,
  setGlobalSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>,
} | undefined>(undefined)

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [globalSettings, setGlobalSettings] = useLocalStorage<GlobalSettings>('atelier_resleriana_settings', {
    alchemists: {},
  })

  return <Context.Provider value={{ globalSettings, setGlobalSettings }}>
    {children}
  </Context.Provider>
}

export default Provider

export const useGlobalSettings = () :[GlobalSettings, React.Dispatch<React.SetStateAction<GlobalSettings>>] => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('BUG: useGlobalSettings must appear inside GlobalSettingsProvider')
  }

  return [context.globalSettings, context.setGlobalSettings]
}
