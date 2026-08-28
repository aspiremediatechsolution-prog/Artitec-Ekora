import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocation } from 'react-router-dom'
import {
  gallery4,
  heroVideo,
} from '../../assets'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({
  head1 = 'Architecture',
  head2 = 'of quiet permanence.',
  sub = 'Villas · Bespoke Interiors · Landscape Architecture',
  label = 'Ekora Architects — Spatial Atelier',
  video = heroVideo,
  baseImage = gallery4,
}) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollHintRef = useRef(null)
  const rightLabelRef = useRef(null)
  const textWrapRef = useRef(null)
  const videoRef = useRef(null)

  // Entrance animation & parallax
  useEffect(() => {
    const vid = videoRef.current
    if (vid) {
      vid.muted = true
      vid.defaultMuted = true
      const playPromise = vid.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const tryPlay = () => {
            if (vid) vid.play().catch(() => {})
            window.removeEventListener('click', tryPlay)
            window.removeEventListener('touchstart', tryPlay)
            window.removeEventListener('scroll', tryPlay)
          }
          window.addEventListener('click', tryPlay, { once: true })
          window.addEventListener('touchstart', tryPlay, { once: true })
          window.addEventListener('scroll', tryPlay, { once: true })
        })
      }
    }

    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' })
    if (headingRef.current) gsap.set(headingRef.current.children || [], { y: 60, opacity: 0 })
    if (subtitleRef.current) gsap.set(subtitleRef.current, { y: 20, opacity: 0 })
    if (scrollHintRef.current) gsap.set(scrollHintRef.current, { opacity: 0 })
    if (rightLabelRef.current) gsap.set(rightLabelRef.current, { opacity: 0 })
    if (videoRef.current) gsap.set(videoRef.current, { opacity: 0, scale: 1.06 })

    const tl = gsap.timeline({ delay: 0.25 })
    if (videoRef.current) tl.to(videoRef.current, { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' })
    if (lineRef.current) tl.to(lineRef.current, { scaleX: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6')
    if (headingRef.current) {
      tl.to(headingRef.current.children || [], { y: 0, opacity: 1, stagger: 0.15, duration: 1.0, ease: 'power3.out' }, '-=0.5')
    }
    if (subtitleRef.current) tl.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    if (rightLabelRef.current) tl.to(rightLabelRef.current, { opacity: 1, duration: 0.6 }, '-=0.4')
    // Scroll parallax (Subtle text lift and smooth video parallax without white color wash)
    const st1 = gsap.to(textWrapRef.current, {
      y: -50,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
      },
    })

    const st2 = gsap.to(videoRef.current, {
      y: 50,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '100% top',
        scrub: true,
      },
    })

    return () => {
      st1.scrollTrigger?.kill()
      st2.scrollTrigger?.kill()
      tl.kill()
    }
  }, [video])

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        background: '#0d080a',
        display: 'flex',
        alignItems: 'flex-end',
        touchAction: 'pan-y',
      }}
    >
      {/* ── High-Definition Architectural Video Background (new.mp4 / custom video) ── */}
      <video
        ref={videoRef}
        key={video || heroVideo}
        src={video || heroVideo}
        poster={baseImage}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-bg-media hero-video"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transformOrigin: 'center',
          willChange: 'transform, opacity',
          zIndex: 1,
        }}
      />

      {/* ── Cinematic Ambient Lighting & Vignette Overlays ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background:
            'linear-gradient(to top, rgba(16,10,12,0.92) 0%, rgba(16,10,12,0.42) 45%, rgba(16,10,12,0.2) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(10,5,6,0.65) 100%)',
        }}
      />

      {/* ── Main Text & Branding Block ── */}
      <div
        ref={textWrapRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(2.5rem, 6vh, 4.5rem)',
          left: 'clamp(1.5rem, 5vw, 4.5rem)',
          right: 'clamp(1.5rem, 5vw, 4.5rem)',
          zIndex: 10,
          maxWidth: isHome ? '620px' : '880px',
          pointerEvents: 'none',
        }}
      >
        {isHome ? (
          /* Home page: clean minimal hairline branding harmonized with orbiting center badge */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
              <div
                ref={lineRef}
                style={{
                  width: '36px',
                  height: '1px',
                  background: 'var(--gold)',
                }}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  letterSpacing: '0.25em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                }}
              >
                Ekora Studio · Architectural Works
              </span>
            </div>
            <p
              ref={subtitleRef}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.62rem, 1.2vw, 0.72rem)',
                letterSpacing: '0.22em',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {sub}
            </p>
          </div>
        ) : (
          /* Inner Page Banner view: Headings, Subtitle & Action buttons */
          <div>
            <div
              ref={lineRef}
              style={{
                width: '45px',
                height: '1px',
                background: 'var(--gold)',
                marginBottom: '1.2rem',
              }}
            />
            <div ref={headingRef} style={{ overflow: 'hidden' }}>
              <div style={{ overflow: 'hidden' }}>
                <h1
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
                    fontWeight: 300,
                    lineHeight: 1.05,
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 40px var(--shadow-deep)',
                    margin: 0,
                  }}
                >
                  {head1}
                </h1>
              </div>
              {head2 ? (
                <div style={{ overflow: 'hidden' }}>
                  <h1
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
                      fontWeight: 300,
                      lineHeight: 1.05,
                      color: 'var(--gold)',
                      letterSpacing: '-0.02em',
                      fontStyle: 'italic',
                      textShadow: '0 0 80px var(--gold-glow)',
                      margin: 0,
                    }}
                  >
                    {head2}
                  </h1>
                </div>
              ) : null}
            </div>

            {sub && (
              <p
                ref={subtitleRef}
                style={{
                  marginTop: '1.25rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.62rem, 1.3vw, 0.72rem)',
                  letterSpacing: '0.22em',
                  color: 'var(--text-dim)',
                  textTransform: 'uppercase',
                }}
              >
                {sub}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right Vertical Coordinate Label */}
      <div
        ref={rightLabelRef}
        className="hero-right-label"
        style={{
          position: 'absolute',
          right: '2.5rem',
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.45rem',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '0.58rem',
            letterSpacing: '0.24em',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, var(--gold), transparent)',
            animation: 'heroScrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes heroScrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.2); }
        }

        .hero-mobile-pills {
          display: none !important;
        }

        @media (max-width: 768px) {
          .hero-mobile-pills {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  )
}
