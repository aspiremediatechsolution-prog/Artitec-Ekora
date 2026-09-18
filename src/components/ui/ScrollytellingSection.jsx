import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  heroMain,
  gallery4,
  gallery1,
  gallery2,
  w2_17_19,
  w2_17_18,
  w2_16_49,
} from '../../assets'

gsap.registerPlugin(ScrollTrigger)

/* ══════════════════════════════════════════════════════════════
   DEFAULT 5-STAGE ARCHITECTURAL GENESIS STORY
══════════════════════════════════════════════════════════════ */
const DEFAULT_STAGES = [
  {
    id: 'stage-1',
    step: '01',
    range: '00% — 20%',
    startPercent: 0,
    endPercent: 20,
    shortName: 'Structure',
    phase: 'Spatial Genesis · Foundation',
    title: 'Monolithic Massing & Structural Frame',
    tagline: 'Raw structural geometry meets engineering precision',
    description:
      'The narrative begins with the unadorned structural massing. Reinforced post-tensioned concrete shear walls and cantilevered floor plates establish pure geometric volumes, floating sightlines, and structural equilibrium.',
    specs: [
      { label: 'Core Structure', value: 'Post-Tensioned C45 Concrete' },
      { label: 'Clear Span', value: '18.4 Metres Column-Free' },
      { label: 'Structural Grid', value: 'Module 1200mm × 1200mm' },
      { label: 'Slab Depth', value: '320mm Post-Tensioned' },
    ],
    image: w2_17_18,
    wireframeColor: 'rgba(160, 16, 45, 0.45)',
    callouts: [
      { x: '24%', y: '32%', label: 'Cantilevered Wing Beam', sub: 'Stress Load: 420 kN' },
      { x: '68%', y: '58%', label: 'Monolithic Shear Core', sub: 'Zone IV Compliant' },
    ],
    accentGradient: 'linear-gradient(135deg, rgba(160,16,45,0.15) 0%, rgba(0,0,0,0) 60%)',
  },
  {
    id: 'stage-2',
    step: '02',
    range: '20% — 40%',
    startPercent: 20,
    endPercent: 40,
    shortName: 'Glazing',
    phase: 'Aperture · Solar Kinetics',
    title: 'Fenestration & Volumetric Daylight',
    tagline: 'Sculpting shadow, thermal comfort & panoramic vistas',
    description:
      'Thermal-break structural glazing and continuous clerestory apertures pierce the solid mass. Natural light cascades deep into the atrium, calibrating solar orientation and establishing seamless indoor-outdoor continuity.',
    specs: [
      { label: 'Glazing System', value: 'Low-E Triple Laminated' },
      { label: 'Light Transmittance', value: 'VLT 72% / SHGC 0.28' },
      { label: 'Aperture Height', value: '4.80 Metres Full Height' },
      { label: 'Acoustic Rating', value: 'Rw 46 dB Attenuation' },
    ],
    image: gallery4,
    wireframeColor: 'rgba(200, 25, 61, 0.55)',
    callouts: [
      { x: '35%', y: '25%', label: 'Clerestory Light Shaft', sub: 'Zenith Aperture' },
      { x: '82%', y: '48%', label: 'Flush Concealed Sill', sub: 'Zero-Threshold' },
    ],
    accentGradient: 'linear-gradient(135deg, rgba(200,25,61,0.18) 0%, rgba(255,255,255,0) 60%)',
  },
  {
    id: 'stage-3',
    step: '03',
    range: '40% — 60%',
    startPercent: 40,
    endPercent: 60,
    shortName: 'Materiality',
    phase: 'Materiality · Tactile Craft',
    title: 'Tactile Stone & Custom Wood Joinery',
    tagline: 'Authentic organic minerals, precision bookmatched surfaces',
    description:
      'The raw shell transforms through refined architectural surfaces. Honed Roman Travertine slabs line the ground plane, balanced against acoustic fluted American Walnut wall panelling and hand-patinated bronze architectural reveals.',
    specs: [
      { label: 'Floor Slabs', value: 'Navona Travertine' },
      { label: 'Wall Panelling', value: 'Fluted American Walnut' },
      { label: 'Metal Trim', value: 'Brushed Bronze PVD' },
      { label: 'Finish Texture', value: 'Hand-Honed Silk Matte' },
    ],
    image: w2_17_19,
    wireframeColor: 'rgba(160, 16, 45, 0.5)',
    callouts: [
      { x: '42%', y: '78%', label: 'Honed Roman Travertine', sub: 'Zero-Grout Continuous' },
      { x: '76%', y: '34%', label: 'Fluted Walnut Joinery', sub: 'Acoustic Reveals' },
    ],
    accentGradient: 'linear-gradient(135deg, rgba(160,16,45,0.2) 0%, rgba(0,0,0,0) 60%)',
  },
  {
    id: 'stage-4',
    step: '04',
    range: '60% — 85%',
    startPercent: 60,
    endPercent: 85,
    shortName: 'Bespoke FF&E',
    phase: 'Bespoke FF&E · Interior Articulation',
    title: 'Curated Furnishings & Sculptural Art',
    tagline: 'Custom haute-couture seating, bespoke luminaires and rare objects',
    description:
      'Curated furniture pieces take their bespoke positions within the room. Organic bouclé seating, monolithic Nero Marquina cocktail tables, and hand-blown artisan glass chandeliers layer warmth, comfort, and human scale.',
    specs: [
      { label: 'Upholstery', value: 'Italian Bouclé & Leather' },
      { label: 'Centerpiece', value: 'Nero Marquina Stone' },
      { label: 'Pendant System', value: 'Fluted Borosilicate' },
      { label: 'Craft Origin', value: 'Milan & Murano Studios' },
    ],
    image: w2_16_49,
    wireframeColor: 'rgba(200, 25, 61, 0.6)',
    callouts: [
      { x: '52%', y: '64%', label: 'Sculptural Organic Sofa', sub: 'Architectural Fabrication' },
      { x: '22%', y: '42%', label: 'Suspended Glass Chandelier', sub: 'Murano Artisan' },
    ],
    accentGradient: 'linear-gradient(135deg, rgba(200,25,61,0.22) 0%, rgba(0,0,0,0) 60%)',
  },
  {
    id: 'stage-5',
    step: '05',
    range: '85% — 100%',
    startPercent: 85,
    endPercent: 100,
    shortName: 'Atmosphere',
    phase: 'Atmosphere · Final Handover',
    title: 'Warm Twilight Glow & Commission Seal',
    tagline: '2700K ambient illumination, architectural atmosphere calibrated',
    description:
      'The creation reaches full atmospheric maturity. Warm twilight architectural cove lighting activates, grazing stone textures and casting soft golden ambient reflections. The design settles into its complete, living reality.',
    specs: [
      { label: 'Lighting Scene', value: '2700K Warm Twilight DALI-2' },
      { label: 'CRI Index', value: '98+ Ultra-High CRI' },
      { label: 'Atmosphere', value: 'Museum-Calibre Ambient' },
      { label: 'Status', value: 'Commission Complete' },
    ],
    image: heroMain,
    wireframeColor: 'rgba(224, 30, 71, 0.7)',
    callouts: [
      { x: '50%', y: '18%', label: 'Concealed Cove Grazers', sub: '2700K Dim-to-Warm' },
      { x: '70%', y: '72%', label: 'Handover Certification', sub: 'Commission Ready' },
    ],
    accentGradient: 'linear-gradient(135deg, rgba(224,30,71,0.25) 0%, rgba(14,4,7,0.4) 100%)',
  },
]

export default function ScrollytellingSection({
  stages = DEFAULT_STAGES,
  kicker = 'Cinematic Architectural Story',
  title = 'The Genesis of a Masterpiece.',
  subtitle = 'Experience how architectural concept, light, materiality, and bespoke curation come together seamlessly in sync with your scroll.',
  projectName = 'The Chishti Residence',
  projectLocation = 'Lucknow · Master Commission',
}) {
  const containerRef = useRef(null)
  const pinViewportRef = useRef(null)
  const progressBarRef = useRef(null)
  const mobileCardRef = useRef(null)

  const [activeStageIndex, setActiveStageIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [touchStartX, setTouchStartX] = useState(0)

  const stageCount = stages.length
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const isDesktop = windowWidth >= 1024

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Desktop & Tablet GSAP Pinned ScrollTrigger
  useEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      const stageEls = gsap.utils.toArray('.scrolly-visual-stage')
      const infoEls = gsap.utils.toArray('.scrolly-info-pane')

      // Initial visual setup
      stageEls.forEach((el, i) => {
        if (i === 0) {
          gsap.set(el, { opacity: 1, scale: 1, visibility: 'visible', zIndex: 10 })
        } else {
          gsap.set(el, { opacity: 0, scale: 1.06, visibility: 'hidden', zIndex: 10 + i })
        }
      })

      infoEls.forEach((el, i) => {
        if (i === 0) {
          gsap.set(el, { opacity: 1, y: 0, visibility: 'visible' })
        } else {
          gsap.set(el, { opacity: 0, y: 25, visibility: 'hidden' })
        }
      })

      // Master Pinned Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinViewportRef.current,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress
            setScrollProgress(Math.round(p * 100))

            const rawIndex = p * stageCount
            const activeIndex = Math.min(Math.floor(rawIndex), stageCount - 1)
            setActiveStageIndex(activeIndex)

            if (progressBarRef.current) {
              progressBarRef.current.style.height = `${p * 100}%`
            }
          },
        },
      })

      const stepDuration = 1 / (stageCount - 1)

      for (let i = 0; i < stageCount - 1; i++) {
        const currentVisual = stageEls[i]
        const nextVisual = stageEls[i + 1]
        const currentInfo = infoEls[i]
        const nextInfo = infoEls[i + 1]
        const startTime = i * stepDuration

        // Info Panel Fade & Slide
        tl.to(
          currentInfo,
          {
            opacity: 0,
            y: -20,
            duration: stepDuration * 0.35,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(currentInfo, { visibility: 'hidden' })
            },
          },
          startTime + stepDuration * 0.15
        )

        tl.set(nextInfo, { visibility: 'visible', y: 25, opacity: 0 }, startTime + stepDuration * 0.45)

        tl.to(
          nextInfo,
          {
            opacity: 1,
            y: 0,
            duration: stepDuration * 0.45,
            ease: 'power2.out',
          },
          startTime + stepDuration * 0.5
        )

        // Visual Cross-fade & Scale
        tl.to(
          currentVisual,
          {
            opacity: 0,
            scale: 0.97,
            duration: stepDuration * 0.6,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(currentVisual, { visibility: 'hidden' })
            },
          },
          startTime + stepDuration * 0.2
        )

        tl.set(nextVisual, { visibility: 'visible', opacity: 0, scale: 1.06 }, startTime + stepDuration * 0.2)

        tl.to(
          nextVisual,
          {
            opacity: 1,
            scale: 1,
            duration: stepDuration * 0.7,
            ease: 'power2.out',
          },
          startTime + stepDuration * 0.25
        )

        // Callout pin entrance
        const calloutPins = nextVisual.querySelectorAll('.scrolly-pin-badge')
        if (calloutPins.length > 0) {
          tl.fromTo(
            calloutPins,
            { opacity: 0, scale: 0.85, y: 8 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.04,
              duration: stepDuration * 0.4,
              ease: 'back.out(1.4)',
            },
            startTime + stepDuration * 0.55
          )
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile, stageCount])

  // Desktop smooth scroll jump
  const scrollToStage = useCallback((index) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const totalHeight = container.offsetHeight - window.innerHeight
    const targetScroll = scrollTop + rect.top + (index / (stageCount - 1)) * totalHeight

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }, [stageCount])

  // Mobile stage selector & swipe handler
  const setMobileStage = (index) => {
    const nextIndex = Math.max(0, Math.min(index, stageCount - 1))
    setActiveStageIndex(nextIndex)

    if (mobileCardRef.current) {
      gsap.fromTo(
        mobileCardRef.current,
        { opacity: 0.5, scale: 0.98, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      )
    }
  }

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX - touchEndX

    if (diffX > 45) {
      // Swiped Left -> Next Stage
      if (activeStageIndex < stageCount - 1) {
        setMobileStage(activeStageIndex + 1)
      }
    } else if (diffX < -45) {
      // Swiped Right -> Prev Stage
      if (activeStageIndex > 0) {
        setMobileStage(activeStageIndex - 1)
      }
    }
  }

  const activeStage = stages[activeStageIndex] || stages[0]

  return (
    <section
      ref={containerRef}
      id="architectural-scrollytelling"
      className="scrollytelling-wrapper"
      style={{
        position: 'relative',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--gold-hair)',
        borderBottom: '1px solid var(--gold-hair)',
        minHeight: isMobile ? 'auto' : isTablet ? '300vh' : '360vh',
      }}
    >
      {/* ══════════════════════════════════════════════════════════
          DESKTOP & TABLET VIEWPORT (Pinned GSAP Timeline)
      ══════════════════════════════════════════════════════════ */}
      {!isMobile && (
        <div
          ref={pinViewportRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: isTablet ? '640px' : '700px',
            maxHeight: '1080px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: isTablet
              ? 'clamp(1rem, 2vh, 1.8rem) clamp(1.2rem, 3vw, 2rem)'
              : 'clamp(1.5rem, 3vh, 2.5rem) clamp(2rem, 4vw, 4.5rem)',
            boxSizing: 'border-box',
          }}
        >
          {/* ── TOP HUD BAR ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
              zIndex: 30,
              position: 'relative',
              gap: '1.5rem',
            }}
          >
            {/* Title & Section Tag */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.25rem',
                }}
              >
                <span style={{ width: '18px', height: '1px', background: 'var(--gold)' }} />
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: isTablet ? '0.6rem' : '0.65rem',
                    letterSpacing: '0.22em',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {kicker}
                </span>
                <span
                  style={{
                    fontSize: isTablet ? '0.6rem' : '0.65rem',
                    color: 'var(--text-faint)',
                    fontFamily: 'Inter',
                  }}
                >
                  · {projectName}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: isTablet ? 'clamp(1.4rem, 2.2vw, 1.9rem)' : 'clamp(1.6rem, 2.5vw, 2.4rem)',
                  fontWeight: 300,
                  color: 'var(--heading)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.15,
                }}
              >
                {title}
              </h2>
            </div>

            {/* Coordinates Badge & Active Stage Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: isTablet ? '0.75rem' : '1.2rem' }}>
              {!isTablet && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    fontFamily: 'monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.12em',
                    color: 'var(--text-soft)',
                    borderRight: '1px solid var(--gold-hair)',
                    paddingRight: '1.2rem',
                  }}
                >
                  <span style={{ color: 'var(--gold)' }}>COORD: 26.8467° N, 80.9462° E</span>
                  <span>ELEVATION: +4.20M · SPATIAL GENESIS</span>
                </div>
              )}

              <div
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--gold-line)',
                  padding: isTablet ? '0.35rem 0.85rem' : '0.45rem 1.1rem',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    boxShadow: '0 0 8px var(--gold)',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: isTablet ? '0.65rem' : '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: 'var(--heading)',
                    textTransform: 'uppercase',
                  }}
                >
                  STAGE {activeStage.step} / 0{stageCount}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: isTablet ? '0.62rem' : '0.68rem',
                    color: 'var(--gold)',
                    fontWeight: 500,
                    paddingLeft: '0.3rem',
                    borderLeft: '1px solid var(--gold-hair)',
                  }}
                >
                  {scrollProgress}%
                </span>
              </div>
            </div>
          </div>

          {/* ── CENTER WORKSPACE ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isTablet
                ? 'minmax(260px, 320px) 1fr 40px'
                : 'minmax(320px, 420px) 1fr 60px',
              gap: isTablet ? 'clamp(1rem, 2vw, 1.8rem)' : 'clamp(2rem, 3vw, 3.5rem)',
              alignItems: 'center',
              width: '100%',
              height: 'calc(100% - 130px)',
              position: 'relative',
              zIndex: 20,
            }}
          >
            {/* Left Column: Narrative Info Pane */}
            <div
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {stages.map((stg) => (
                <div
                  key={stg.id}
                  className="scrolly-info-pane"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    willChange: 'transform, opacity',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontFamily: 'Inter',
                      fontSize: isTablet ? '0.58rem' : '0.65rem',
                      letterSpacing: '0.2em',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span>{stg.range}</span>
                    <span>·</span>
                    <span>{stg.phase}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: isTablet ? 'clamp(1.4rem, 2.1vw, 1.8rem)' : 'clamp(1.65rem, 2.4vw, 2.2rem)',
                      fontWeight: 400,
                      color: 'var(--heading)',
                      lineHeight: 1.18,
                      margin: '0 0 0.4rem 0',
                    }}
                  >
                    {stg.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontStyle: 'italic',
                      fontSize: isTablet ? '0.92rem' : '1.02rem',
                      color: 'var(--text-bright)',
                      margin: '0 0 0.75rem 0',
                      lineHeight: 1.4,
                    }}
                  >
                    “{stg.tagline}”
                  </p>

                  <p
                    style={{
                      fontFamily: 'Inter',
                      fontSize: isTablet ? '0.74rem' : '0.82rem',
                      lineHeight: 1.65,
                      color: 'var(--text-soft)',
                      margin: isTablet ? '0 0 1rem 0' : '0 0 1.3rem 0',
                    }}
                  >
                    {stg.description}
                  </p>

                  {/* Micro Specs Table */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(1, 1fr)',
                      gap: isTablet ? '0.35rem' : '0.45rem',
                      padding: isTablet ? '0.75rem' : '0.95rem',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--gold-hair)',
                      borderRadius: '4px',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    {stg.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: isTablet ? '0.66rem' : '0.72rem',
                          fontFamily: 'Inter',
                          borderBottom:
                            sIdx < stg.specs.length - 1 ? '1px solid var(--text-hair)' : 'none',
                          paddingBottom: sIdx < stg.specs.length - 1 ? '0.3rem' : '0',
                        }}
                      >
                        <span style={{ color: 'var(--text-faint)' }}>{spec.label}</span>
                        <span style={{ color: 'var(--heading)', fontWeight: 500 }}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Center Canvas */}
            <div
              style={{
                position: 'relative',
                height: '100%',
                maxHeight: isTablet ? '480px' : '600px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid var(--gold-hair)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
                background: '#0D0508',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: '36px 36px',
                  zIndex: 15,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  zIndex: 25,
                  fontFamily: 'monospace',
                  fontSize: '0.55rem',
                  color: 'var(--gold)',
                  letterSpacing: '0.12em',
                  background: 'rgba(14, 4, 7, 0.78)',
                  padding: '2px 7px',
                  borderRadius: '2px',
                  border: '1px solid var(--gold-hair)',
                }}
              >
                CAM 01 · PERSPECTIVE · {projectName.toUpperCase()}
              </div>

              {stages.map((stg, i) => (
                <div
                  key={stg.id}
                  className="scrolly-visual-stage"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={stg.image}
                    alt={stg.title}
                    loading="lazy"
                    decoding="async"
                    className="scrolly-canvas-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: i === 0 ? 'contrast(1.1) brightness(0.88)' : 'contrast(1.04) brightness(0.96)',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(ellipse at center, rgba(14, 4, 7, 0.08) 0%, rgba(14, 4, 7, 0.62) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: stg.accentGradient,
                      mixBlendMode: 'screen',
                      pointerEvents: 'none',
                    }}
                  />

                  {stg.callouts.map((pin, pIdx) => (
                    <div
                      key={pIdx}
                      className="scrolly-pin-badge"
                      style={{
                        position: 'absolute',
                        left: pin.x,
                        top: pin.y,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 22,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: 'var(--cherry)',
                            border: '2px solid #FFFFFF',
                            boxShadow: '0 0 10px var(--cherry)',
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            background: 'rgba(14, 4, 7, 0.88)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid var(--gold-line)',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '2px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <div
                            style={{
                              fontFamily: 'Inter',
                              fontSize: isTablet ? '0.58rem' : '0.63rem',
                              fontWeight: 600,
                              color: '#FFFFFF',
                            }}
                          >
                            {pin.label}
                          </div>
                          <div
                            style={{
                              fontFamily: 'Inter',
                              fontSize: '0.52rem',
                              color: 'var(--gold-light)',
                            }}
                          >
                            {pin.sub}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Column: Luxury Progress Rail */}
            <div
              style={{
                height: '100%',
                maxHeight: isTablet ? '380px' : '440px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  bottom: '12px',
                  width: '2px',
                  background: 'var(--gold-hair)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}
              >
                <div
                  ref={progressBarRef}
                  style={{
                    width: '100%',
                    height: '0%',
                    background: 'var(--gold)',
                    boxShadow: '0 0 8px var(--gold)',
                    transition: 'height 0.1s linear',
                  }}
                />
              </div>

              {stages.map((stg, i) => {
                const isActive = activeStageIndex === i
                const isPassed = activeStageIndex >= i

                return (
                  <button
                    key={stg.id}
                    onClick={() => scrollToStage(i)}
                    title={`Jump to Stage ${stg.step}: ${stg.title}`}
                    style={{
                      position: 'relative',
                      zIndex: 5,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                      outline: 'none',
                    }}
                  >
                    <div
                      style={{
                        width: isActive ? '16px' : '10px',
                        height: isActive ? '16px' : '10px',
                        borderRadius: '50%',
                        background: isActive
                          ? 'var(--gold)'
                          : isPassed
                          ? 'var(--heading)'
                          : 'var(--bg-surface-elevated)',
                        border: isActive
                          ? '2px solid #FFFFFF'
                          : isPassed
                          ? '1px solid var(--gold-line)'
                          : '1px solid var(--text-hair)',
                        boxShadow: isActive ? '0 0 12px var(--gold)' : 'none',
                        transition: 'all 0.25s ease',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '0.55rem',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--gold)' : 'var(--text-faint)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {stg.step}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── BOTTOM HUD FOOTER ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              zIndex: 30,
              paddingTop: '0.6rem',
              borderTop: '1px solid var(--gold-hair)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  color: 'var(--text-faint)',
                  textTransform: 'uppercase',
                  marginRight: '0.35rem',
                }}
              >
                Fast Navigation:
              </span>
              {stages.map((stg, idx) => (
                <button
                  key={stg.id}
                  onClick={() => scrollToStage(idx)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    background:
                      activeStageIndex === idx ? 'var(--gold)' : 'var(--card-bg)',
                    color: activeStageIndex === idx ? 'var(--on-gold)' : 'var(--text)',
                    border:
                      activeStageIndex === idx
                        ? '1px solid var(--gold)'
                        : '1px solid var(--gold-hair)',
                    borderRadius: '2px',
                    fontFamily: 'Inter',
                    fontSize: '0.6rem',
                    letterSpacing: '0.06em',
                    fontWeight: activeStageIndex === idx ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {stg.step} · {stg.shortName || stg.phase.split('·')[0]}
                </button>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'Inter',
                fontSize: '0.62rem',
                letterSpacing: '0.15em',
                color: 'var(--text-soft)',
                textTransform: 'uppercase',
              }}
            >
              <span>Scroll to construct</span>
              <div
                style={{
                  width: '16px',
                  height: '24px',
                  border: '1.2px solid var(--gold-line)',
                  borderRadius: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '3px',
                }}
              >
                <div
                  style={{
                    width: '2px',
                    height: '5px',
                    background: 'var(--gold)',
                    borderRadius: '1px',
                    animation: 'bounce 1.5s infinite',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          MOBILE VIEWPORT (< 768px): INTERACTIVE SWIPEABLE STORYTELLING
      ══════════════════════════════════════════════════════════ */}
      {isMobile && (
        <div
          style={{
            padding: 'clamp(2.5rem, 6vw, 4rem) 4%',
            maxWidth: '560px',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {/* Mobile Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ width: '16px', height: '1px', background: 'var(--gold)' }} />
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {kicker}
              </span>
              <span style={{ width: '16px', height: '1px', background: 'var(--gold)' }} />
            </div>

            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.7rem, 6vw, 2.3rem)',
                color: 'var(--heading)',
                margin: '0 0 0.5rem 0',
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '0.78rem',
                color: 'var(--text-soft)',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* ── MOBILE INTERACTIVE STAGE TABS BAR ── */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              paddingBottom: '0.75rem',
              marginBottom: '1.25rem',
              scrollbarWidth: 'none',
              justifyContent: 'flex-start',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {stages.map((stg, idx) => {
              const isActive = activeStageIndex === idx
              return (
                <button
                  key={stg.id}
                  onClick={() => setMobileStage(idx)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    background: isActive ? 'var(--gold)' : 'var(--bg-alt)',
                    color: isActive ? 'var(--on-gold)' : 'var(--text)',
                    border: isActive ? '1px solid var(--gold)' : '1px solid var(--gold-hair)',
                    borderRadius: '2px',
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ opacity: 0.8 }}>{stg.step}</span>
                  <span>{stg.shortName || stg.phase.split('·')[0]}</span>
                </button>
              )
            })}
          </div>

          {/* ── MOBILE ACTIVE STAGE CARD (Touch Swipeable & Animated) ── */}
          <div
            ref={mobileCardRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              background: 'var(--bg-alt)',
              border: '1px solid var(--text-hair)',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Visual Canvas Image with Badge & Callouts */}
            <div
              style={{
                position: 'relative',
                height: '240px',
                width: '100%',
                background: '#0D0508',
                overflow: 'hidden',
              }}
            >
              <img
                src={activeStage.image}
                alt={activeStage.title}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: activeStageIndex === 0 ? 'contrast(1.1) brightness(0.88)' : 'contrast(1.05) brightness(0.95)',
                }}
              />

              {/* Blueprint Grid Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: '28px 28px',
                  pointerEvents: 'none',
                }}
              />

              {/* Mobile Stage Top Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(14, 4, 7, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--gold-line)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '2px',
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  zIndex: 10,
                }}
              >
                PHASE {activeStage.step} · {activeStage.range}
              </div>

              {/* Swipe Cue Indicator */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(14, 4, 7, 0.75)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '2px',
                  fontFamily: 'Inter',
                  fontSize: '0.52rem',
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.08em',
                  zIndex: 10,
                }}
              >
                SWIPE ← →
              </div>

              {/* Mobile Callout Pins */}
              {activeStage.callouts.map((pin, pIdx) => (
                <div
                  key={pIdx}
                  style={{
                    position: 'absolute',
                    left: pin.x,
                    top: pin.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 15,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: 'var(--cherry)',
                        border: '1.5px solid #FFFFFF',
                        boxShadow: '0 0 8px var(--cherry)',
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        background: 'rgba(14, 4, 7, 0.9)',
                        border: '1px solid var(--gold-line)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '2px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '0.55rem',
                          fontWeight: 600,
                          color: '#FFFFFF',
                        }}
                      >
                        {pin.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stage Text Information */}
            <div style={{ padding: '1.25rem' }}>
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.3rem',
                }}
              >
                {activeStage.phase}
              </span>

              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.45rem',
                  color: 'var(--heading)',
                  margin: '0 0 0.4rem 0',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                {activeStage.title}
              </h3>

              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: '0.92rem',
                  color: 'var(--text-bright)',
                  margin: '0 0 0.65rem 0',
                  lineHeight: 1.4,
                }}
              >
                “{activeStage.tagline}”
              </p>

              <p
                style={{
                  fontFamily: 'Inter',
                  fontSize: '0.78rem',
                  lineHeight: 1.6,
                  color: 'var(--text-soft)',
                  margin: '0 0 1rem 0',
                }}
              >
                {activeStage.description}
              </p>

              {/* 2-Column Mobile Micro-Specs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.45rem',
                  padding: '0.75rem',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--gold-hair)',
                  borderRadius: '3px',
                  marginBottom: '1.2rem',
                }}
              >
                {activeStage.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem',
                      fontSize: '0.66rem',
                      fontFamily: 'Inter',
                      padding: '0.2rem',
                    }}
                  >
                    <span style={{ color: 'var(--text-faint)', fontSize: '0.58rem' }}>
                      {spec.label}
                    </span>
                    <span style={{ color: 'var(--heading)', fontWeight: 500 }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mobile Prev / Next Controls */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--gold-hair)',
                }}
              >
                <button
                  onClick={() => setMobileStage(activeStageIndex - 1)}
                  disabled={activeStageIndex === 0}
                  style={{
                    padding: '0.45rem 0.9rem',
                    background: 'var(--card-bg)',
                    color: activeStageIndex === 0 ? 'var(--text-faint)' : 'var(--heading)',
                    border: '1px solid var(--gold-hair)',
                    borderRadius: '2px',
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    cursor: activeStageIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: activeStageIndex === 0 ? 0.45 : 1,
                  }}
                >
                  ← Prev Stage
                </button>

                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    color: 'var(--gold)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                  }}
                >
                  {activeStageIndex + 1} / {stageCount}
                </div>

                <button
                  onClick={() => setMobileStage(activeStageIndex + 1)}
                  disabled={activeStageIndex === stageCount - 1}
                  style={{
                    padding: '0.45rem 0.9rem',
                    background: activeStageIndex === stageCount - 1 ? 'var(--card-bg)' : 'var(--gold)',
                    color: activeStageIndex === stageCount - 1 ? 'var(--text-faint)' : 'var(--on-gold)',
                    border: '1px solid var(--gold)',
                    borderRadius: '2px',
                    fontFamily: 'Inter',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    cursor: activeStageIndex === stageCount - 1 ? 'not-allowed' : 'pointer',
                    opacity: activeStageIndex === stageCount - 1 ? 0.45 : 1,
                  }}
                >
                  Next Stage →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
