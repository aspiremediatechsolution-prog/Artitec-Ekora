import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

import PageBanner from './PageBanner'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/ui/CTABanner'
import TiltCard from '../components/ui/TiltCard'
import Paronma360Viewer from '../components/ui/Paronma360Viewer'
import ErrorBoundary from '../components/ui/ErrorBoundary'
import ProjectModal from '../components/ui/ProjectModal'
import ScrollParallaxFloaters from '../components/ui/ScrollParallaxFloaters'
import CardCarousel from '../components/ui/CardCarousel'
import { statsVideo, ctaProjects, gallery3, w2_16_59, w2_17_17 } from '../assets'
import { projectsData } from '../data/projectsData'
import { panoramaProjects } from '../data/panoramasData'

gsap.registerPlugin(ScrollTrigger)

const projectsFloaters = [
  { img: gallery3, kicker: '01 · Chishti Residence', title: 'Spherical VR Immersion', top: '10%', side: 'right' },
  { img: w2_16_59, kicker: '02 · Classical Villa', title: 'Neoclassical Symmetry', top: '48%', side: 'left' },
  { img: w2_17_17, kicker: '03 · Workplace Studio', title: 'Collaborative Environment', top: '78%', side: 'right' },
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

/* ══════════════════════════════════════════════════════════════
   MAIN PROJECTS PAGE COMPONENT
══════════════════════════════════════════════════════════════ */
export default function ProjectsPage() {
  const pageRef = useRef(null)
  const statsVideoRef = useRef(null)
  const navigate = useNavigate()

  // Selected project for modal showcase
  const [selectedProject, setSelectedProject] = useState(null)

  // Category filter state
  const [activeCategory, setActiveCategory] = useState('all')

  // 360 Virtual Tour active client project state
  const [activePanoProjectId, setActivePanoProjectId] = useState(panoramaProjects[0]?.id || '')
  const activePanoProject = useMemo(() => {
    return panoramaProjects.find((p) => p.id === activePanoProjectId) || panoramaProjects[0]
  }, [activePanoProjectId])

  // Categories list
  const categories = useMemo(() => {
    return [
      { key: 'all', label: 'All Works', count: projectsData.length },
      {
        key: '360',
        label: '360° Virtual Tours',
        count: projectsData.filter((p) => p.panoramas && p.panoramas.length > 0).length,
      },
      {
        key: 'residential',
        label: 'Residential',
        count: projectsData.filter((p) => p.type.toLowerCase().includes('residential')).length,
      },
      {
        key: 'commercial',
        label: 'Commercial',
        count: projectsData.filter((p) => p.type.toLowerCase().includes('commercial')).length,
      },
      {
        key: 'healthcare',
        label: 'Healthcare',
        count: projectsData.filter((p) => p.type.toLowerCase().includes('healthcare')).length,
      },
      {
        key: 'international',
        label: 'International',
        count: projectsData.filter((p) => p.type.toLowerCase().includes('international')).length,
      },
    ]
  }, [])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projectsData
    if (activeCategory === '360') {
      return projectsData.filter((p) => p.panoramas && p.panoramas.length > 0)
    }
    return projectsData.filter((p) => p.type.toLowerCase().includes(activeCategory.toLowerCase()))
  }, [activeCategory])

  // Group filtered projects into Aparna Kaushik alternating rhythm:
  // [1 Full Width] -> [2 Pair] -> [1 Full Width] -> [2 Pair] -> [1 Full Width]...
  const editorialRows = useMemo(() => {
    const rows = []
    let i = 0
    let isFull = true

    while (i < filteredProjects.length) {
      if (isFull || i === filteredProjects.length - 1) {
        rows.push({
          type: 'full',
          items: [filteredProjects[i]],
          id: `row-${i}`,
          isPriority: i === 0,
        })
        i += 1
        isFull = false
      } else {
        rows.push({
          type: 'pair',
          items: [filteredProjects[i], filteredProjects[i + 1]],
          id: `row-${i}`,
          isPriority: i <= 2,
        })
        i += 2
        isFull = true
      }
    }
    return rows
  }, [filteredProjects])

  useEffect(() => {
    if (statsVideoRef.current) {
      statsVideoRef.current.muted = true
      statsVideoRef.current.play().catch(() => {})
    }

    const ctx = gsap.context(() => {
      // 1. General page reveals
      gsap.utils.toArray('.page-reveal').forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%' },
        })
      })

      // 2. Showcase Header Title Reveal (lyt1)
      gsap.fromTo(
        '.aparna-lyt1 .t1',
        { y: 20, opacity: 0, letterSpacing: '0.45em' },
        {
          y: 0,
          opacity: 1,
          letterSpacing: '0.35em',
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.aparna-lyt1', start: 'top 90%' },
        }
      )
      gsap.fromTo(
        '.aparna-lyt1 .t2',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.aparna-lyt1', start: 'top 90%' },
        }
      )

      // 3. Category Filter Pills Stagger
      gsap.fromTo(
        '.aparna-filter-btn',
        { y: 20, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.aparna-filter-bar', start: 'top 92%' },
        }
      )

      // 4. Aparna Kaushik Full-Width Showcase Rows (Scroll Reveal + Parallax Depth)
      gsap.utils.toArray('.aparna-lyt2.full').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 94%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Continuous subtle parallax on the image
        const img = row.querySelector('.pc img')
        if (img) {
          gsap.fromTo(
            img,
            { y: -25, scale: 1.08 },
            {
              y: 25,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          )
        }
      })

      // 5. Aparna Kaushik 2-Column Split Rows (Left & Right Glide + Parallax)
      gsap.utils.toArray('.aparna-lyt2.split').forEach((row) => {
        const leftCard = row.querySelector('.dv:first-child')
        const rightCard = row.querySelector('.dv:last-child')

        if (leftCard) {
          gsap.fromTo(
            leftCard,
            { x: -35, y: 35, opacity: 0, scale: 0.97 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 94%',
                toggleActions: 'play none none none',
              },
            }
          )
          const imgL = leftCard.querySelector('.pc img')
          if (imgL) {
            gsap.fromTo(
              imgL,
              { y: -20, scale: 1.07 },
              {
                y: 20,
                scale: 1.01,
                ease: 'none',
                scrollTrigger: {
                  trigger: row,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              }
            )
          }
        }

        if (rightCard && rightCard !== leftCard) {
          gsap.fromTo(
            rightCard,
            { x: 35, y: 35, opacity: 0, scale: 0.97 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 94%',
                toggleActions: 'play none none none',
              },
            }
          )
          const imgR = rightCard.querySelector('.pc img')
          if (imgR) {
            gsap.fromTo(
              imgR,
              { y: -20, scale: 1.07 },
              {
                y: 20,
                scale: 1.01,
                ease: 'none',
                scrollTrigger: {
                  trigger: row,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              }
            )
          }
        }
      })

      // 6. Client Testimonials Stagger
      gsap.fromTo(
        '.testimonial-card-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-grid-container',
            start: 'top 88%',
          },
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [editorialRows])

  return (
    <>
      <main ref={pageRef}>
        {/* ── Page Banner ── */}
        <PageBanner
          title="Selected Works"
          sub="360° Virtual Immersion · Architecture · Interiors · Visualizations"
          video={ctaProjects}
        />

        {/* ── Content Wrapper with Floating Architectural Parallax Images ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ScrollParallaxFloaters floaters={projectsFloaters} />

          {/* ══════════════════════════════════════════════════════════
              SECTION 1 (HERO FEATURE): 360° VIRTUAL WALKTHROUGHS EXPLORER (Mr. Chishti Residence)
          ══════════════════════════════════════════════════════════ */}
          <section id="360-hero-section" style={{ background: 'var(--bg-deep)', paddingTop: 'clamp(3rem, 5vw, 4.5rem)', paddingBottom: 'clamp(2.5rem, 4vw, 3.5rem)', borderBottom: '1px solid var(--gold-hair)' }}>
          <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 5%' }}>
            <div className="page-reveal" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <SectionHeading
                kicker="Spatial Immersion"
                title="360° Interactive Virtual Walkthrough."
                sub="Step inside Mr. Chishti Residence and our bespoke architectural commissions in full 360-degree interactive spherical perspective. Drag and explore every space in real time."
                align="center"
              />
            </div>

            {/* Client Project Selector Tabs */}
            <div
              className="page-reveal pano-tabs-container"
              style={{
                display: 'flex',
                gap: '0.75rem',
                overflowX: 'auto',
                paddingBottom: '1.25rem',
                marginBottom: '2rem',
                scrollbarWidth: 'none',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {panoramaProjects.map((proj) => {
                const isActive = proj.id === activePanoProjectId
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActivePanoProjectId(proj.id)}
                    style={{
                      padding: '0.8rem 1.5rem',
                      background: isActive ? 'var(--gold)' : 'var(--bg-alt)',
                      color: isActive ? 'var(--on-gold)' : 'var(--text)',
                      border: isActive ? '1px solid var(--gold)' : '1px solid var(--gold-hair)',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      fontFamily: 'Inter',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      fontWeight: isActive ? 600 : 400,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic' }}>
                      {proj.index}
                    </span>
                    <span>{proj.name}</span>
                    <span
                      style={{
                        fontSize: '0.58rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '2px',
                        background: isActive ? 'rgba(0,0,0,0.15)' : 'var(--chip-bg)',
                        color: isActive ? 'var(--on-gold)' : 'var(--gold)',
                      }}
                    >
                      {proj.spaces.length} Views
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Interactive 360 Viewer Card */}
            {activePanoProject && (
              <div
                className="page-reveal"
                style={{
                  background: 'var(--bg-alt)',
                  border: '1px solid var(--text-hair)',
                  padding: 'clamp(0.8rem, 2vw, 1.8rem)',
                  borderRadius: '2px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid var(--gold-hair)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '0.58rem',
                        letterSpacing: '0.2em',
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                      }}
                    >
                      {activePanoProject.type} · {activePanoProject.location}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                        color: 'var(--heading)',
                        margin: '0.25rem 0 0',
                        fontWeight: 400,
                      }}
                    >
                      {activePanoProject.name}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '0.85rem',
                      color: 'var(--text-soft)',
                      maxWidth: '520px',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {activePanoProject.desc}
                  </p>
                </div>

                <ErrorBoundary
                  fallback={
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-faint)' }}>
                      WebGL 360 Panorama viewer unavailable on this device.
                    </div>
                  }
                >
                  <Paronma360Viewer
                    spaces={activePanoProject.spaces}
                    title={activePanoProject.name}
                  />
                </ErrorBoundary>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: APARNA KAUSHIK PROJECT SHOWCASE (lyt1 & lyt2 Full / Split Rhythm)
        ══════════════════════════════════════════════════════════ */}
        <section id="clients-section" className="aparna-projects-showcase">
          {/* Header (lyt1) */}
          <div className="page-reveal aparna-lyt1">
            <div className="t1">Project Showcase</div>
            <h2 className="t2">Iconic Architecture · Interior Design · Furniture</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="page-reveal aparna-filter-bar">
            {categories.map((cat) => {
              const isActive = cat.key === activeCategory
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`aparna-filter-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="badge">{cat.count}</span>
                </button>
              )
            })}
          </div>

          {/* ── APARNA KAUSHIK ALTERNATING LAYOUT (lyt2 full & lyt2 split) ── */}
          <div className="aparna-layout-container">
            {editorialRows.map((row) => {
              if (row.type === 'full') {
                const project = row.items[0]
                const coverImg = project.images?.[0] || '/projects/clinic-lucknow/1.png'
                return (
                  <div key={row.id} className="aparna-lyt2 full">
                    <div
                      className="dv"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="pc">
                        <img
                          src={coverImg}
                          alt={project.name}
                          loading={row.isPriority ? 'eager' : 'lazy'}
                          fetchPriority={row.isPriority ? 'high' : 'auto'}
                          decoding="async"
                        />
                      </div>
                      <div className="card-scrim" />
                      <div className="tag-indicator">
                        {project.type} · {project.location}
                      </div>
                      <div className="card-info-bottom">
                        <div className="card-kicker">
                          <span style={{ width: '18px', height: '1px', background: 'var(--gold)' }} />
                          <span>{project.type} · {project.location}</span>
                        </div>
                        <h3 className="card-title">{project.name}</h3>
                      </div>
                    </div>
                  </div>
                )
              }

              // Pair Row (2 Columns)
              const [leftProject, rightProject] = row.items
              const leftImg = leftProject.images?.[0] || '/projects/clinic-lucknow/1.png'
              const rightImg = rightProject?.images?.[0] || ''

              return (
                <div key={row.id} className="aparna-lyt2 split">
                  <div
                    className="dv"
                    onClick={() => setSelectedProject(leftProject)}
                  >
                    <div className="pc">
                      <img
                        src={leftImg}
                        alt={leftProject.name}
                        loading={row.isPriority ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                    <div className="card-scrim" />
                    <div className="tag-indicator">
                      {leftProject.type} · {leftProject.location}
                    </div>
                    <div className="card-info-bottom">
                      <div className="card-kicker">
                        <span style={{ width: '18px', height: '1px', background: 'var(--gold)' }} />
                        <span>{leftProject.type} · {leftProject.location}</span>
                      </div>
                      <h3 className="card-title">{leftProject.name}</h3>
                    </div>
                  </div>

                  {rightProject && (
                    <div
                      className="dv"
                      onClick={() => setSelectedProject(rightProject)}
                    >
                      <div className="pc">
                        <img
                          src={rightImg}
                          alt={rightProject.name}
                          loading={row.isPriority ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                      </div>
                      <div className="card-scrim" />
                      <div className="tag-indicator">
                        {rightProject.type} · {rightProject.location}
                      </div>
                      <div className="card-info-bottom">
                        <div className="card-kicker">
                          <span style={{ width: '18px', height: '1px', background: 'var(--gold)' }} />
                          <span>{rightProject.type} · {rightProject.location}</span>
                        </div>
                        <h3 className="card-title">{rightProject.name}</h3>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: STATS BAND
        ══════════════════════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(4rem, 7vw, 6.5rem) 5%', background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
          <video
            ref={(el) => {
              if (el) {
                el.muted = true
                el.defaultMuted = true
                el.playsInline = true
                el.setAttribute('playsinline', '')
                el.setAttribute('webkit-playsinline', '')
                el.setAttribute('muted', '')
                el.play().catch(() => {})
              }
              statsVideoRef.current = el
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.32) saturate(1.05)',
              opacity: 1,
              display: 'block',
            }}
          >
            <source src={statsVideo} type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay-band)' }} />
          <div className="grid-resp-4" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            {[
              { num: '200+', label: 'Delivered Projects' },
              { num: '1.2M', label: 'Sq. Ft. Designed' },
              { num: '92%', label: 'Repeat Client Ratio' },
              { num: '8', label: 'Countries Reached' },
            ].map((s, i) => (
              <TiltCard key={i} className="page-reveal" maxTilt={8}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', color: 'var(--gold)', fontWeight: 300, lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase', marginTop: '0.5rem', fontWeight: 500 }}>
                  {s.label}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4: CLIENT TESTIMONIALS
        ══════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading kicker="Client Voices" title="Reflections on completed commissions." align="center" />
            <div style={{ marginTop: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
              <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} gap={24} autoPlay={true} autoPlayInterval={5000}>
                {testimonials.map((t, i) => (
                  <TiltCard key={i} className="testimonial-card-item" style={{ height: '100%' }}>
                    <div
                      style={{
                        height: '100%',
                        padding: 'clamp(1.6rem, 3vw, 2.4rem)',
                        border: '1px solid var(--text-hair)',
                        background: 'var(--bg-alt)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                      }}
                    >
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-bright)', margin: 0 }}>
                        “{t.quote}”
                      </p>
                      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--gold-hair)' }}>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: 'var(--text)' }}>{t.name}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '0.25rem' }}>{t.role}</div>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </CardCarousel>
            </div>
          </div>
        </section>
      </div>

      <CTABanner
          title="Tour these completed projects in person."
          sub="Many of our completed residences and facilities are open for scheduled client visits. Experience the materials and light firsthand."
          video={ctaProjects}
        />
      </main>
      <Footer />

      {/* ── CLIENT PROJECT MODAL (ALL IMAGES, VIDEOS, 360 TOUR) ── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={setSelectedProject}
        />
      )}
    </>
  )
}
