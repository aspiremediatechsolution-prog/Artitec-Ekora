import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import PageBanner from './PageBanner'
import Footer from '../components/sections/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/ui/CTABanner'
import TiltCard from '../components/ui/TiltCard'
import { founderIshwer, founderRajdeep, ctaAbout } from '../assets'

gsap.registerPlugin(ScrollTrigger)

/* ─── Design Principles data ── */
const principles = [
  { key: 'Context',          desc: 'Understanding the site, climate, culture and surroundings before defining form.' },
  { key: 'Function',         desc: 'Creating spaces that are intuitive, efficient and responsive to the needs of their users.' },
  { key: 'Technology',       desc: 'Using computational and parametric tools to explore intelligent, adaptable and innovative design solutions.' },
  { key: 'Materiality',      desc: 'Celebrating materials through their texture, performance, craftsmanship and relationship with light.' },
  { key: 'Sustainability',   desc: 'Integrating passive design, natural light, ventilation, shading and environmentally conscious strategies wherever appropriate.' },
  { key: 'Human Experience', desc: 'Designing architecture around movement, perception, comfort, emotion and interaction.' },
  { key: 'Buildability',     desc: 'Ensuring that creativity is supported by structural logic, construction knowledge, economic feasibility and practical execution.' },
]

/* ─── Ishwer process steps ── */
const process = [
  { num: '01', title: 'Observe',      desc: 'Understanding the site, its environment, people, climate, opportunities and constraints.' },
  { num: '02', title: 'Question',     desc: 'Identifying the central architectural problem and asking what the project should truly achieve.' },
  { num: '03', title: 'Analyse',      desc: 'Studying orientation, circulation, zoning, views, daylight, climate, structure, materials and contextual relationships.' },
  { num: '04', title: 'Conceptualise',desc: 'Translating the analysis into a clear architectural idea — a principle that can guide the project from the first sketch to the final detail.' },
  { num: '05', title: 'Explore',      desc: 'Testing multiple possibilities through sketches, diagrams, physical models, 3D modelling and computational tools.' },
  { num: '06', title: 'Refine',       desc: 'Balancing aesthetics with function, structure, cost, materiality, sustainability and construction feasibility.' },
  { num: '07', title: 'Experience',   desc: 'Evaluating the architecture from the perspective of the user — how it is approached, entered, occupied, perceived and remembered.' },
]

/* ─── Gold line label ── */
function GoldLabel({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.6rem' }}>
      <div style={{ width: '32px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'Inter', fontSize: '0.6rem',
        letterSpacing: '0.3em', color: 'var(--gold)',
        textTransform: 'uppercase',
      }}>{text}</span>
    </div>
  )
}

/* ─── Body text ── */
function Body({ children, style }) {
  return (
    <p style={{
      fontFamily: 'Inter', fontSize: '0.86rem',
      lineHeight: 1.95, color: 'var(--text-dim)',
      marginBottom: '1.1rem',
      ...style,
    }}>{children}</p>
  )
}

export default function AboutPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={pageRef}>
        <PageBanner title="About" sub="EKORA ARCHITECTS — Architecture with Purpose. Identity. Experience." />

        {/* ══════════════════════════════════════════════
            SECTION 1 — ABOUT EKORA ARCHITECTS
        ══════════════════════════════════════════════ */}
        <section className="section-pad reveal" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            {/* Intro */}
            <div style={{ maxWidth: '860px', marginBottom: '5rem' }}>
              <GoldLabel text="About EKORA ARCHITECTS" />
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                fontWeight: 300, color: 'var(--text)',
                lineHeight: 1.15, marginBottom: '2.4rem',
              }}>
                Architecture with Purpose.<br />Identity. Experience.
              </h2>
              <Body>EKORA ARCHITECTS is an architecture and design practice committed to creating thoughtful, contemporary and context-responsive spaces. Our approach brings together architecture, interior design, urban thinking, technology and human experience to develop environments that are purposeful, expressive and enduring.</Body>
              <Body>At EKORA ARCHITECTS, we believe that every project begins with an understanding of its place, people and purpose. Rather than following a predetermined style, we develop design solutions that respond to the unique character of the site, climate, culture, functionality and aspirations of the client. Our work seeks to establish a meaningful dialogue between the built environment and its surroundings.</Body>
              <Body>We explore the possibilities of contemporary, computational and parametric design to create architecture with a strong identity. Digital tools allow us to investigate complex geometries, adaptive systems, façade patterns, day-light, shading and material relationships, transforming technology into a meaningful design instrument rather than merely an aesthetic feature.</Body>
              <Body>Our design process is equally grounded in practicality and buildability. We believe innovation must respond to real-world conditions, including budget, construction techniques, material availability, structural logic, maintenance and environmental performance. The objective is to create architecture that is not only visually distinctive but also economical, functional, sustainable and capable of standing the test of time.</Body>
              <Body>From residences and commercial spaces to hospitality, institutional, interior and urban projects, EKORA ARCHITECTS approaches each assignment as an opportunity to create a distinct architectural experience. We aim to balance logic with expression, tradition with technology, and functionality with emotion.</Body>
            </div>

            {/* Philosophy quote block */}
            <div className="reveal" style={{
              borderLeft: '3px solid var(--gold)',
              padding: 'clamp(1.5rem, 3vw, 2.4rem) clamp(1.4rem, 3vw, 3rem)',
              background: 'var(--bg-alt)',
              marginBottom: '4rem',
              maxWidth: '860px',
            }}>
              <div style={{
                fontFamily: 'Inter', fontSize: '0.6rem',
                letterSpacing: '0.28em', color: 'var(--gold)',
                textTransform: 'uppercase', marginBottom: '1.2rem',
              }}>Our Architecture Philosophy</div>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.2rem, 2vw, 1.7rem)',
                fontStyle: 'italic', fontWeight: 300,
                color: 'var(--text)', lineHeight: 1.6,
                marginBottom: '1.6rem',
              }}>
                "Architecture should emerge from the relationship between context, function, technology and human experience."
              </p>
              <Body>For us, form is not an isolated aesthetic exercise. It is the result of understanding a place — its climate, culture, movement, light, materiality and people. We are interested in creating architecture that possesses a strong identity while remaining sensitive and responsive to its surroundings.</Body>
              <Body>We see computational and parametric design as a means of exploring relationships, rather than as an end in itself. Technology enables us to move beyond repetitive forms and develop adaptable systems in which geometry, light, shading, material and structure can work together to create intelligent and responsive environments.</Body>
              <Body>At the same time, we believe that innovation should remain grounded in reality. Good architecture must be buildable, economical, environmentally responsible and sensitive to local materials and construction techniques. Design innovation has meaning when it can translate successfully from concept to construction and ultimately improve the experience of the people who inhabit it.</Body>
              <Body>Our approach therefore exists between logic and expression, tradition and technology, functionality and emotion. We seek to create spaces where every design decision has a purpose while still allowing architecture to evoke a sense of character, identity and belonging.</Body>
              <Body style={{ marginBottom: 0 }}>Ultimately, our ambition at EKORA ARCHITECTS is to create architecture that is not merely seen, but experienced — architecture with purpose, identity and a meaningful connection to its place.</Body>
            </div>

            {/* Design Principles grid */}
            <div className="reveal">
              <SectionHeading kicker="Our Design Principles" title="The values behind every decision." />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                gap: '1px',
                marginTop: '3rem',
                background: 'var(--text-hair)',
                border: '1px solid var(--text-hair)',
              }}>
                {principles.map((p, i) => (
                  <TiltCard key={i} maxTilt={5}>
                    <div style={{
                      padding: 'clamp(1.4rem, 2.5vw, 2rem) clamp(1.4rem, 2.5vw, 2.2rem)',
                      background: 'var(--bg)',
                      height: '100%',
                    }}>
                      <div style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.2rem', fontWeight: 300,
                        color: 'var(--gold)', marginBottom: '0.7rem',
                      }}>{p.key}</div>
                      <p style={{
                        fontFamily: 'Inter', fontSize: '0.76rem',
                        lineHeight: 1.8, color: 'var(--text-dim)',
                      }}>{p.desc}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="reveal" style={{
              marginTop: '4rem',
              padding: 'clamp(1.5rem, 3vw, 2.4rem) clamp(1.4rem, 3vw, 3rem)',
              background: 'var(--bg-deep)',
              border: '1px solid var(--gold-line)',
              maxWidth: '860px',
            }}>
              <div style={{
                fontFamily: 'Inter', fontSize: '0.6rem',
                letterSpacing: '0.28em', color: 'var(--gold)',
                textTransform: 'uppercase', marginBottom: '1rem',
              }}>Our Vision</div>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
                fontWeight: 300, color: 'var(--text)', lineHeight: 1.7,
              }}>
                To establish EKORA ARCHITECTS as a design practice known for contextual thinking, architectural innovation, technological exploration and meaningful human experiences — creating spaces that are distinctive yet timeless, contemporary yet rooted in place.
              </p>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 2 — AR. ISHWER SINGH
        ══════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: 'var(--bg-alt)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <div className="reveal grid-founder-ishwer">
              {/* Photo column */}
              <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                <div style={{
                  position: 'relative',
                  marginBottom: '2rem',
                }}>
                  <img
                    src={founderIshwer}
                    alt="Ar. Ishwer Singh"
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.88)',
                    }}
                  />
                  {/* Gold corner accent */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-1rem', right: '-1rem',
                    width: '60%', height: '60%',
                    border: '1px solid var(--gold-mid)',
                    pointerEvents: 'none',
                  }} />
                </div>
                {/* Name card below photo */}
                <div style={{
                  padding: '1.4rem 1.6rem',
                  background: 'var(--bg-deep)',
                  border: '1px solid var(--gold-line)',
                  borderLeft: '3px solid var(--gold)',
                }}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.35rem', fontWeight: 300,
                    color: 'var(--text)', marginBottom: '0.3rem',
                  }}>Ar. Ishwer Singh</div>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '0.6rem',
                    letterSpacing: '0.18em', color: 'var(--gold)',
                    textTransform: 'uppercase',
                  }}>Founder &amp; Principal Architect</div>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '0.6rem',
                    letterSpacing: '0.12em', color: 'var(--text-faint)',
                    textTransform: 'uppercase', marginTop: '0.2rem',
                  }}>EKORA ARCHITECTS</div>
                </div>
              </div>

              {/* Content column */}
              <div>
                <GoldLabel text="Founder &amp; Principal Architect" />
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                  fontWeight: 300, color: 'var(--text)',
                  lineHeight: 1.2, marginBottom: '2rem',
                }}>Ar. Ishwer Singh</h2>

                <Body>Ar. Ishwer Singh, Founder and Principal Architect of EKORA ARCHITECTS, approaches architecture as a process of discovery rather than simply the creation of form. His design philosophy is rooted in the belief that meaningful architecture emerges from the relationship between context, function, material, technology and human experience.</Body>
                <Body>For Ishwer Singh, every project begins with a question: What does this place need, and how can architecture respond to it meaningfully? Rather than imposing a predefined architectural language, he believes in understanding the site, its surroundings, climate, movement patterns, cultural character and the people who will experience the space.</Body>

                {/* Design principles accordion-style */}
                <div style={{ marginTop: '2.4rem', marginBottom: '2.4rem' }}>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '0.6rem',
                    letterSpacing: '0.28em', color: 'var(--gold)',
                    textTransform: 'uppercase', marginBottom: '1.4rem',
                  }}>Design Principles</div>
                  {[
                    { title: 'Context Before Form',       desc: 'The context becomes the starting point of the design process. Site orientation, climate, surrounding built fabric, views, access, vegetation, light and local character are studied to establish the fundamental logic of the architecture.' },
                    { title: 'Function as the Foundation',desc: 'Function is treated not simply as a requirement but as an opportunity to organize space intelligently. Circulation, zoning, proportions, privacy, interaction and user movement are carefully considered so that the final design feels natural and intuitive.' },
                    { title: 'Form Through Logic',        desc: 'Strong architectural forms are often the result of a strong underlying logic. Massing, voids, proportions, openings and façade elements are developed through a process of analysis and refinement, allowing aesthetics and functionality to evolve together.' },
                    { title: 'Technology as a Design Tool',desc: 'Computational and parametric design are explored as tools for generating responsive architectural systems — developing relationships between geometry, structure, daylight, shading, ventilation and materiality.' },
                    { title: 'Light as an Architectural Material', desc: 'Natural light plays an important role in shaping his spaces. Openings, courtyards, screens, skylights and façade systems are considered not only for illumination but also for creating changing experiences throughout the day.' },
                    { title: 'Material with Purpose',     desc: 'Material selection is driven by both aesthetics and performance. Texture, scale, colour, durability, local availability, construction techniques and maintenance are considered together to create a coherent material language.' },
                    { title: 'Human Experience',          desc: 'At the centre of the design process is the user. Architecture is experienced through movement, touch, light, sound, proportion and emotion — the objective is to create a space that feels meaningful to inhabit.' },
                  ].map((item, i) => (
                    <div key={i} className="grid-principle-row">
                      <div style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1rem', color: 'var(--gold)',
                        fontStyle: 'italic',
                      }}>{item.title}</div>
                      <p style={{
                        fontFamily: 'Inter', fontSize: '0.78rem',
                        lineHeight: 1.8, color: 'var(--text-dim)',
                        margin: 0,
                      }}>{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Process steps */}
                <div style={{ marginBottom: '2.4rem' }}>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '0.6rem',
                    letterSpacing: '0.28em', color: 'var(--gold)',
                    textTransform: 'uppercase', marginBottom: '1.6rem',
                  }}>The Process of Thinking</div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
                    gap: '1rem',
                  }}>
                    {process.map((s, i) => (
                      <div key={i} style={{
                        padding: '1.2rem 1.4rem',
                        background: 'var(--bg-deep)',
                        border: '1px solid var(--text-hair)',
                      }}>
                        <div style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '0.85rem', color: 'var(--gold)',
                          letterSpacing: '0.1em', marginBottom: '0.5rem',
                        }}>{s.num} — {s.title}</div>
                        <p style={{
                          fontFamily: 'Inter', fontSize: '0.73rem',
                          lineHeight: 1.75, color: 'var(--text-dim)',
                          margin: 0,
                        }}>{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Closing quote */}
                <div style={{
                  padding: '1.6rem 2rem',
                  background: 'var(--bg)',
                  borderLeft: '3px solid var(--gold)',
                  marginTop: '2rem',
                }}>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1rem, 1.6vw, 1.35rem)',
                    fontStyle: 'italic', fontWeight: 300,
                    color: 'var(--text)', lineHeight: 1.65, margin: 0,
                  }}>
                    "I believe architecture should not begin with the question of what a building should look like. It should begin with understanding what the place, the people and the purpose demand. The form should emerge from that understanding."
                  </p>
                </div>

                <Body style={{ marginTop: '1.6rem' }}>Through this philosophy, Ar. Ishwer Singh aims to create architecture that is contextual yet contemporary, innovative yet buildable, expressive yet purposeful — spaces that are not merely objects within a landscape, but meaningful experiences connected to their place.</Body>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3 — MR. RAJDEEP SINGH
        ══════════════════════════════════════════════ */}
        <section className="section-pad" style={{ background: 'var(--bg)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <div className="reveal grid-founder-rajdeep">
              {/* Content column (left) */}
              <div>
                <GoldLabel text="Business Partner &amp; Project Operations" />
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                  fontWeight: 300, color: 'var(--text)',
                  lineHeight: 1.2, marginBottom: '2rem',
                }}>Mr. Rajdeep Singh</h2>

                <Body>Mr. Rajdeep Singh is a Business Partner at EKORA ARCHITECTS, playing a key role in translating the firm's design vision into well-executed, practical and efficiently managed projects. With strong field knowledge and extensive understanding of construction, materials, execution and project coordination, he bridges the gap between design, client requirements and on-site implementation.</Body>
                <Body>His role extends beyond conventional business management. He closely handles client coordination, turnkey project execution, vendor and contractor management, procurement, site supervision and project operations, ensuring that the design intent is effectively carried through to the final execution.</Body>
                <Body>Rajdeep has developed a strong practical understanding of the architecture and construction industry through hands-on involvement in projects. His knowledge of construction processes, materials, workmanship, site conditions, costing and execution methodologies enables him to make informed decisions and efficiently resolve practical challenges on site.</Body>

                {/* Key roles */}
                <div style={{ margin: '2.4rem 0' }}>
                  {[
                    {
                      title: 'Client &amp; Project Coordination',
                      body: 'Rajdeep Singh serves as an important point of connection between the client, design team, contractors and site teams. He understands client expectations and works closely with the architectural team to ensure that requirements are translated into practical and achievable solutions. His approach is centred around clear communication, accountability and timely execution.',
                    },
                    {
                      title: 'Financial &amp; Business Management',
                      body: 'Alongside project execution, Rajdeep Singh oversees the financial and commercial aspects of the company. He manages project budgets, costing, procurement decisions, vendor coordination, payments and financial planning, helping ensure that projects remain commercially viable without compromising the intended quality.',
                    },
                  ].map((item, i) => (
                    <div key={i} style={{
                      borderBottom: '1px solid var(--text-hair)',
                      padding: '1.2rem 0',
                    }}>
                      <div
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.15rem', color: 'var(--gold)',
                          fontStyle: 'italic', marginBottom: '0.6rem',
                        }}
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                      <p style={{
                        fontFamily: 'Inter', fontSize: '0.82rem',
                        lineHeight: 1.85, color: 'var(--text-dim)', margin: 0,
                      }}>{item.body}</p>
                    </div>
                  ))}
                </div>

                {/* Closing quote */}
                <div style={{
                  padding: '1.6rem 2rem',
                  background: 'var(--bg-alt)',
                  borderLeft: '3px solid var(--gold)',
                  marginBottom: '1.6rem',
                }}>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
                    fontStyle: 'italic', fontWeight: 300,
                    color: 'var(--text)', lineHeight: 1.65, margin: 0,
                  }}>
                    "Great architecture is not complete when it is designed; it is complete when the idea is successfully translated into reality."
                  </p>
                </div>

                <Body>Through his combination of field knowledge, client management, execution expertise and financial understanding, Rajdeep Singh contributes to making EKORA ARCHITECTS not only a design practice, but a design-to-execution platform capable of delivering complete architectural and turnkey solutions.</Body>
              </div>

              {/* Photo column (right) */}
              <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                  <img
                    src={founderRajdeep}
                    alt="Mr. Rajdeep Singh"
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.88)',
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-1rem', left: '-1rem',
                    width: '60%', height: '60%',
                    border: '1px solid var(--gold-mid)',
                    pointerEvents: 'none',
                  }} />
                </div>
                {/* Name card below photo */}
                <div style={{
                  padding: '1.4rem 1.6rem',
                  background: 'var(--bg-deep)',
                  border: '1px solid var(--gold-line)',
                  borderLeft: '3px solid var(--gold)',
                }}>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.35rem', fontWeight: 300,
                    color: 'var(--text)', marginBottom: '0.3rem',
                  }}>Mr. Rajdeep Singh</div>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '0.6rem',
                    letterSpacing: '0.18em', color: 'var(--gold)',
                    textTransform: 'uppercase',
                  }}>Business Partner &amp; Project Operations</div>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '0.6rem',
                    letterSpacing: '0.12em', color: 'var(--text-faint)',
                    textTransform: 'uppercase', marginTop: '0.2rem',
                  }}>EKORA ARCHITECTS</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <CTABanner
          title="Meet the team behind every project."
          sub="Book a studio visit and talk through your project with the team — no pitch, no pressure."
          video={ctaAbout}
        />
      </main>
      <Footer />
    </>
  )
}

