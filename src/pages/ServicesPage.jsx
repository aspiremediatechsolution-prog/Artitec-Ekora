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
import ProjectScopeEstimator from '../components/ui/ProjectScopeEstimator'
import CardCarousel from '../components/ui/CardCarousel'
import { gallery4, gallery2 } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const process = [
  {
    step: '01',
    title: 'Contextual Discovery',
    desc: 'Site reconnaissance, solar path mapping, and lifestyle brief calibration.',
  },
  {
    step: '02',
    title: 'Computational Design',
    desc: 'Algorithmic massing, 3D spatial models, and immersive 360° VR validation.',
  },
  {
    step: '03',
    title: 'Precision Detailing',
    desc: 'Millimetre-accurate architectural construction drawings and material schedules.',
  },
  {
    step: '04',
    title: 'Turnkey Delivery',
    desc: 'On-site engineering, craft supervision, and seamless handover with zero surprises.',
  },
]

export default function ServicesPage() {
  const pageRef = useRef(null)
  const processSectionRef = useRef(null)
  const processImgRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      if (processImgRef.current && processSectionRef.current) {
        gsap.fromTo(
          processImgRef.current,
          { yPercent: -10, scale: 1.05 },
          {
            yPercent: 10,
            scale: 1.18,
            ease: 'none',
            scrollTrigger: {
              trigger: processSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        )
      }
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

        {/* ── Content Wrapper ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
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
          <section
            ref={processSectionRef}
            className="section-pad"
            style={{ background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}
          >
            <img
              ref={processImgRef}
              src={gallery4}
              alt="Delivery Methodology"
              style={{
                position: 'absolute',
                inset: '-10%',
                width: '120%',
                height: '120%',
                objectFit: 'cover',
                filter: 'brightness(0.3) contrast(1.1) saturate(1.05)',
                transformOrigin: 'center',
                willChange: 'transform',
                display: 'block',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(13, 8, 10, 0.9) 0%, rgba(13, 8, 10, 0.58) 50%, rgba(13, 8, 10, 0.92) 100%)',
                zIndex: 1,
              }}
            />
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
              <SectionHeading
                kicker="Process"
                title="A delivery methodology with zero surprises."
                sub="Refined across hundreds of bespoke architectural commissions."
                align="center"
              />
              <div style={{ marginTop: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }} gap={20} autoPlay={true} autoPlayInterval={3500}>
                  {process.map((p, i) => (
                    <TiltCard key={i} className="reveal" maxTilt={6} style={{ height: '100%' }}>
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
                </CardCarousel>
              </div>
            </div>
          </section>
        </div>

        <CTABanner
          title="Ready to commission your project?"
          sub="Every project begins with a structured discovery session to understand your site, timeline, and vision."
          image={gallery2}
        />
      </main>
      <Footer />
    </>
  )
}
