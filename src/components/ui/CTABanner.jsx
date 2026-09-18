import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import { philosophyVideo } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner({
  title,
  sub,
  label = 'Contact Us',
  video = null,
  image = null,
  secondaryAction = null,
}) {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const mediaRef = useRef(null)
  const contentRef = useRef(null)

  const activeVideo = image ? null : (video || philosophyVideo)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (image && mediaRef.current && sectionRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { yPercent: -10, scale: 1.05 },
          {
            yPercent: 10,
            scale: 1.18,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.25,
            },
          }
        )
      }

      if (contentRef.current && sectionRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    const vid = mediaRef.current
    if (activeVideo && vid && vid.tagName === 'VIDEO') {
      vid.muted = true
      vid.defaultMuted = true
      const p = vid.play()
      if (p !== undefined) {
        p.catch(() => {
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

    return () => ctx.revert()
  }, [activeVideo, image])

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(mediaRef.current, { x: x * 18, y: y * 10, duration: 0.6, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    if (window.innerWidth <= 1024) return
    gsap.to(mediaRef.current, { x: 0, y: 0, duration: 0.9, ease: 'power3.out' })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="reveal"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(5rem, 9vw, 8.5rem) 5%',
        background: 'var(--bg-deep)',
      }}
    >
      {image ? (
        <img
          ref={mediaRef}
          src={image}
          alt={title}
          style={{
            position: 'absolute',
            inset: '-10%',
            width: '120%',
            height: '120%',
            objectFit: 'cover',
            filter: 'brightness(0.38) contrast(1.1) saturate(1.05)',
            transformOrigin: 'center',
            willChange: 'transform',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      ) : (
        <video
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
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.35) contrast(1.05)',
            transformOrigin: 'center',
            willChange: 'transform',
            opacity: 1,
            display: 'block',
          }}
        >
          <source src={activeVideo} type="video/mp4" />
        </video>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(13, 8, 10, 0.85) 0%, rgba(13, 8, 10, 0.6) 50%, rgba(13, 8, 10, 0.9) 100%)',
          zIndex: 1,
        }}
      />
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '820px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div style={{ width: '32px', height: '1px', background: 'var(--gold)', margin: '0 auto 1.5rem' }} />
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 300,
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            textWrap: 'balance',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          {title}
        </h2>
        {sub && (
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.85rem, 1.2vw, 0.96rem)',
              lineHeight: 1.85,
              color: 'rgba(245, 239, 235, 0.78)',
              maxWidth: '620px',
              margin: '0 auto 2.5rem',
              textWrap: 'pretty',
            }}
          >
            {sub}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="btn-gold"
            onClick={() => navigate('/contact')}
            style={{ padding: '0.9rem 2.2rem' }}
          >
            {label}
          </button>
          {secondaryAction && (
            <button
              className="btn-outline"
              onClick={secondaryAction.onClick || (() => navigate(secondaryAction.path || '/projects'))}
              style={{ padding: '0.9rem 2.2rem' }}
            >
              {secondaryAction.label || 'Explore Portfolio'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
