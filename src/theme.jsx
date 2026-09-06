import { useEffect, useState, useCallback } from 'react'
import { ThemeContext } from './theme-context'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('ekora-theme')
      if (saved === 'dark' || saved === 'light') return saved
      return 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('theme-anim')
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
    window.localStorage.setItem('ekora-theme', theme)
    const t = setTimeout(() => root.classList.remove('theme-anim'), 600)
    return () => clearTimeout(t)
  }, [theme])

  const toggle = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const setTheme = useCallback((newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

