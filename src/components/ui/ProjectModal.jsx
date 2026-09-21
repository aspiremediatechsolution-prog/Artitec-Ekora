import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { projectsData } from '../../data/projectsData'
import Paronma360Viewer from './Paronma360Viewer'

/* ══════════════════════════════════════════════════════════════
   FULLSCREEN IMAGE LIGHTBOX
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
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20000,
        background: 'rgba(5, 3, 4, 0.97)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
        padding: '1.5rem',
        backdropFilter: 'blur(16px)',
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
            maxWidth: '92vw',
            maxHeight: '88vh',
            objectFit: 'contain',
            boxShadow: '0 20px 80px rgba(0,0,0,0.9)',
            cursor: 'default',
            borderRadius: '2px',
          }}
        />
      ) : (
        <img
          src={currentSrc}
          alt=""
          decoding="async"
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '92vw',
            maxHeight: '88vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            boxShadow: '0 20px 80px rgba(0,0,0,0.9)',
            cursor: 'default',
            borderRadius: '2px',
          }}
        />
      )}

      {/* Prev Navigation */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(currentIndex - 1)
          }}
          aria-label="Previous"
          style={{
            position: 'absolute',
            left: 'clamp(0.8rem, 2.5vw, 2rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(24, 16, 18, 0.85)',
            border: '1px solid var(--gold-hair)',
            color: 'var(--gold)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.4rem',
            transition: 'all 0.25s ease',
          }}
        >
          ‹
        </button>
      )}

      {/* Next Navigation */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(currentIndex + 1)
          }}
          aria-label="Next"
          style={{
            position: 'absolute',
            right: 'clamp(0.8rem, 2.5vw, 2rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(24, 16, 18, 0.85)',
            border: '1px solid var(--gold-hair)',
            color: 'var(--gold)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.4rem',
            transition: 'all 0.25s ease',
          }}
        >
          ›
        </button>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: 'clamp(1rem, 3vw, 2.5rem)',
          background: 'rgba(24, 16, 18, 0.85)',
          border: '1px solid var(--gold-hair)',
          color: 'var(--gold)',
          fontFamily: 'Inter',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '2px',
        }}
      >
        CLOSE ✕
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   APARNA KAUSHIK PROJECT DETAIL SHOWCASE COMPONENT
   (Exact replication of https://aparnakaushik.com/projects/estate-hyderabad)
══════════════════════════════════════════════════════════════ */
export default function ProjectModal({ project, onClose, onSelectProject }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const detailRef = useRef(null)
  const heroImgRef = useRef(null)
  const heroContentRef = useRef(null)
  const sec0Ref = useRef(null)

  // Find index of current project in all projects
  const currentIndex = projectsData.findIndex((p) => p.id === project?.id)
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1]
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0]

  const images = project?.images || []
  const panoramas = project?.panoramas || []
  const has360 = panoramas.length > 0
  const videos = project?.videos || []
  const hasVideos = videos.length > 0

  // Hero Cover Image
  const heroCover = images[0] || '/projects/clinic-lucknow/1.png'
  // Gallery plates (excluding hero image)
  const galleryPlates = images.slice(1)

  // Group gallery plates into Aparna Kaushik alternating rhythm:
  // [1 Full Plate] -> [2 Pair Plates] -> [1 Full Plate] -> [2 Pair Plates]...
  const galleryRows = []
  let gIdx = 0
  let isFull = true

  while (gIdx < galleryPlates.length) {
    if (isFull || gIdx === galleryPlates.length - 1) {
      galleryRows.push({
        type: 'full',
        items: [galleryPlates[gIdx]],
        startIndex: gIdx + 1,
      })
      gIdx += 1
      isFull = false
    } else {
      galleryRows.push({
        type: 'pair',
        items: [galleryPlates[gIdx], galleryPlates[gIdx + 1]].filter(Boolean),
        startIndex: gIdx + 1,
      })
      gIdx += 2
      isFull = true
    }
  }

  // Lock body scroll & PAUSE Lenis smooth scroll while modal is active
  useEffect(() => {
    const origOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (window.__lenis) {
      window.__lenis.stop()
    }

    return () => {
      document.body.style.overflow = origOverflow
      if (window.__lenis) {
        window.__lenis.start()
      }
    }
  }, [project])

  // GSAP Cinematic Entrance & Continuous ScrollTrigger Animations inside Modal
  useEffect(() => {
    const scroller = detailRef.current
    if (!scroller || !project) return

    // Entrance timeline
    const tl = gsap.timeline({ delay: 0.05 })

    if (heroImgRef.current) {
      tl.fromTo(
        heroImgRef.current,
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
    }

    if (heroContentRef.current) {
      tl.fromTo(
        heroContentRef.current.children,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out' },
        '-=0.8'
      )
    }

    if (sec0Ref.current) {
      tl.fromTo(
        sec0Ref.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
    }

    // ScrollTrigger context inside the modal container
    const ctx = gsap.context(() => {
      // 1. Hero Image Parallax on modal scroll
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          y: 70,
          scale: 1.06,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: '.aparna-detail-hero',
            scroller: scroller,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.0,
          },
        })
      }

      // 2. Hero Content lift & fade on modal scroll
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          y: -45,
          opacity: 0,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: '.aparna-detail-hero',
            scroller: scroller,
            start: '20% top',
            end: 'bottom top',
            scrub: 1.0,
          },
        })
      }

      // 3. 360 Walkthrough Section Reveal
      const sec360 = scroller.querySelector('#detail-360')
      if (sec360) {
        gsap.fromTo(
          sec360,
          { y: 45, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec360,
              scroller: scroller,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 4. Architectural Plates — Full Width Plates Reveal & Parallax
      gsap.utils.toArray('.aparna-detail-gallery .full-plate').forEach((plate) => {
        gsap.fromTo(
          plate,
          { y: 45, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: plate,
              scroller: scroller,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        )

        const img = plate.querySelector('img')
        if (img) {
          gsap.fromTo(
            img,
            { y: -25, scale: 1.08 },
            {
              y: 25,
              scale: 1.01,
              ease: 'none',
              scrollTrigger: {
                trigger: plate,
                scroller: scroller,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          )
        }
      })

      // 5. Architectural Plates — 2-Column Pair Plates Glide Reveal
      gsap.utils.toArray('.aparna-detail-gallery .pair-grid').forEach((grid) => {
        const leftPlate = grid.querySelector('.pair-plate:first-child')
        const rightPlate = grid.querySelector('.pair-plate:last-child')

        if (leftPlate) {
          gsap.fromTo(
            leftPlate,
            { x: -35, y: 35, opacity: 0, scale: 0.97 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.95,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                scroller: scroller,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        if (rightPlate && rightPlate !== leftPlate) {
          gsap.fromTo(
            rightPlate,
            { x: 35, y: 35, opacity: 0, scale: 0.97 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.95,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                scroller: scroller,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })

      // 6. Next / Previous Navigation Footer Reveal
      const navFooter = scroller.querySelector('.aparna-detail-nav-footer')
      if (navFooter) {
        gsap.fromTo(
          navFooter.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: navFooter,
              scroller: scroller,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, scroller)

    return () => {
      tl.kill()
      ctx.revert()
    }
  }, [project])

  // Track modal scroll progress for the top golden indicator
  const [modalProgress, setModalProgress] = useState(0)
  const handleScroll = (e) => {
    const el = e.currentTarget
    const total = el.scrollHeight - el.clientHeight
    if (total > 0) {
      setModalProgress((el.scrollTop / total) * 100)
    }
  }

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && lightboxIndex === null) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, onClose])

  const scrollToSection = (id) => {
    const el = detailRef.current?.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!project) return null

  return (
    <div
      ref={detailRef}
      onScroll={handleScroll}
      className="aparna-detail-view"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#0d080a',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
    >
      {/* Modal Gold Scroll Progress Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 9999,
          background: 'rgba(200, 169, 106, 0.15)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${modalProgress}%`,
            background: 'linear-gradient(90deg, #C8A96A 0%, #E7D095 50%, #C8A96A 100%)',
            boxShadow: '0 0 10px rgba(200, 169, 106, 0.8), 0 0 4px rgba(231, 208, 149, 0.9)',
            transition: 'width 0.08s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      {/* ── STICKY TOP FLOATING NAV (Aparna Kaushik Header) ── */}
      <div className="aparna-detail-sticky-nav">
        <button className="aparna-detail-back-btn" onClick={onClose}>
          <span>←</span>
          <span>Back to Projects</span>
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          {has360 && (
            <button
              onClick={() => scrollToSection('#detail-360')}
              style={{
                background: 'none',
                border: '1px solid var(--gold-hair)',
                color: 'var(--gold)',
                fontFamily: 'Inter',
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '0.45rem 0.95rem',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              360° VR
            </button>
          )}
          <button
            onClick={() => scrollToSection('#detail-gallery')}
            style={{
              background: 'none',
              border: '1px solid var(--gold-hair)',
              color: 'var(--gold)',
              fontFamily: 'Inter',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.45rem 0.95rem',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
          >
            Gallery ({images.length})
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-deep)',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              fontFamily: 'Inter',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              padding: '0.45rem 1rem',
              cursor: 'pointer',
              borderRadius: '2px',
            }}
          >
            CLOSE ✕
          </button>
        </div>
      </div>

      {/* ── SECTION 1: HERO BANNER (hp_sec1) ── */}
      <div className="aparna-detail-hero">
        <img ref={heroImgRef} src={heroCover} alt={project.name} fetchPriority="high" decoding="async" />
        <div className="overlay-top" />
        <div className="overlay-bottom" />

        <div ref={heroContentRef} className="aparna-detail-hero-content">
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '0.6rem',
              fontWeight: 500,
            }}
          >
            {project.type} · {project.location}, India
          </div>
          <h1 className="aparna-detail-hero-title">{project.name}</h1>
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '0.82rem',
              color: 'var(--text-soft)',
              letterSpacing: '0.08em',
            }}
          >
            Client: <span style={{ color: 'var(--heading)' }}>{project.client}</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: PROJECT INFO & NARRATIVE (sec0) ── */}
      <div ref={sec0Ref} className="aparna-detail-sec0">
        {/* Left Column: Project Information */}
        <div className="aparna-project-info-card">
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            <span>Project Information</span>
          </div>

          <div className="aparna-info-row">
            <span className="aparna-info-label">Client</span>
            <span className="aparna-info-value">{project.client}</span>
          </div>
          <div className="aparna-info-row">
            <span className="aparna-info-label">Typology</span>
            <span className="aparna-info-value">{project.type}</span>
          </div>
          <div className="aparna-info-row">
            <span className="aparna-info-label">Location</span>
            <span className="aparna-info-value">{project.location}, India</span>
          </div>
          <div className="aparna-info-row">
            <span className="aparna-info-label">Scope</span>
            <span className="aparna-info-value" style={{ fontSize: '1.05rem' }}>
              Architecture · Interior Design
            </span>
          </div>
          {has360 && (
            <div className="aparna-info-row">
              <span className="aparna-info-label">360° VR Immersion</span>
              <span className="aparna-info-value" style={{ color: 'var(--gold)', fontSize: '1.05rem' }}>
                {panoramas.length} Interactive Spaces
              </span>
            </div>
          )}
          <div className="aparna-info-row">
            <span className="aparna-info-label">Curated Plates</span>
            <span className="aparna-info-value">{images.length} High-Res Views</span>
          </div>

          {/* Direct Action Triggers */}
          <div className="aparna-action-row">
            {has360 && (
              <button
                className="btn-gold"
                onClick={() => scrollToSection('#detail-360')}
                style={{ fontSize: '0.7rem', padding: '0.7rem 1.4rem' }}
              >
                Launch 360° Walkthrough
              </button>
            )}
            <button
              className="btn-outline"
              onClick={() => setLightboxIndex(0)}
              style={{ fontSize: '0.7rem', padding: '0.7rem 1.4rem' }}
            >
              Open Fullscreen Lightbox
            </button>
          </div>
        </div>

        {/* Right Column: Narrative / Design Philosophy */}
        <div className="aparna-detail-narrative">
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            <span>Design Concept &amp; Story</span>
          </div>

          {project.about ? (
            project.about.split('\n\n').map((para, pIdx) => (
              <p key={pIdx}>{para}</p>
            ))
          ) : (
            <p>
              An iconic spatial design conceived and executed by Ekora Architects, where architecture,
              interiors, bespoke lighting, and natural stone work in complete structural harmony.
            </p>
          )}
        </div>
      </div>

      {/* ── SECTION 3: 360° VR WALKTHROUGH (Exact same as 360 Virtual Walkthrough Section) ── */}
      {has360 && (
        <div id="detail-360" style={{ maxWidth: '1440px', margin: '4rem auto', padding: '0 clamp(1rem, 3vw, 3rem)' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '28px', height: '1px', background: '#ffffff' }} />
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                color: '#ffffff',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              360° Interactive Virtual Walkthrough ({panoramas.length} Curated Spaces)
            </span>
          </div>
          <div style={{ border: '1px solid var(--text-hair)', borderRadius: '2px', overflow: 'hidden' }}>
            <Paronma360Viewer spaces={panoramas} title={project.name} />
          </div>
        </div>
      )}

      {/* ── SECTION 4: ARCHITECTURAL GALLERY STREAM (Aparna Kaushik lyt2 full & pair plates) ── */}
      <div id="detail-gallery" className="aparna-detail-gallery">
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--gold)' }} />
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Architectural Plates ({images.length} High-Definition Frames)
            </span>
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: 'var(--text-faint)' }}>
            Click any plate for fullscreen zoom
          </span>
        </div>

        {galleryRows.map((row, rIdx) => {
          if (row.type === 'full') {
            const imgSrc = row.items[0]
            const imgGlobalIdx = row.startIndex
            return (
              <div
                key={rIdx}
                className="full-plate"
                onClick={() => setLightboxIndex(imgGlobalIdx)}
              >
                <img src={imgSrc} alt={`${project.name} — ${imgGlobalIdx}`} loading="lazy" decoding="async" />
              </div>
            )
          }

          // Pair Row (2 Columns)
          return (
            <div key={rIdx} className="pair-grid">
              {row.items.map((imgSrc, itemIdx) => {
                const imgGlobalIdx = row.startIndex + itemIdx
                return (
                  <div
                    key={itemIdx}
                    className="pair-plate"
                    onClick={() => setLightboxIndex(imgGlobalIdx)}
                  >
                    <img src={imgSrc} alt={`${project.name} — ${imgGlobalIdx}`} loading="lazy" decoding="async" />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* ── SECTION 5: NEXT / PREVIOUS PROJECT NAVIGATION (sec5) ── */}
      <div className="aparna-detail-nav-footer">
        {prevProject && (
          <button
            className="aparna-nav-btn"
            onClick={() => {
              if (onSelectProject) onSelectProject(prevProject)
              if (detailRef.current) detailRef.current.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span style={{ fontSize: '1.8rem', color: 'var(--gold)' }}>←</span>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                Previous Project
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.35rem', color: 'var(--heading)' }}>
                {prevProject.name}
              </div>
            </div>
          </button>
        )}

        <button
          className="btn-gold"
          onClick={onClose}
          style={{ fontSize: '0.72rem', padding: '0.75rem 2rem' }}
        >
          Back to All Projects
        </button>

        {nextProject && (
          <button
            className="aparna-nav-btn"
            onClick={() => {
              if (onSelectProject) onSelectProject(nextProject)
              if (detailRef.current) detailRef.current.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            style={{ textAlign: 'right' }}
          >
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                Next Project
              </div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.35rem', color: 'var(--heading)' }}>
                {nextProject.name}
              </div>
            </div>
            <span style={{ fontSize: '1.8rem', color: 'var(--gold)' }}>→</span>
          </button>
        )}
      </div>

      {/* Lightbox Component */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  )
}
