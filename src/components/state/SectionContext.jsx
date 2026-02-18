import { createContext, useContext, useMemo, useState } from "react"

const SectionContext = createContext(null)

export function SectionProvider({ children }) {
  const [section, setSection] = useState(0)
  const [started, setStarted] = useState(false)

  const value = useMemo(
    () => ({ section, setSection, started, setStarted }),
    [section, started]
  )

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
}

export function useSection() {
  const ctx = useContext(SectionContext)
  if (!ctx) throw new Error("useSection must be used within SectionProvider")
  return ctx
}
