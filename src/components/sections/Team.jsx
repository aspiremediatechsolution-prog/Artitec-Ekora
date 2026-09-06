import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CardCarousel from '../ui/CardCarousel'
import { w2_17_16, w2_16_49, w2_16_59, w2_16_33 } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

const team = [
  { name: 'Arjun Mehta', role: 'Principal Architect', exp: '18 Years', img: w2_17_16 },
  { name: 'Priya Sharma', role: 'Interior Design Lead', exp: '12 Years', img: w2_16_49 },
  { name: 'Rohan Kapoor', role: 'Landscape Architect', exp: '10 Years', img: w2_16_59 },
  { name: 'Anika Verma', role: 'Project Director', exp: '14 Years', img: w2_16_33 },
]

function TeamCard({ member }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const overlayRef = useRef(null)
  const glowRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(cardRef.current, { rotateY: x * 15, rotateX: -y * 12, duration: 0.4, ease: 'power2.out', transformPerspective: 900 })
    gsap.to(imgRef.current, { scale: 1.1, x: x * 8, y: y * 6, duration: 0.5, ease: 'power2.out' })
    gsap.to(glowRef.current, { opacity: 1, left: (x + 1) * 50 + '%', top: (y + 1) * 50 + '%', duration: 0.3 })
  }

  const onMouseEnter = () => {
    setHovered(true)
    if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    setHovered(false)
    if (window.innerWidth <= 1024) return
    if (cardRef.current) gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' })
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' })
    if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 })
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 })
  }

  return (
    <div ref={cardRef} onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      className="team-card"
      style={{
        position: 'relative', overflow: 'hidden',
        border: `1px solid ${hovered ? 'var(--gold-line)' : 'var(--text-hair)'}`,
        transition: 'border-color 0.3s', transformStyle: 'preserve-3d', willChange: 'transform',
        height: '100%',
      }}
    >
      <div style={{ position: 'relative', height: 'clamp(220px, 32vw, 280px)', overflow: 'hidden' }}>
        <img ref={imgRef} src={member.img} alt={member.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: hovered ? 'brightness(0.5) grayscale(0%)' : 'brightness(0.7) grayscale(30%)',
            transformOrigin: 'center', transition: 'filter 0.5s', willChange: 'transform',
          }}
        />
        <div ref={glowRef} style={{
          position: 'absolute', width: '160px', height: '160px', borderRadius: '50%',
          background: 'radial-gradient(circle, var(--gold-faint) 0%, transparent 70%)',
          transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: 0, top: '50%', left: '50%', zIndex: 2,
        }} />
        <div ref={overlayRef} style={{
          position: 'absolute', inset: 0,
          background: 'var(--overlay-video)',
          opacity: 0, zIndex: 1,
        }} />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '24px', height: '24px', borderTop: '1px solid var(--gold-line)', borderRight: '1px solid var(--gold-line)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', zIndex: 3 }} />
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', width: '24px', height: '24px', borderBottom: '1px solid var(--gold-line)', borderLeft: '1px solid var(--gold-line)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', zIndex: 3 }} />
      </div>
      <div style={{
        padding: '1.4rem 1.6rem 1.6rem',
        background: hovered ? 'var(--gold-hair)' : 'transparent',
        transition: 'background 0.3s', transformStyle: 'preserve-3d',
      }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 400, color: 'var(--heading)', marginBottom: '0.3rem', transition: 'color 0.3s' }}>
          {member.name}
        </h3>
        <p style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          {member.role}
        </p>
        <p style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: 'var(--text-faint)' }}>
          {member.exp} Experience
        </p>
      </div>
    </div>
  )
}

export default function Team() {
  const sectionRef = useRef(null)

  return (
    <section id="team" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>Our Team</span>
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', fontWeight: 300, color: 'var(--heading)', marginBottom: '2.5rem', lineHeight: 1.1 }}>
          The people behind the work
        </h2>
        <CardCarousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }} gap={20} autoPlay={true} autoPlayInterval={3400}>
          {team.map((member, i) => <TeamCard key={i} member={member} />)}
        </CardCarousel>
      </div>
    </section>
  )
}

