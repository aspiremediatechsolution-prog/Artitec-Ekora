import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import CardCarousel from '../ui/CardCarousel'
import { w2_17_19, w2_17_18, w2_17_17, w2_17_16 } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Luxury Villas & Estates',
    desc: 'Private residences shaped around your family rituals, climate orientation, daylight, and natural landscape.',
    scope: ['Site & Solar Analysis', 'Parametric 3D Modeling', 'Structural Engineering', 'Turnkey Construction'],
    img: w2_17_19,
  },
  {
    num: '02',
    title: 'Interior Architecture & FF&E',
    desc: 'Considered interiors where every texture, custom stone junction, lighting layer, and bespoke furniture piece is curated.',
    scope: ['Spatial Planning', 'Material & Lighting Palettes', 'Bespoke Joinery & Metalwork', 'Custom FF&E Procurement'],
    img: w2_17_18,
  },
  {
    num: '03',
    title: 'Commercial & Workplace',
    desc: 'Workspaces and boutique medical facilities designed to elevate productivity, user wellbeing, and brand presence.',
    scope: ['Circulation & Flow Strategy', 'Acoustic & Thermal Comfort', 'Branded Environment', 'Code & Safety Compliance'],
    img: w2_17_17,
  },
  {
    num: '04',
    title: 'Landscape Architecture',
    desc: 'Outdoor living spaces, courtyards, and native biophilic ecosystems that seamlessly connect building to surroundings.',
    scope: ['Microclimate Conditioning', 'Native Planting Schemes', 'Water Features & Hardscape', 'Outdoor Living Extensions'],
    img: w2_17_16,
  },
]

function ServiceCard({ s }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const glowRef = useRef(null)
  const lineRef = useRef(null)
  const contentRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(cardRef.current, { rotateY: x * 10, rotateX: -y * 8, duration: 0.4, ease: 'power2.out', transformPerspective: 900 })
    gsap.to(imgRef.current, { scale: 1.08, x: x * 8, y: y * 6, filter: 'brightness(0.5)', duration: 0.5, ease: 'power2.out' })
    gsap.to(glowRef.current, { opacity: 1, left: (x + 1) * 50 + '%', top: (y + 1) * 50 + '%', duration: 0.3 })
    gsap.to(contentRef.current, { z: 20, duration: 0.4, ease: 'power2.out' })
  }

  const onMouseEnter = () => {
    setHovered(true)
    if (lineRef.current) gsap.to(lineRef.current, { width: '50px', duration: 0.35, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    setHovered(false)
    if (window.innerWidth <= 1024) return
    if (cardRef.current) gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' })
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1, x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
      imgRef.current.style.filter = 'brightness(var(--media-dark))'
    }
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 })
    if (contentRef.current) gsap.to(contentRef.current, { z: 0, duration: 0.6, ease: 'power3.out' })
    if (lineRef.current) gsap.to(lineRef.current, { width: '24px', duration: 0.35, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => navigate('/contact')}
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: 'clamp(380px, 46vw, 440px)',
        border: `1px solid ${hovered ? 'var(--gold-line)' : 'var(--text-hair)'}`,
        transition: 'border-color 0.3s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'pointer',
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
              fontSize: 'clamp(1.4rem, 2vw, 1.85rem)',
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
              marginBottom: '1rem',
            }}
          >
            {s.desc}
          </p>

          {/* Scope Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {s.scope.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.62rem',
                  color: 'var(--text-faint)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '0.2rem 0.55rem',
                  border: '1px solid var(--text-hair)',
                  borderRadius: '2px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            ref={lineRef}
            style={{
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

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}
          >
            Disciplines
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(2.2rem, 4.2vw, 3.8rem)',
            fontWeight: 300,
            color: 'var(--heading)',
            marginBottom: '3.5rem',
            lineHeight: 1.15,
          }}
        >
          Comprehensive Architectural &amp; Spatial Services
        </h2>
        <div style={{ marginTop: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
          <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 2 }} gap={24} autoPlay={true} autoPlayInterval={3400}>
            {services.map((s, i) => (
              <div key={i} className="service-card" style={{ height: '100%' }}>
                <ServiceCard s={s} />
              </div>
            ))}
          </CardCarousel>
        </div>
      </div>
    </section>
  )
}
