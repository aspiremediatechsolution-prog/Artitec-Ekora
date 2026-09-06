import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

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
  const timelineRef = useRef(null)

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
      if (logoWrapperRef.current) {
        gsap.set(logoWrapperRef.current, {
          top: '50%',
          scale: 1,
          opacity: 1,
          xPercent: -50,
          yPercent: -50,
          left: '50%',
        })
      }
      if (orbitRingsRef.current) {
        gsap.set(orbitRingsRef.current, { display: 'none', opacity: 0 })
      }
      if (leftWingRef.current) gsap.set(leftWingRef.current, { opacity: 1, pointerEvents: 'all' })
      if (rightWingRef.current) gsap.set(rightWingRef.current, { opacity: 1, pointerEvents: 'all' })
    }
  }, [isHome, location.pathname])

  // Cinematic Hero Pop-up & Smooth Ascent into Navbar Center
  useEffect(() => {
    if (!isHome) return

    // If already docked, maintain docked state in navbar center
    if (hasDockedRef.current) {
      if (logoWrapperRef.current) {
        gsap.set(logoWrapperRef.current, {
          top: '50%',
          scale: 1,
          opacity: 1,
          xPercent: -50,
          yPercent: -50,
          left: '50%',
        })
      }
      if (orbitRingsRef.current) {
        gsap.set(orbitRingsRef.current, { display: 'none', opacity: 0 })
      }
      if (leftWingRef.current) gsap.set(leftWingRef.current, { opacity: 1, pointerEvents: 'all' })
      if (rightWingRef.current) gsap.set(rightWingRef.current, { opacity: 1, pointerEvents: 'all' })
      return
    }

    const logoEl = logoWrapperRef.current
    const orbitEl = orbitRingsRef.current
    const leftWing = leftWingRef.current
    const rightWing = rightWingRef.current

    if (!logoEl) return

    // Initial state: centered in Hero section, scaled down & transparent
    gsap.set(logoEl, {
      top: '48vh',
      scale: 0.15,
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
      left: '50%',
    })
    if (orbitEl) {
      gsap.set(orbitEl, { display: 'flex', opacity: 0, scale: 0.4 })
    }
    if (leftWing) gsap.set(leftWing, { opacity: 0, pointerEvents: 'none' })
    if (rightWing) gsap.set(rightWing, { opacity: 0, pointerEvents: 'none' })

    const tl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        hasDockedRef.current = true
        setHasDocked(true)
        if (orbitEl) orbitEl.style.display = 'none'
        if (leftWing) leftWing.style.pointerEvents = 'all'
        if (rightWing) rightWing.style.pointerEvents = 'all'
      },
    })
    timelineRef.current = tl

    // 1. POPUP in Hero: Scales up to large crest with spring and expanding orbit rings
    tl.to(logoEl, {
      opacity: 1,
      scale: 1.85,
      duration: 1.05,
      ease: 'back.out(1.5)',
    })
    if (orbitEl) {
      tl.to(
        orbitEl,
        {
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: 'power2.out',
        },
        '<'
      )
    }

    // 2. Pause in Hero section center so the user can admire the emblem
    tl.to({}, { duration: 0.85 })

    // 3. Smooth slow glide up to the navbar center ("dhira sa upar jya aur center mai lag jya")
    tl.to(logoEl, {
      top: '50%',
      scale: 1,
      duration: 1.45,
      ease: 'power3.inOut',
    })

    // Orbit rings softly fade out as it glides up
    if (orbitEl) {
      tl.to(
        orbitEl,
        {
          opacity: 0,
          scale: 0.6,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<0.1'
      )
    }

    // Nav Links (Left & Right Wings) smoothly fade in as logo reaches navbar center
    if (leftWing && rightWing) {
      tl.to(
        [leftWing, rightWing],
        {
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
        },
        '-=0.55'
      )
    }

    return () => {
      tl.kill()
    }
  }, [isHome])

  // Scroll listener for navbar styling on scroll
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0
          setIsScrolled(scrollY > 20)

          // Navbar background styling — Completely Transparent with Zero Blur
          if (navRef.current) {
            navRef.current.style.background = 'transparent'
            navRef.current.style.backdropFilter = 'none'
            navRef.current.style.webkitBackdropFilter = 'none'
            navRef.current.style.boxShadow = 'none'
            navRef.current.style.borderBottom = '1px solid transparent'
          }

          // If user scrolls down before auto-dock finishes, complete the dock immediately
          if (scrollY > 50 && !hasDockedRef.current && timelineRef.current) {
            timelineRef.current.progress(1)
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
          background: 'transparent',
          borderBottom: '1px solid transparent',
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
            opacity: hasDocked || !isHome ? 1 : 0,
            pointerEvents: hasDocked || !isHome ? 'all' : 'none',
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
            top: hasDocked || !isHome ? '50%' : '48vh',
            transform: hasDocked || !isHome ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.15)',
            transformOrigin: 'center center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1005,
            willChange: 'transform, top, opacity',
            cursor: 'pointer',
            padding: 0,
            opacity: hasDocked || !isHome ? 1 : 0,
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
              display: hasDocked || !isHome ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              transition: 'opacity 0.3s ease',
              opacity: 0,
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
            opacity: hasDocked || !isHome ? 1 : 0,
            pointerEvents: hasDocked || !isHome ? 'all' : 'none',
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
            <div style={{ marginLeft: '0.75rem', display: 'flex', alignItems: 'center' }}>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Right Controls: Theme Toggle + Hamburger Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="nav-hamburger">
              <ThemeToggle />
            </div>
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
          background: 'var(--bg)',
          backdropFilter: 'blur(20px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          pointerEvents: 'none',
          padding: '5rem 2rem 3rem',
          overflowY: 'auto',
          transition: 'background 0.4s ease',
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

        {/* Mobile Drawer Theme Switcher Pill */}
        <div className="menu-link" style={{ marginTop: '2rem' }}>
          <ThemeToggle variant="pill" showLabel />
        </div>

        <div style={{ marginTop: '2rem', width: 'min(100%, 280px)', textAlign: 'center' }}>
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

