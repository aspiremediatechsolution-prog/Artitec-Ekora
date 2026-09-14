import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null)
  const progressBarRef = useRef(null)
  const logoImgRef = useRef(null)
  const progressWrapRef = useRef(null)
  const overlayTopRef = useRef(null)
  const overlayBotRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    gsap.set([overlayTopRef.current, overlayBotRef.current], { scaleY: 1 })
    gsap.set(logoImgRef.current, { opacity: 0, scale: 0.85 })
    gsap.set(progressWrapRef.current, { opacity: 0 })

    tl.to(logoImgRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 0.15)
    tl.to(progressWrapRef.current, { opacity: 1, duration: 0.4 }, 0.5)

    tl.to(progressBarRef.current, { width: '100%', duration: 1.4, ease: 'power1.inOut' }, 0.6)

    tl.to(logoImgRef.current, { scale: 1.06, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.2')
    tl.to(progressWrapRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '<')

    tl.to(overlayTopRef.current, { scaleY: 0, transformOrigin: 'top', duration: 0.65, ease: 'power3.inOut' }, '-=0.05')
    tl.to(
      overlayBotRef.current,
      {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.65,
        ease: 'power3.inOut',
        onComplete: () => {
          if (onComplete) onComplete()
        },
      },
      '<0.04'
    )

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={preloaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        padding: '1rem',
      }}
    >
      {/* Top curtain */}
      <div
        ref={overlayTopRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'var(--bg-deep, #0d080a)',
          transformOrigin: 'top',
          zIndex: 1,
        }}
      />

      {/* Bottom curtain */}
      <div
        ref={overlayBotRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'var(--bg-deep, #0d080a)',
          transformOrigin: 'bottom',
          zIndex: 1,
        }}
      />

      {/* Center content: Large Prominent Logo + Minimalist Progress Line */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '90vw',
        }}
      >
        {/* Large Brand Emblem */}
        <div
          ref={logoImgRef}
          style={{
            position: 'relative',
            marginBottom: '2.2rem',
            width: 'clamp(100px, 22vw, 140px)',
            height: 'clamp(100px, 22vw, 140px)',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#2B050B',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 45px rgba(200, 25, 61, 0.4)',
          }}
        >
          <img
            src="/logo.jpeg"
            alt="Ekora Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'contrast(1.1) saturate(1.25) brightness(1.08)',
            }}
          />
        </div>

        {/* Minimal Sleek Progress Bar */}
        <div ref={progressWrapRef} style={{ width: 'clamp(140px, 35vw, 200px)' }}>
          <div
            style={{
              width: '100%',
              height: '1.5px',
              background: 'var(--text-hair, rgba(255,255,255,0.15))',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              ref={progressBarRef}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '0%',
                background: 'var(--gold, #A0102D)',
                boxShadow: '0 0 8px var(--gold, #A0102D)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
