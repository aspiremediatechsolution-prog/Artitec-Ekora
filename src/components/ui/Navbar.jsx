import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Book a Tour', path: '/book-a-tour' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > 40) {
        navRef.current.style.background = 'var(--nav-bg)'
        navRef.current.style.backdropFilter = 'blur(20px)'
        navRef.current.style.borderBottom = '1px solid var(--gold-faint)'
      } else {
        navRef.current.style.background = 'var(--nav-grad)'
        navRef.current.style.backdropFilter = 'none'
        navRef.current.style.borderBottom = '1px solid transparent'
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(menuRef.current, { opacity: 1, pointerEvents: 'all', duration: 0.35, ease: 'power2.out' })
      gsap.fromTo('.menu-link', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out', delay: 0.05 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(menuRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.25, ease: 'power2.in' })
    }
    return () => { document.body.style.overflow = '' }
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
      <nav
        ref={navRef}
        className="nav-pad"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '1.2rem 3rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.4s ease, border-color 0.4s ease',
          background: 'var(--nav-grad)',
          borderBottom: '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => go('/')}
          aria-label="Ekora Home"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 1001 }}
        >
          <img src="/logo.jpeg" alt="Logo" style={{ width: '34px', height: '34px', objectFit: 'contain', borderRadius: '3px' }} />
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 500 }}>
            Ekora
          </span>
        </button>

        {/* Desktop Links */}
        <div className="nav-desktop-links" style={{ gap: '2rem', alignItems: 'center' }}>
          {links.map(link => {
            const active = isActive(link.path)
            return (
              <button
                key={link.path}
                onClick={() => go(link.path)}
                style={{
                  background: 'none', border: 'none',
                  color: active ? 'var(--gold)' : 'var(--text)',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontWeight: active ? 500 : 400,
                  cursor: 'pointer', transition: 'color 0.3s',
                  position: 'relative', padding: '0.4rem 0.2rem',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = active ? 'var(--gold)' : 'var(--text)'}
              >
                {link.label}
                {active && (
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                    background: 'var(--gold)',
                  }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Right CTA / Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 1001 }}>
          <button
            className="nav-desktop-links btn-gold"
            onClick={() => go('/book-a-tour')}
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.62rem' }}
          >
            Book Now
          </button>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: 'rgba(40,3,6,0.6)',
              border: '1px solid var(--gold-faint)',
              borderRadius: '4px',
              cursor: 'pointer',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '40px',
              height: '40px',
              padding: '8px',
            }}
          >
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: menuOpen ? 'var(--gold)' : 'var(--text)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
            <span style={{ display: 'block', width: '16px', height: '1.5px', background: menuOpen ? 'transparent' : 'var(--text)', transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: '22px', height: '1.5px', background: menuOpen ? 'var(--gold)' : 'var(--text)', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu with scroll support */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed', inset: 0, background: 'var(--bg-deep)', zIndex: 999,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: 0, pointerEvents: 'none',
          padding: '6rem 1.5rem 3rem',
          overflowY: 'auto',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div style={{ width: '40px', height: '1px', background: 'var(--gold)', marginBottom: '2rem' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', width: '100%', maxWidth: '400px' }}>
          {links.map((link) => {
            const active = isActive(link.path)
            return (
              <button
                key={link.path}
                className="menu-link"
                onClick={() => go(link.path)}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.8rem, 7vw, 3rem)',
                  color: active ? 'var(--gold)' : 'var(--text)',
                  cursor: 'pointer', letterSpacing: '0.05em',
                  transition: 'color 0.3s, transform 0.3s',
                  lineHeight: 1.3,
                  fontWeight: active ? 400 : 300,
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = active ? 'var(--gold)' : 'var(--text)'}
              >
                {active && <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>✦</span>}
                {link.label}
              </button>
            )
          })}
        </div>

        <button
          className="btn-gold menu-link"
          onClick={() => go('/book-a-tour')}
          style={{ marginTop: '2.5rem', padding: '0.85rem 2.2rem', width: 'min(100%, 280px)' }}
        >
          Book a Tour
        </button>
      </div>
    </>
  )
}

