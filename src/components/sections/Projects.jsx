import { useState, useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import { projectsData } from '../../data/projectsData'
import ProjectModal from '../ui/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export default function Projects({
  id = 'projects',
  title = 'Featured Works',
  subtitle = 'Iconic Architecture · Bespoke Interiors · Master Planning',
}) {
  const sectionRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const navigate = useNavigate()

  // Categories list
  const categories = useMemo(() => {
    return [
      { key: 'all', label: 'All Works', count: projectsData.length },
      {
        key: '360',
        label: '360° Tours',
        count: projectsData.filter((p) => p.panoramas && p.panoramas.length > 0).length,
      },
      {
        key: 'Residential',
        label: 'Residential',
        count: projectsData.filter((p) => p.type === 'Residential').length,
      },
      {
        key: 'Commercial',
        label: 'Commercial',
        count: projectsData.filter((p) => p.type === 'Commercial').length,
      },
      {
        key: 'Healthcare',
        label: 'Healthcare',
        count: projectsData.filter((p) => p.type === 'Healthcare').length,
      },
    ]
  }, [])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projectsData
    if (activeCategory === '360') return projectsData.filter((p) => p.panoramas && p.panoramas.length > 0)
    return projectsData.filter((p) => p.type === activeCategory)
  }, [activeCategory])

  // Aparna Kaushik Editorial Layout Sequence: [1 Full Width] -> [2 Pair] -> [1 Full Width]...
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
        })
        i += 1
        isFull = false
      } else {
        rows.push({
          type: 'pair',
          items: [filteredProjects[i], filteredProjects[i + 1]],
          id: `row-${i}`,
        })
        i += 2
        isFull = true
      }
    }
    return rows
  }, [filteredProjects])

  // Smooth Scroll Reveal for Project Cards (No harsh clip-path white borders)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const apertureCards = document.querySelectorAll('.camera-aperture-card')

      apertureCards.forEach((card) => {
        const frame = card.querySelector('.aperture-frame')
        const img = card.querySelector('.aperture-img')

        if (frame) {
          gsap.fromTo(
            frame,
            { y: 30, opacity: 0.85 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                end: 'top 45%',
                scrub: 1,
              },
            }
          )
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.08 },
            {
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                end: 'top 35%',
                scrub: 1.2,
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [editorialRows])

  return (
    <section
      id={id}
      ref={sectionRef}
      className="hp_sec7 featured-works-section"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        padding: 'clamp(3.5rem, 5vw, 5rem) 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 clamp(1rem, 3.5vw, 3.5rem)' }}>
        {/* ── Section Header & Category Filter ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.35em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
              }}
            >
              Selected Portfolio
            </span>
            <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
          </div>

          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
              fontWeight: 300,
              color: 'var(--heading)',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              color: 'var(--text-dim)',
              marginBottom: '1.75rem',
            }}
          >
            {subtitle}
          </p>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              justifyContent: 'center',
            }}
          >
            {categories.map((cat) => {
              const active = activeCategory === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  data-hoversize="7"
                  style={{
                    padding: '0.5rem 1.4rem',
                    borderRadius: '30px',
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--text-hair)'}`,
                    background: active ? 'var(--gold)' : 'transparent',
                    color: active ? '#FFFFFF' : 'var(--text-dim)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat.label} ({cat.count})
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Editorial Staggered Layout Rows ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
          {editorialRows.map((row) => {
            if (row.type === 'full') {
              const project = row.items[0]
              return (
                <div
                  key={row.id}
                  className="camera-aperture-card aparna-lyt2 full"
                  onClick={() => setSelectedProject(project)}
                  data-hoversize="8"
                  style={{
                    width: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  {/* Aperture Frame */}
                  <div
                    className="aperture-frame pc"
                    style={{
                      width: '100%',
                      height: 'clamp(400px, 62vh, 700px)',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '3px',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <img
                      className="aperture-img"
                      src={project.images[0]}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 35%',
                        transformOrigin: 'center center',
                        willChange: 'transform',
                        filter: 'brightness(var(--media-dark, 0.95))',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(14, 4, 7, 0.88) 0%, transparent 60%)',
                      }}
                    />

                    {/* Project Metadata Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2.5rem',
                        left: '2.5rem',
                        right: '2.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        zIndex: 2,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.65rem',
                            letterSpacing: '0.3em',
                            color: 'var(--gold, #C8193D)',
                            textTransform: 'uppercase',
                            marginBottom: '0.4rem',
                          }}
                        >
                          {project.type} · {project.location}
                        </div>
                        <h3
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)',
                            color: '#FFFFFF',
                            fontWeight: 300,
                            lineHeight: 1.15,
                            margin: 0,
                          }}
                        >
                          {project.name}
                        </h3>
                      </div>

                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          border: '1px solid rgba(255, 255, 255, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          background: 'rgba(0, 0, 0, 0.3)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            // Pair Row (2 Columns)
            return (
              <div
                key={row.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  gap: 'clamp(1rem, 2vw, 1.8rem)',
                  width: '100%',
                }}
              >
                {row.items.map((project, pIdx) => (
                  <div
                    key={project.id || pIdx}
                    className="camera-aperture-card aparna-lyt2 pair"
                    onClick={() => setSelectedProject(project)}
                    data-hoversize="8"
                    style={{
                      width: '100%',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      className="aperture-frame pc"
                      style={{
                        width: '100%',
                        height: 'clamp(380px, 55vh, 580px)',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '2px',
                        boxShadow: 'var(--shadow-card)',
                        willChange: 'clip-path, opacity',
                      }}
                    >
                      <img
                        className="aperture-img"
                        src={project.images[0]}
                        alt={project.name}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 35%',
                          transformOrigin: 'center center',
                          willChange: 'transform',
                          filter: 'brightness(var(--media-dark, 0.95))',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(14, 4, 7, 0.88) 0%, transparent 60%)',
                        }}
                      />

                      {/* Project Metadata Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '2rem',
                          left: '2rem',
                          right: '2rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-end',
                          zIndex: 2,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.62rem',
                              letterSpacing: '0.25em',
                              color: 'var(--gold, #C8193D)',
                              textTransform: 'uppercase',
                              marginBottom: '0.3rem',
                            }}
                          >
                            {project.type} · {project.location}
                          </div>
                          <h3
                            style={{
                              fontFamily: 'Cormorant Garamond, serif',
                              fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
                              color: '#FFFFFF',
                              fontWeight: 300,
                              lineHeight: 1.2,
                              margin: 0,
                            }}
                          >
                            {project.name}
                          </h3>
                        </div>

                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            background: 'rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* View All Projects Action */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
          <button
            onClick={() => navigate('/projects')}
            data-hoversize="8"
            className="btn_view"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.85rem 2.2rem',
              borderRadius: '40px',
              border: '1px solid var(--gold)',
              background: 'transparent',
              color: 'var(--heading)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.35s ease',
            }}
          >
            <span>View All Architecture Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
