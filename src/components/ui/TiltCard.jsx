import { useRef } from 'react'
import gsap from 'gsap'

export default function TiltCard({ children, maxTilt = 14, style, glow = true, className }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(cardRef.current, {
      rotateY: x * maxTilt, rotateX: -y * maxTilt * 0.7,
      duration: 0.4, ease: 'power2.out', transformPerspective: 900,
    })
    if (glow && glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1, left: (x + 1) * 50 + '%', top: (y + 1) * 50 + '%',
        duration: 0.3,
      })
    }
  }

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' })
    if (glow && glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ position: 'relative', transformStyle: 'preserve-3d', willChange: 'transform', cursor: 'none', ...style }}
    >
      {glow && (
        <div ref={glowRef} style={{
          position: 'absolute', width: '160px', height: '160px', borderRadius: '50%',
          background: 'radial-gradient(circle, var(--gold-faint) 0%, transparent 70%)',
          transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: 0,
          top: '50%', left: '50%', zIndex: 4,
        }} />
      )}
      {children}
    </div>
  )
}
