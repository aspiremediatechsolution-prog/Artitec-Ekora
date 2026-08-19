import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { w2_17_19, w2_17_18, w2_17_17, w2_17_16 } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { num: '01', title: 'Luxury Villas', desc: 'Private homes designed around how you actually live — your routines, your light, your land.', img: w2_17_19 },
  { num: '02', title: 'Interior Design', desc: 'Interiors that feel considered. Every material, every proportion chosen with a reason.', img: w2_17_18 },
  { num: '03', title: 'Commercial Architecture', desc: 'Offices, studios and retail spaces that reflect what a business stands for — from the outside in.', img: w2_17_17 },
  { num: '04', title: 'Landscape Design', desc: 'Outdoor spaces that connect the building to its surroundings, not fight against them.', img: w2_17_16 },
]

function ServiceCard({ s }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const glowRef = useRef(null)
  const lineRef = useRef(null)
  const contentRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(cardRef.current, { rotateY: x * 14, rotateX: -y * 10, duration: 0.4, ease: 'power2.out', transformPerspective: 900 })
    gsap.to(imgRef.current, { scale: 1.1, x: x * 10, y: y * 8, filter: 'brightness(0.55)', duration: 0.5, ease: 'power2.out' })
    gsap.to(glowRef.current, { opacity: 1, left: (x + 1) * 50 + '%', top: (y + 1) * 50 + '%', duration: 0.3 })
    gsap.to(contentRef.current, { z: 30, duration: 0.4, ease: 'power2.out' })
  }

  const onMouseEnter = () => {
    setHovered(true)
    if (lineRef.current) gsap.to(lineRef.current, { width: '60px', duration: 0.4, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    setHovered(false)
    if (window.innerWidth <= 1024) return
    if (cardRef.current) gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' })
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out' })
      imgRef.current.style.filter = 'brightness(var(--media-dark))'
    }
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 })
    if (contentRef.current) gsap.to(contentRef.current, { z: 0, duration: 0.7, ease: 'power3.out' })
    if (lineRef.current) gsap.to(lineRef.current, { width: '30px', duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div ref={cardRef} onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      style={{
        position: 'relative', overflow: 'hidden', height: 'clamp(300px, 42vw, 360px)',
        border: `1px solid ${hovered ? 'var(--gold-line)' : 'var(--text-hair)'}`,
        transition: 'border 0.3s', transformStyle: 'preserve-3d', willChange: 'transform',
      }}
    >
      <img ref={imgRef} src={s.img} alt={s.title}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(var(--media-dark))', transformOrigin: 'center', willChange: 'transform' }}
      />
      <div ref={glowRef} style={{
        position: 'absolute', width: '180px', height: '180px', borderRadius: '50%',
        background: 'radial-gradient(circle, var(--gold-faint) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: 0, top: '50%', left: '50%', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'var(--overlay-video)',
      }} />
      <div ref={contentRef}
        style={{ position: 'relative', zIndex: 2, padding: 'clamp(1.5rem, 3vw, 2rem)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transformStyle: 'preserve-3d' }}
      >
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.2em' }}>{s.num}</span>
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 2vw, 1.85rem)', fontWeight: 300, color: hovered ? 'var(--gold)' : 'var(--text)', marginBottom: '0.6rem', lineHeight: 1.2, transition: 'color 0.3s' }}>
            {s.title}
          </h3>
          <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', lineHeight: 1.75, color: 'var(--text-dim)' }}>{s.desc}</p>
          <div ref={lineRef} style={{ marginTop: '1rem', width: '30px', height: '1px', background: 'var(--gold)' }} />
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
        y: 60, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>What We Do</span>
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '3.5rem', lineHeight: 1.1 }}>
          What we do
        </h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card"><ServiceCard s={s} /></div>
          ))}
        </div>
      </div>
    </section>
  )
}

