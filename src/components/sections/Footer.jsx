import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FiInstagram, 
  FiLinkedin, 
  FiMessageCircle, 
  FiArrowRight, 
  FiCheck 
} from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const footerRef = useRef(null)
  const lettersRef = useRef(null)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const letters = ['E', 'K', 'O', 'R', 'A']

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lettersRef.current) {
        const letterEls = lettersRef.current.querySelectorAll('.ekora-footer-letter')
        gsap.fromTo(
          letterEls,
          {
            y: 50,
            opacity: 0,
            scale: 0.8,
            rotateX: 30,
          },
          {
            y: 0,
            opacity: 0.92,
            scale: 1,
            rotateX: 0,
            duration: 1.1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lettersRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="aparna-footer"
      style={{
        background: 'var(--bg-deep, #090305)',
        color: 'var(--text-soft, rgba(255, 255, 255, 0.75))',
        position: 'relative',
        width: '100%',
        borderTop: '1px solid var(--gold-hair, rgba(160, 16, 45, 0.2))',
        padding: 'clamp(3rem, 5.5vw, 4.5rem) clamp(1.5rem, 4.5vw, 4rem) 2.25rem',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* ── TOP ROW: Newsletter + Menu Directories ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            paddingBottom: 'clamp(2.5rem, 4.5vw, 3.5rem)',
            borderBottom: '1px solid var(--gold-hair, rgba(160, 16, 45, 0.2))',
          }}
        >
          {/* Newsletter Column */}
          <div style={{ maxWidth: '380px' }}>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.4rem',
                fontWeight: 300,
                color: 'var(--heading, #FFFFFF)',
                marginBottom: '0.85rem',
                letterSpacing: '0.04em',
              }}
            >
              Subscribe to our list
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                lineHeight: 1.65,
                color: 'var(--text-dim, rgba(255, 255, 255, 0.6))',
                marginBottom: '1.25rem',
              }}
            >
              Receive private monographs, spatial design essays, and studio dispatches.
            </p>

            <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--gold-mid, rgba(160, 16, 45, 0.45))',
                  paddingBottom: '0.5rem',
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email address"
                  required
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text, #FFFFFF)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    padding: '0.2rem 0',
                  }}
                />
                <button
                  type="submit"
                  aria-label="Submit Email"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--gold, #C8193D)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 0.5rem',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                >
                  <FiArrowRight size={18} />
                </button>
              </div>
              {subscribed && (
                <div
                  style={{
                    marginTop: '0.6rem',
                    fontSize: '0.72rem',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <FiCheck size={12} /> Thank you for subscribing.
                </div>
              )}
            </form>
          </div>

          {/* Navigation Directory (Company & Explore) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Company Column */}
            <div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold, #C8193D)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                }}
              >
                Company
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Brand Story', path: '/about' },
                  { label: 'About Us', path: '/about' },
                  { label: 'Services', path: '/services' },
                  { label: 'Contact Us', path: '/contact' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.82rem',
                        color: 'var(--text-soft, rgba(255, 255, 255, 0.72))',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease, transform 0.2s ease',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--gold, #C8193D)'
                        e.currentTarget.style.transform = 'translateX(3px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-soft, rgba(255, 255, 255, 0.72))'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore Column */}
            <div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold, #C8193D)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                }}
              >
                Explore
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Private Residences', path: '/projects' },
                  { label: '360° Virtual Tours', path: '/projects' },
                  { label: 'Bespoke Interiors', path: '/services' },
                  { label: 'Turnkey Delivery', path: '/services' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.82rem',
                        color: 'var(--text-soft, rgba(255, 255, 255, 0.72))',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease, transform 0.2s ease',
                        display: 'inline-block',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--gold, #C8193D)'
                        e.currentTarget.style.transform = 'translateX(3px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-soft, rgba(255, 255, 255, 0.72))'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── MIDDLE ROW: Studio Headquarters + Inquiries + Socials ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(2rem, 3.5vw, 3.5rem)',
            padding: 'clamp(2.5rem, 4vw, 3.5rem) 0',
            borderBottom: '1px solid var(--gold-hair, rgba(160, 16, 45, 0.2))',
          }}
        >
          {/* New Delhi Headquarters */}
          <div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'var(--gold, #C8193D)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.85rem',
              }}
            >
              New Delhi Studio (HQ)
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                lineHeight: 1.65,
                color: 'var(--text-soft, rgba(255, 255, 255, 0.75))',
                marginBottom: '0.85rem',
              }}
            >
              Statesman House, 15th Floor,<br />
              Barakhamba Road, Connaught Place,<br />
              New Delhi 110001, India
            </p>
            <div style={{ fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-dim, rgba(255, 255, 255, 0.5))' }}>Phone: </span>
              <a
                href="tel:+919999033566"
                style={{ color: 'var(--text, #FFFFFF)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text, #FFFFFF)')}
              >
                +91 99990 33566
              </a>
            </div>
          </div>

          {/* Lucknow Regional Office */}
          <div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'var(--gold, #C8193D)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '0.85rem',
              }}
            >
              Lucknow Office
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                lineHeight: 1.65,
                color: 'var(--text-soft, rgba(255, 255, 255, 0.75))',
                marginBottom: '0.85rem',
              }}
            >
              2nd Floor, 203 A, Felix Square,<br />
              Sushant Golf City, Ansal API,<br />
              Nearby Lulu Mall, Lucknow,<br />
              Uttar Pradesh 226030
            </p>
            <div style={{ fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-dim, rgba(255, 255, 255, 0.5))' }}>Direct: </span>
              <a
                href="tel:+919999033566"
                style={{ color: 'var(--text, #FFFFFF)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text, #FFFFFF)')}
              >
                +91 99990 33566
              </a>
            </div>
          </div>

          {/* Email Enquiries List */}
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <li>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: 'var(--gold, #C8193D)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    margin: '0 0 0.2rem 0',
                  }}
                >
                  Client Enquiries
                </p>
                <a
                  href="mailto:info@ekoraarchitects.com"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    color: 'var(--text-soft, rgba(255, 255, 255, 0.75))',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-soft, rgba(255, 255, 255, 0.75))')}
                >
                  info@ekoraarchitects.com
                </a>
              </li>

              <li>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: 'var(--gold, #C8193D)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    margin: '0 0 0.2rem 0',
                  }}
                >
                  Principal Architect
                </p>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    color: 'var(--text-soft, rgba(255, 255, 255, 0.75))',
                  }}
                >
                  Ar. Ishwer Singh
                </span>
              </li>

              <li>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: 'var(--gold, #C8193D)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    margin: '0 0 0.2rem 0',
                  }}
                >
                  Turnkey Operations
                </p>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    color: 'var(--text-soft, rgba(255, 255, 255, 0.75))',
                  }}
                >
                  Mr. Rajdeep Singh
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media Channels */}
          <div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: 'var(--gold, #C8193D)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              Social Studio
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { Icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { Icon: FiMessageCircle, href: 'https://wa.me/919999033566?text=Hello%20Ekora%20Architects,%20I%20would%20like%20to%20inquire%20about%20an%20architectural%20project.', label: 'WhatsApp' },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid var(--gold-hair, rgba(160, 16, 45, 0.3))',
                    background: 'var(--bg-alt, rgba(255, 255, 255, 0.03))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold, #C8193D)',
                    transition: 'all 0.25s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold, #C8193D)'
                    e.currentTarget.style.background = 'var(--gold, #C8193D)'
                    e.currentTarget.style.color = '#FFFFFF'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-hair, rgba(160, 16, 45, 0.3))'
                    e.currentTarget.style.background = 'var(--bg-alt, rgba(255, 255, 255, 0.03))'
                    e.currentTarget.style.color = 'var(--gold, #C8193D)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── APARNA-STYLE MONOGRAM / LOGO DISPLAY ROW WITH LUXURY GSAP + HOVER ANIMATIONS ── */}
        <div
          ref={lettersRef}
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 3rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.4rem, 2.5vw, 3.2rem)',
            userSelect: 'none',
            borderBottom: '1px solid var(--gold-hair, rgba(160, 16, 45, 0.15))',
            perspective: '1000px',
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          {letters.map((char, index) => (
            <span
              key={index}
              className="ekora-footer-letter"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.75rem, 6.2vw, 5.8rem)',
                fontWeight: 300,
                letterSpacing: '0.1em',
                color: 'var(--gold, #C8193D)',
                lineHeight: 1,
                display: 'inline-block',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease, text-shadow 0.4s ease, filter 0.3s ease',
                willChange: 'transform, opacity',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.14)'
                e.currentTarget.style.color = '#FFFFFF'
                e.currentTarget.style.textShadow = '0 0 30px var(--gold, #C8193D), 0 0 60px rgba(160, 16, 45, 0.6)'
                e.currentTarget.style.filter = 'drop-shadow(0 10px 20px rgba(200, 25, 61, 0.5))'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.color = 'var(--gold, #C8193D)'
                e.currentTarget.style.textShadow = 'none'
                e.currentTarget.style.filter = 'none'
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* ── BOTTOM ROW: Copyright & Confidentiality Notice ── */}
        <div style={{ paddingTop: '1.75rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', color: 'var(--text-faint, rgba(255, 255, 255, 0.45))' }}>
              © {new Date().getFullYear()} Ekora Architects. All rights reserved.
            </p>

            <Link
              to="/about"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.74rem',
                color: 'var(--text-faint, rgba(255, 255, 255, 0.45))',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-faint, rgba(255, 255, 255, 0.45))')}
            >
              Privacy Policy
            </Link>
          </div>

          <p
            style={{
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              lineHeight: 1.6,
              color: 'var(--text-faint, rgba(255, 255, 255, 0.35))',
              maxWidth: '850px',
            }}
          >
            Projects displayed are bound by confidentiality agreements. Project names and select architectural details have been curated to protect the privacy and identity of our esteemed clients.
          </p>
        </div>

      </div>
    </footer>
  )
}
