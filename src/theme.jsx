import { useEffect, useState } from 'react'
import { ThemeContext } from './theme-context'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('ekora-theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-anim')
    root.setAttribute('data-theme', theme)
    window.localStorage.setItem('ekora-theme', theme)
    const t = setTimeout(() => root.classList.remove('theme-anim'), 600)
    return () => clearTimeout(t)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
