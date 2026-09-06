import { useState, useRef, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsData } from '../../data/projectsData'
import ProjectModal from '../ui/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export default function Projects({ id = 'projects', title = 'Project Showcase', subtitle = 'Iconic Architecture · Interior Design · Master Planning' }) {
  const sectionRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

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
      {
        key: 'International',
        label: 'International',
        count: projectsData.filter((p) => p.type === 'International').length,
      },
    ]
  }, [])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projectsData
    if (activeCategory === '360') return projectsData.filter((p) => p.panoramas && p.panoramas.length > 0)
    return projectsData.filter((p) => p.type === activeCategory)
  }, [activeCategory])

  // Group projects into Aparna Kaushik Editorial Layout Sequence:
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

  // Fast Snappy & Smooth Scroll Animations
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.aparna-header-reveal').forEach((elem) => {
        gsap.from(elem, {
          y: 25,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 92%',
          },
        })
      })

      // Full-Width Showcase Rows (Scroll Reveal + Parallax Depth)
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

      // 2-Column Split Rows (Left & Right Glide + Parallax)
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
    }, el)

    return () => ctx.revert()
  }, [editorialRows])

  return (
    <section
      id={id}
      ref={sectionRef}
      className="section-pad aparna-projects-section"
      style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: 'clamp(4rem, 7vw, 7rem) 0' }}
    >
      <div style={{ maxWidth: '1540px', margin: '0 auto', padding: '0 clamp(1.2rem, 3.5vw, 3.5rem)' }}>
        {/* Section Header (Aparna Kaushik Editorial Style) */}
        <div
          className="aparna-header-reveal"
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.72rem, 1.2vw, 0.88rem)',
              letterSpacing: '0.38em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '0.9rem',
              fontWeight: 500,
            }}
          >
            {title}
          </div>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
              fontWeight: 300,
              color: 'var(--heading)',
              lineHeight: 1.18,
              letterSpacing: '0.04em',
              maxWidth: '960px',
              margin: '0 auto',
            }}
          >
            {subtitle}
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div
          className="aparna-header-reveal"
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
            scrollbarWidth: 'none',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat) => {
            const isActive = cat.key === activeCategory
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: '0.65rem 1.4rem',
                  background: isActive ? 'var(--gold)' : 'var(--bg-alt)',
                  color: isActive ? 'var(--on-gold)' : 'var(--text)',
                  border: isActive ? '1px solid var(--gold)' : '1px solid var(--gold-hair)',
                  borderRadius: '2px',
                  fontFamily: 'Inter',
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                  boxShadow: isActive ? '0 4px 15px var(--gold-glow)' : 'none',
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '0.6rem',
                    padding: '0.12rem 0.45rem',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(0,0,0,0.2)' : 'var(--chip-bg)',
                    color: isActive ? 'var(--on-gold)' : 'var(--gold)',
                  }}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── APARNA KAUSHIK EDITORIAL SHOWCASE ROWS (Large Sized Images) ── */}
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
      </div>

      {/* ── MODAL: ALL CLIENT DETAILS, IMAGES, CONTENT & 360 VIEWS ── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={setSelectedProject}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .aparna-pair-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
