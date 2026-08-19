import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import PageBanner from './PageBanner'
import Services from '../components/sections/Services'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/ui/CTABanner'
import TiltCard from '../components/ui/TiltCard'
import { processVideo, ctaServices } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const process = [
  { step: '01', title: 'Discover', desc: 'We walk your site, listen to how you live, and map the constraints — budget, light, climate, and everything in between.' },
  { step: '02', title: 'Design', desc: 'Sketches become drawings, drawings become 3D models. You see your home before a single brick is laid — even in 360°.' },
  { step: '03', title: 'Detail', desc: 'Materials, joinery, lighting, and finishes are specified down to the millimetre. Nothing is left to chance.' },
  { step: '04', title: 'Deliver', desc: 'We stay on site through construction, reviewing every stage so the finished home matches the vision — and then some.' },
]

export default function ServicesPage() {
  const pageRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={pageRef}>
        <PageBanner title="Services" sub="Architecture · Interiors · Landscape · PMC" />
        <Services />

        {/* ── Process ── */}
        <section className="section-pad" style={{ background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
          <video
            ref={videoRef}
            src={processVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'brightness(0.38) saturate(1.1)',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay-band)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading
              kicker="How We Work"
              title="A process with no surprises."
              sub="Four clear phases. Weekly updates. One accountable team from first sketch to final handover."
              align="center"
            />
            <div className="grid-resp-4" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', gap: '1rem' }}>
              {process.map((p, i) => (
                <TiltCard key={i} className="reveal" style={{ height: '100%' }}>
                  <div style={{ height: '100%', padding: 'clamp(1.5rem, 3vw, 2.2rem) clamp(1.4rem, 2.5vw, 2rem)', border: '1px solid var(--gold-faint)', background: 'var(--card-bg-deep)', backdropFilter: 'blur(6px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'var(--gold)', lineHeight: 1 }}>{p.step}</div>
                      <div style={{ flex: 1, height: '1px', background: 'var(--gold-faint)' }} />
                    </div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.45rem', fontWeight: 300, color: 'var(--text)', marginBottom: '0.6rem' }}>{p.title}</h3>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', lineHeight: 1.75, color: 'var(--text-soft)' }}>{p.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <CTABanner
          title="Not sure which service you need?"
          sub="Book a free 30-minute consultation. We'll listen to your project and point you in the right direction."
          video={ctaServices}
        />
      </main>
      <Footer />
    </>
  )
}

