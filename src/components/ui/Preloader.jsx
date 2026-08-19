import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null)
  const progressBarRef = useRef(null)
  const counterRef = useRef(null)
  const logoImgRef = useRef(null)
  const logoTextRef = useRef(null)
  const taglineRef = useRef(null)
  const progressWrapRef = useRef(null)
  const overlayTopRef = useRef(null)
  const overlayBotRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    gsap.set([overlayTopRef.current, overlayBotRef.current], { scaleY: 1 })
    gsap.set(logoImgRef.current, { opacity: 0, scale: 0.6, rotation: -15 })
    gsap.set(logoTextRef.current, { opacity: 0, y: 20, letterSpacing: '0.1em' })
    gsap.set(taglineRef.current, { opacity: 0, y: 10 })
    gsap.set(progressWrapRef.current, { opacity: 0 })
    gsap.set(line1Ref.current, { scaleX: 0 })
    gsap.set(line2Ref.current, { scaleX: 0 })

    tl.to(logoImgRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }, 0.2)
    tl.to([line1Ref.current, line2Ref.current], { scaleX: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 0.6)
    tl.to(logoTextRef.current, { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.9, ease: 'power3.out' }, 0.8)
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.2)
    tl.to(progressWrapRef.current, { opacity: 1, duration: 0.4 }, 1.4)

    const count = { val: 0 }
    tl.to(progressBarRef.current, { width: '100%', duration: 2, ease: 'power1.inOut' }, 1.5)
    tl.to(count, {
      val: 100, duration: 2, ease: 'power1.inOut',
      onUpdate: () => { if (counterRef.current) counterRef.current.textContent = Math.round(count.val) },
    }, 1.5)
    tl.to(logoImgRef.current, { scale: 1.08, duration: 0.4, ease: 'power1.inOut', yoyo: true, repeat: 3 }, 1.5)

    tl.to(logoImgRef.current, { scale: 1.2, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.2')
    tl.to([logoTextRef.current, taglineRef.current, progressWrapRef.current], { opacity: 0, y: -20, stagger: 0.05, duration: 0.4, ease: 'power2.in' }, '<')
    tl.to([line1Ref.current, line2Ref.current], { scaleX: 0, duration: 0.4, ease: 'power2.in' }, '<0.1')

    tl.to(overlayTopRef.current, { scaleY: 0, transformOrigin: 'top', duration: 0.7, ease: 'power3.inOut' }, '-=0.1')
    tl.to(overlayBotRef.current, {
      scaleY: 0, transformOrigin: 'bottom', duration: 0.7, ease: 'power3.inOut',
      onComplete: () => { if (onComplete) onComplete() },
    }, '<0.05')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={preloaderRef} style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', padding: '1rem' }}>

      {/* Top curtain */}
      <div ref={overlayTopRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'var(--bg-deep)', transformOrigin: 'top', zIndex: 1 }} />

      {/* Bottom curtain */}
      <div ref={overlayBotRef} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'var(--bg-deep)', transformOrigin: 'bottom', zIndex: 1 }} />

      {/* Center content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '90vw' }}>

        {/* Top line */}
        <div ref={line1Ref} style={{ width: 'clamp(80px, 30vw, 120px)', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)', marginBottom: '1.5rem', transformOrigin: 'center' }} />

        {/* Logo */}
        <div style={{ position: 'relative', marginBottom: '1.2rem' }}>
          <div style={{ position: 'absolute', inset: '-10px', border: '1px solid var(--gold-faint)', borderRadius: '50%', borderTopColor: 'var(--gold)', animation: 'spin 2s linear infinite' }} />
          <div style={{ position: 'absolute', inset: '-5px', border: '1px solid var(--gold-hair)', borderRadius: '50%' }} />
          <img ref={logoImgRef} src="/logo.jpeg" alt="Logo" style={{ width: 'clamp(60px, 16vw, 80px)', height: 'clamp(60px, 16vw, 80px)', objectFit: 'contain', borderRadius: '50%', display: 'block', boxShadow: '0 0 30px var(--gold-mid)' }} />
        </div>

        {/* Logo text */}
        <p ref={logoTextRef} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.35em', marginBottom: '0.4rem', textAlign: 'center' }}>
          Ekora
        </p>

        {/* Tagline */}
        <p ref={taglineRef} style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.52rem, 2vw, 0.6rem)', letterSpacing: '0.24em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '2rem', textAlign: 'center' }}>
          Luxury Architecture &amp; Design
        </p>

        {/* Bottom line */}
        <div ref={line2Ref} style={{ width: 'clamp(80px, 30vw, 120px)', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)', marginBottom: '1.5rem', transformOrigin: 'center' }} />

        {/* Progress */}
        <div ref={progressWrapRef} style={{ width: 'clamp(140px, 45vw, 180px)' }}>
          <div style={{ width: '100%', height: '1px', background: 'var(--text-hair)', position: 'relative', overflow: 'hidden', marginBottom: '0.6rem' }}>
            <div ref={progressBarRef} style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '0%', background: 'linear-gradient(to right, var(--gold), var(--gold-light))', boxShadow: '0 0 8px var(--gold-glow)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--text-mute)', textTransform: 'uppercase' }}>Loading</span>
            <span ref={counterRef} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem', color: 'var(--gold)' }}>0</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

