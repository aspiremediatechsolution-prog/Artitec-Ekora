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
  label = 'Ekora Architects — Spatial Architecture',
  video = heroVideo,
  image = null,
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
  const mediaRef = useRef(null)

  const isImageMedia = Boolean(
    image ||
    (typeof video === 'string' && /\.(jpg|jpeg|png|webp|avif|svg)(\?.*)?$/i.test(video))
  )
  const activeMediaSrc = image || video || heroVideo

  // Entrance animation & parallax
  useEffect(() => {
    const vid = mediaRef.current
    if (vid && !isImageMedia && vid.tagName === 'VIDEO') {
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

    if (lineRef.current) gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'power3.out' })
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1.0, ease: 'power3.out' }
      )
    }
    if (subtitleRef.current) gsap.fromTo(subtitleRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.25 })
    if (rightLabelRef.current) gsap.fromTo(rightLabelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.35 })
    
    // Smooth scroll parallax with inertial scrub
    const st1 = gsap.to(textWrapRef.current, {
      y: -45,
      opacity: 0,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '55% top',
        scrub: 1.2,
      },
    })

    const st2 = mediaRef.current
      ? gsap.to(mediaRef.current, {
          y: 45,
          scale: 1.05,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '100% top',
            scrub: 1.2,
          },
        })
      : null

    return () => {
      st1?.scrollTrigger?.kill()
      st1?.kill()
      st2?.scrollTrigger?.kill()
      st2?.kill()
    }
  }, [video, image, isImageMedia])

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
      {/* ── Architectural Media Background (Video or High-Res Image) ── */}
      {isImageMedia ? (
        <img
          key={activeMediaSrc}
          ref={mediaRef}
          src={activeMediaSrc}
          alt={head1 || 'Architecture'}
          fetchPriority="high"
          decoding="async"
          className="hero-bg-media hero-image"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            transformOrigin: 'center',
            zIndex: 1,
            opacity: 1,
            display: 'block',
          }}
        />
      ) : (
        <video
          key={activeMediaSrc}
          ref={(el) => {
            if (el) {
              el.muted = true
              el.defaultMuted = true
              el.playsInline = true
              el.setAttribute('playsinline', '')
              el.setAttribute('webkit-playsinline', '')
              el.setAttribute('muted', '')
              el.play().catch(() => {})
            }
            mediaRef.current = el
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={activeMediaSrc}
          className="hero-bg-media hero-video"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            transformOrigin: 'center',
            zIndex: 1,
            opacity: 1,
            display: 'block',
          }}
        >
          <source src={activeMediaSrc} type="video/mp4" />
        </video>
      )}

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
                  background: 'var(--gold-light, #FF335F)',
                }}
              />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  color: 'var(--gold-light, #FF335F)',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                }}
              >
                Ekora Studio · Architectural Works
              </span>
            </div>
            <p
              ref={subtitleRef}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.65rem, 1.2vw, 0.76rem)',
                letterSpacing: '0.22em',
                color: 'rgba(255, 255, 255, 0.85)',
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.85)',
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
                height: '1.5px',
                background: 'var(--gold-light, #FF335F)',
                marginBottom: '1.2rem',
              }}
            />
            <div ref={headingRef} style={{ overflow: 'hidden' }}>
              <div style={{ overflow: 'hidden' }}>
                <h1
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                    fontWeight: 300,
                    lineHeight: 1.05,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 0.8)',
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
                      fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                      fontWeight: 300,
                      lineHeight: 1.05,
                      color: 'var(--gold-light, #FF335F)',
                      letterSpacing: '-0.02em',
                      fontStyle: 'italic',
                      textShadow: '0 0 40px rgba(255, 51, 95, 0.6), 0 2px 20px rgba(0, 0, 0, 0.9)',
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
                  fontSize: 'clamp(0.68rem, 1.3vw, 0.82rem)',
                  letterSpacing: '0.22em',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 14px rgba(0, 0, 0, 0.85)',
                  fontWeight: 400,
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
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
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
            color: 'rgba(255, 255, 255, 0.65)',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, var(--gold-light, #FF335F), transparent)',
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
