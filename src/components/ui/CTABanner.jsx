import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { philosophyVideo } from '../../assets'

export default function CTABanner({ title, sub, label = 'Book a Tour', video = philosophyVideo }) {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.muted = true
      mediaRef.current.play().catch(() => {})
    }
  }, [video])

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(mediaRef.current, { x: x * 26, y: y * 14, scale: 1.06, duration: 0.6, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    if (window.innerWidth <= 1024) return
    gsap.to(mediaRef.current, { x: 0, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' })
  }

  const mediaStyle = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', filter: 'brightness(0.4)',
    transformOrigin: 'center', willChange: 'transform',
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="reveal"
      style={{
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(4rem, 8vw, 8rem) 5%',
      }}
    >
      <video
        ref={mediaRef}
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={mediaStyle}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'var(--overlay-banner)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '760px', margin: '0 auto', textAlign: 'center',
      }}>
        <div style={{ width: '36px', height: '1px', background: 'var(--gold)', margin: '0 auto 1.2rem' }} />
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 3.6rem)',
          fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, marginBottom: '1.2rem',
        }}>
          {title}
        </h2>
        {sub && (
          <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', lineHeight: 1.85, color: 'var(--text-dim)', maxWidth: '560px', margin: '0 auto 2.2rem' }}>
            {sub}
          </p>
        )}
        <button
          className="btn-gold"
          onClick={() => navigate('/book-a-tour')}
        >{label}</button>
      </div>
    </section>
  )
}

