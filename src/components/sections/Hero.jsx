import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { heroVideo } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({
  head1 = 'Architecture',
  head2 = 'done right.',
  sub = 'Villas · Interiors · Landscape',
  label = 'Est. 2010 — Mumbai',
  action = null,
  actions = null,
  video = heroVideo,
}) {
  const sectionRef   = useRef(null)
  const lineRef      = useRef(null)
  const headingRef   = useRef(null)
  const subtitleRef  = useRef(null)
  const actionRef    = useRef(null)
  const scrollHintRef = useRef(null)
  const rightLabelRef = useRef(null)
  const textWrapRef  = useRef(null)
  const videoRef     = useRef(null)

  const scrollToAction = (target) => {
    if (target) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Entrance animation — runs immediately on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }

    gsap.set(lineRef.current,             { scaleX: 0, transformOrigin: 'left' })
    gsap.set(headingRef.current.children, { y: 80, opacity: 0 })
    gsap.set(subtitleRef.current,         { y: 20, opacity: 0 })
    if (actionRef.current) gsap.set(actionRef.current, { y: 20, opacity: 0 })
    gsap.set(scrollHintRef.current,       { opacity: 0 })
    gsap.set(rightLabelRef.current,       { opacity: 0 })
    gsap.set(videoRef.current,            { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.3 })
    tl.to(videoRef.current,              { opacity: 1, duration: 1.6, ease: 'power2.out' })
    tl.to(lineRef.current,               { scaleX: 1, duration: 1.0, ease: 'power3.out' }, '-=0.6')
    tl.to(headingRef.current.children,   { y: 0, opacity: 1, stagger: 0.18, duration: 1.1, ease: 'power3.out' }, '-=0.5')
    tl.to(subtitleRef.current,           { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    if (actionRef.current) tl.to(actionRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    tl.to(rightLabelRef.current,         { opacity: 1, duration: 0.6 }, '-=0.4')
    tl.to(scrollHintRef.current,         { opacity: 1, duration: 0.6 }, '-=0.3')

    // Scroll parallax
    gsap.to(textWrapRef.current, {
      y: -80, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '40% top', scrub: true }
    })
    gsap.to('.hero-video', {
      opacity: 0.3, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '60% top', scrub: true }
    })
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="hero-video"
        src={video || heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'brightness(1.2) saturate(1.1)',
        }}
      />

      {/* Gradients */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4,
        background: 'var(--overlay-hero-bottom)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4,
        background: 'var(--overlay-hero-side)',
      }} />

      {/* ── Main text block — bottom left ── */}
      <div
        ref={textWrapRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(3.5rem, 8vh, 6rem)',
          left: 'clamp(1.2rem, 5%, 3.5rem)',
          right: 'clamp(1.2rem, 5%, 3.5rem)',
          zIndex: 10,
          maxWidth: '780px',
        }}
      >
        {/* Gold line */}
        <div ref={lineRef} style={{
          width: '50px', height: '1px',
          background: 'var(--gold)',
          marginBottom: '1.2rem',
        }} />

        {/* Heading */}
        <div ref={headingRef} style={{ overflow: 'hidden' }}>
          <div style={{ overflow: 'hidden' }}>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.3rem, 6.5vw, 6.8rem)',
              fontWeight: 300, lineHeight: 0.95,
              color: 'var(--text)', letterSpacing: '-0.02em',
              textShadow: '0 4px 40px var(--shadow-deep)',
              margin: 0,
            }}>
              {head1}
            </h1>
          </div>
          {head2 ? (
            <div style={{ overflow: 'hidden' }}>
              <h1 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.3rem, 6.5vw, 6.8rem)',
                fontWeight: 300, lineHeight: 1.05,
                color: 'var(--gold)', letterSpacing: '-0.02em',
                fontStyle: 'italic',
                textShadow: '0 0 80px var(--gold-glow)',
                margin: 0,
              }}>
                {head2}
              </h1>
            </div>
          ) : null}
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} style={{
          marginTop: '1.4rem',
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.62rem, 1.4vw, 0.72rem)',
          letterSpacing: '0.22em',
          color: 'var(--text-dim)', textTransform: 'uppercase',
        }}>
          {sub}
        </p>

        {/* Hero Actions */}
        {(actions || action) && (
          <div
            ref={actionRef}
            style={{
              marginTop: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              flexWrap: 'wrap',
              pointerEvents: 'auto',
            }}
          >
            {actions
              ? actions.map((act, idx) => (
                  <button
                    key={idx}
                    className={act.primary !== false ? 'btn-gold' : 'btn-outline'}
                    onClick={() => {
                      if (act.onClick) act.onClick()
                      else if (act.target) scrollToAction(act.target)
                    }}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {act.text || act.label}
                  </button>
                ))
              : action ? (
                  <button
                    className="btn-gold"
                    onClick={() => {
                      if (action.onClick) action.onClick()
                      else if (action.target) scrollToAction(action.target)
                    }}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {action.text || action.label}
                  </button>
                ) : null}
          </div>
        )}
      </div>

      {/* Right vertical label */}
      <div
        ref={rightLabelRef}
        className="hero-right-label"
        style={{
          position: 'absolute', right: '3%', top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center', zIndex: 10, pointerEvents: 'none',
        }}
      >
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', letterSpacing: '0.32em', color: 'var(--text-mute)', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>

      {/* Scroll hint — bottom center */}
      <div ref={scrollHintRef} style={{
        position: 'absolute', bottom: '1.8rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.4rem', zIndex: 10, pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.28em', color: 'var(--text-mute)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  )
}

