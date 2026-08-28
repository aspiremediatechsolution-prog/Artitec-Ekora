import { useEffect, useRef, useState } from 'react'
import { projectsData } from '../../data/projectsData'

/* ─── Video Lightbox ────────────────────────────────────────── */
function VideoLightbox({ src, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(10,1,2,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        controls
        autoPlay
        playsInline
        preload="auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '92vw', maxHeight: '88vh',
          outline: 'none',
          boxShadow: '0 0 80px rgba(0,0,0,0.8)',
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '2rem',
          background: 'none', border: '1px solid var(--gold-line)',
          color: 'var(--gold)', fontFamily: 'Inter', fontSize: '0.7rem',
          letterSpacing: '0.15em', padding: '0.4rem 0.9rem', cursor: 'pointer',
        }}
      >
        CLOSE
      </button>
    </div>
  )
}

/* ─── Image Lightbox ────────────────────────────────────────── */
function ImageLightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(10,1,2,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'zoom-out',
      }}
    >
      <img
        src={src}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '92vw', maxHeight: '92vh',
          objectFit: 'contain',
          boxShadow: '0 0 80px rgba(0,0,0,0.8)',
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '2rem',
          background: 'none', border: '1px solid var(--gold-line)',
          color: 'var(--gold)', fontFamily: 'Inter', fontSize: '0.7rem',
          letterSpacing: '0.15em', padding: '0.4rem 0.9rem', cursor: 'pointer',
        }}
      >
        CLOSE
      </button>
    </div>
  )
}

/* ─── Media Item (image or video) ──────────────────────────── */
function MediaItem({ src, index, projectName, onClickImage, onClickVideo }) {
  const isVideo = /\.(mp4|mov|webm|MP4|MOV)$/i.test(src)
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [isVideo, src])

  return (
    <div
      onClick={() => isVideo ? onClickVideo(src) : onClickImage(src)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '16/10',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--bg-alt)',
        border: `1px solid ${hovered ? 'var(--gold-line)' : 'var(--text-hair)'}`,
        transition: 'border-color 0.2s',
      }}
    >
      {isVideo ? (
        <>
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
          {/* Play icon */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: hovered ? 'rgba(24, 15, 17, 0.6)' : 'rgba(24, 15, 17, 0.4)',
            transition: 'background 0.3s',
          }}>
            <div style={{
              width: hovered ? '52px' : '44px',
              height: hovered ? '52px' : '44px',
              borderRadius: '50%',
              border: '1.5px solid var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}>
              <div style={{
                width: 0, height: 0,
                borderTop: '9px solid transparent',
                borderBottom: '9px solid transparent',
                borderLeft: '16px solid var(--gold)',
                marginLeft: '3px',
              }} />
            </div>
          </div>
          {/* Video badge */}
          <div style={{
            position: 'absolute', top: '0.5rem', left: '0.5rem',
            fontFamily: 'Inter', fontSize: '0.52rem',
            letterSpacing: '0.18em', color: 'var(--gold)',
            background: 'rgba(24, 15, 17, 0.85)',
            border: '1px solid var(--gold-faint)',
            padding: '0.15rem 0.5rem',
            textTransform: 'uppercase',
          }}>
            Video
          </div>
        </>
      ) : (
        <>
          <img
            src={src}
            alt={`${projectName} — ${index + 1}`}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
          {/* Hover overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(24, 15, 17, 0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
          }}>
            <span style={{
              fontFamily: 'Inter', fontSize: '0.62rem',
              letterSpacing: '0.22em', color: 'var(--gold)',
              textTransform: 'uppercase',
              border: '1px solid var(--gold-line)',
              padding: '0.35rem 0.9rem',
            }}>
              View
            </span>
          </div>
        </>
      )}

      {/* Index badge */}
      <div style={{
        position: 'absolute', top: '0.5rem', right: '0.5rem',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '0.7rem', color: 'var(--gold)',
        background: 'rgba(24, 15, 17, 0.85)',
        padding: '0.1rem 0.4rem',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

/* ─── Main Modal ────────────────────────────────────────────── */
export default function RecentProjectsModal({ onClose }) {
  const [activeId, setActiveId] = useState(projectsData[0].id)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [lightboxVid, setLightboxVid] = useState(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)
  const panelRef   = useRef(null)

  const active = projectsData.find((p) => p.id === activeId)
  const allMedia = [...(active.images || []), ...(active.videos || [])]

  // Scroll right panel to top on project change
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [activeId])

  // Lock body scroll + animate in
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const overlay = overlayRef.current
    const panel   = panelRef.current
    overlay.style.opacity = '0'
    panel.style.opacity   = '0'
    panel.style.transform = 'translateY(20px)'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 0.3s ease'
        panel.style.transition   = 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)'
        overlay.style.opacity    = '1'
        panel.style.opacity      = '1'
        panel.style.transform    = 'translateY(0)'
      })
    })
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = () => {
    const overlay = overlayRef.current
    const panel   = panelRef.current
    overlay.style.transition = 'opacity 0.22s ease'
    panel.style.transition   = 'opacity 0.22s ease, transform 0.22s ease'
    overlay.style.opacity    = '0'
    panel.style.opacity      = '0'
    panel.style.transform    = 'translateY(14px)'
    setTimeout(onClose, 240)
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1200,
          background: 'rgba(10,1,2,0.88)',
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* ── Modal panel ── */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: 'clamp(0px, 3vh, 30px)', bottom: 'clamp(0px, 3vh, 30px)',
          left: 'clamp(0px, 3vw, 36px)', right: 'clamp(0px, 3vw, 36px)',
          zIndex: 1201,
          display: 'flex',
          flexDirection: 'row',
          background: 'var(--bg-deep)',
          border: '1px solid var(--gold-line)',
        }}
        className="rp-page-layout"
      >

        {/* ════ LEFT SIDEBAR (Desktop) ════ */}
        <aside
          className="rp-sidebar"
          style={{
            width: '260px',
            minWidth: '260px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid var(--text-hair)',
            background: 'var(--bg)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            flexShrink: 0,
            padding: '1.8rem 1.6rem 1.4rem',
            borderBottom: '1px solid var(--text-hair)',
          }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--gold)', marginBottom: '0.9rem' }} />
            <p style={{
              fontFamily: 'Inter', fontSize: '0.6rem',
              letterSpacing: '0.28em', color: 'var(--gold)',
              textTransform: 'uppercase', marginBottom: '0.3rem',
            }}>
              Ekora Architects
            </p>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.4rem', fontWeight: 300,
              color: 'var(--heading)', lineHeight: 1.2, margin: 0,
            }}>
              Recent Projects
            </h2>
          </div>

          {/* Scrollable nav */}
          <nav style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
            {projectsData.map((p) => {
              const isActive = p.id === activeId
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '0.85rem 1.6rem',
                    background: isActive ? 'rgba(200,169,106,0.08)' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'background 0.18s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(200,169,106,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1rem', fontWeight: 300,
                    color: isActive ? 'var(--gold)' : 'var(--text)',
                    lineHeight: 1.3, marginBottom: '0.18rem',
                    transition: 'color 0.18s',
                  }}>
                    {p.name}
                  </div>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '0.57rem',
                    letterSpacing: '0.14em', color: 'var(--text-faint)',
                    textTransform: 'uppercase',
                  }}>
                    {p.location} · {p.type}
                  </div>
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          <div style={{
            flexShrink: 0,
            padding: '1rem 1.6rem',
            borderTop: '1px solid var(--text-hair)',
            fontFamily: 'Inter', fontSize: '0.58rem',
            letterSpacing: '0.1em', color: 'var(--text-mute)',
          }}>
            {projectsData.length} Projects
          </div>
        </aside>

        {/* ════ MOBILE PROJECT SWITCHER BAR (Tablet / Mobile) ════ */}
        <div className="rp-mobile-bar">
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.75rem 1rem 0.5rem',
          }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: 'var(--gold)' }}>Recent Projects</span>
            <button
              onClick={handleClose}
              aria-label="Close modal"
              style={{
                background: 'none', border: '1px solid var(--gold-line)',
                color: 'var(--gold)', fontFamily: 'Inter', fontSize: '0.58rem',
                letterSpacing: '0.14em', padding: '0.25rem 0.7rem',
                cursor: 'pointer', textTransform: 'uppercase',
              }}
            >✕ Close</button>
          </div>
          {/* Horizontal scrollable pills */}
          <div style={{
            display: 'flex', overflowX: 'auto', gap: '0.5rem',
            padding: '0 1rem 0.75rem', scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}>
            {projectsData.map((p) => {
              const isActive = p.id === activeId
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  style={{
                    flexShrink: 0,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    border: `1px solid ${isActive ? 'var(--gold)' : 'var(--text-hair)'}`,
                    background: isActive ? 'var(--gold)' : 'var(--bg-deep)',
                    color: isActive ? 'var(--on-gold)' : 'var(--text-dim)',
                    fontFamily: 'Inter', fontSize: '0.65rem',
                    cursor: 'pointer',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  {p.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* ════ RIGHT CONTENT ════ */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Sticky top bar */}
          <div style={{
            flexShrink: 0,
            borderBottom: '1px solid var(--text-hair)',
            padding: '1rem clamp(1rem, 3vw, 2.4rem)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'var(--bg-deep)', gap: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 300,
                color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {active.name}
              </span>
              <span style={{
                fontFamily: 'Inter', fontSize: '0.56rem',
                letterSpacing: '0.18em', color: 'var(--gold)',
                textTransform: 'uppercase',
                background: 'rgba(200,169,106,0.1)',
                border: '1px solid var(--gold-faint)',
                padding: '0.2rem 0.65rem', borderRadius: '20px',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {active.type}
              </span>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close modal"
              style={{
                flexShrink: 0,
                background: 'none',
                border: '1px solid var(--gold-line)',
                color: 'var(--gold)',
                fontFamily: 'Inter', fontSize: '0.63rem',
                letterSpacing: '0.18em', padding: '0.35rem 0.85rem',
                cursor: 'pointer', textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,169,106,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              ✕ Close
            </button>
          </div>

          {/* ── Scrollable content body ── */}
          <div
            ref={contentRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 3vw, 3rem) 4rem' }}>

              {/* Meta row */}
              <div style={{
                display: 'flex', gap: 'clamp(1.2rem, 3vw, 2.5rem)', flexWrap: 'wrap',
                marginBottom: '2rem', paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--text-hair)',
              }}>
                {[
                  { label: 'Client',       value: active.client   },
                  { label: 'Location',     value: active.location },
                  { label: 'Project Type', value: active.type     },
                ].map((m) => (
                  <div key={m.label}>
                    <div style={{
                      fontFamily: 'Inter', fontSize: '0.54rem',
                      letterSpacing: '0.24em', color: 'var(--gold)',
                      textTransform: 'uppercase', marginBottom: '0.25rem',
                    }}>
                      {m.label}
                    </div>
                    <div style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1rem', color: 'var(--text)',
                    }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* About */}
              <div style={{ marginBottom: '2.5rem' }}>
                <SectionLabel text="About the Project" />
                {active.about.split('\n\n').map((para, i) => (
                  <p key={i} style={{
                    fontFamily: 'Inter', fontSize: '0.84rem',
                    lineHeight: 1.85, color: 'var(--text-dim)',
                    marginBottom: '1rem', marginTop: i === 0 ? '1rem' : 0,
                  }}>
                    {para.trim()}
                  </p>
                ))}
              </div>

              {/* Media gallery */}
              {allMedia.length > 0 && (
                <div>
                  <SectionLabel
                    text="Architectural Gallery & Views"
                    count={allMedia.length}
                  />
                  <div style={{
                    marginTop: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                    gap: '1.2rem',
                  }}>
                    {allMedia.map((src, i) => (
                      <MediaItem
                        key={i}
                        src={src}
                        index={i}
                        projectName={active.name}
                        onClickImage={setLightboxImg}
                        onClickVideo={setLightboxVid}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightboxes */}
      {lightboxImg && <ImageLightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />}
      {lightboxVid && <VideoLightbox src={lightboxVid} onClose={() => setLightboxVid(null)} />}
    </>
  )
}


/* ─── Helper ────────────────────────────────────────────────── */
function SectionLabel({ text, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
      <div style={{ width: '28px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'Inter', fontSize: '0.6rem',
        letterSpacing: '0.28em', color: 'var(--gold)',
        textTransform: 'uppercase',
      }}>
        {text}
      </span>
      {count !== undefined && (
        <span style={{
          fontFamily: 'Inter', fontSize: '0.58rem',
          color: 'var(--text-faint)',
        }}>
          ({count})
        </span>
      )}
    </div>
  )
}
