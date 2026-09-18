import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gallery4, projectsImage, gallery2 } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

const defaultFloaters = [
  {
    img: gallery4,
    kicker: '01 · Villa Facade',
    title: 'Private Residence',
    top: '8%',
    side: 'right',
  },
  {
    img: projectsImage,
    kicker: '02 · Interior Materiality',
    title: 'Tactile Living Space',
    top: '42%',
    side: 'left',
  },
  {
    img: gallery2,
    kicker: '03 · Joinery Craft',
    title: 'Precision Millwork',
    top: '72%',
    side: 'right',
  },
]

export default function ScrollParallaxFloaters({ floaters = defaultFloaters }) {
  const containerRef = useRef(null)
  const floater1Ref = useRef(null)
  const floater2Ref = useRef(null)
  const floater3Ref = useRef(null)

  const f1 = floaters[0] || defaultFloaters[0]
  const f2 = floaters[1] || defaultFloaters[1]
  const f3 = floaters[2] || defaultFloaters[2]

  useEffect(() => {
    // Parallax motion for Floater 1 (Right Margin)
    const st1 = floater1Ref.current
      ? gsap.to(floater1Ref.current, {
          y: -180,
          rotate: 3.5,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: floater1Ref.current,
            start: 'top 92%',
            end: 'bottom 10%',
            scrub: 1.25,
          },
        })
      : null

    // Parallax motion for Floater 2 (Left Margin)
    const st2 = floater2Ref.current
      ? gsap.to(floater2Ref.current, {
          y: 160,
          rotate: -2.5,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: floater2Ref.current,
            start: 'top 92%',
            end: 'bottom 10%',
            scrub: 1.35,
          },
        })
      : null

    // Parallax motion for Floater 3 (Right Margin)
    const st3 = floater3Ref.current
      ? gsap.to(floater3Ref.current, {
          y: -150,
          rotate: 2.5,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: floater3Ref.current,
            start: 'top 92%',
            end: 'bottom 10%',
            scrub: 1.3,
          },
        })
      : null

    return () => {
      st1?.scrollTrigger?.kill()
      st2?.scrollTrigger?.kill()
      st3?.scrollTrigger?.kill()
    }
  }, [floaters])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 3,
      }}
    >
      {/* ── Floater 1 ── */}
      <div
        ref={floater1Ref}
        className="scroll-floater floater-1"
        style={{
          position: 'absolute',
          right: f1.side === 'right' ? 'clamp(0.5rem, 3.5vw, 3.5rem)' : 'auto',
          left: f1.side === 'left' ? 'clamp(0.5rem, 3.5vw, 3.5rem)' : 'auto',
          top: f1.top || '12%',
          width: 'clamp(120px, 17vw, 230px)',
          aspectRatio: '4 / 5',
          borderRadius: '2px',
          overflow: 'hidden',
          border: '1px solid var(--gold)',
          boxShadow: '0 16px 45px rgba(0,0,0,0.55)',
          background: 'var(--bg-deep)',
          willChange: 'transform',
        }}
      >
        <img
          src={f1.img}
          alt={f1.title}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block', filter: 'brightness(0.95)' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0.35rem 0.55rem',
            background: 'linear-gradient(to top, rgba(16,10,12,0.92) 0%, transparent 100%)',
          }}
        >
          <div style={{ fontFamily: 'Inter', fontSize: '0.48rem', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600 }}>
            {f1.kicker}
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.78rem', color: '#FAF7F2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {f1.title}
          </div>
        </div>
      </div>

      {/* ── Floater 2 ── */}
      <div
        ref={floater2Ref}
        className="scroll-floater floater-2"
        style={{
          position: 'absolute',
          left: f2.side === 'left' ? 'clamp(0.5rem, 3.5vw, 3.5rem)' : 'auto',
          right: f2.side === 'right' ? 'clamp(0.5rem, 3.5vw, 3.5rem)' : 'auto',
          top: f2.top || '44%',
          width: 'clamp(140px, 20vw, 270px)',
          aspectRatio: '16 / 10',
          borderRadius: '2px',
          overflow: 'hidden',
          border: '1px solid var(--gold)',
          boxShadow: '0 16px 45px rgba(0,0,0,0.55)',
          background: 'var(--bg-deep)',
          willChange: 'transform',
        }}
      >
        <img
          src={f2.img}
          alt={f2.title}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block', filter: 'brightness(0.95)' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0.35rem 0.55rem',
            background: 'linear-gradient(to top, rgba(16,10,12,0.92) 0%, transparent 100%)',
          }}
        >
          <div style={{ fontFamily: 'Inter', fontSize: '0.48rem', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600 }}>
            {f2.kicker}
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.78rem', color: '#FAF7F2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {f2.title}
          </div>
        </div>
      </div>

      {/* ── Floater 3 ── */}
      <div
        ref={floater3Ref}
        className="scroll-floater floater-3"
        style={{
          position: 'absolute',
          right: f3.side === 'right' ? 'clamp(0.5rem, 3.5vw, 3.5rem)' : 'auto',
          left: f3.side === 'left' ? 'clamp(0.5rem, 3.5vw, 3.5rem)' : 'auto',
          top: f3.top || '72%',
          width: 'clamp(115px, 16vw, 220px)',
          aspectRatio: '3 / 4',
          borderRadius: '2px',
          overflow: 'hidden',
          border: '1px solid var(--gold)',
          boxShadow: '0 16px 45px rgba(0,0,0,0.55)',
          background: 'var(--bg-deep)',
          willChange: 'transform',
        }}
      >
        <img
          src={f3.img}
          alt={f3.title}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block', filter: 'brightness(0.95)' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0.35rem 0.55rem',
            background: 'linear-gradient(to top, rgba(16,10,12,0.92) 0%, transparent 100%)',
          }}
        >
          <div style={{ fontFamily: 'Inter', fontSize: '0.48rem', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600 }}>
            {f3.kicker}
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.78rem', color: '#FAF7F2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {f3.title}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .scroll-floater {
            opacity: 0.88;
            box-shadow: 0 10px 25px rgba(0,0,0,0.45) !important;
          }
          .floater-1 {
            top: 5% !important;
            right: 0.5rem !important;
          }
          .floater-2 {
            top: 40% !important;
            left: 0.5rem !important;
          }
          .floater-3 {
            top: 75% !important;
            right: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  )
}
