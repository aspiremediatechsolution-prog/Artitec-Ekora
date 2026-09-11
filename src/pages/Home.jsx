import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Services from '../components/sections/Services'
import Projects from '../components/sections/Projects'
import Footer from '../components/sections/Footer'
import CTABanner from '../components/ui/CTABanner'
import { philosophyVideo } from '../assets'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const introRef = useRef(null)
  const philVideoRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (philVideoRef.current) {
      philVideoRef.current.muted = true
      philVideoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <>
      <main ref={introRef} className="outerDiv-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        {/* ── 1. Hero Section with Video Parallax & Header Docking ── */}
        <Hero />

        {/* ── 2. Brand Story & Studio Split Parallax ── */}
        <About />

        {/* ── 3. Core Disciplines / Services Slider ── */}
        <Services />

        {/* ── 4. Featured Works (Architecture & Interiors Showcase) ── */}
        <Projects id="projects" title="Featured Works" subtitle="Iconic Architecture · Bespoke Interiors · Master Planning" />

        {/* ── 5. Spatial Philosophy Statement ── */}
        <section
          className="section-pad"
          style={{
            background: 'var(--bg-deep)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <video
            ref={philVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.32) saturate(1.05)',
            }}
          >
            <source src={philosophyVideo} type="video/mp4" />
          </video>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--overlay-band)',
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
        />
      </main>

      <Footer />
    </>
  )
}
