import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

import Hero from '../components/sections/Hero'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/ui/CTABanner'
import { heroMain, gallery1, gallery2, gallery3, w2_17_19, w2_17_18, w2_17_17, w2_17_16, philosophyVideo } from '../assets'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: '15+', label: 'Years of Experience' },
  { num: '200+', label: 'Projects Completed' },
  { num: '12', label: 'Design Awards' },
  { num: '8', label: 'Countries' },
]

const featured = [
  { title: 'Mr. Chishti Residence', category: 'Luxury Villa', location: 'Bihar, India', year: '2024', img: '/panoramas/chishti_residence_360_1.jpg' },
  { title: 'Mr. Azad Residence', category: 'Contemporary Residence', location: 'Ghaziabad, India', year: '2024', img: '/panoramas/azad_residence_360_1.jpg' },
  { title: 'Mr. Ajit Residence', category: 'Neoclassical Estate', location: 'Lucknow, India', year: '2024', img: '/panoramas/ajit_residence_360_1.jpg' },
]

const servicePreview = [
  { num: '01', title: 'Luxury Villas', desc: 'Private homes shaped around your routines, light and land.', img: w2_17_19 },
  { num: '02', title: 'Interior Design', desc: 'Considered interiors — every material chosen with a reason.', img: w2_17_18 },
  { num: '03', title: 'Commercial', desc: 'Workspaces that reflect what your business stands for.', img: w2_17_17 },
  { num: '04', title: 'Landscape', desc: 'Outdoor spaces that connect building to surroundings.', img: w2_17_16 },
]

const process = [
  { title: 'Listen', desc: 'Site, family, rituals and budget. Every project begins in conversation — we understand before we draw.' },
  { title: 'Design', desc: 'Sketches, models and 3D walkthroughs. We refine until the scheme feels inevitable, not imposed.' },
  { title: 'Build', desc: 'We stay on site, resolve details in the moment and keep the budget honest from day one.' },
  { title: 'Care', desc: 'Handover comes with documentation, warranties and a team that still answers your call years later.' },
]

const awards = [
  { title: 'Best Private Residence', body: 'Indian Institute of Architects', year: '2023' },
  { title: 'Interior Design of the Year', body: 'Elle Décor Awards', year: '2022' },
  { title: 'Top 10 Emerging Firms', body: 'Architecture Digest', year: '2021' },
  { title: 'Sustainable Design Award', body: 'Green Building Council', year: '2018' },
]

const testimonials = [
  { quote: 'Ekora listened to how we actually live before drawing a single wall. The house feels like it was always meant to be ours.', name: 'Rahul & Meera Desai', role: 'Casa Lumina, Alibaug' },
  { quote: 'Four months, zero surprises. Our office now gets complimented before anyone sits down.', name: 'Karan Malhotra', role: 'Founder, Nova Workspaces' },
  { quote: 'They saved us money by making things simpler — which is the rarest skill in this industry.', name: 'Anita Verma', role: 'Serene Heights, Pune' },
]

function FeaturedCard({ project, index }) {
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  const onMouseMove = (e) => {
    if (window.innerWidth <= 1024) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    cardRef.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
  }

  const onMouseLeave = () => {
    if (window.innerWidth <= 1024) return
    if (cardRef.current) cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className="reveal"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        background: 'var(--text-hair)',
        border: `1px solid ${hovered ? 'var(--gold-line)' : 'var(--text-hair)'}`,
        overflow: 'hidden',
        transition: 'border 0.3s, transform 0.4s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ position: 'relative', height: 'clamp(200px, 28vw, 260px)', overflow: 'hidden' }}>
        <img src={project.img} alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
            filter: hovered ? 'brightness(0.45)' : 'brightness(0.7)',
          }}
        />
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          background: 'var(--chip-bg)', border: '1px solid var(--gold-line)',
          borderRadius: '20px', padding: '0.25rem 0.7rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'Inter', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--gold)' }}>360°</span>
        </div>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          <button
            className="btn-outline"
            onClick={() => navigate('/projects')}
            style={{ padding: '0.65rem 1.6rem' }}
          >View 360°</button>
        </div>
      </div>
      <div style={{ padding: '1.4rem 1.6rem 1.8rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.22em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{project.category}</span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.75rem', color: 'var(--gold)' }}>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 1.8vw, 1.7rem)', fontWeight: 300, color: hovered ? 'var(--gold)' : 'var(--text)', transition: 'color 0.3s', marginBottom: '1rem', lineHeight: 1.2 }}>
          {project.title}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.8rem', borderTop: '1px solid var(--text-hair)' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: 'var(--text-faint)' }}>{project.location}</span>
          <button
            onClick={() => navigate('/projects')}
            style={{
              background: 'none', border: 'none', color: 'var(--gold)',
              fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem',
            }}
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  )
}

function ServicePreviewCard({ s }) {
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
    <div ref={cardRef} onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={() => navigate('/services')}
      className="reveal"
      style={{
        position: 'relative', overflow: 'hidden', height: 'clamp(290px, 38vw, 340px)', cursor: 'pointer',
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
        style={{ position: 'relative', zIndex: 2, padding: 'clamp(1.4rem, 2.5vw, 2rem)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transformStyle: 'preserve-3d' }}
      >
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '0.2em' }}>{s.num}</span>
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.25rem, 1.8vw, 1.85rem)', fontWeight: 300, color: hovered ? 'var(--gold)' : 'var(--text)', marginBottom: '0.6rem', lineHeight: 1.2, transition: 'color 0.3s' }}>
            {s.title}
          </h3>
          <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', lineHeight: 1.75, color: 'var(--text-dim)' }}>{s.desc}</p>
          <div ref={lineRef} style={{ marginTop: '1rem', width: '30px', height: '1px', background: 'var(--gold)' }} />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const introRef = useRef(null)
  const philVideoRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (philVideoRef.current) {
      philVideoRef.current.muted = true
      philVideoRef.current.play().catch(() => {})
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
      gsap.from('.stat-item', {
        y: 35, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.home-stats', start: 'top 88%' },
      })
    }, introRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={introRef}>
        <Hero
          actions={[
            { text: 'Explore Projects', onClick: () => navigate('/projects'), primary: true },
            { text: 'Recent Projects', onClick: () => navigate('/recent-projects'), primary: false },
          ]}
        />

        {/* ── Intro ── */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="about-grid">
              <div className="reveal" style={{ position: 'relative' }}>
                <img src={heroMain} alt="Ekora Studio" style={{ width: '100%', height: 'clamp(320px, 45vw, 560px)', objectFit: 'cover', filter: 'brightness(0.85)' }} />
                <div style={{ position: 'absolute', bottom: '-1rem', right: '-1rem', width: '65%', height: '65%', border: '1px solid var(--gold-mid)', pointerEvents: 'none' }} />
              </div>
              <div>
                <SectionHeading
                  kicker="Studio Profile"
                  title="Architecture of restraint and permanence."
                  sub="Founded in 2010 in Mumbai, Ekora is an architecture and spatial design practice dedicated to creating environments of profound calm, material honesty, and enduring craft."
                />
                <p className="reveal" style={{ fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.9, color: 'var(--text-soft)', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
                  We believe true luxury is quiet. It lives in the weight of a stone threshold, the slow transition of afternoon light across lime-plastered walls, and the precision with which every joint meets.
                </p>
                <div className="reveal" style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                  <button className="btn-gold" onClick={() => navigate('/about')}>Our Story &amp; Philosophy</button>
                  <button className="btn-outline" onClick={() => navigate('/book-a-tour')}>Book a Studio Tour</button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="home-stats stats-grid" style={{ marginTop: 'clamp(4rem, 8vw, 7rem)', paddingTop: '2.5rem', borderTop: '1px solid var(--gold-hair)' }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-item">
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', color: 'var(--gold)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'var(--text-faint)', textTransform: 'uppercase', marginTop: '0.4rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Philosophy ── */}
        <section className="section-pad" style={{ background: 'var(--bg-deep)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <video
            ref={philVideoRef}
            src={philosophyVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'brightness(0.35) saturate(1.1)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'var(--overlay-band)',
          }} />
          <div className="reveal" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '36px', height: '1px', background: 'var(--gold)', margin: '0 auto 2rem' }} />
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.3rem, 3vw, 2.5rem)',
              fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, color: 'var(--text)',
              textShadow: '0 4px 30px var(--shadow-deep)',
            }}>
              “We build for the people who live inside — not for the photograph taken at handover.
              Light, proportion and the weight of every material are the grammar we design in.”
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: '2rem' }}>
              Ar. Meera Kapoor — Principal Architect
            </p>
          </div>
        </section>

        {/* ── Featured Projects ── */}
        <section className="section-pad" style={{ background: 'var(--bg-alt)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <SectionHeading kicker="Selected Work" title="Featured projects" />
              <button
                className="btn-outline"
                onClick={() => navigate('/projects')}
              >View All Projects</button>
            </div>
            <div className="projects-grid">
              {featured.map((p, i) => <FeaturedCard key={i} project={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading
              kicker="How We Work"
              title="From first sketch to final key."
              align="center"
              sub="A process refined over fifteen years and two hundred projects — built around clarity, honesty and craft."
            />
            <div className="grid-resp-4" style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)', position: 'relative' }}>
              {process.map((p, i) => (
                <div key={i} className="reveal" style={{ position: 'relative' }}>
                  <div style={{
                    width: '2.6rem', height: '2.6rem', borderRadius: '50%',
                    border: '1px solid var(--gold-line)', background: 'var(--bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: 'var(--gold)',
                    marginBottom: '1.2rem', position: 'relative', zIndex: 1,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 300, color: 'var(--text)', marginBottom: '0.6rem', lineHeight: 1.2 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.78rem', lineHeight: 1.8, color: 'var(--text-dim)' }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Preview ── */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading
              kicker="What We Do"
              title="One studio, every discipline."
              sub="Architecture, interiors and landscape under a single roof — so nothing gets lost between the drawing and the door handle."
              align="center"
            />
            <div className="services-grid" style={{ marginTop: '3.5rem' }}>
              {servicePreview.map((s, i) => <ServicePreviewCard key={i} s={s} />)}
            </div>
          </div>
        </section>

        {/* ── Awards ── */}
        <section className="section-pad" style={{ background: 'var(--bg-alt)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading kicker="Recognition" title="Awards that followed the work." />
            <div className="grid-resp-2" style={{
              background: 'var(--gold-faint)', border: '1px solid var(--gold-faint)', marginTop: '3.5rem', gap: '1px',
            }}>
              {awards.map((a, i) => (
                <div key={i} className="reveal" style={{
                  background: 'var(--bg-alt)', padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 3rem)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                }}>
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 300, color: 'var(--text)', marginBottom: '0.35rem' }}>
                      {a.title}
                    </h3>
                    <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                      {a.body}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: 'var(--gold)', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                    {a.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <SectionHeading kicker="Client Voices" title="What they say when the work is done." align="center" />
            <div className="grid-resp-3" style={{ marginTop: '3.5rem' }}>
              {testimonials.map((t, i) => (
                <div key={i} className="reveal" style={{
                  border: '1px solid var(--gold-faint)', background: 'var(--text-hair)',
                  padding: 'clamp(1.5rem, 3vw, 2.2rem) clamp(1.4rem, 3vw, 2.2rem)', display: 'flex', flexDirection: 'column', gap: '1.2rem',
                }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem', lineHeight: 0.6, color: 'var(--gold)' }}>“</span>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--text-bright)' }}>
                    {t.quote}
                  </p>
                  <div style={{ borderTop: '1px solid var(--gold-faint)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                      {t.name}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '0.25rem' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <CTABanner
          title="Come see the difference in person."
          sub="Step inside one of our completed villas or our design studio. Walk the spaces, feel the materials, and meet the team behind the work."
        />
      </main>
      <Footer />
    </>
  )
}

