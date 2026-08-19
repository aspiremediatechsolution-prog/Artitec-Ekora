import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import PageBanner from './PageBanner'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import TiltCard from '../components/ui/TiltCard'
import { studioVideo, faqVideo } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const tourTypes = ['Site Visit', 'Studio Tour', 'Completed Villa Tour', 'Virtual Walkthrough', 'Consultation']

const faqs = [
  { q: 'How long does a tour take?', a: 'Site and villa tours run for 60–90 minutes. A studio visit is usually 45 minutes.' },
  { q: 'Do I need an appointment?', a: 'Yes — tours are private and scheduled in advance so you get the team\u2019s full attention.' },
  { q: 'Can I bring guests?', a: 'Of course. Up to four guests per booking so we can keep visits personal.' },
  { q: 'Is there a virtual option?', a: 'Yes. If you can\u2019t travel, we\u2019ll walk you through a completed project in 360° over a video call.' },
]

const inputStyle = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid var(--text-hair)',
  padding: '0.9rem 0', color: 'var(--text)',
  fontFamily: 'Inter', fontSize: '0.85rem',
  outline: 'none', transition: 'border-color 0.3s',
}

export default function BookTourPage() {
  const pageRef = useRef(null)
  const studioVidRef = useRef(null)
  const faqVidRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', tour: tourTypes[0], date: '', time: 'Morning', message: '' })
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
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
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
      '✨ *New Tour / Booking Request — Ekora Architects*',
      '',
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      `📞 *Phone:* ${form.phone || 'Not provided'}`,
      `🏛️ *Tour Type:* ${form.tour}`,
      `📅 *Preferred Date:* ${form.date || 'Flexible'}`,
      form.message ? `💬 *Message:* ${form.message}` : '',
    ].filter(Boolean).join('\n')

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageLines)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <main ref={pageRef}>
        <PageBanner title="Book a Tour" sub="Experience the architecture before you build." />

        {/* ── Form + Info ── */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="book-tour-grid">

              {/* Form */}
              <div className="reveal">
                <SectionHeading kicker="Schedule a Visit" title="Choose your experience." />
                {submitted ? (
                  <div style={{ marginTop: '2.5rem', padding: '2.5rem', border: '1px solid var(--gold-mid)', background: 'var(--card-bg-deep)', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--gold)', marginBottom: '0.8rem' }}>Thank You</div>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: 'var(--text-soft)', lineHeight: 1.8 }}>
                      We have received your tour request for <strong style={{ color: 'var(--gold)' }}>{form.tour}</strong>.
                      A WhatsApp message has been initiated. Our team will also reach out to confirm your date and time.
                    </p>
                    <div style={{ marginTop: '1.5rem' }}>
                      <a
                        href={`https://wa.me/919999033566?text=${encodeURIComponent(`✨ New Booking Request — Ekora Architects\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nTour: ${form.tour}\nDate: ${form.date || 'Flexible'}${form.message ? `\nMessage: ${form.message}` : ''}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold"
                        style={{ display: 'inline-block', textDecoration: 'none', padding: '0.65rem 1.8rem', fontSize: '0.8rem' }}
                      >
                        Open WhatsApp Again 💬
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>Tour Type</label>
                      <div className="chip-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
                        {tourTypes.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm((p) => ({ ...p, tour: t }))}
                            style={{
                              fontFamily: 'Inter', fontSize: '0.72rem', letterSpacing: '0.1em',
                              padding: '0.5rem 1.1rem', cursor: 'pointer',
                              background: form.tour === t ? 'var(--gold)' : 'transparent',
                              color: form.tour === t ? '#120204' : 'var(--text-faint)',
                              border: form.tour === t ? '1px solid var(--gold)' : '1px solid var(--gold-hair)',
                              transition: 'all 0.25s',
                            }}
                          >{t}</button>
                        ))}
                      </div>
                    </div>
                    <div className="form-row-2">
                      <input required placeholder="Your Name *" value={form.name} onChange={set('name')} style={inputStyle} />
                      <input required type="email" placeholder="Email Address *" value={form.email} onChange={set('email')} style={inputStyle} />
                    </div>
                    <div className="form-row-2">
                      <input placeholder="Phone Number" value={form.phone} onChange={set('phone')} style={inputStyle} />
                      <input type="date" value={form.date} onChange={set('date')} style={inputStyle} />
                    </div>
                    <textarea rows={3} placeholder="Anything we should know? (optional)" value={form.message} onChange={set('message')} style={{ ...inputStyle, resize: 'none' }} />
                    <button className="btn-gold" type="submit" style={{ alignSelf: 'flex-start' }}>Request Booking</button>
                  </form>
                )}
              </div>

              {/* Side info */}
              <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <video ref={studioVidRef} src={studioVideo} autoPlay muted loop playsInline preload="auto"
                    style={{ width: '100%', height: 'clamp(220px, 30vw, 320px)', objectFit: 'cover', filter: 'brightness(0.75)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay-panel)' }} />
                  <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.4rem', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', color: 'var(--text)' }}>Our Bandra Studio</div>
                </div>

                <TiltCard style={{ border: '1px solid var(--gold-faint)', background: 'var(--card-bg)' }}>
                  <div style={{ padding: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>What to Expect</div>
                    {[
                      'A private walkthrough with a senior architect',
                      'Real materials and finishes you can touch',
                      'Straight answers on budget and timelines',
                      'A 360° preview of a completed project',
                      'No pressure, no pitch — just honest advice',
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                        <span style={{ color: 'var(--gold)', fontSize: '0.7rem', marginTop: '0.2rem' }}>✦</span>
                        <span style={{ fontFamily: 'Inter', fontSize: '0.76rem', lineHeight: 1.7, color: 'var(--text-dim)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { label: 'Email', value: 'hello@ekora.studio' },
                    { label: 'Phone / WhatsApp', value: '+91 99990 33566', href: 'https://wa.me/919999033566' },
                    { label: 'Studio', value: '14 Hill Road, Bandra West, Mumbai' },
                    { label: 'Hours', value: 'Mon–Sat · 10:00 AM – 7:00 PM' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'var(--gold)', textDecoration: 'none' }}>
                          {item.value} ↗
                        </a>
                      ) : (
                        <div style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: 'var(--text-dim)' }}>{item.value}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section-pad" style={{ background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
          <video
            ref={faqVidRef}
            src={faqVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'brightness(0.42) saturate(1.1)',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay-band)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
            <SectionHeading kicker="Good to Know" title="Common questions." align="center" />
            <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {faqs.map((f, i) => (
                <TiltCard key={i} className="reveal" maxTilt={6}>
                  <div style={{ padding: '1.4rem 1.6rem', border: '1px solid var(--gold-faint)', background: 'var(--card-bg-deep)', backdropFilter: 'blur(6px)' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: 'var(--text)', marginBottom: '0.4rem' }}>{f.q}</div>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.78rem', lineHeight: 1.75, color: 'var(--text-soft)' }}>{f.a}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

