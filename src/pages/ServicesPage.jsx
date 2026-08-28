import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

import PageBanner from './PageBanner'
import Services from '../components/sections/Services'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/ui/CTABanner'
import TiltCard from '../components/ui/TiltCard'
import ScrollParallaxFloaters from '../components/ui/ScrollParallaxFloaters'
import ProjectScopeEstimator from '../components/ui/ProjectScopeEstimator'
import { processVideo, ctaServices, w2_16_49, w2_17_19, w2_17_18 } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const servicesFloaters = [
  { img: w2_16_49, kicker: '01 · Architectural Form', title: 'Master Planning & Massing', top: '10%', side: 'right' },
  { img: w2_17_19, kicker: '02 · Bespoke FF&E', title: 'Tactile Interior Joinery', top: '46%', side: 'left' },
  { img: w2_17_18, kicker: '03 · Turnkey Delivery', title: 'Zero Surprise Execution', top: '78%', side: 'right' },
]

const process = [
  {
    step: '01',
    title: 'Contextual Discovery',
    desc: 'Exhaustive site reconnaissance, solar path mapping, zoning analysis, and understanding how your family or organization lives and works.',
  },
  {
    step: '02',
    title: 'Computational Design',
    desc: 'Translating spatial logic into sketches, computational massing, and immersive 360° VR environments for early experiential validation.',
  },
  {
    step: '03',
    title: 'Precision Detailing',
    desc: 'Comprehensive architectural construction drawings, stone and timber specifications, custom joinery, and lighting schedules specified down to the millimetre.',
  },
  {
    step: '04',
    title: 'Turnkey Delivery',
    desc: 'Dedicated on-site project operations, structural quality benchmarks, contractor supervision, and flawless handover with comprehensive documentation.',
  },
]

export default function ServicesPage() {
  const pageRef = useRef(null)
  const videoRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
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

  return (
    <>
      <main ref={pageRef}>
        <PageBanner
          title="Our Services"
          sub="Architecture · Bespoke Interiors · Landscape · Turnkey Execution"
        />

        {/* ── Content Wrapper with Floating Architectural Parallax Images ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ScrollParallaxFloaters floaters={servicesFloaters} />

          <Services />

          {/* ── Interactive Project Scope & Timeline Estimator ── */}
          <section className="section-pad reveal" style={{ background: 'var(--bg)', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <SectionHeading
                kicker="Interactive Planning"
                title="Calculate Your Project Scope &amp; Roadmap."
                sub="Estimate architectural timelines and execution roadmaps tailored to your built-up area and spatial typologies."
                align="center"
              />
              <div style={{ marginTop: '3.5rem' }}>
                <ProjectScopeEstimator />
              </div>
            </div>
          </section>

          {/* ── Delivery Methodology Process ── */}
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
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.32) saturate(1.05)',
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay-band)' }} />
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
              <SectionHeading
                kicker="Process"
                title="A delivery methodology with zero surprises."
                sub="Refined across hundreds of bespoke architectural commissions."
                align="center"
              />
              <div className="grid-resp-4" style={{ marginTop: '3.5rem' }}>
                {process.map((p, i) => (
                  <TiltCard key={i} className="reveal" maxTilt={6}>
                    <div
                      style={{
                        padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                        border: '1px solid var(--gold-hair)',
                        background: 'var(--bg-alt)',
                        height: '100%',
                      }}
                    >
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                        {p.step}
                      </div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'var(--heading)', marginBottom: '0.5rem' }}>
                        {p.title}
                      </h3>
                      <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', lineHeight: 1.75, color: 'var(--text-dim)', margin: 0 }}>
                        {p.desc}
                      </p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </section>
        </div>

        <CTABanner
          title="Ready to commission your project?"
          sub="Every project begins with a structured discovery session to understand your site, timeline, and vision."
          video={ctaServices}
        />
      </main>
      <Footer />
    </>
  )
}
