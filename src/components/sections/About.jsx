import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import { aboutImage, gallery1, gallery4, projectsImage } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: '200+', label: 'Executed Projects' },
  { num: '100%', label: 'Bespoke Architecture' },
  { num: '15+', label: 'Years of Practice' },
  { num: '8', label: 'Countries Reached' },
]

export default function About() {
  const sectionRef = useRef(null)
  const splitFrameRef = useRef(null)
  const innerImgRef = useRef(null)
  const textBoxRef = useRef(null)

  const section2Ref = useRef(null)
  const splitFrame2Ref = useRef(null)
  const innerImg2Ref = useRef(null)
  const textBox2Ref = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    const mm = gsap.matchMedia()

    // Desktop Animation (>= 981px): 50% split expansion
    mm.add('(min-width: 981px)', () => {
      if (splitFrameRef.current && innerImgRef.current && textBoxRef.current) {
        gsap.fromTo(
          splitFrameRef.current,
          { width: '0%', opacity: 0.2 },
          {
            width: '50%',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1.2,
            },
          }
        )

        gsap.fromTo(
          innerImgRef.current,
          { scale: 1.5, x: '-8vw' },
          {
            scale: 1.0,
            x: '0vw',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1.2,
            },
          }
        )

        gsap.fromTo(
          textBoxRef.current.children,
          { x: '4vw', opacity: 0 },
          {
            x: '0vw',
            opacity: 1,
            stagger: 0.12,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (splitFrame2Ref.current && innerImg2Ref.current && textBox2Ref.current) {
        gsap.fromTo(
          splitFrame2Ref.current,
          { width: '0%', opacity: 0.2 },
          {
            width: '50%',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section2Ref.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1.2,
            },
          }
        )

        gsap.fromTo(
          innerImg2Ref.current,
          { scale: 1.5, x: '8vw' },
          {
            scale: 1.0,
            x: '0vw',
            ease: 'none',
            scrollTrigger: {
              trigger: section2Ref.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1.2,
            },
          }
        )

        gsap.fromTo(
          textBox2Ref.current.children,
          { x: '-4vw', opacity: 0 },
          {
            x: '0vw',
            opacity: 1,
            stagger: 0.12,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section2Ref.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    // Mobile / Tablet Animation (<= 980px): Natural vertical reveal
    mm.add('(max-width: 980px)', () => {
      if (splitFrameRef.current) {
        gsap.set(splitFrameRef.current, { width: '100%' })
      }
      if (splitFrame2Ref.current) {
        gsap.set(splitFrame2Ref.current, { width: '100%' })
      }
      if (innerImgRef.current) {
        gsap.set(innerImgRef.current, { width: '100%', scale: 1, x: 0 })
      }
      if (innerImg2Ref.current) {
        gsap.set(innerImg2Ref.current, { width: '100%', scale: 1, x: 0 })
      }

      if (textBoxRef.current) {
        gsap.fromTo(
          textBoxRef.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textBoxRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (textBox2Ref.current) {
        gsap.fromTo(
          textBox2Ref.current.children,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textBox2Ref.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div className="about-split-section-wrap" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
      {/* ── Section 1: Brand Story Split Parallax ── */}
      <section
        id="about"
        ref={sectionRef}
        className="hp_sec2 split-parallax-section"
        style={{
          position: 'relative',
          minHeight: 'auto',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg)',
          overflow: 'hidden',
          padding: 'clamp(3rem, 6vw, 5rem) 0',
        }}
      >
        {/* Background Watermark Logo */}
        <div
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(5rem, 20vw, 24rem)',
            color: 'var(--gold-hair)',
            fontWeight: 700,
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: 1,
            zIndex: 0,
          }}
        >
          EKORA
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
          className="split-parallax-container"
        >
          {/* Expanding Left Image Frame */}
          <div
            ref={splitFrameRef}
            className="split-frame-left"
            style={{
              height: 'clamp(320px, 60vh, 750px)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'var(--shadow-card)',
              borderRight: '1px solid var(--gold-mid)',
            }}
          >
            <img
              ref={innerImgRef}
              src={aboutImage}
              alt="Ekora Architectural Craft"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transformOrigin: 'center center',
                willChange: 'transform',
                display: 'block',
              }}
            />
            {/* Cinematic subtle gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%, rgba(0,0,0,0.3) 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Staggered Right Text Block */}
          <div
            ref={textBoxRef}
            className="split-text-right"
            style={{
              padding: 'clamp(1.75rem, 5vw, 6rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.3em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                }}
              >
                Brand Story
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 4.2rem)',
                fontWeight: 300,
                color: 'var(--heading)',
                lineHeight: 1.15,
                marginBottom: '0.35rem',
              }}
            >
              "Designing a home is like drawing a
            </h2>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 4.2rem)',
                fontWeight: 300,
                color: 'var(--gold)',
                fontStyle: 'italic',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              portrait of your client."
            </h2>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.85,
                color: 'var(--text-dim)',
                marginBottom: '1.5rem',
                maxWidth: '520px',
              }}
            >
              Founded on the timeless doctrine of spatial purity, Ekora Atelier sculpts bespoke residences, private estates, and luxury sanctuaries. We weave natural daylight, organic minerals, and tailored joinery into spaces of permanent serenity.
            </p>

            {/* Read More Action */}
            <div style={{ marginTop: '0.8rem' }}>
              <button
                onClick={() => navigate('/about')}
                data-hoversize="8"
                className="btn_view"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <span
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: '1px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--text-bright)',
                  }}
                >
                  Explore Studio Philosophy
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Principal Architect & Atelier Craft Split Parallax ── */}
      <section
        ref={section2Ref}
        className="hp_sec3 split-parallax-section reverse"
        style={{
          position: 'relative',
          minHeight: 'auto',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-alt)',
          overflow: 'hidden',
          padding: 'clamp(3rem, 6vw, 5rem) 0',
          borderTop: '1px solid var(--text-hair)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
          className="split-parallax-container reverse"
        >
          {/* Staggered Left Text Block */}
          <div
            ref={textBox2Ref}
            className="split-text-left"
            style={{
              padding: 'clamp(1.75rem, 5vw, 6rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.3em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                }}
              >
                Principal Philosophy
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 4.2rem)',
                fontWeight: 300,
                color: 'var(--heading)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}
            >
              "My designs are sincere, <br />
              <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>natural and unforced."</span>
            </h2>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                lineHeight: 1.85,
                color: 'var(--text-dim)',
                marginBottom: '1.75rem',
                maxWidth: '520px',
              }}
            >
              Every architectural stroke is calibrated against environmental orientation, tactile acoustics, and bespoke client rituals. We treat each residence as a legacy monument to life lived with depth and elegance.
            </p>

            {/* Quick Stat Counter Row (Responsive 2x2 on Mobile, 4x1 on Desktop) */}
            <div
              className="about-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.25rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--gold-hair)',
              }}
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                      color: 'var(--gold)',
                      fontWeight: 400,
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.55rem',
                      letterSpacing: '0.12em',
                      color: 'var(--text-faint)',
                      textTransform: 'uppercase',
                      marginTop: '0.35rem',
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expanding Right Image Frame */}
          <div
            ref={splitFrame2Ref}
            className="split-frame-right"
            style={{
              height: 'clamp(320px, 60vh, 700px)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: 'var(--shadow-card)',
              borderLeft: '1px solid var(--gold-mid)',
            }}
          >
            <img
              ref={innerImg2Ref}
              src={gallery4}
              alt="Architectural Materiality"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transformOrigin: 'center center',
                willChange: 'transform',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
