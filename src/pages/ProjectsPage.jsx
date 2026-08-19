import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
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
import { statsVideo, ctaProjects } from '../assets'
import { projectsData } from '../data/projectsData'
import { galleryImages } from '../data/galleryData'
import { panoramaProjects } from '../data/panoramasData'



gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'The design execution was exceptional. What we saw in the initial visualizations is exactly what was built on site — refined down to the millimetre.',
    name: 'Dr. Abhinav',
    role: 'Clinic & Residence, Lucknow',
  },
  {
    quote: 'Ekora treated our office like their own. Four months, zero surprises, and a space our clients now compliment before they sit down.',
    name: 'Mr. Rajdeep',
    role: 'Office Interior, Lucknow',
  },
  {
    quote: 'Every material decision was explained, every deadline met. The classical grandeur of the residence was executed with unmatched craftsmanship.',
    name: 'Mr. Ajit',
    role: 'Luxury Villa, Lucknow',
  },
]

/* ══════════════════════════════════════════════════════════════
   IMAGE LIGHTBOX (Full screen with keyboard & prev/next support)
══════════════════════════════════════════════════════════════ */
function ImageLightbox({ images, currentIndex, onClose, onNavigate }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1)
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentIndex, images.length, onClose, onNavigate])

  const currentSrc = images[currentIndex]
  if (!currentSrc) return null
  const isVideo = /\.(mp4|mov|webm|MP4|MOV)$/i.test(currentSrc)

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(10,1,2,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
        padding: '1rem',
        backdropFilter: 'blur(10px)',
      }}
    >
      {isVideo ? (
        <video
          src={currentSrc}
          controls
          autoPlay
          playsInline
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '92vw', maxHeight: '88vh',
            objectFit: 'contain',
            boxShadow: '0 0 80px rgba(0,0,0,0.85)',
            cursor: 'default',
          }}
        />
      ) : (
        <img
          src={currentSrc}
          alt=""
          decoding="async"
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '92vw', maxHeight: '88vh',
            objectFit: 'contain',
            boxShadow: '0 0 80px rgba(0,0,0,0.85)',
            cursor: 'default',
          }}
        />
      )}

      {/* Prev / Next controls */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1) }}
          aria-label="Previous image"
          style={{
            position: 'absolute', left: 'clamp(0.8rem, 2vw, 1.5rem)', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(40,3,6,0.75)', border: '1px solid var(--gold-line)',
            color: 'var(--gold)', width: '44px', height: '44px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '1.2rem', transition: 'all 0.2s',
          }}
        >
          ‹
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1) }}
          aria-label="Next image"
          style={{
            position: 'absolute', right: 'clamp(0.8rem, 2vw, 1.5rem)', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(40,3,6,0.75)', border: '1px solid var(--gold-line)',
            color: 'var(--gold)', width: '44px', height: '44px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '1.2rem', transition: 'all 0.2s',
          }}
        >
          ›
        </button>
      )}

      {/* Top bar info */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: '1.2rem', left: 'clamp(1rem, 3vw, 2rem)',
          display: 'flex', alignItems: 'center', gap: '1rem',
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontFamily: 'Inter', fontSize: '0.65rem',
          letterSpacing: '0.2em', color: 'var(--gold)',
          textTransform: 'uppercase',
        }}>
          Image {currentIndex + 1} / {images.length}
        </span>
      </div>

      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.2rem', right: 'clamp(1rem, 3vw, 2rem)',
          background: 'none', border: '1px solid var(--gold-line)',
          color: 'var(--gold)', fontFamily: 'Inter', fontSize: '0.7rem',
          letterSpacing: '0.15em', padding: '0.4rem 0.9rem', cursor: 'pointer',
        }}
      >
        CLOSE ✕
      </button>
    </div>
  )
}



/* ══════════════════════════════════════════════════════════════
   OPTIMIZED IMAGE CARD (Clean hover with NO button overlay)
══════════════════════════════════════════════════════════════ */
function ImageCardItem({ src, index, altName, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const isVideo = /\.(mp4|mov|webm|MP4|MOV)$/i.test(src)

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '16/10',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--bg-alt)',
        border: `1px solid ${hovered ? 'var(--gold)' : 'var(--text-hair)'}`,
        boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.45)' : 'none',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        contentVisibility: 'auto',
        containIntrinsicSize: '340px 212px',
        borderRadius: '2px',
      }}
    >
      {isVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
          }}
        />
      ) : (
        <img
          src={src}
          alt={`${altName} — ${index + 1}`}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            filter: hovered ? 'brightness(1.04)' : 'brightness(0.96)',
            transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1), filter 0.3s ease',
            willChange: 'transform',
          }}
        />
      )}
      <div style={{
        position: 'absolute', top: '0.65rem', right: '0.65rem',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '0.72rem',
        color: 'var(--gold)', background: 'rgba(40,3,6,0.8)',
        padding: '0.12rem 0.45rem', border: '1px solid var(--gold-hair)',
        pointerEvents: 'none',
      }}>
        {isVideo ? '▶ Video' : String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════════════════════════════ */
function SectionLabel({ text, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.2rem' }}>
      <div style={{ width: '28px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'Inter', fontSize: '0.62rem',
        letterSpacing: '0.25em', color: 'var(--gold)',
        textTransform: 'uppercase',
      }}>{text}</span>
      {count !== undefined && (
        <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--text-faint)' }}>
          ({count})
        </span>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN PROJECTS PAGE COMPONENT
══════════════════════════════════════════════════════════════ */
export default function ProjectsPage() {
  const pageRef = useRef(null)
  const statsVideoRef = useRef(null)
  const detailPanelRef = useRef(null)

  // Selected project state for master-detail (First section)
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0].id)
  const activeProject = useMemo(() => {
    return projectsData.find((p) => p.id === activeProjectId) || projectsData[0]
  }, [activeProjectId])

  // 360 Virtual Tour active client project state (Single dedicated section)
  const [activePanoProjectId, setActivePanoProjectId] = useState(panoramaProjects[0]?.id || '')
  const activePanoProject = useMemo(() => {
    return panoramaProjects.find((p) => p.id === activePanoProjectId) || panoramaProjects[0]
  }, [activePanoProjectId])

  // Lightbox state
  const [lightboxData, setLightboxData] = useState(null) // { images: [], index: 0 }

  // 360 Fullscreen Modal state
  const [active360Modal, setActive360Modal] = useState(null) // { projectName, spaces, selectedId }

  // Gallery pagination (load in batches of 24 for smooth 60fps scrolling)
  const [galleryLimit, setGalleryLimit] = useState(24)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && active360Modal) {
        setActive360Modal(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [active360Modal])

  useEffect(() => {
    if (statsVideoRef.current) {
      statsVideoRef.current.muted = true
      statsVideoRef.current.play().catch(() => {})
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.page-reveal').forEach((el) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const handleSelectProject = useCallback((id) => {
    setActiveProjectId(id)
    if (detailPanelRef.current && window.innerWidth <= 992) {
      detailPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const openLightbox = useCallback((imageList, index) => {
    setLightboxData({ images: imageList, index })
  }, [])

  const navigateLightbox = useCallback((newIndex) => {
    setLightboxData((prev) => prev ? { ...prev, index: newIndex } : null)
  }, [])

  const scrollToSection = (id) => {
    const el = document.querySelector(id)
    if (!el) return
    const yOffset = -75
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const projectImages = activeProject.images || []

  return (
    <>
      <main ref={pageRef}>
        {/* ── Page Banner ── */}
        <PageBanner
          title="Projects"
          sub="Architecture · Interiors · Visualizations · 360° Virtual Walkthroughs · Studio Gallery"
          video="/projects/chishti-residence/project intro.mp4"
          actions={[
            { text: 'Our Clients', onClick: () => scrollToSection('#clients-section'), primary: true },
            { text: '360° Virtual Tours', onClick: () => scrollToSection('#360-tours-section'), primary: false },
            { text: 'Studio Gallery', onClick: () => scrollToSection('#gallery-section'), primary: false },
          ]}
        />



        {/* ══════════════════════════════════════════════════════════
            SECTION 1: CLIENT PROJECTS (Responsive Master-Detail)
        ══════════════════════════════════════════════════════════ */}
        <section id="clients-section" className="section-pad" style={{ background: 'var(--bg)', paddingTop: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
            
            <div className="page-reveal" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
              <SectionHeading
                kicker="Client Commissions"
                title="Explore Our Projects."
                sub="Select any client commission below to explore its architectural narrative, spatial compositions, and high-resolution imagery."
                align="left"
              />
            </div>

            {/* ── Mobile / Tablet Horizontal Client Selector (Visible <= 992px) ── */}
            <div className="mobile-client-selector" style={{ marginBottom: '1.8rem' }}>
              <div style={{
                fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.2em',
                color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.6rem',
              }}>
                Select Client Project ({projectsData.length})
              </div>
              <div style={{
                display: 'flex',
                gap: '0.6rem',
                overflowX: 'auto',
                paddingBottom: '0.6rem',
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch',
              }}>
                {projectsData.map((p, idx) => {
                  const isActive = p.id === activeProjectId
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProject(p.id)}
                      style={{
                        flexShrink: 0,
                        padding: '0.65rem 1.1rem',
                        background: isActive ? 'var(--gold)' : 'var(--card-bg-deep)',
                        color: isActive ? '#120204' : 'var(--text)',
                        border: isActive ? '1px solid var(--gold)' : '1px solid var(--gold-hair)',
                        cursor: 'pointer',
                        borderRadius: '3px',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{
                        fontFamily: 'Inter', fontSize: '0.52rem',
                        letterSpacing: '0.12em', color: isActive ? '#380408' : 'var(--text-faint)',
                        textTransform: 'uppercase',
                      }}>
                        {String(idx + 1).padStart(2, '0')} · {p.type}
                      </div>
                      <div style={{
                        fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem',
                        fontWeight: isActive ? 500 : 300, whiteSpace: 'nowrap',
                      }}>
                        {p.name}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Master-Detail Layout Container ── */}
            <div className="projects-master-layout">

              {/* ── DESKTOP LEFT SIDEBAR (Visible > 992px) ── */}
              <aside className="desktop-client-sidebar" style={{
                background: 'var(--card-bg-deep)',
                border: '1px solid var(--text-hair)',
                position: 'sticky',
                top: '90px',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                borderRadius: '2px',
              }}>
                <div style={{
                  padding: '1.2rem 1.5rem',
                  borderBottom: '1px solid var(--gold-hair)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '0.62rem',
                    letterSpacing: '0.22em', color: 'var(--gold)',
                    textTransform: 'uppercase', fontWeight: 500,
                  }}>
                    Client Projects ({projectsData.length})
                  </span>
                </div>

                <nav style={{ padding: '0.3rem 0' }}>
                  {projectsData.map((p, idx) => {
                    const isActive = p.id === activeProjectId
                    const imgCount = (p.images || []).length
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProject(p.id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.95rem 1.4rem',
                          background: isActive ? 'rgba(200,169,106,0.12)' : 'transparent',
                          border: 'none',
                          borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                          display: 'block',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                          <span style={{
                            fontFamily: 'Inter', fontSize: '0.54rem',
                            letterSpacing: '0.15em', color: isActive ? 'var(--gold)' : 'var(--text-faint)',
                            textTransform: 'uppercase',
                          }}>
                            {String(idx + 1).padStart(2, '0')} · {p.type}
                          </span>
                          <span style={{
                            fontFamily: 'Inter', fontSize: '0.54rem',
                            color: 'var(--text-mute)',
                          }}>
                            {imgCount} Photos
                          </span>
                        </div>

                        <div style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.08rem',
                          color: isActive ? 'var(--gold)' : 'var(--text)',
                          fontWeight: isActive ? 400 : 300,
                          lineHeight: 1.25,
                        }}>
                          {p.name}
                        </div>

                        <div style={{
                          fontFamily: 'Inter', fontSize: '0.62rem',
                          color: 'var(--text-dim)', marginTop: '0.15rem',
                        }}>
                          {p.location}
                        </div>
                      </button>
                    )
                  })}
                </nav>
              </aside>

              {/* ── RIGHT DETAIL PANEL: Active Project Info & Media ── */}
              <div ref={detailPanelRef} className="project-detail-panel" style={{ minWidth: 0 }}>
                
                {/* Project Header Banner */}
                <div style={{
                  background: 'var(--card-bg-deep)',
                  border: '1px solid var(--text-hair)',
                  padding: 'clamp(1.4rem, 3vw, 2.4rem)',
                  marginBottom: '2rem',
                  borderRadius: '2px',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '1.2rem',
                    paddingBottom: '1.2rem',
                    borderBottom: '1px solid var(--gold-hair)',
                  }}>
                    <div>
                      <div style={{
                        fontFamily: 'Inter', fontSize: '0.58rem',
                        letterSpacing: '0.25em', color: 'var(--gold)',
                        textTransform: 'uppercase', marginBottom: '0.3rem',
                      }}>
                        {activeProject.type} · {activeProject.location}
                      </div>
                      <h1 style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                        fontWeight: 300, color: 'var(--text)',
                        lineHeight: 1.15, margin: 0,
                      }}>
                        {activeProject.name}
                      </h1>
                    </div>

                    <div style={{
                      background: 'rgba(40,3,6,0.6)',
                      border: '1px solid var(--gold-hair)',
                      padding: '0.5rem 1.1rem',
                      textAlign: 'right',
                    }}>
                      <div style={{ fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>Client</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: 'var(--gold)' }}>{activeProject.client}</div>
                    </div>
                  </div>

                  {/* About the Project Narrative */}
                  {activeProject.about && (
                    <div style={{ marginTop: '1.2rem' }}>
                      <SectionLabel text="About the Project" />
                      {activeProject.about.split('\n\n').map((para, i) => (
                        <p key={i} style={{
                          fontFamily: 'Inter', fontSize: '0.82rem',
                          lineHeight: 1.85, color: 'var(--text-dim)',
                          marginBottom: '0.9rem',
                        }}>
                          {para.trim()}
                        </p>
                      ))}
                    </div>
                  )}
                </div>



                {/* ── Architectural Photography & Views (Clean hover, NO button overlay) ── */}
                {projectImages.length > 0 && (
                  <div>
                    <SectionLabel text="Architectural Photography & Views" count={projectImages.length} />
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                      gap: '1.2rem',
                    }}>
                      {projectImages.map((src, i) => (
                        <ImageCardItem
                          key={i}
                          src={src}
                          index={i}
                          altName={activeProject.name}
                          onOpen={() => openLightbox(projectImages, i)}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: 360° VIRTUAL WALKTHROUGHS (Single Unified Interactive Section)
        ══════════════════════════════════════════════════════════ */}
        <section id="360-tours-section" style={{ background: 'var(--bg-deep)', paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)', paddingBottom: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
          <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 5%' }}>
            
            {/* Section Heading */}
            <div className="page-reveal" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
              <SectionHeading
                kicker="Spatial Immersion"
                title="360° Interactive Virtual Walkthrough."
                sub="Step inside our key architectural commissions in full 360-degree interactive spherical perspective. Select a client commission below and explore every space in real-time."
                align="center"
              />
            </div>

            {/* Client Project Selector Tabs */}
            <div className="page-reveal pano-tabs-container" style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              paddingBottom: '1.2rem',
              marginBottom: '2rem',
              scrollbarWidth: 'none',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {panoramaProjects.map((proj) => {
                const isActive = proj.id === activePanoProjectId
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActivePanoProjectId(proj.id)}
                    style={{
                      padding: '0.75rem 1.4rem',
                      background: isActive ? 'var(--gold)' : 'var(--card-bg-deep)',
                      color: isActive ? '#120204' : 'var(--text)',
                      border: isActive ? '1px solid var(--gold)' : '1px solid var(--gold-hair)',
                      cursor: 'pointer',
                      borderRadius: '3px',
                      fontFamily: 'Inter',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      fontWeight: isActive ? 600 : 400,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      transition: 'all 0.25s ease',
                      boxShadow: isActive ? '0 6px 20px rgba(200, 169, 106, 0.3)' : 'none',
                    }}
                  >
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontStyle: 'italic' }}>
                      {proj.index}
                    </span>
                    <span>{proj.name}</span>
                    <span style={{
                      fontSize: '0.55rem',
                      padding: '0.12rem 0.45rem',
                      borderRadius: '10px',
                      background: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(200,169,106,0.15)',
                      color: isActive ? '#120204' : 'var(--gold)',
                    }}>
                      {proj.spaces.length} Views
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Main Interactive 360 Viewer Card */}
            {activePanoProject && (
              <div
                className="page-reveal"
                style={{
                  background: 'var(--card-bg-deep)',
                  border: '1px solid var(--text-hair)',
                  padding: 'clamp(0.4rem, 2vw, 1.8rem)',
                  borderRadius: '4px',
                }}
              >
                {/* Project Header Info */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.2rem',
                  borderBottom: '1px solid var(--gold-hair)',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                      <span style={{
                        fontFamily: 'Inter', fontSize: '0.55rem',
                        letterSpacing: '0.2em', color: 'var(--gold)',
                        textTransform: 'uppercase',
                      }}>
                        {activePanoProject.type} · {activePanoProject.location}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                      fontWeight: 300, color: 'var(--text)',
                      margin: 0,
                    }}>
                      {activePanoProject.name}
                    </h3>
                    <p style={{
                      fontFamily: 'Inter', fontSize: '0.8rem',
                      lineHeight: 1.6, color: 'var(--text-dim)',
                      marginTop: '0.5rem', maxWidth: '750px',
                    }}>
                      {activePanoProject.desc}
                    </p>
                  </div>

                  <div style={{
                    background: 'rgba(40,3,6,0.6)',
                    border: '1px solid var(--gold-hair)',
                    padding: '0.5rem 1rem',
                    borderRadius: '3px',
                  }}>
                    <div style={{
                      fontFamily: 'Inter', fontSize: '0.5rem',
                      letterSpacing: '0.15em', color: 'var(--text-faint)',
                      textTransform: 'uppercase', marginBottom: '0.2rem',
                    }}>
                      Available Spaces
                    </div>
                    <div style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem',
                      color: 'var(--gold)',
                    }}>
                      {activePanoProject.spaces.length} 360° Panoramic Spaces
                    </div>
                  </div>
                </div>

                {/* Paronma 360 Viewer */}
                <ErrorBoundary>
                  <Paronma360Viewer
                    key={activePanoProject.id}
                    panoramas={activePanoProject.spaces}
                    projectName={activePanoProject.name}
                    clientName={activePanoProject.name}
                    initialActiveId={activePanoProject.spaces[0]?.id}
                  />
                </ErrorBoundary>
              </div>
            )}

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: STUDIO GALLERY (From Gallery Folder)
        ══════════════════════════════════════════════════════════ */}
        <section id="gallery-section" className="section-pad" style={{ background: 'var(--bg)', position: 'relative' }}>


          <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
            
            <div className="page-reveal">
              <SectionHeading
                kicker="Ekora Architectural Archive"
                title="Studio Gallery."
                sub="A curated visual archive of materials, spatial compositions, kitchen designs, interior details, and custom architectural elements."
                align="center"
              />
            </div>

            {/* Gallery Images Grid with smooth responsive columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: '1.2rem',
              marginTop: '3rem',
            }}>
              {galleryImages.slice(0, galleryLimit).map((src, idx) => (
                <ImageCardItem
                  key={idx}
                  src={src}
                  index={idx}
                  altName="Ekora Studio Gallery"
                  onOpen={() => openLightbox(galleryImages, idx)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {galleryLimit < galleryImages.length && (
              <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                <button
                  className="btn-gold"
                  onClick={() => setGalleryLimit((prev) => Math.min(prev + 24, galleryImages.length))}
                  style={{ padding: '0.85rem 2.2rem' }}
                >
                  Load More Gallery Images ({galleryImages.length - galleryLimit} remaining)
                </button>
              </div>
            )}

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4: STATS BAND
        ══════════════════════════════════════════════════════════ */}
        <section style={{ padding: 'clamp(3.5rem, 6vw, 6rem) 5%', background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
          <video
            ref={statsVideoRef}
            src={statsVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'brightness(0.38) saturate(1.1)',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay-band)' }} />
          <div className="grid-resp-4" style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            {[
              { num: '200+', label: 'Projects Delivered' },
              { num: '1.2M', label: 'Sq. Ft. Designed' },
              { num: '92%', label: 'Repeat Clients' },
              { num: '8', label: 'Countries' },
            ].map((s, i) => (
              <TiltCard key={i} className="page-reveal" maxTilt={8}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', color: 'var(--gold)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'var(--text-faint)', textTransform: 'uppercase', marginTop: '0.4rem' }}>{s.label}</div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5: CLIENT TESTIMONIALS
        ══════════════════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading kicker="Client Words" title="What our clients say." align="center" />
            <div className="grid-resp-3" style={{ marginTop: '3.5rem' }}>
              {testimonials.map((t, i) => (
                <TiltCard key={i} className="page-reveal" style={{ height: '100%' }}>
                  <div style={{ height: '100%', padding: 'clamp(1.5rem, 3vw, 2.2rem) clamp(1.4rem, 3vw, 2.2rem)', border: '1px solid var(--text-hair)', background: 'var(--card-bg)' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 0.6, marginBottom: '1.2rem' }}>“</div>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', lineHeight: 1.85, color: 'var(--text-dim)', marginBottom: '1.5rem' }}>{t.quote}</p>
                    <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--gold-faint)' }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'var(--text)' }}>{t.name}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '0.25rem' }}>{t.role}</div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <CTABanner
          title="See these projects in person."
          sub="Most of our completed projects are open for scheduled visits. Walk through one and feel the difference."
          video={ctaProjects}
        />
      </main>
      <Footer />

      {/* Lightbox Overlay */}
      {lightboxData && (
        <ImageLightbox
          images={lightboxData.images}
          currentIndex={lightboxData.index}
          onClose={() => setLightboxData(null)}
          onNavigate={navigateLightbox}
        />
      )}


      <style>{`
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(1.5); }
        }

        .projects-master-layout {
          display: grid;
          grid-template-columns: clamp(280px, 26vw, 340px) 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        .mobile-client-selector {
          display: none;
        }

        @media (max-width: 992px) {
          .projects-master-layout {
            grid-template-columns: 1fr;
          }
          .desktop-client-sidebar {
            display: none !important;
          }
          .mobile-client-selector {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}
