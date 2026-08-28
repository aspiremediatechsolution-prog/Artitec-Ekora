import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLocation, useNavigate } from 'react-router-dom'

const leftLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
]

const rightLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact Us', path: '/contact' },
]

const mobileLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const logoWrapperRef = useRef(null)
  const leftWingRef = useRef(null)
  const rightWingRef = useRef(null)
  const orbitRingsRef = useRef(null)
  const hasDockedRef = useRef(false)

  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hasDocked, setHasDocked] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'

  // Reset or initialize docking status on route change
  useEffect(() => {
    if (!isHome) {
      hasDockedRef.current = true
      setHasDocked(true)
    }
  }, [isHome, location.pathname])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0
          setIsScrolled(scrollY > 20)

          // Navbar background styling
          if (navRef.current) {
            if (scrollY > 20) {
              navRef.current.style.background = '#FFFFFF'
              navRef.current.style.backdropFilter = 'none'
              navRef.current.style.borderBottom = '1px solid var(--gold-hair)'
              navRef.current.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)'
            } else {
              navRef.current.style.background = isHome ? 'transparent' : '#FFFFFF'
              navRef.current.style.backdropFilter = 'none'
              navRef.current.style.borderBottom = isHome ? '1px solid transparent' : '1px solid var(--gold-hair)'
              navRef.current.style.boxShadow = 'none'
            }
          }

          // Case 1: Already docked permanently (or non-home page)
          if (hasDockedRef.current || !isHome) {
            if (logoWrapperRef.current) {
              logoWrapperRef.current.style.top = '50%'
              logoWrapperRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
            }
            if (orbitRingsRef.current) {
              orbitRingsRef.current.style.display = 'none'
            }
            if (leftWingRef.current && rightWingRef.current) {
              leftWingRef.current.style.opacity = '1'
              leftWingRef.current.style.pointerEvents = 'all'
              rightWingRef.current.style.opacity = '1'
              rightWingRef.current.style.pointerEvents = 'all'
            }
            ticking = false
            return
          }

          // Case 2: Scroll-linked Ascent (Jitna scroll karu utna logo upar jaye)
          const maxScroll = 200
          const p = Math.min(1, Math.max(0, scrollY / maxScroll))

          if (logoWrapperRef.current) {
            if (p >= 0.98) {
              // 🚀 LATCH DOCKED: Permanently lock in navbar center!
              hasDockedRef.current = true
              setHasDocked(true)
              logoWrapperRef.current.style.top = '50%'
              logoWrapperRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
              if (orbitRingsRef.current) {
                orbitRingsRef.current.style.display = 'none'
              }
              if (leftWingRef.current && rightWingRef.current) {
                leftWingRef.current.style.opacity = '1'
                leftWingRef.current.style.pointerEvents = 'all'
                rightWingRef.current.style.opacity = '1'
                rightWingRef.current.style.pointerEvents = 'all'
              }
            } else {
              // Smooth proportional position and scale tied to user scroll
              const currentTopVh = (1 - p) * 48
              const currentScale = 1 + (1 - p) * 0.75

              logoWrapperRef.current.style.top = `calc(${currentTopVh}vh + ${p * 50}%)`
              logoWrapperRef.current.style.transform = `translate(-50%, -50%) scale(${currentScale})`

              if (orbitRingsRef.current) {
                orbitRingsRef.current.style.display = 'flex'
                orbitRingsRef.current.style.opacity = Math.max(0, 1 - p * 1.5)
                orbitRingsRef.current.style.transform = `scale(${1 - p * 0.35})`
              }

              if (leftWingRef.current && rightWingRef.current) {
                const wingOpacity = Math.max(0, (p - 0.2) / 0.8)
                leftWingRef.current.style.opacity = wingOpacity
                leftWingRef.current.style.pointerEvents = p > 0.4 ? 'all' : 'none'
                rightWingRef.current.style.opacity = wingOpacity
                rightWingRef.current.style.pointerEvents = p > 0.4 ? 'all' : 'none'
              }
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // Mobile Menu Animation
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(menuRef.current, { opacity: 1, pointerEvents: 'all', duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(
        '.menu-link',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.45, ease: 'power3.out', delay: 0.05 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(menuRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.25, ease: 'power2.in' })
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setMenuOpen(false)
  }, [location.pathname])

  const go = (path) => {
    setMenuOpen(false)
    navigate(path)
  }

  const isActive = (path) => location.pathname === path

  const isInitiallyHero = isHome && !hasDocked

  return (
    <>
      <header
        ref={navRef}
        className="nav-pad"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0.75rem 3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
          background: isHome ? 'transparent' : 'var(--nav-bg)',
          borderBottom: isHome ? '1px solid transparent' : '1px solid var(--gold-hair)',
          minHeight: '84px',
        }}
      >
        {/* ── LEFT WING: Home & About Links ── */}
        <nav
          ref={leftWingRef}
          className="nav-desktop-links"
          aria-label="Left Navigation"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '2.5rem',
            zIndex: 1002,
            opacity: isInitiallyHero ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {leftLinks.map((link) => {
            const active = isActive(link.path)
            return (
              <button
                key={link.path}
                onClick={() => go(link.path)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: active ? 'var(--gold)' : 'var(--text-bright)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.76rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'color 0.25s ease, transform 0.25s ease',
                  position: 'relative',
                  padding: '0.4rem 0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--gold-light)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = active ? 'var(--gold)' : 'var(--text-bright)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {link.label}
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '1.5px',
                      background: 'var(--gold)',
                      boxShadow: '0 0 6px var(--gold-glow)',
                    }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* ── CENTER: PROMINENT ENLARGED LOGO BADGE + ONE-WAY HERO-TO-NAV DOCK ── */}
        <div
          ref={logoWrapperRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: isInitiallyHero ? '48vh' : '50%',
            transform: isInitiallyHero ? 'translate(-50%, -50%) scale(1.75)' : 'translate(-50%, -50%) scale(1)',
            transformOrigin: 'center center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1005,
            willChange: 'transform, top',
            cursor: 'pointer',
            padding: 0,
          }}
          onClick={() => go('/')}
          title="Ekora Studio — Home"
        >
          {/* Animated Hero Circle Orbits & Aura (Active only initially in hero) */}
          <div
            ref={orbitRingsRef}
            style={{
              position: 'absolute',
              inset: '-32px',
              display: isInitiallyHero ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              transition: 'opacity 0.3s ease',
            }}
          >
            {/* Outer Glowing Pulsing Aura */}
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid var(--gold-line)',
                animation: 'heroCirclePulse 3.5s ease-in-out infinite',
              }}
            />

            {/* Rotating Architectural Dashed Orbital Ring */}
            <div
              style={{
                position: 'absolute',
                width: '124%',
                height: '124%',
                borderRadius: '50%',
                border: '1px dashed var(--gold-mid)',
                animation: 'heroOrbitRotate 24s linear infinite',
              }}
            />

            {/* Inner Cardinal Orbit Ring */}
            <div
              style={{
                position: 'absolute',
                width: '144%',
                height: '144%',
                borderRadius: '50%',
                border: '1px solid var(--gold-hair)',
                animation: 'heroOrbitRotateRev 36s linear infinite',
              }}
            />
          </div>

          {/* Large, Crisp Circular Monogram Badge */}
          <div
            className="navbar-logo-badge"
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1.8px solid var(--gold)',
              background: '#2B050B',
              boxShadow: '0 8px 26px rgba(0, 0, 0, 0.65), 0 0 18px var(--gold-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5px',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)'
              e.currentTarget.style.borderColor = 'var(--gold-light)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.85), 0 0 26px var(--gold)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.borderColor = 'var(--gold)'
              e.currentTarget.style.boxShadow = '0 8px 26px rgba(0, 0, 0, 0.65), 0 0 18px var(--gold-glow)'
            }}
          >
            <img
              src="/logo.jpeg"
              alt="Ekora"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                display: 'block',
              }}
            />
          </div>
        </div>

        {/* ── RIGHT WING: Services, Projects, Contact Us + Search + Theme + Hamburger ── */}
        <div
          ref={rightWingRef}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '2.5rem',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            zIndex: 1002,
          }}
        >
          {/* Desktop Right Navigation Links */}
          <nav
            className="nav-desktop-links"
            aria-label="Right Navigation"
            style={{
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            {rightLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <button
                  key={link.path}
                  onClick={() => go(link.path)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: active ? 'var(--gold)' : 'var(--text-bright)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.74rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: active ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'color 0.25s ease, transform 0.25s ease',
                    position: 'relative',
                    padding: '0.4rem 0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--gold-light)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = active ? 'var(--gold)' : 'var(--text-bright)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '20px',
                        height: '1.5px',
                        background: 'var(--gold)',
                        boxShadow: '0 0 6px var(--gold-glow)',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Mobile Hamburger Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--gold-mid)',
                borderRadius: '2px',
                cursor: 'pointer',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                width: '42px',
                height: '42px',
                padding: '8px',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '20px',
                  height: '1.5px',
                  background: menuOpen ? 'var(--gold)' : 'var(--text)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '14px',
                  height: '1.5px',
                  background: menuOpen ? 'transparent' : 'var(--text)',
                  transition: 'all 0.25s ease',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: '20px',
                  height: '1.5px',
                  background: menuOpen ? 'var(--gold)' : 'var(--text)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Architectural Mobile Menu */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#FFFFFF',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          pointerEvents: 'none',
          padding: '5rem 2rem 3rem',
          overflowY: 'auto',
        }}
      >
        {/* Mobile Menu Top Emblem */}
        <div
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1.5px solid var(--gold)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px var(--gold-glow)',
            marginBottom: '1.5rem',
            background: '#2B050B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
          }}
        >
          <img src="/logo.jpeg" alt="Ekora" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        </div>

        <div style={{ width: '32px', height: '1px', background: 'var(--gold)', marginBottom: '2.5rem' }} />

        {/* Mobile Navigation Links */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
            width: '100%',
            maxWidth: '360px',
          }}
        >
          {mobileLinks.map((link) => {
            const active = isActive(link.path)
            return (
              <button
                key={link.path}
                className="menu-link"
                onClick={() => go(link.path)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                  color: active ? 'var(--gold)' : 'var(--text)',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'color 0.25s, transform 0.25s',
                  lineHeight: 1.25,
                  fontWeight: active ? 500 : 300,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = active ? 'var(--gold)' : 'var(--text)')}
              >
                {active && <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>✦</span>}
                {link.label}
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: '2.5rem', width: 'min(100%, 280px)', textAlign: 'center' }}>
          <button
            className="btn-gold menu-link"
            onClick={() => go('/contact')}
            style={{ width: '100%', padding: '0.9rem 2rem' }}
          >
            Contact Studio & Visit
          </button>

          <p
            className="menu-link"
            style={{
              fontFamily: 'Inter',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              color: 'var(--text-faint)',
              textTransform: 'uppercase',
              marginTop: '2rem',
            }}
          >
            New Delhi · Lucknow · Spatial Atelier
          </p>
        </div>
      </div>
    </>
  )
}

