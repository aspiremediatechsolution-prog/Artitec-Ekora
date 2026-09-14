import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  FiInstagram, 
  FiLinkedin, 
  FiMapPin, 
  FiArrowUp, 
  FiMessageCircle, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiShield, 
  FiArrowRight, 
  FiExternalLink,
  FiCompass,
  FiLayers,
  FiFileText
} from 'react-icons/fi'
import { useNavigate, Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const watermarkLetters = ['E', 'K', 'O', 'R', 'A']

export default function Footer({ hidePreFooter = false }) {
  const navigate = useNavigate()
  const footerRef = useRef(null)
  const watermarkRef = useRef(null)

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = watermarkRef.current?.querySelectorAll('.footer-watermark-char')
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            y: 90,
            opacity: 0,
            scale: 0.85,
          },
          {
            y: 0,
            opacity: 0.038,
            scale: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const pagesList = [
    { label: 'Home — Studio Overview', path: '/', badge: 'Studio' },
    { label: 'About Practice & Leadership', path: '/about', badge: 'Practice' },
    { label: 'Architectural Services & Scope', path: '/services', badge: 'Services' },
    { label: 'Selected Works & Portfolios', path: '/projects', badge: 'Works' },
    { label: '360° VR Spatial Walkthroughs', path: '/projects', badge: 'VR 360°' },
    { label: 'Schedule Studio & Site Tour', path: '/book-a-tour', badge: 'Visit' },
  ]

  const disciplinesList = [
    { name: 'Luxury Villa Architecture', path: '/projects' },
    { name: 'Bespoke Interior Design', path: '/services' },
    { name: 'Commercial & Corporate HQs', path: '/projects' },
    { name: 'Healthcare & Wellness Centers', path: '/projects' },
    { name: 'Computational & Solar Envelopes', path: '/about' },
    { name: 'Turnkey Site Supervision & Ops', path: '/about' },
  ]

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--bg-deep)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        borderTop: '1px solid var(--gold-hair)',
      }}
    >
      {/* Watermark Background Typography — Staggered Letter Entrance */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '-2vw',
          textAlign: 'center',
          lineHeight: 0.8,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          overflow: 'hidden',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: 'clamp(0.2rem, 0.6vw, 0.8rem)',
        }}
      >
        {watermarkLetters.map((char, index) => (
          <span
            key={index}
            className="footer-watermark-char"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(5rem, 20vw, 19rem)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--gold)',
              opacity: 0,
              display: 'inline-block',
              willChange: 'transform, opacity',
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* ── Pre-Footer Invitation Band ── */}
        {!hidePreFooter && (
          <div
            style={{
              padding: 'clamp(3.5rem, 6vw, 5.5rem) 5% clamp(2.5rem, 4.5vw, 4rem)',
              borderBottom: '1px solid var(--gold-hair)',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '28px', height: '1px', background: 'var(--gold)' }} />
                <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                  Initiate a Commission
                </span>
                <div style={{ width: '28px', height: '1px', background: 'var(--gold)' }} />
              </div>

              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(2.1rem, 4vw, 3.8rem)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: 'var(--heading)',
                  marginBottom: '1rem',
                  textWrap: 'balance',
                }}
              >
                Let's create something <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>enduring</span> together.
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.82rem, 1.1vw, 0.94rem)',
                  lineHeight: 1.85,
                  color: 'var(--text-soft)',
                  maxWidth: '620px',
                  margin: '0 auto 2.25rem',
                  textWrap: 'pretty',
                }}
              >
                Private residences, luxury interiors, and turnkey execution — calibrated to context, sunlight, and artisanal craft.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-gold"
                  onClick={() => navigate('/book-a-tour')}
                  style={{ padding: '0.85rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span>Schedule Consultation &amp; Visit</span>
                  <FiArrowRight size={14} />
                </button>
                <button
                  className="btn-outline"
                  onClick={() => navigate('/projects')}
                  style={{ padding: '0.85rem 2.2rem' }}
                >
                  Explore Selected Works
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 3-Column Architectural Directory Grid ── */}
        <div style={{ padding: 'clamp(3.5rem, 6vw, 5rem) 5% clamp(2.5rem, 4vw, 3.5rem)' }}>
          <div className="footer-3col-grid">
            
            {/* ══════════════════════════════════════════════════
                SIDE 1: STUDIO DETAILS & CREDENTIALS (DETAILS)
            ══════════════════════════════════════════════════ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                {/* Emblem & Brand Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.1rem' }}>
                  <Link
                    to="/"
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1.5px solid var(--gold)',
                      background: '#2B050B',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), 0 0 12px var(--gold-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2px',
                      flexShrink: 0,
                      textDecoration: 'none',
                    }}
                  >
                    <img
                      src="/logo.jpeg"
                      alt="Ekora Emblem"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        display: 'block',
                      }}
                    />
                  </Link>
                  <div>
                    <Link
                      to="/"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.4rem',
                        fontWeight: 400,
                        letterSpacing: '0.08em',
                        color: 'var(--text-strong)',
                        lineHeight: 1.1,
                        textDecoration: 'none',
                        display: 'block',
                      }}
                    >
                      EKORA ARCHITECTS
                    </Link>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.62rem',
                        letterSpacing: '0.22em',
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                        marginTop: '0.2rem',
                        fontWeight: 600,
                      }}
                    >
                      Spatial Architecture &amp; Turnkey Practice
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    lineHeight: 1.75,
                    color: 'var(--text-soft)',
                    marginBottom: '1.5rem',
                  }}
                >
                  Bespoke luxury architecture, haute-couture interiors, and precision turnkey engineering.
                </p>
              </div>

              {/* Studio Key Details & Live Status Box */}
              <div
                style={{
                  background: 'var(--bg-alt)',
                  border: '1px solid var(--gold-hair)',
                  borderLeft: '3px solid var(--gold)',
                  padding: '1.25rem 1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderRadius: '2px',
                }}
              >
                {/* Working Hours with Live Active Status */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <FiClock size={16} color="var(--gold)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '0.66rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text)', textTransform: 'uppercase' }}>
                        Studio Consultation Hours
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.58rem',
                          color: '#22c55e',
                          fontWeight: 600,
                          background: 'rgba(34, 197, 94, 0.1)',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '10px',
                        }}
                      >
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
                        Active
                      </span>
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.76rem', color: 'var(--text-soft)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                      Monday – Saturday: 10:00 AM – 7:30 PM (IST)<br />
                      Sunday: By Prior Appointment Only
                    </div>
                  </div>
                </div>

                {/* Leadership & Practice Credentials */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', paddingTop: '0.85rem', borderTop: '1px solid var(--gold-hair)' }}>
                  <FiShield size={16} color="var(--gold)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.66rem', fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text)', textTransform: 'uppercase' }}>
                      Leadership &amp; Practice
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.76rem', color: 'var(--text-soft)', marginTop: '0.25rem', lineHeight: 1.55 }}>
                      <Link to="/about" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text)'}>
                        Ar. Ishwer Singh
                      </Link> — Founder &amp; Principal Architect<br />
                      <Link to="/about" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text)'}>
                        Mr. Rajdeep Singh
                      </Link> — Head of Turnkey Operations<br />
                      <span style={{ fontSize: '0.7rem', color: 'var(--gold)' }}>Council of Architecture (CoA) Registered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels & Professional Profiles */}
              <div>
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '0.85rem',
                  }}
                >
                  Connect &amp; Social Studio
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {[
                    { Icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
                    { Icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                    { Icon: FiMessageCircle, href: 'https://wa.me/919999033566?text=Hello%20Ekora%20Architects,%20I%20would%20like%20to%20inquire%20about%20an%20architectural%20project.', label: 'WhatsApp Concierge' },
                  ].map(({ Icon, href, label }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        padding: '0.5rem 0.85rem',
                        border: '1px solid var(--gold-hair)',
                        borderRadius: '20px',
                        background: 'var(--bg-alt)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        color: 'var(--text-soft)',
                        fontSize: '0.72rem',
                        fontFamily: 'Inter',
                        transition: 'all 0.25s ease',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold)'
                        e.currentTarget.style.color = 'var(--gold)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-hair)'
                        e.currentTarget.style.color = 'var(--text-soft)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <Icon size={14} color="var(--gold)" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════
                SIDE 2: PAGES & DISCIPLINES DIRECTORY (PAGES)
            ══════════════════════════════════════════════════ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
              {/* Practice Navigation Pages */}
              <div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem',
                    letterSpacing: '0.22em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <FiCompass size={14} />
                  <span>Navigation Pages</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--gold-hair)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {pagesList.map((p, j) => (
                    <Link
                      key={j}
                      to={p.path}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.82rem',
                        color: 'var(--text-soft)',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.35rem 0',
                        borderBottom: '1px dashed rgba(160, 16, 45, 0.08)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--gold)'
                        e.currentTarget.style.transform = 'translateX(4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-soft)'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiArrowRight size={12} color="var(--gold)" style={{ opacity: 0.7 }} />
                        <span>{p.label}</span>
                      </span>
                      <span
                        style={{
                          fontSize: '0.58rem',
                          padding: '0.1rem 0.45rem',
                          borderRadius: '2px',
                          background: 'var(--chip-bg)',
                          color: 'var(--gold)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {p.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Core Architectural Disciplines */}
              <div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem',
                    letterSpacing: '0.22em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <FiLayers size={14} />
                  <span>Architectural Disciplines</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--gold-hair)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem' }}>
                  {disciplinesList.map((disc, k) => (
                    <Link
                      key={k}
                      to={disc.path}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.78rem',
                        color: 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease, transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--gold)'
                        e.currentTarget.style.transform = 'translateX(2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-dim)'
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}
                    >
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                      <span>{disc.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════
                SIDE 3: STUDIO CONTACT & LOCATIONS (CONTACT)
            ══════════════════════════════════════════════════ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem',
                    letterSpacing: '0.22em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <FiMapPin size={14} />
                  <span>Studio Locations &amp; Maps</span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--gold-hair)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {/* New Delhi Head Office with Maps Link */}
                  <div
                    style={{
                      background: 'var(--bg-alt)',
                      border: '1px solid var(--gold-hair)',
                      padding: '1.15rem 1.25rem',
                      borderRadius: '2px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiMapPin size={14} color="var(--gold)" />
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            color: 'var(--text)',
                            textTransform: 'uppercase',
                          }}
                        >
                          Head Office — New Delhi
                        </span>
                      </div>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Statesman+House+Barakhamba+Road+Connaught+Place+New+Delhi+110001"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '0.62rem',
                          color: 'var(--gold)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: 500,
                        }}
                      >
                        <span>Maps</span>
                        <FiExternalLink size={10} />
                      </a>
                    </div>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.78rem',
                        lineHeight: 1.65,
                        color: 'var(--text-soft)',
                        margin: 0,
                        paddingLeft: '1.25rem',
                      }}
                    >
                      A-1504, 15th Floor, Statesman House,<br />
                      Barakhamba Road, Connaught Place,<br />
                      New Delhi 110001
                    </p>
                  </div>

                  {/* Lucknow Regional Studio with Maps Link */}
                  <div
                    style={{
                      background: 'var(--bg-alt)',
                      border: '1px solid var(--gold-hair)',
                      padding: '1.15rem 1.25rem',
                      borderRadius: '2px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiMapPin size={14} color="var(--gold)" />
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            color: 'var(--text)',
                            textTransform: 'uppercase',
                          }}
                        >
                          Regional Studio — Lucknow
                        </span>
                      </div>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Felix+Square+Sushant+Golf+City+Lulu+Mall+Lucknow+226030"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '0.62rem',
                          color: 'var(--gold)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontWeight: 500,
                        }}
                      >
                        <span>Maps</span>
                        <FiExternalLink size={10} />
                      </a>
                    </div>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.78rem',
                        lineHeight: 1.65,
                        color: 'var(--text-soft)',
                        margin: 0,
                        paddingLeft: '1.25rem',
                      }}
                    >
                      2nd Floor, 203 A, Felix Square,<br />
                      Sushant Golf City, Ansal API,<br />
                      Near Lulu Mall, Lucknow 226030
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Inquiries & Communications */}
              <div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem',
                    letterSpacing: '0.22em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  Direct Inquiries &amp; Lines
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {/* Phone Call Link */}
                  <a
                    href="tel:+919999033566"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.82rem',
                      color: 'var(--text)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
                  >
                    <FiPhone size={14} color="var(--gold)" />
                    <span>+91 99990 33566</span>
                  </a>

                  {/* Email Mailto Link */}
                  <a
                    href="mailto:info@ekoraarchitects.com?subject=Architectural%20Project%20Inquiry%20%E2%80%94%20Ekora%20Architects"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.82rem',
                      color: 'var(--text)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
                  >
                    <FiMail size={14} color="var(--gold)" />
                    <span>info@ekoraarchitects.com</span>
                  </a>
                </div>

                {/* Direct WhatsApp Concierge CTA */}
                <div style={{ marginTop: '1.15rem' }}>
                  <a
                    href="https://wa.me/919999033566?text=Hello%20Ekora%20Architects%20Team,%20I%20would%20like%20to%20consult%20regarding%20an%20architectural%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.75rem 1.2rem',
                      fontSize: '0.7rem',
                      display: 'inline-flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    <FiMessageCircle size={14} color="var(--gold)" />
                    <span>WhatsApp Concierge (+91 99990 33566)</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ── Colophon Sub-Footer Bar ── */}
        <div
          style={{
            padding: '1.5rem 5%',
            borderTop: '1px solid var(--gold-hair)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--text-faint)', letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} Ekora Architects. All rights reserved. Registered Architectural Practice.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: 'var(--text-faint)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              New Delhi · Lucknow
            </span>

            <button
              onClick={scrollTop}
              aria-label="Back to top"
              style={{
                width: '38px',
                height: '38px',
                border: '1px solid var(--gold-hair)',
                borderRadius: '50%',
                background: 'var(--bg-alt)',
                color: 'var(--text-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold)'
                e.currentTarget.style.color = 'var(--gold)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-hair)'
                e.currentTarget.style.color = 'var(--text-soft)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <FiArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
