import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiMapPin, FiClock, FiCalendar, FiCheckCircle } from 'react-icons/fi'

import PageBanner from './PageBanner'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import TiltCard from '../components/ui/TiltCard'
import ScrollParallaxFloaters from '../components/ui/ScrollParallaxFloaters'
import { studioVideo, faqVideo, gallery3, gallery1, heroMain } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const bookTourFloaters = [
  { img: gallery3, kicker: '01 · Design Atelier', title: 'Private Studio Consultation', top: '10%', side: 'right' },
  { img: gallery1, kicker: '02 · Material Library', title: 'Tactile Finishes & Stone', top: '48%', side: 'left' },
  { img: heroMain, kicker: '03 · Completed Villa', title: 'Experiential Walkthrough', top: '78%', side: 'right' },
]

const tourTypes = ['Private Site Visit', 'Design Studio Tour', 'Completed Villa Walkthrough', 'Virtual 360° Consultation']

const faqs = [
  {
    q: 'How long does an architectural tour take?',
    a: 'Site and villa tours typically run for 60 to 90 minutes. A design studio visit in New Delhi or Lucknow is usually 45 to 60 minutes.',
  },
  {
    q: 'Do I need an advance appointment?',
    a: 'Yes — all studio visits and villa walkthroughs are strictly private and scheduled in advance to ensure the principal team’s undivided focus.',
  },
  {
    q: 'Can family members or project partners join?',
    a: 'Of course. We welcome up to four guests per booking to keep discussions focused, personal, and comfortable.',
  },
  {
    q: 'Is there a virtual consultation option?',
    a: 'Yes. If you are located outside Delhi NCR or Lucknow, we conduct full 360° virtual walkthroughs over high-definition video calls.',
  },
]

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--text-hair)',
  padding: '0.9rem 0',
  color: 'var(--text)',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.88rem',
  outline: 'none',
  transition: 'border-color 0.25s ease',
}

export default function BookTourPage() {
  const pageRef = useRef(null)
  const studioVidRef = useRef(null)
  const faqVidRef = useRef(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    tour: tourTypes[0],
    date: '',
    time: 'Morning',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (studioVidRef.current) {
      studioVidRef.current.muted = true
      studioVidRef.current.play().catch(() => {})
    }
    if (faqVidRef.current) {
      faqVidRef.current.muted = true
      faqVidRef.current.play().catch(() => {})
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 45,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    const phoneNumber = '919999033566'
    const messageLines = [
      '✨ *New Studio / Tour Request — Ekora Architects*',
      '',
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      `📞 *Phone:* ${form.phone || 'Not provided'}`,
      `🏛️ *Experience Type:* ${form.tour}`,
      `📅 *Preferred Date:* ${form.date || 'Flexible'}`,
      `⏰ *Preferred Time:* ${form.time}`,
      form.message ? `💬 *Message:* ${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageLines)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <main ref={pageRef}>
        <PageBanner
          title="Schedule a Private Tour"
          sub="Experience our built spaces, material samples, and design studio in person."
        />

        {/* ── Content Wrapper with Floating Architectural Parallax Images ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ScrollParallaxFloaters floaters={bookTourFloaters} />

          {/* ── Form + Studio Details ── */}
          <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="book-tour-grid">
              {/* Left Column: Interactive Form */}
              <div className="reveal">
                <SectionHeading kicker="Private Consultation" title="Select your experience." />

                {submitted ? (
                  <div
                    style={{
                      marginTop: '2.5rem',
                      padding: '2.5rem',
                      border: '1px solid var(--gold-mid)',
                      background: 'var(--bg-alt)',
                      textAlign: 'center',
                    }}
                  >
                    <FiCheckCircle size={40} color="var(--gold)" style={{ marginBottom: '1rem' }} />
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.8rem' }}>
                      Request Initiated
                    </div>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'var(--text-soft)', lineHeight: 1.8 }}>
                      We have logged your request for <strong style={{ color: 'var(--gold)' }}>{form.tour}</strong>.
                      A WhatsApp consultation channel has been opened with our studio team.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                      <a
                        href={`https://wa.me/919999033566?text=${encodeURIComponent(
                          `✨ New Booking Request — Ekora Architects\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nTour: ${form.tour}\nDate: ${form.date || 'Flexible'}${form.message ? `\nMessage: ${form.message}` : ''}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold"
                        style={{ display: 'inline-flex', textDecoration: 'none', padding: '0.85rem 2rem' }}
                      >
                        Open WhatsApp Concierge 💬
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Tour Type Chips */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <label style={{ fontFamily: 'Inter', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 500 }}>
                        Experience Typology *
                      </label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.35rem' }}>
                        {tourTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, tour: t }))}
                            style={{
                              fontFamily: 'Inter',
                              fontSize: '0.75rem',
                              letterSpacing: '0.08em',
                              padding: '0.6rem 1.25rem',
                              cursor: 'pointer',
                              background: form.tour === t ? 'var(--gold)' : 'var(--bg-alt)',
                              color: form.tour === t ? '#140E0C' : 'var(--text-soft)',
                              border: form.tour === t ? '1px solid var(--gold)' : '1px solid var(--text-hair)',
                              borderRadius: '2px',
                              transition: 'all 0.22s ease',
                              fontWeight: form.tour === t ? 500 : 400,
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-row-2">
                      <input
                        required
                        placeholder="Your Full Name *"
                        value={form.name}
                        onChange={set('name')}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                        onBlur={(e) => (e.target.style.borderBottomColor = 'var(--text-hair)')}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={set('email')}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                        onBlur={(e) => (e.target.style.borderBottomColor = 'var(--text-hair)')}
                      />
                    </div>

                    <div className="form-row-2">
                      <input
                        placeholder="Phone / WhatsApp Number"
                        value={form.phone}
                        onChange={set('phone')}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                        onBlur={(e) => (e.target.style.borderBottomColor = 'var(--text-hair)')}
                      />
                      <input
                        type="date"
                        value={form.date}
                        onChange={set('date')}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                        onBlur={(e) => (e.target.style.borderBottomColor = 'var(--text-hair)')}
                      />
                    </div>

                    <textarea
                      rows={3}
                      placeholder="Project context, plot dimensions, or specific inquiries (optional)..."
                      value={form.message}
                      onChange={set('message')}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={(e) => (e.target.style.borderBottomColor = 'var(--gold)')}
                      onBlur={(e) => (e.target.style.borderBottomColor = 'var(--text-hair)')}
                    />

                    <div>
                      <button type="submit" className="btn-gold" style={{ padding: '0.95rem 2.4rem' }}>
                        Confirm Consultation Request
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: Studio Locations & Practical Info */}
              <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div
                  style={{
                    background: 'var(--bg-alt)',
                    border: '1px solid var(--text-hair)',
                    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                    borderLeft: '2px solid var(--gold)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.6rem',
                      fontWeight: 300,
                      color: 'var(--heading)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    Studio Coordinates
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <FiMapPin size={14} color="var(--gold)" />
                        <span style={{ fontFamily: 'Inter', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                          Head Office — New Delhi
                        </span>
                      </div>
                      <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--text-soft)', paddingLeft: '1.35rem' }}>
                        A-1504, 15th Floor, Statesman House,<br />
                        Barakhamba Road, Connaught Place,<br />
                        New Delhi 110001
                      </p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <FiMapPin size={14} color="var(--gold)" />
                        <span style={{ fontFamily: 'Inter', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                          Regional Studio — Lucknow
                        </span>
                      </div>
                      <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--text-soft)', paddingLeft: '1.35rem' }}>
                        2nd Floor, 203 A, Felix Square,<br />
                        Sushant Golf City, Ansal API,<br />
                        Near Lulu Mall, Lucknow 226030
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--bg-deep)',
                    border: '1px solid var(--gold-hair)',
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                  }}
                >
                  <h4 style={{ fontFamily: 'Inter', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
                    Direct WhatsApp Concierge
                  </h4>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--text-soft)', marginBottom: '1.25rem' }}>
                    Need urgent assistance or wish to share architectural drawings directly with the principal team?
                  </p>
                  <a
                    href="https://wa.me/919999033566"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ padding: '0.75rem 1.6rem', fontSize: '0.68rem', display: 'inline-flex' }}
                  >
                    Chat on WhatsApp (+91 99990 33566)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="section-pad" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--gold-hair)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading kicker="Inquiries" title="Frequently asked questions." align="center" />
            <div className="grid-resp-2" style={{ marginTop: '3.5rem' }}>
              {faqs.map((f, i) => (
                <TiltCard key={i} className="reveal" maxTilt={5}>
                  <div
                    style={{
                      background: 'var(--bg-alt)',
                      border: '1px solid var(--text-hair)',
                      padding: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                      height: '100%',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.3rem',
                        fontWeight: 300,
                        color: 'var(--gold)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {f.q}
                    </h3>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', lineHeight: 1.8, color: 'var(--text-dim)', margin: 0 }}>
                      {f.a}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      </div>
      </main>
      <Footer />
    </>
  )
}
