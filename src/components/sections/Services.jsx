import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import { w2_17_19, w2_17_18, w2_17_17, w2_17_16, gallery1, gallery2, gallery3, gallery4 } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

const servicesData = [
  {
    num: '01',
    title: 'Iconic Architecture',
    subtitle: 'Bespoke Private Estates & Villas',
    desc: 'Volumetric equilibrium, climate orientation, and monolithic massing crafted for multi-generational living.',
    img: w2_17_19,
    path: '/services',
  },
  {
    num: '02',
    title: 'Interior Design',
    subtitle: 'Haute-Couture Joinery & FF&E',
    desc: 'Tactile stone selections, bookmatched Italian marbles, custom brushed bronze lighting, and acoustic walnut panelling.',
    img: w2_17_18,
    path: '/services',
  },
  {
    num: '03',
    title: 'Landscape Design',
    subtitle: 'Biophilic Courtyards & Water Architecture',
    desc: 'Seamless indoor-outdoor living, reflection pools, microclimate botanical zones, and stone colonnades.',
    img: w2_17_17,
    path: '/services',
  },
  {
    num: '04',
    title: 'Smart Home Automation',
    subtitle: 'Intelligent Lighting & Climate Ecosystems',
    desc: 'Subtle, zero-clutter architectural automation orchestrating motorized solar shading, circadian lighting, and multi-zone climate.',
    img: w2_17_16,
    path: '/services',
  },
  {
    num: '05',
    title: 'Lighting Architecture',
    subtitle: 'Sculptural & Atmospheric Illuminations',
    desc: 'Layered architectural illumination, grazing wall slots, and bespoke statement chandeliers designed to highlight textures.',
    img: gallery4,
    path: '/services',
  },
  {
    num: '06',
    title: 'Turnkey Execution',
    subtitle: 'Millimetre-Precision Site Delivery',
    desc: 'Master craftsman joinery, strict engineering tolerances, transparent BOQ procurement, and flawless key handover.',
    img: gallery1,
    path: '/services',
  },
]

export default function Services() {
  const containerRef = useRef(null)
  const shutterRef = useRef(null)
  const bgTrackRef = useRef(null)
  const titleTrackRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = servicesData.length
  const navigate = useNavigate()

  // 4. Container expands width from 0vw to 100vw on scroll (Aperture Shutter Effect)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (shutterRef.current) {
        gsap.fromTo(
          shutterRef.current,
          { width: '0vw', opacity: 0.3 },
          {
            width: '100vw',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1.2,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  // Slide transition animation
  const goToSlide = useCallback((index) => {
    const nextIdx = Math.max(0, Math.min(totalSlides - 1, index))
    setCurrentSlide(nextIdx)

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const titleStep = isMobile ? 75 : 45

    // Smoothly translate background image track (left: -N*100%)
    if (bgTrackRef.current) {
      gsap.to(bgTrackRef.current, {
        x: `-${nextIdx * 100}vw`,
        duration: 0.95,
        ease: 'power3.out',
      })
    }

    // Smoothly translate title track (marginLeft: -N*titleStep%)
    if (titleTrackRef.current) {
      gsap.to(titleTrackRef.current, {
        x: `-${nextIdx * titleStep}vw`,
        duration: 0.95,
        ease: 'power3.out',
      })
    }
  }, [totalSlides])

  // Click on Left / Right half of the container
  const handleContainerClick = (e) => {
    // If clicking directly on a button or link, let it handle itself
    if (e.target.closest('button, a, .btn_view, .nav-arrow')) return

    const clickX = e.clientX
    const width = window.innerWidth

    if (clickX < width / 2) {
      // Left side click
      if (currentSlide > 0) goToSlide(currentSlide - 1)
    } else {
      // Right side click
      if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1)
    }
  }

  return (
    <section
      id="services"
      ref={containerRef}
      className="hp_sec5 services-slider"
      data-cursor-slider="true"
      data-current-slide={currentSlide}
      data-total-slides={totalSlides}
      onClick={handleContainerClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        background: '#0d080a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      {/* ── Expanding Shutter Box (width: 0vw -> 100vw on scroll) ── */}
      <div
        ref={shutterRef}
        className="shutter-box"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100vw',
          height: '100%',
          overflow: 'hidden',
          margin: '0 auto',
        }}
      >
        {/* ── Background Image Track (translates left: -N*100vw) ── */}
        <div
          ref={bgTrackRef}
          className="bg-track"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            display: 'flex',
            width: `${totalSlides * 100}vw`,
            willChange: 'transform',
          }}
        >
          {servicesData.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                width: '100vw',
                height: '100%',
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.72)',
                  transform: currentSlide === idx ? 'scale(1)' : 'scale(1.08)',
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease',
                }}
              />
              {/* Vignette Scrim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(13, 8, 10, 0.95) 0%, rgba(13, 8, 10, 0.4) 50%, rgba(13, 8, 10, 0.8) 100%)',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Section Header Overlay ── */}
        <div
          style={{
            position: 'absolute',
            top: '8vw',
            left: '5vw',
            right: '5vw',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--gold, #A0102D)' }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.35em',
                color: 'var(--gold, #C8193D)',
                textTransform: 'uppercase',
              }}
            >
              Design Disciplines
            </span>
          </div>

          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>0{currentSlide + 1}</span> / 0{totalSlides}
          </div>
        </div>

        {/* ── Horizontal Title Track (translates marginLeft: -N*45vw or -N*75vw on mobile) ── */}
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '5vw',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '100%',
            overflow: 'visible',
            pointerEvents: 'auto',
          }}
        >
          <div
            ref={titleTrackRef}
            className="title-track"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4vw',
              width: `${totalSlides * 75}vw`,
              willChange: 'transform',
            }}
          >
            {servicesData.map((item, idx) => {
              const isExpanded = currentSlide === idx
              return (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToSlide(idx)
                  }}
                  className={`title-item ${isExpanded ? 'expand' : ''}`}
                  style={{
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
                    transform: isExpanded ? 'scale(1)' : 'scale(0.75)',
                    transformOrigin: 'left center',
                    opacity: isExpanded ? 1 : 0.45,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(2rem, 6.5vw, 6.2rem)',
                      fontWeight: isExpanded ? 400 : 300,
                      color: isExpanded ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.05,
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      textShadow: isExpanded ? '0 8px 30px rgba(0,0,0,0.8)' : 'none',
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Unified Responsive Bottom Bar (Description + Controls) ── */}
        <div className="services-bottom-wrapper">
          {/* Active Slide Description & Details */}
          <div className="services-bottom-desc" style={{ maxWidth: '460px' }}>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.65rem, 0.9vw, 0.72rem)',
                letterSpacing: '0.22em',
                color: 'var(--gold, #C8193D)',
                textTransform: 'uppercase',
                marginBottom: '0.35rem',
              }}
            >
              {servicesData[currentSlide].subtitle}
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
                lineHeight: 1.65,
                color: 'rgba(255, 255, 255, 0.85)',
                margin: 0,
              }}
            >
              {servicesData[currentSlide].desc}
            </p>
          </div>

          {/* Left / Right Direction Indicators + All Services CTA */}
          <div
            className="services-bottom-controls"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.6rem, 1.5vw, 1.2rem)',
              flexShrink: 0,
            }}
          >
            {/* Left Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToSlide(currentSlide - 1)
              }}
              disabled={currentSlide === 0}
              data-hoversize="6"
              className="nav-arrow lt"
              aria-label="Previous Slide"
              style={{
                width: 'clamp(42px, 4vw, 50px)',
                height: 'clamp(42px, 4vw, 50px)',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.4)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentSlide === 0 ? 'default' : 'pointer',
                opacity: currentSlide === 0 ? 0.35 : 1,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToSlide(currentSlide + 1)
              }}
              disabled={currentSlide === totalSlides - 1}
              data-hoversize="6"
              className="nav-arrow rt"
              aria-label="Next Slide"
              style={{
                width: 'clamp(42px, 4vw, 50px)',
                height: 'clamp(42px, 4vw, 50px)',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.4)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentSlide === totalSlides - 1 ? 'default' : 'pointer',
                opacity: currentSlide === totalSlides - 1 ? 0.35 : 1,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* View All Services Link */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate('/services')
              }}
              data-hoversize="8"
              className="btn_view"
              style={{
                marginLeft: '0.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '30px',
                background: 'var(--gold, #A0102D)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span>All Services</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
