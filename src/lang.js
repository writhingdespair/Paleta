import { createContext, useContext } from 'react'

export const LangContext = createContext({ lang: 'en', t: null, setLang: () => {} })
export const useLang = () => useContext(LangContext)
