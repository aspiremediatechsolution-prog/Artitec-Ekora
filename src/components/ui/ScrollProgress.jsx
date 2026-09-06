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
            const current = window.scrollY / totalHeight
            setProgress(Math.min(1, Math.max(0, current)))
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
          width: '100%',
          transformOrigin: 'left center',
          transform: `scaleX(${progress})`,
          background: 'linear-gradient(90deg, var(--cherry-dark) 0%, var(--cherry) 50%, var(--cherry-light) 100%)',
          boxShadow: '0 0 12px var(--gold-glow), 0 0 4px var(--cherry-light)',
          transition: 'transform 0.08s linear',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
