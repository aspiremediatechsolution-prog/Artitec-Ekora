import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import Footer from '../components/sections/Footer'
import CTABanner from '../components/ui/CTABanner'
import { heroMain, projectsImage } from '../assets'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const introRef = useRef(null)
  const philSectionRef = useRef(null)
  const philImgRef = useRef(null)
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

      if (philImgRef.current && philSectionRef.current) {
        gsap.fromTo(
          philImgRef.current,
          { yPercent: -10, scale: 1.05 },
          {
            yPercent: 10,
            scale: 1.18,
            ease: 'none',
            scrollTrigger: {
              trigger: philSectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.25,
            },
          }
        )
      }
    }, introRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={introRef} className="outerDiv-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        {/* ── 1. Hero Section with Video Parallax & Header Docking ── */}
        <Hero />

        {/* ── 2. Brand Story & Studio Split Parallax ── */}
        <About />

        {/* ── 3. Featured Works (Architecture & Interiors Showcase) ── */}
        <Projects id="projects" title="Featured Works" subtitle="Iconic Architecture · Bespoke Interiors · Master Planning" />

        {/* ── 5. Spatial Philosophy Statement ── */}
        <section
          ref={philSectionRef}
          className="section-pad"
          style={{
            background: 'var(--bg-deep)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            ref={philImgRef}
            src={heroMain}
            alt="Spatial Philosophy"
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
          <div
            className="reveal"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '2rem 1.5rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{ width: '36px', height: '1px', background: 'var(--gold)', margin: '0 auto 2rem' }} />
            <blockquote
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: '#FAF7F2',
                textShadow: '0 4px 30px rgba(0,0,0,0.6)',
                margin: 0,
              }}
            >
              “We design for the people who inhabit the space — not solely for the photograph taken at handover.
              Light, proportion, and the weight of every material are the grammar we build in.”
            </blockquote>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                marginTop: '2rem',
                fontWeight: 500,
              }}
            >
              Ar. Ishwer Singh — Principal Architect &amp; Founder
            </p>
          </div>
        </section>

        {/* ── 6. Call to Action Banner ── */}
        <CTABanner
          title="Begin your architectural journey with Ekora."
          sub="Schedule a private consultation at our New Delhi head office or regional studio."
          image={projectsImage}
        />
      </main>

      <Footer hidePreFooter={true} />
    </>
  )
}
