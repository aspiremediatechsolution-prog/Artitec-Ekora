import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const current = (window.scrollY / totalHeight) * 100
            setProgress(Math.min(100, Math.max(0, current)))
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 99999,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #C8A96A 0%, #E7D095 50%, #C8A96A 100%)',
          boxShadow: '0 0 10px rgba(200, 169, 106, 0.7), 0 0 4px rgba(231, 208, 149, 0.9)',
          transition: 'width 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  )
}
