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
import CardCarousel from '../components/ui/CardCarousel'
import { founderIshwer, founderRajdeep, ctaAbout, aboutImage, gallery1, gallery3, heroSide } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const aboutFloaters = [
  { img: aboutImage, kicker: '01 · Design Philosophy', title: 'Computational & Climate', top: '8%', side: 'right' },
  { img: gallery1, kicker: '02 · Natural Stone', title: 'Travertine & Botticino', top: '44%', side: 'left' },
  { img: heroSide, kicker: '03 · Spatial Volume', title: 'Light & Compression', top: '78%', side: 'right' },
]

const principles = [
  { key: 'Context & Climate', desc: 'In-depth study of microclimate, topography, and site orientation before defining volume.' },
  { key: 'Programmatic Logic', desc: 'Intuitive spatial layouts calibrated to daily routines and circulation flow.' },
  { key: 'Computational Design', desc: 'Parametric modeling to engineer responsive envelopes and optimized shading.' },
  { key: 'Material Integrity', desc: 'Authentic expression of natural stone, warm timber, and architectural metals.' },
  { key: 'Passive Sustainability', desc: 'Cross-ventilation, daylight penetration, and high thermal massing.' },
  { key: 'Human Experience', desc: 'Choreographed sensory journeys of light, shadow, and tactile textures.' },
  { key: 'Constructability', desc: 'Engineering rigor, budget honesty, and precision on-site craft execution.' },
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
          y: 32,
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={pageRef}>
        <PageBanner
          title="About EKORA"
          sub="EKORA ARCHITECTS — Architecture with Purpose. Identity. Experience."
        />

        {/* ── Content Wrapper ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>

          {/* ══════════════════════════════════════════════
              SECTION 1 — ABOUT EKORA ARCHITECTS
          ══════════════════════════════════════════════ */}
          <section id="about-section" className="section-pad reveal" style={{ background: 'var(--bg)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              {/* Intro */}
              <div style={{ maxWidth: '880px', marginBottom: '4.5rem' }}>
                <GoldLabel text="Architects Profile" />
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
                  EKORA ARCHITECTS creates thoughtful, context-responsive environments across private residences, commercial headquarters, and luxury sanctuaries. We balance structural logic with artistic expression to deliver spaces that are purposeful, distinctive, and enduring.
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
                    marginBottom: 0,
                    margin: 0,
                  }}
                >
                  "Architecture should emerge from the uncompromised relationship between context, function, technology, and human emotion."
                </blockquote>
              </div>

            {/* Design Principles Grid */}
            <div className="reveal">
              <SectionHeading kicker="Core Principles" title="The seven values behind every blueprint." />
              <div style={{ marginTop: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} gap={20} autoPlay={true} autoPlayInterval={3400}>
                  {principles.map((p, i) => (
                    <TiltCard key={i} maxTilt={6} style={{ height: '100%' }}>
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
                </CardCarousel>
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
                      objectPosition: 'center 15%',
                      display: 'block',
                      borderRadius: '2px',
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
                  Ar. Ishwer Singh approaches architecture as a rigorous process of discovery. His design philosophy is rooted in context, computational intelligence, material honesty, and human comfort — creating tailored spaces that respond naturally to site topography, climate, and lifestyle.
                </Body>

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
                  Mr. Rajdeep Singh bridges digital architectural vision and physical execution. He oversees turnkey site operations, engineering precision, material procurement, and project schedules — ensuring every detail is built with millimetre accuracy and complete transparency.
                </Body>

                {/* Closing quote */}
                <div
                  style={{
                    padding: '1.5rem 2rem',
                    background: 'var(--bg-alt)',
                    borderLeft: '2px solid var(--gold)',
                    marginTop: '2rem',
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
                      objectPosition: 'center 15%',
                      display: 'block',
                      borderRadius: '2px',
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
        image={gallery3}
      />
      </main>
      <Footer hidePreFooter={true} />
    </>
  )
}
