import { FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiArrowUp } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  const linkMap = {
    'Home': '/',
    'About': '/about',
    'Services': '/services',
    'Projects': '/projects',
    'Book a Tour': '/book-a-tour',
    'Villas': '/projects',
    'Commercial': '/projects',
    'Interior': '/services',
    'Landscape': '/services',
  }

  const go = (link) => {
    const path = linkMap[link]
    if (path) navigate(path)
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const linkStyle = {
    fontFamily: 'Inter', fontSize: '0.78rem',
    color: 'var(--text-faint)',
    textDecoration: 'none', transition: 'color 0.3s', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
  }

  return (
    <footer style={{ background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden', width: '100%' }}>
      {/* ── Watermark background ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, right: 0, bottom: '-2vw',
        textAlign: 'center', lineHeight: 0.8,
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        overflow: 'hidden', maxWidth: '100%',
      }}>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(4rem, 20vw, 18rem)',
          fontWeight: 600, letterSpacing: '0.08em',
          color: 'var(--gold)',
          opacity: 0.08,
          display: 'inline-block',
        }}>
          EKORA
        </span>
      </div>

      {/* ── Content on top ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
      {/* ── CTA band ── */}
      <div style={{ padding: 'clamp(3.5rem, 6vw, 6rem) 5% clamp(2.5rem, 5vw, 5rem)', borderTop: '1px solid var(--gold-faint)', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ width: '36px', height: '1px', background: 'var(--gold)', margin: '0 auto 1.2rem' }} />
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.6rem)',
            fontWeight: 300, lineHeight: 1.15, color: 'var(--text)',
            marginBottom: '1rem',
          }}>
            Let's build something <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>timeless</span> together.
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', lineHeight: 1.85, color: 'var(--text-dim)', maxWidth: '520px', margin: '0 auto 2.2rem' }}>
            Villas, interiors and landscapes — designed around how you actually live. Walk through a completed project in person.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => go('Book a Tour')} style={{ padding: '0.8rem 2.2rem' }}>Book a Tour</button>
            <button className="btn-outline" onClick={() => go('Projects')} style={{ padding: '0.8rem 2.2rem' }}>See Our Work</button>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div style={{ padding: '0 5% clamp(2rem, 4vw, 4rem)' }}>
        <div className="footer-grid" style={{ marginBottom: 0 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <img src="/logo.jpeg" alt="Ekora logo" style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '3px' }} />
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                Ekora
              </span>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: '0.76rem', lineHeight: 1.85, color: 'var(--text-faint)', maxWidth: '280px' }}>
              Architecture and interior design studio crafting spaces across India — shaped by conversation, context and craft since 2010.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              {[FiInstagram, FiLinkedin, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" style={{
                  width: '36px', height: '36px',
                  border: '1px solid var(--text-hair)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-faint)',
                  transition: 'all 0.3s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--text-hair)'; e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: 'Explore', links: ['Home', 'About', 'Services', 'Projects'] },
            { title: 'Work', links: ['Villas', 'Commercial', 'Interior', 'Landscape'] },
            { title: 'Visit', links: ['Book a Tour'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                {col.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {col.links.map((link, j) => (
                  <a key={j} href={linkMap[link] || '#'}
                    onClick={(e) => { if (linkMap[link]) { e.preventDefault(); go(link) } }}
                    style={linkStyle}
                    onMouseEnter={e => e.target.style.color = 'var(--text)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-faint)'}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}

          {/* Offices */}
          <div>
            <h4 style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              Offices
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                {
                  city: 'Head Office — New Delhi',
                  lines: ['A-1504, 15th Floor, Statesman House,', 'Barakhamba Road, Gate No-5,', 'Connaught Place, New Delhi 110001'],
                },
                {
                  city: 'Lucknow Office',
                  lines: ['2nd Floor, 203 A, Felix Square,', 'Sushant Golf City, Ansal API,', 'Near Lulu Mall, Lucknow 226030'],
                },
              ].map((o, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                    <FiMapPin size={12} color="var(--gold)" />
                    <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                      {o.city}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.74rem', lineHeight: 1.7, color: 'var(--text-faint)', paddingLeft: '1.2rem' }}>
                    {o.lines.map((line, j) => <span key={j}>{line}<br /></span>)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ padding: '1.2rem 5%', borderTop: '1px solid var(--gold-hair)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: 'var(--text-mute)', letterSpacing: '0.1em' }}>
          © 2024 Ekora Studio. All rights reserved.
        </span>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.82rem', color: 'var(--text-mute)', fontStyle: 'italic' }}>
          Luxury · Architecture · Design
        </span>
        <button onClick={scrollTop} aria-label="Back to top" style={{
          width: '36px', height: '36px',
          border: '1px solid var(--text-hair)',
          borderRadius: '50%',
          background: 'transparent',
          color: 'var(--text-faint)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'all 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--text-hair)'; e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <FiArrowUp size={14} />
        </button>
      </div>
      </div>
    </footer>
  )
}

