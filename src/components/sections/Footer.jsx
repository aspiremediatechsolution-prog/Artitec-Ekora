import { FiInstagram, FiLinkedin, FiMapPin, FiArrowUp, FiMessageCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  const linkMap = {
    'Home': '/',
    'About': '/about',
    'Services': '/services',
    'Projects': '/projects',
    'Contact Us': '/contact',
    'Book a Tour': '/contact',
    'Luxury Villas': '/projects',
    'Interior Design': '/services',
    'Commercial': '/projects',
    'Landscape Architecture': '/services',
    '3D Virtual Tours': '/projects',
  }

  const go = (link) => {
    const path = linkMap[link]
    if (path) navigate(path)
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const linkStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.82rem',
    color: 'var(--text-soft)',
    textDecoration: 'none',
    transition: 'color 0.25s ease, transform 0.25s ease',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    lineHeight: 1.6,
  }

  return (
    <footer
      style={{
        background: 'var(--bg-deep)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        borderTop: '1px solid var(--gold-hair)',
      }}
    >
      {/* Watermark Background Graphic */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '-3vw',
          textAlign: 'center',
          lineHeight: 0.8,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          overflow: 'hidden',
          maxWidth: '100%',
        }}
      >
        <span
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(5rem, 22vw, 20rem)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: 'var(--gold)',
            opacity: 0.04,
            display: 'inline-block',
          }}
        >
          EKORA
        </span>
      </div>

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Pre-Footer Invitation Band */}
        <div
          style={{
            padding: 'clamp(4rem, 7vw, 6.5rem) 5% clamp(3rem, 5vw, 4.5rem)',
            borderBottom: '1px solid var(--gold-hair)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)', margin: '0 auto 1.5rem' }} />
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
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
                fontSize: 'clamp(0.85rem, 1.1vw, 0.94rem)',
                lineHeight: 1.85,
                color: 'var(--text-soft)',
                maxWidth: '580px',
                margin: '0 auto 2.5rem',
                textWrap: 'pretty',
              }}
            >
              Private residences, considered interiors, and turnkey execution — shaped by conversation, light, and craft.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn-gold"
                onClick={() => go('Contact Us')}
                style={{ padding: '0.9rem 2.2rem' }}
              >
                Contact Studio & Visit
              </button>
              <button
                className="btn-outline"
                onClick={() => go('Projects')}
                style={{ padding: '0.9rem 2.2rem' }}
              >
                Explore Works
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Directory */}
        <div style={{ padding: 'clamp(3.5rem, 6vw, 5rem) 5% clamp(2rem, 4vw, 3rem)' }}>
          <div className="footer-grid">
            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '1.5px solid var(--gold)',
                    background: '#2B050B',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 0 12px var(--gold-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px',
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
                </div>
              </div>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  lineHeight: 1.8,
                  color: 'var(--text-soft)',
                  maxWidth: '300px',
                }}
              >
                An architecture and spatial design practice dedicated to creating environments of profound calm, material honesty, and enduring craft.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem' }}>
                {[
                  { Icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
                  { Icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { Icon: FiMessageCircle, href: 'https://wa.me/919999033566', label: 'WhatsApp Concierge' },
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
                      border: '1px solid var(--gold-hair)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-soft)',
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
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                }}
              >
                Practice
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Home', 'About', 'Services', 'Projects'].map((link, j) => (
                  <a
                    key={j}
                    href={linkMap[link] || '#'}
                    onClick={(e) => {
                      if (linkMap[link]) {
                        e.preventDefault()
                        go(link)
                      }
                    }}
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--gold)'
                      e.currentTarget.style.transform = 'translateX(3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-soft)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Disciplines Column */}
            <div>
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                }}
              >
                Disciplines
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Luxury Villas', 'Interior Design', 'Commercial', 'Landscape Architecture'].map((link, j) => (
                  <a
                    key={j}
                    href={linkMap[link] || '#'}
                    onClick={(e) => {
                      if (linkMap[link]) {
                        e.preventDefault()
                        go(link)
                      }
                    }}
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--gold)'
                      e.currentTarget.style.transform = 'translateX(3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-soft)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                }}
              >
                Experience
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Contact Us', '3D Virtual Tours'].map((link, j) => (
                  <a
                    key={j}
                    href={linkMap[link] || '#'}
                    onClick={(e) => {
                      if (linkMap[link]) {
                        e.preventDefault()
                        go(link)
                      }
                    }}
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--gold)'
                      e.currentTarget.style.transform = 'translateX(3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-soft)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Studio Offices Column */}
            <div>
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.22em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                }}
              >
                Offices
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {[
                  {
                    city: 'Head Office — New Delhi',
                    lines: ['A-1504, 15th Floor, Statesman House,', 'Barakhamba Road, Connaught Place,', 'New Delhi 110001'],
                  },
                  {
                    city: 'Regional Studio — Lucknow',
                    lines: ['2nd Floor, 203 A, Felix Square,', 'Sushant Golf City, Ansal API,', 'Near Lulu Mall, Lucknow 226030'],
                  },
                ].map((o, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                      <FiMapPin size={13} color="var(--gold)" />
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.68rem',
                          fontWeight: 500,
                          letterSpacing: '0.12em',
                          color: 'var(--text)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {o.city}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.78rem',
                        lineHeight: 1.7,
                        color: 'var(--text-soft)',
                        paddingLeft: '1.15rem',
                      }}
                    >
                      {o.lines.map((line, j) => (
                        <span key={j}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colophon Sub-Footer Bar */}
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
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: 'var(--text-faint)', letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} Ekora Architects. All rights reserved.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              style={{
                width: '36px',
                height: '36px',
                border: '1px solid var(--gold-hair)',
                borderRadius: '50%',
                background: 'transparent',
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
