import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

import PageBanner from './PageBanner'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/ui/CTABanner'
import TiltCard from '../components/ui/TiltCard'
import ScrollParallaxFloaters from '../components/ui/ScrollParallaxFloaters'
import { founderIshwer, founderRajdeep, ctaAbout, aboutImage, gallery1, heroSide } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const aboutFloaters = [
  { img: aboutImage, kicker: '01 · Design Philosophy', title: 'Computational & Climate', top: '8%', side: 'right' },
  { img: gallery1, kicker: '02 · Natural Stone', title: 'Travertine & Botticino', top: '44%', side: 'left' },
  { img: heroSide, kicker: '03 · Spatial Volume', title: 'Light & Compression', top: '78%', side: 'right' },
]

const principles = [
  { key: 'Context & Climate', desc: 'Exhaustive study of site orientation, microclimate, local culture, and immediate topography before defining any architectural volume.' },
  { key: 'Programmatic Logic', desc: 'Developing spatial layouts that are intuitive, efficient, and calibrated to daily living routines and circulation flow.' },
  { key: 'Computational Design', desc: 'Employing parametric modeling and algorithmic tools to engineer responsive envelopes, solar shading, and material optimizations.' },
  { key: 'Material Integrity', desc: 'Celebrating authentic natural stone, warm timber, lime plasters, and architectural metals through their honest structural expression.' },
  { key: 'Passive Sustainability', desc: 'Maximizing cross-ventilation, daylight penetration, thermal massing, and rainwater harvesting without reliant artificial systems.' },
  { key: 'Human Experience', desc: 'Choreographing sensory journeys through compression and release of volume, tactile textures, acoustic calm, and atmospheric shadow.' },
  { key: 'Constructability', desc: 'Backing creative ambition with rigorous structural engineering, budget honesty, local craft techniques, and precise execution.' },
]

const ishwerProcess = [
  { step: '01', title: 'Contextual Research & Spatial Brief', desc: 'Every project begins with in-depth analysis of the site, orientation, microclimate, movement patterns, and the client’s programmatic requirements.' },
  { step: '02', title: 'Algorithmic & Parametric Design', desc: 'Advanced computational software and algorithmic scripts generate complex geometries, optimized shading systems, responsive envelopes, and structural patterns.' },
  { step: '03', title: 'Performance Optimization & Craft', desc: 'Using analytical digital tools, concepts are tested for solar radiation, daylight penetration, aerodynamic comfort, and material efficiency.' },
  { step: '04', title: 'Construction Detailing & Execution', desc: 'Digital models are translated into precise construction documentation, shop drawings, and digital fabrication files for seamless on-site realization.' },
]

function GoldLabel({ text }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
      <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase' }}>
        {text}
      </span>
    </div>
  )
}

function Body({ children, style = {} }) {
  return (
    <p
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.88rem',
        lineHeight: 1.85,
        color: 'var(--text-dim)',
        marginBottom: '1.25rem',
        ...style,
      }}
    >
      {children}
    </p>
  )
}

export default function AboutPage() {
  const pageRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
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
          title="About the Practice"
          sub="EKORA ARCHITECTS — Architecture with Purpose. Identity. Experience."
        />

        {/* ── Content Wrapper with Floating Architectural Parallax Images ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ScrollParallaxFloaters floaters={aboutFloaters} />

          {/* ══════════════════════════════════════════════
              SECTION 1 — ABOUT EKORA ARCHITECTS
          ══════════════════════════════════════════════ */}
          <section id="about-section" className="section-pad reveal" style={{ background: 'var(--bg)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              {/* Intro */}
              <div style={{ maxWidth: '880px', marginBottom: '4.5rem' }}>
                <GoldLabel text="Atelier Profile" />
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
                    fontWeight: 300,
                    color: 'var(--heading)',
                    lineHeight: 1.15,
                    marginBottom: '2rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Architecture with Purpose.<br />
                  Identity. Experience.
                </h2>
                <Body>
                  EKORA ARCHITECTS is an architecture and spatial design practice committed to creating thoughtful, contemporary, and context-responsive environments. Our multidisciplinary approach brings together architecture, interior design, computational engineering, and human experience to develop spaces that are purposeful, expressive, and enduring.
                </Body>
                <Body>
                  We believe that every project begins with an understanding of its place, people, and purpose. Rather than imposing a predetermined signature style, we develop architectural solutions that respond to the unique character of the site, climate, culture, and aspirations of each client.
                </Body>
                <Body>
                  From private residences and commercial headquarters to healthcare and hospitality spaces, EKORA ARCHITECTS approaches each project as an opportunity to create a distinct spatial experience — balancing structural logic with artistic expression, and tradition with modern craft.
                </Body>
              </div>

              {/* Philosophy quote block */}
              <div
                className="reveal"
                style={{
                  borderLeft: '2px solid var(--gold)',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 3rem)',
                  background: 'var(--bg-alt)',
                  marginBottom: '5rem',
                  maxWidth: '920px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    letterSpacing: '0.24em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    fontWeight: 600,
                  }}
                >
                  Our Spatial Manifesto
                </div>
                <blockquote
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.85rem)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'var(--text)',
                    lineHeight: 1.55,
                    marginBottom: '1.5rem',
                    margin: 0,
                  }}
                >
                  "Architecture should emerge from the uncompromised relationship between context, function, technology, and human emotion."
                </blockquote>
                <Body style={{ marginTop: '1.25rem', marginBottom: 0 }}>
                  For us, form is not an isolated aesthetic exercise. It is the result of deeply understanding a site — its light, climate, winds, materiality, and the rituals of the people who inhabit it.
                </Body>
              </div>

            {/* Design Principles Grid */}
            <div className="reveal">
              <SectionHeading kicker="Core Principles" title="The seven values behind every blueprint." />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                  gap: '1.25rem',
                  marginTop: '3rem',
                }}
              >
                {principles.map((p, i) => (
                  <TiltCard key={i} maxTilt={6}>
                    <div
                      style={{
                        padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                        background: 'var(--bg-alt)',
                        border: '1px solid var(--text-hair)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: '1.35rem',
                            fontWeight: 300,
                            color: 'var(--gold)',
                            marginBottom: '0.85rem',
                          }}
                        >
                          {p.key}
                        </div>
                        <p
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.8rem',
                            lineHeight: 1.75,
                            color: 'var(--text-dim)',
                            margin: 0,
                          }}
                        >
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>

            {/* Studio Vision Strip */}
            <div
              className="reveal"
              style={{
                marginTop: '4.5rem',
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                background: 'var(--bg-deep)',
                border: '1px solid var(--gold-hair)',
                borderLeft: '3px solid var(--gold)',
                maxWidth: '920px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.65rem',
                  letterSpacing: '0.24em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  marginBottom: '0.85rem',
                  fontWeight: 600,
                }}
              >
                Studio Vision
              </div>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                  fontWeight: 300,
                  color: 'var(--text)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                To establish EKORA ARCHITECTS as a practice celebrated for contextual integrity, algorithmic exploration, and deeply meaningful human environments — creating spaces that are distinctive yet timeless, contemporary yet rooted in place.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 2 — AR. ISHWER SINGH
        ══════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: 'var(--bg-alt)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal grid-founder-ishwer">
              {/* Photo Column */}
              <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <img
                    src={founderIshwer}
                    alt="Ar. Ishwer Singh"
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.92) contrast(1.02)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-0.85rem',
                      right: '-0.85rem',
                      width: '60%',
                      height: '60%',
                      border: '1px solid var(--gold-mid)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: '1.5rem',
                    background: 'var(--bg-deep)',
                    border: '1px solid var(--gold-hair)',
                    borderLeft: '2px solid var(--gold)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.35rem',
                      fontWeight: 300,
                      color: 'var(--text)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Ar. Ishwer Singh
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.62rem',
                      letterSpacing: '0.18em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    Founder &amp; Principal Architect
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.6rem',
                      letterSpacing: '0.14em',
                      color: 'var(--text-faint)',
                      textTransform: 'uppercase',
                      marginTop: '0.25rem',
                    }}
                  >
                    EKORA ARCHITECTS
                  </div>
                </div>
              </div>

              {/* Biography Column */}
              <div>
                <GoldLabel text="Design Leadership" />
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                    fontWeight: 300,
                    color: 'var(--heading)',
                    lineHeight: 1.2,
                    marginBottom: '1.85rem',
                  }}
                >
                  Ar. Ishwer Singh
                </h2>

                <Body>
                  Ar. Ishwer Singh, Founder and Principal Architect of EKORA ARCHITECTS, approaches architecture as a rigorous process of discovery rather than the arbitrary invention of form. His design philosophy is rooted in the belief that meaningful architecture emerges from the precise dialogue between site context, computational intelligence, material honesty, and user comfort.
                </Body>
                <Body>
                  For Ishwer Singh, every project begins with an inquiry: What does this land need, and how can architecture respond meaningfully? Rather than imposing a standard template, he studies site topography, climate, movement patterns, cultural character, and solar geometry to create tailored architectural expressions.
                </Body>

                {/* 4-Step Methodology */}
                <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.65rem',
                      letterSpacing: '0.24em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                      marginBottom: '1.5rem',
                      fontWeight: 600,
                    }}
                  >
                    Methodology &amp; Computational Craft
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {ishwerProcess.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '1.25rem',
                          background: 'var(--bg-deep)',
                          border: '1px solid var(--text-hair)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: '0.95rem',
                            color: 'var(--gold)',
                            letterSpacing: '0.08em',
                            marginBottom: '0.5rem',
                            fontWeight: 400,
                          }}
                        >
                          {s.step} — {s.title}
                        </div>
                        <p
                          style={{
                            fontFamily: 'Inter',
                            fontSize: '0.76rem',
                            lineHeight: 1.7,
                            color: 'var(--text-dim)',
                            margin: 0,
                          }}
                        >
                          {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Closing quote */}
                <div
                  style={{
                    padding: '1.5rem 2rem',
                    background: 'var(--bg)',
                    borderLeft: '2px solid var(--gold)',
                    marginTop: '2rem',
                  }}
                >
                  <blockquote
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      color: 'var(--text)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    "Architecture should not begin with the question of what a building should look like. It should begin with understanding what the place, the climate, and the human rituals demand. The form will emerge naturally from that logic."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3 — MR. RAJDEEP SINGH
        ══════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal grid-founder-rajdeep">
              {/* Content Column */}
              <div>
                <GoldLabel text="Turnkey Operations &amp; Execution" />
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                    fontWeight: 300,
                    color: 'var(--heading)',
                    lineHeight: 1.2,
                    marginBottom: '1.85rem',
                  }}
                >
                  Mr. Rajdeep Singh
                </h2>

                <Body>
                  Mr. Rajdeep Singh is Business Partner and Head of Project Operations at EKORA ARCHITECTS, playing a pivotal role in translating the firm's architectural drawings into impeccably built physical reality. With deep expertise across construction engineering, material procurement, vendor management, and on-site execution, he bridges the gap between digital vision and physical craft.
                </Body>
                <Body>
                  His leadership oversees turnkey site operations, project schedules, subcontractor coordination, precision craftsmanship, and commercial budgeting — ensuring that the client's financial investment is protected and the architectural intent is delivered without compromise.
                </Body>

                {/* Key Roles */}
                <div style={{ margin: '2.5rem 0' }}>
                  {[
                    {
                      title: 'Turnkey Project Execution &amp; Site Supervision',
                      body: 'Leading on-site engineering, structural tolerances, craftsmanship standards, and vendor accountability to ensure that what was drawn is built with millimetre precision.',
                    },
                    {
                      title: 'Commercial Governance &amp; Procurement',
                      body: 'Direct management of material sourcing, stone quarries, joinery workshops, cost estimation, and schedule milestones — delivering full fiscal transparency with zero surprises.',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        borderBottom: '1px solid var(--text-hair)',
                        padding: '1.25rem 0',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.2rem',
                          color: 'var(--gold)',
                          fontStyle: 'italic',
                          marginBottom: '0.5rem',
                        }}
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <p
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '0.82rem',
                          lineHeight: 1.8,
                          color: 'var(--text-dim)',
                          margin: 0,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Closing quote */}
                <div
                  style={{
                    padding: '1.5rem 2rem',
                    background: 'var(--bg-alt)',
                    borderLeft: '2px solid var(--gold)',
                    marginBottom: '1.5rem',
                  }}
                >
                  <blockquote
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      color: 'var(--text)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    "Great architecture is not finished on the computer screen; it is realized when every stone joint, bespoke light fixture, and door handle is crafted with care on site."
                  </blockquote>
                </div>
              </div>

              {/* Photo Column */}
              <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <img
                    src={founderRajdeep}
                    alt="Mr. Rajdeep Singh"
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.92) contrast(1.02)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-0.85rem',
                      left: '-0.85rem',
                      width: '60%',
                      height: '60%',
                      border: '1px solid var(--gold-mid)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
                <div
                  style={{
                    padding: '1.5rem',
                    background: 'var(--bg-deep)',
                    border: '1px solid var(--gold-hair)',
                    borderLeft: '2px solid var(--gold)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.35rem',
                      fontWeight: 300,
                      color: 'var(--text)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Mr. Rajdeep Singh
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.62rem',
                      letterSpacing: '0.18em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    Business Partner &amp; Project Operations
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.6rem',
                      letterSpacing: '0.14em',
                      color: 'var(--text-faint)',
                      textTransform: 'uppercase',
                      marginTop: '0.25rem',
                    }}
                  >
                    EKORA ARCHITECTS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <CTABanner
          title="Meet the architects behind your vision."
          sub="Schedule a private consultation at our studio or on your project site — honest advice, transparent execution."
          video={ctaAbout}
        />
      </main>
      <Footer />
    </>
  )
}
