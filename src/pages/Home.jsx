import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/ui/CTABanner'
import ConceptSplitSlider from '../components/ui/ConceptSplitSlider'
import ScrollParallaxFloaters from '../components/ui/ScrollParallaxFloaters'
import CardCarousel from '../components/ui/CardCarousel'
import { heroMain, projectsImage, w2_17_19, w2_17_18, w2_17_17, w2_17_16, philosophyVideo } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: '200+', label: 'Executed Projects' },
  { num: '100%', label: 'Bespoke Architecture' },
  { num: '12', label: 'Architectural Awards' },
  { num: '8', label: 'Countries Reached' },
]

const servicePreview = [
  {
    num: '01',
    title: 'Luxury Villas & Private Estates',
    desc: 'Bespoke residences shaped around your family rituals, natural light patterns, and landscape topography.',
    img: w2_17_19,
  },
  {
    num: '02',
    title: 'Interior Architecture & FF&E',
    desc: 'Tailored joinery, custom lighting, tactile stone surfaces, and bespoke furniture crafted for timeless calm.',
    img: w2_17_18,
  },
  {
    num: '03',
    title: 'Workplace & Commercial Design',
    desc: 'Strategic corporate headquarters, boutique retail, and cultural spaces that reflect institutional prestige.',
    img: w2_17_17,
  },
  {
    num: '04',
    title: 'Landscape & Water Architecture',
    desc: 'Biophilic courtyards, infinity water features, and microclimate gardens integrated with the built volume.',
    img: w2_17_16,
  },
]

const process = [
  {
    step: '01',
    title: 'Contextual Research & Brief',
    desc: 'Site microclimate study, orientation analysis, and in-depth lifestyle discovery to formulate the spatial brief.',
  },
  {
    step: '02',
    title: 'Computational 3D Modeling',
    desc: 'Parametric spatial layouts, volumetric daylight simulations, and immersive 360° interactive walkthroughs.',
  },
  {
    step: '03',
    title: 'Technical Detailing & BOQ',
    desc: 'Comprehensive GFC architectural drawings, structural engineering, and transparent material procurement schedules.',
  },
  {
    step: '04',
    title: 'Turnkey Site Execution',
    desc: 'On-site architectural supervision, master craftsman joinery, and flawless handover down to the millimetre.',
  },
]

const awards = [
  { title: 'Best Luxury Residential Villa', badge: 'Excellence', body: 'Indian Architecture & Design Excellence Awards' },
  { title: 'Excellence in Sustainable Architecture', badge: 'National', body: 'National Green Design Forum' },
  { title: 'Interior Architecture Studio of the Year', badge: 'Honour', body: 'Commercial & Hospitality Design Summit' },
  { title: 'Turnkey Execution Heritage Award', badge: 'Heritage', body: 'North India Builders Association' },
]

const testimonials = [
  {
    quote: 'The design execution was exceptional. What we saw in the initial 3D visualizations is exactly what was built on site — refined down to the millimetre.',
    name: 'Dr. Abhinav Singh',
    role: 'Clinic & Residence, Lucknow',
  },
  {
    quote: 'Ekora treated our office project like their own. Four months, zero surprises, and a space our corporate partners compliment before they sit down.',
    name: 'Mr. Rajdeep',
    role: 'Corporate Studio, Lucknow',
  },
  {
    quote: 'Every material decision was explained, every deadline respected. The timeless grandeur of the residence was executed with unmatched craftsmanship.',
    name: 'Mr. Ajit',
    role: 'Private Villa, Lucknow',
  },
]

/* ── Service Card with 3D Tilt & Lighting Glow ── */
function ServicePreviewCard({ s }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const contentRef = useRef(null)
  const lineRef = useRef(null)
  const imgRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    gsap.to(cardRef.current, {
      rotateY: x * 8,
      rotateX: -y * 6,
      duration: 0.45,
      ease: 'power2.out',
      transformPerspective: 900,
    })

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.8,
        left: `${(x + 1) * 50}%`,
        top: `${(y + 1) * 50}%`,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.06,
        x: x * -8,
        y: y * -8,
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }

  const onMouseEnter = () => {
    setHovered(true)
    if (contentRef.current) gsap.to(contentRef.current, { z: 24, duration: 0.45, ease: 'power3.out' })
    if (lineRef.current) gsap.to(lineRef.current, { width: '45px', duration: 0.4, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    setHovered(false)
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.75, ease: 'power3.out' })
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, x: 0, y: 0, duration: 0.75, ease: 'power3.out' })
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })
    if (contentRef.current) gsap.to(contentRef.current, { z: 0, duration: 0.75, ease: 'power3.out' })
    if (lineRef.current) gsap.to(lineRef.current, { width: '24px', duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate('/services')}
      className="reveal"
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: 'clamp(320px, 40vw, 380px)',
        cursor: 'pointer',
        border: `1px solid ${hovered ? 'var(--gold-line)' : 'var(--text-hair)'}`,
        transition: 'border-color 0.3s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        background: 'var(--bg-deep)',
      }}
    >
      <img
        ref={imgRef}
        src={s.img}
        alt={s.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(var(--media-dark))',
          transformOrigin: 'center',
          willChange: 'transform, filter',
        }}
      />
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--gold-faint) 0%, transparent 70%)',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          opacity: 0,
          top: '50%',
          left: '50%',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'var(--overlay-video)',
        }}
      />
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transformStyle: 'preserve-3d',
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            color: 'var(--gold)',
            letterSpacing: '0.18em',
            fontWeight: 500,
          }}
        >
          {s.num}
        </span>
        <div>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.35rem, 1.8vw, 1.85rem)',
              fontWeight: 300,
              color: '#FFFFFF',
              marginBottom: '0.65rem',
              lineHeight: 1.2,
              transition: 'color 0.25s ease',
            }}
          >
            {s.title}
          </h3>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              lineHeight: 1.7,
              color: 'rgba(250, 247, 242, 0.88)',
            }}
          >
            {s.desc}
          </p>
          <div
            ref={lineRef}
            style={{
              marginTop: '1.25rem',
              width: '24px',
              height: '1px',
              background: 'var(--gold)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

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
      <main ref={introRef}>
        {/* ── Hero Section with Pure Architectural Visuals & Motion Trail ── */}
        <Hero />

        {/* ── Post-Hero Content Wrapper with Responsive Scroll Parallax Floating Images ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* ── Kinetic Scroll Parallax Floating Images (Starts right below Hero) ── */}
          <ScrollParallaxFloaters />

          {/* ── Studio Intro & Profile ── */}
          <section className="section-pad" style={{ background: 'var(--bg)', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="about-grid">
                {/* Photo Frame with Architectural Border */}
                <div className="reveal" style={{ position: 'relative' }}>
                  <img
                    src={heroMain}
                    alt="Ekora Architecture Studio"
                    style={{
                      width: '100%',
                      height: 'clamp(340px, 42vw, 560px)',
                      objectFit: 'cover',
                      filter: 'brightness(0.9) contrast(1.02)',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-0.85rem',
                      right: '-0.85rem',
                      width: '65%',
                      height: '65%',
                      border: '1px solid var(--gold-mid)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Text Information */}
                <div>
                  <SectionHeading
                    kicker="Studio Profile"
                    title="Architecture of restraint, light, and material honesty."
                    sub="Ekora Architects is a multi-disciplinary design and execution practice committed to creating environments of profound calm, structural clarity, and enduring craftsmanship."
                  />
                  <p
                    className="reveal"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.88rem',
                      lineHeight: 1.85,
                      color: 'var(--text-soft)',
                      marginTop: '1.5rem',
                    }}
                  >
                    Our work spans luxury private residences, contextual interiors, and bespoke commercial environments across India and internationally. Led by Ar. Ishwer Singh and Mr. Rajdeep Singh, the studio bridges algorithmic computational precision with master artisanal craftsmanship.
                  </p>
                  <div className="reveal" style={{ marginTop: '2.5rem' }}>
                    <button className="btn-outline" onClick={() => navigate('/about')}>
                      Read Studio Manifesto
                    </button>
                  </div>
                </div>
              </div>

              {/* Metrics Band */}
              <div
                className="home-stats stats-grid"
                style={{
                  marginTop: 'clamp(3.5rem, 6vw, 5.5rem)',
                  paddingTop: '2.5rem',
                  borderTop: '1px solid var(--text-hair)',
                }}
              >
                {stats.map((s, i) => (
                  <div key={i} className="stat-item" style={{ borderLeft: '1px solid var(--gold-hair)', paddingLeft: '1.25rem' }}>
                    <div
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)',
                        color: 'var(--gold)',
                        fontWeight: 300,
                        lineHeight: 1,
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.62rem',
                        letterSpacing: '0.2em',
                        color: 'var(--text-faint)',
                        textTransform: 'uppercase',
                        marginTop: '0.5rem',
                        fontWeight: 500,
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Spatial Philosophy Statement ── */}
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
              src={philosophyVideo}
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
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div style={{ width: '32px', height: '1px', background: 'var(--gold)', margin: '0 auto 2rem' }} />
              <blockquote
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.55,
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
                  marginTop: '2.25rem',
                  fontWeight: 500,
                }}
              >
                Ar. Ishwer Singh — Principal Architect &amp; Founder
              </p>
            </div>
          </section>

          {/* ── Process & Methodology ── */}
          <section className="section-pad" style={{ background: 'var(--bg)', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <SectionHeading
                kicker="Methodology"
                title="From contextual concept to final handover."
                align="center"
                sub="A rigorous 4-stage architectural process refined across two hundred completed projects."
              />
              <div style={{ marginTop: 'clamp(2.5rem, 4vw, 4rem)' }}>
                <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }} gap={20} autoPlay={true} autoPlayInterval={3600}>
                  {process.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'relative',
                        padding: 'clamp(1.5rem, 2vw, 2rem)',
                        border: '1px solid var(--text-hair)',
                        background: 'var(--bg-alt)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: '1.4rem',
                            color: 'var(--gold)',
                            lineHeight: 1,
                            marginBottom: '1rem',
                            fontWeight: 400,
                          }}
                        >
                          {p.step}
                        </div>
                        <h3
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: '1.35rem',
                            fontWeight: 300,
                            color: 'var(--heading)',
                            marginBottom: '0.75rem',
                            lineHeight: 1.25,
                          }}
                        >
                          {p.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.78rem',
                            lineHeight: 1.75,
                            color: 'var(--text-dim)',
                            margin: 0,
                          }}
                        >
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardCarousel>
              </div>
            </div>
          </section>

          {/* ── LUXURY FEATURE 1: Interactive Concept vs Built Reality Split Slider ── */}
          <section className="section-pad" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--gold-hair)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="reveal" style={{ marginBottom: '3rem' }}>
                <SectionHeading
                  kicker="Computational Fidelity"
                  title="From algorithm to physical reality."
                  sub="Drag the interactive slider below to compare our precision 3D parametric computational models against the completed on-site architecture."
                  align="center"
                />
              </div>
              <div className="reveal">
                <ConceptSplitSlider />
              </div>
            </div>
          </section>
 
          {/* ── Featured Single Project Showcase ── */}
          <section className="section-pad" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--gold-hair)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <SectionHeading
                  kicker="Featured Architecture"
                  title="Selected Architectural Works."
                  sub="A glimpse into our bespoke residential architecture, spatial proportion, and enduring materiality."
                  align="center"
                />
              </div>

              {/* Single Featured Project Large Frame */}
              <div
                className="reveal"
                style={{
                  position: 'relative',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid var(--gold-hair)',
                  background: 'var(--bg-alt)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65)',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/projects')}
              >
                <div style={{ position: 'relative', height: 'clamp(380px, 52vw, 620px)', overflow: 'hidden' }}>
                  <img
                    src={projectsImage}
                    alt="Featured Architectural Project"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.92) contrast(1.04)',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.04)'
                      e.currentTarget.style.filter = 'brightness(0.98) contrast(1.06)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.filter = 'brightness(0.92) contrast(1.04)'
                    }}
                  />

                  {/* Ambient Dark Gradient Vignette */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(5, 5, 5, 0.92) 0%, rgba(5, 5, 5, 0.35) 45%, transparent 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Bottom Overlay Info */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 'clamp(1.5rem, 4vw, 3rem)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      zIndex: 2,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.68rem',
                          letterSpacing: '0.24em',
                          color: 'var(--gold)',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          marginBottom: '0.5rem',
                        }}
                      >
                        Private Residence &amp; Villa · Lucknow
                      </div>
                      <h3
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                          fontWeight: 300,
                          color: '#FAF7F2',
                          lineHeight: 1.2,
                          margin: 0,
                        }}
                      >
                        Contemporary Classical Luxury Residence
                      </h3>
                    </div>

                    <div>
                      <button
                        className="btn-gold"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate('/projects')
                        }}
                        style={{ padding: '0.9rem 2.4rem' }}
                      >
                        Explore More Projects →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Services Showcase ── */}
          <section className="section-pad" style={{ background: 'var(--bg-alt)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <SectionHeading
                kicker="Disciplines"
                title="Comprehensive design and execution."
                sub="Architecture, interior design, landscape, and project management under one roof — ensuring zero dilution from drawing board to site execution."
                align="center"
              />
              <div style={{ marginTop: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} gap={24} autoPlay={true} autoPlayInterval={3400}>
                  {servicePreview.map((s, i) => (
                    <ServicePreviewCard key={i} s={s} />
                  ))}
                </CardCarousel>
              </div>
            </div>
          </section>

          {/* ── Awards & Recognition ── */}
          <section className="section-pad" style={{ background: 'var(--bg)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <SectionHeading kicker="Recognition" title="Awards that followed the work." />
              <div style={{ marginTop: 'clamp(2.5rem, 3.5vw, 3rem)' }}>
                <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 2 }} gap={20} autoPlay={true} autoPlayInterval={4000}>
                  {awards.map((a, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'var(--bg-alt)',
                        border: '1px solid var(--text-hair)',
                        padding: 'clamp(1.5rem, 3vw, 2.4rem)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        height: '100%',
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: '1.25rem',
                            fontWeight: 300,
                            color: 'var(--heading)',
                            marginBottom: '0.35rem',
                          }}
                        >
                          {a.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.62rem',
                            letterSpacing: '0.18em',
                            color: 'var(--text-faint)',
                            textTransform: 'uppercase',
                          }}
                        >
                          {a.body}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.4rem',
                          color: 'var(--gold)',
                          fontStyle: 'italic',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {a.badge}
                      </span>
                    </div>
                  ))}
                </CardCarousel>
              </div>
            </div>
          </section>

          {/* ── Client Voices / Reviews ── */}
          <section className="section-pad" style={{ background: 'var(--bg-alt)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <SectionHeading kicker="Client Reflections" title="What they say when the home is lived in." align="center" />
              <div style={{ marginTop: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} gap={24} autoPlay={true} autoPlayInterval={5000}>
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      style={{
                        border: '1px solid var(--gold-hair)',
                        background: 'var(--bg)',
                        padding: 'clamp(1.6rem, 3vw, 2.2rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                        height: '100%',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.1rem',
                          fontStyle: 'italic',
                          lineHeight: 1.7,
                          color: 'var(--text-bright)',
                          margin: 0,
                        }}
                      >
                        “{t.quote}”
                      </p>
                      <div style={{ borderTop: '1px solid var(--text-hair)', paddingTop: '1rem' }}>
                        <div
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: '1.15rem',
                            color: 'var(--text)',
                          }}
                        >
                          {t.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.62rem',
                            letterSpacing: '0.14em',
                            color: 'var(--gold)',
                            textTransform: 'uppercase',
                            marginTop: '0.25rem',
                          }}
                        >
                          {t.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardCarousel>
              </div>
            </div>
          </section>

          <CTABanner
            title="Begin your architectural journey with Ekora."
            sub="Schedule a private consultation at our New Delhi head office or Lucknow regional studio."
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
