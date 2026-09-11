import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const leftLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
]

const rightLinks = [
  { label: 'Projects', path: '/projects' },
  { label: 'Contact Us', path: '/contact' },
]

const mobileLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Book a Tour', path: '/book-a-tour' },
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
  const [isPastHero, setIsPastHero] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [hasDocked, setHasDocked] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const lastScrollRef = useRef(0)

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

  // Original Hero Center Emblem Pop-up & Smooth Ascent into Navbar Center
  useEffect(() => {
    if (!isHome) return

    // If already docked, maintain docked position in navbar center
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
      delay: 0.2,
      onComplete: () => {
        hasDockedRef.current = true
        setHasDocked(true)
        if (orbitEl) orbitEl.style.display = 'none'
        if (leftWing) leftWing.style.pointerEvents = 'all'
        if (rightWing) rightWing.style.pointerEvents = 'all'
      },
    })
    timelineRef.current = tl

    // 1. POPUP in Hero: Scales up to prominent crest with spring and expanding halo rings
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

    // 2. Pause in Hero section center so user can admire the emblem
    tl.to({}, { duration: 0.8 })

    // 3. Smooth slow glide up to the navbar center
    tl.to(logoEl, {
      top: '50%',
      scale: 1,
      duration: 1.4,
      ease: 'power3.inOut',
    })

    // Orbit rings softly fade out as logo glides up
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

  // Scroll listener for auto-hiding and backdrop blur
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0
          const lastScroll = lastScrollRef.current
          const threshold = window.innerHeight * 0.12

          // Frosted glass blur past hero
          setIsPastHero(scrollY >= threshold)

          // If user scrolls down before auto-dock finishes, complete the dock immediately
          if (scrollY > 50 && !hasDockedRef.current && timelineRef.current) {
            timelineRef.current.progress(1)
          }

          // Direction-Aware Auto-Hiding
          if (scrollY > 120 && scrollY > lastScroll + 4) {
            setIsHidden(true)
          } else if (scrollY < lastScroll - 4 || scrollY <= 60) {
            setIsHidden(false)
          }

          lastScrollRef.current = scrollY
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
        '.mobile-nav-link',
        { y: 30, opacity: 0 },
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
    setMenuOpen(false)
  }, [location.pathname])

  const go = (path) => {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <>
      <header
        ref={navRef}
        className={`main-header ${isPastHero ? 'bg' : ''} ${isHidden ? 'hidden-nav' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9000,
          height: 'clamp(64px, 8vh, 84px)',
          transition:
            'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          transform: isHidden ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
        }}
      >
        <div
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            height: '100%',
            padding: '0 clamp(1rem, 3.5vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Left Wing Navigation Links (Desktop) */}
          <div
            ref={leftWingRef}
            className="nav-wing left-wing"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1rem, 1.8vw, 2.2rem)',
              marginRight: 'clamp(2.5rem, 5vw, 5rem)',
            }}
          >
            {leftLinks.map((item) => {
              const active = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => go(item.path)}
                  data-hoversize="8"
                  className={`nav-link ${active ? 'active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.78rem)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--gold)' : 'var(--text-bright)',
                    transition: 'color 0.25s ease',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '100%',
                        height: '1px',
                        background: 'var(--gold)',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Center Brand Emblem with Hero Pop-Up & Docking Sequence */}
          <div
            ref={logoWrapperRef}
            className="nav-center-logo-wrapper"
            onClick={() => go('/')}
            data-hoversize="9"
            style={{
              position: 'absolute',
              top: hasDocked ? '50%' : '48vh',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9005,
              userSelect: 'none',
              transformOrigin: 'center center',
            }}
          >
            {/* Concentric Radiant Halo Orbit Rings (Shown in Hero center) */}
            <div
              ref={orbitRingsRef}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(120px, 20vw, 180px)',
                height: 'clamp(120px, 20vw, 180px)',
                borderRadius: '50%',
                border: '1px solid var(--gold-mid)',
                boxShadow: '0 0 35px var(--gold-glow, rgba(160, 16, 45, 0.35))',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 'clamp(90px, 15vw, 140px)',
                  height: 'clamp(90px, 15vw, 140px)',
                  borderRadius: '50%',
                  border: '1px solid var(--gold-line)',
                }}
              />
            </div>

            {/* Circular Luxury Brand Badge Emblem (Responsive sizing) */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="nav-logo-badge"
                style={{
                  width: 'clamp(46px, 5vw, 64px)',
                  height: 'clamp(46px, 5vw, 64px)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--gold)',
                  background: '#2B050B',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 16px var(--gold-glow, rgba(160, 16, 45, 0.35))',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.06)'
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.5), 0 0 24px var(--gold-glow, rgba(160, 16, 45, 0.5))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4), 0 0 16px var(--gold-glow, rgba(160, 16, 45, 0.35))'
                }}
              >
                <img
                  src="/logo.jpeg"
                  alt="Ekora Logo"
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
          </div>

          {/* Right Wing Navigation Links + Actions (Desktop) */}
          <div
            ref={rightWingRef}
            className="nav-wing right-wing"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.85rem, 1.6vw, 2rem)',
              marginLeft: 'clamp(2.5rem, 5vw, 5rem)',
            }}
          >
            {rightLinks.map((item) => {
              const active = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => go(item.path)}
                  data-hoversize="8"
                  className={`nav-link ${active ? 'active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.78rem)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--gold)' : 'var(--text-bright)',
                    transition: 'color 0.25s ease',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        width: '100%',
                        height: '1px',
                        background: 'var(--gold)',
                      }}
                    />
                  )}
                </button>
              )
            })}

            {/* Theme Toggle & Let's Talk CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginLeft: '0.25rem' }}>
              <ThemeToggle />
              <button
                onClick={() => go('/contact')}
                data-hoversize="8"
                className="lets-talk-btn"
                style={{
                  padding: '0.5rem 1.15rem',
                  borderRadius: '30px',
                  background: 'var(--gold)',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--gold)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                }}
              >
                Let's Talk
                <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>+</span>
              </button>
            </div>
          </div>

          {/* Mobile Actions Container (Right side on Mobile/Tablet) */}
          <div
            className="mobile-nav-actions"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.75rem',
              marginLeft: 'auto',
              zIndex: 9010,
            }}
          >
            <ThemeToggle />
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--gold-hair)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: 0,
                transition: 'all 0.25s ease',
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '1.5px',
                  background: 'var(--text-bright)',
                  transition: 'transform 0.3s ease',
                  transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
                }}
              />
              <span
                style={{
                  width: '20px',
                  height: '1.5px',
                  background: 'var(--text-bright)',
                  opacity: menuOpen ? 0 : 1,
                  transition: 'opacity 0.2s ease',
                }}
              />
              <span
                style={{
                  width: '20px',
                  height: '1.5px',
                  background: 'var(--text-bright)',
                  transition: 'transform 0.3s ease',
                  transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <div
        ref={menuRef}
        className="mobile-drawer"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--bg-deep)',
          zIndex: 8999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          pointerEvents: 'none',
          padding: '2rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem', textAlign: 'center' }}>
          {mobileLinks.map((item) => (
            <button
              key={item.path}
              onClick={() => go(item.path)}
              className="mobile-nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.6rem, 5.5vw, 2.4rem)',
                color: location.pathname === item.path ? 'var(--gold)' : 'var(--text-bright)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => go('/contact')}
              className="btn-gold"
              style={{ padding: '0.65rem 1.6rem', fontSize: '0.75rem' }}
            >
              Contact Studio
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
