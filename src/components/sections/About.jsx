import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutImage, gallery1, projectsImage } from '../../assets'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: '15+', label: 'Years Experience' },
  { num: '200+', label: 'Projects Completed' },
  { num: '12', label: 'Design Awards' },
  { num: '8', label: 'Countries' },
]

function Image3D({ src, alt, height = 'clamp(320px, 48vw, 600px)', children }) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)
  const glowRef = useRef(null)

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(wrapRef.current, { rotateY: x * 12, rotateX: -y * 10, duration: 0.5, ease: 'power2.out', transformPerspective: 1000 })
    gsap.to(imgRef.current, { scale: 1.06, x: x * 8, y: y * 6, duration: 0.5, ease: 'power2.out' })
    gsap.to(glowRef.current, { opacity: 1, x: (x + 1) * 50 + '%', y: (y + 1) * 50 + '%', duration: 0.4 })
  }

  const onMouseLeave = () => {
    if (window.innerWidth <= 1024) return
    gsap.to(wrapRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' })
    gsap.to(imgRef.current, { scale: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' })
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })
  }

  return (
    <div ref={wrapRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ position: 'relative', height, overflow: 'hidden', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <img ref={imgRef} src={src} alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)', transformOrigin: 'center', willChange: 'transform' }}
      />
      <div ref={glowRef} style={{
        position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, var(--gold-faint) 0%, transparent 70%)',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: 0, top: '50%', left: '50%',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  )
}

function SmallImage3D({ src, alt }) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(wrapRef.current, { rotateY: x * 10, rotateX: -y * 8, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
    gsap.to(imgRef.current, { scale: 1.05, x: x * 6, y: y * 4, duration: 0.4, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    if (window.innerWidth <= 1024) return
    gsap.to(wrapRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' })
    gsap.to(imgRef.current, { scale: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out' })
  }

  return (
    <div ref={wrapRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{ width: '100%', height: 'clamp(140px, 24vw, 200px)', overflow: 'hidden', marginBottom: '2.5rem', position: 'relative', transformStyle: 'preserve-3d' }}
    >
      <img ref={imgRef} src={src} alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transformOrigin: 'center' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--overlay-left)' }} />
      <div style={{
        position: 'absolute', bottom: '1rem', left: '1.2rem', right: '1.2rem',
        fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontStyle: 'italic',
        color: 'var(--text-bright)',
      }}>
        "Good design is quiet. You only notice it when it's missing."
      </div>
    </div>
  )
}

function VisionStrip() {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    gsap.to(imgRef.current, { x: x * 20, y: y * 10, scale: 1.04, duration: 0.6, ease: 'power2.out' })
  }

  const onMouseLeave = () => {
    if (window.innerWidth <= 1024) return
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' })
  }

  return (
    <div ref={wrapRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      className="vision-strip" style={{ position: 'relative', overflow: 'hidden' }}
    >
      <img ref={imgRef}
        src={projectsImage}
        alt="Vision"
        style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'brightness(var(--media-dark))', objectPosition: 'center 30%', transformOrigin: 'center', willChange: 'transform' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'var(--overlay-philosophy)',
        display: 'flex', alignItems: 'center', padding: '0 5%',
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ width: '30px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>Our Vision</span>
          </div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 3.5vw, 3.2rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.2 }}>
            We build for the people who will live there — not for awards.
          </h3>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const imgWrapRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgWrapRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: imgWrapRef.current, start: 'top 75%' },
      })
      gsap.to(imgRef.current, {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.from(textRef.current.children, {
        y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 75%' },
      })
      gsap.from('.stat-item', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.stat-item', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-pad"
      style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', right: '-2%', top: '5%',
        fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(6rem, 18vw, 18rem)',
        color: 'var(--gold-hair)', fontWeight: 700, pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
      }}>01</div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="about-grid">
          {/* Left — 3D Image */}
          <div ref={imgWrapRef} style={{ position: 'relative', clipPath: 'inset(0% 0% 0% 0%)' }}>
            <Image3D src={aboutImage} alt="Luxury Architecture" height="clamp(320px, 48vw, 600px)">
              <div style={{
                position: 'absolute', bottom: '-1rem', right: '-1rem',
                width: '60%', height: '60%', border: '1px solid var(--gold-mid)',
                pointerEvents: 'none', zIndex: 2,
              }} />
              <div style={{
                position: 'absolute', top: '1.5rem', left: '1.5rem',
                background: 'var(--card-bg-deep)', border: '1px solid var(--gold-mid)',
                padding: '0.65rem 1rem', zIndex: 3,
              }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--gold)', lineHeight: 1 }}>2010</div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'var(--text-soft)', textTransform: 'uppercase', marginTop: '0.2rem' }}>Est.</div>
              </div>
            </Image3D>
          </div>

          {/* Right — Text */}
          <div ref={textRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>About Us</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.15, marginBottom: '0.3rem' }}>
              Building homes that
            </h2>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, color: 'var(--gold)', fontStyle: 'italic', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              feel like a lifetime.
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.85, color: 'var(--text-dim)', marginBottom: '1.2rem' }}>
              Ekora Studio was founded on one belief — that a well-designed space changes
              how you live. We work with homeowners, developers and businesses who care
              deeply about what they build and why.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.85, color: 'var(--text-faint)', marginBottom: '2.5rem' }}>
              Every project starts with a conversation. We listen, we sketch, we refine —
              until the design feels exactly right. No templates, no shortcuts.
            </p>

            <SmallImage3D src={gallery1} alt="Interior" />

            <div className="stats-grid" style={{ paddingTop: '2rem', borderTop: '1px solid var(--gold-hair)' }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-item">
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: 'var(--gold)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--text-faint)', textTransform: 'uppercase', marginTop: '0.3rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <VisionStrip />
      </div>
    </section>
  )
}

