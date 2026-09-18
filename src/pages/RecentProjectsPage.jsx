import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as THREE from 'three'
import { projectsData } from '../data/projectsData'

/* ══════════════════════════════════════════════════════════════
   360° PANORAMA VIEWER  — THREE.js equirectangular sphere
══════════════════════════════════════════════════════════════ */
function PanoramaViewer({ panorama, onClose }) {
  const mountRef = useRef(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [pan2D, setPan2D] = useState({ x: 0, y: 50 })
  const stateRef = useRef({
    isDragging: false,
    lon: 0, lat: 0,
    targetLon: 0, targetLat: 0,
    prevX: 0, prevY: 0,
  })

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const s = stateRef.current
    const w = el.clientWidth
    const h = el.clientHeight

    let scene, camera, renderer, geo, mat, tex, animId, onResize

    try {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        failIfMajorPerformanceCaveat: false,
      })

      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      el.appendChild(renderer.domElement)

      geo = new THREE.SphereGeometry(500, 64, 32)
      geo.scale(-1, 1, 1)
      tex = new THREE.TextureLoader().load(panorama.url)
      tex.colorSpace = THREE.SRGBColorSpace
      mat = new THREE.MeshBasicMaterial({ map: tex })
      scene.add(new THREE.Mesh(geo, mat))
      setWebglSupported(true)
    } catch (err) {
      console.warn('WebGL not supported, falling back to 2D view:', err)
      setWebglSupported(false)
      if (renderer && renderer.domElement && el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
      return
    }

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!s.isDragging) {
        s.targetLon += 0.04 // auto-rotate
      }
      s.lon += (s.targetLon - s.lon) * 0.08
      s.lat += (s.targetLat - s.lat) * 0.08
      s.lat = Math.max(-85, Math.min(85, s.lat))
      const phi   = THREE.MathUtils.degToRad(90 - s.lat)
      const theta = THREE.MathUtils.degToRad(s.lon)
      camera.lookAt(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      )
      renderer.render(scene, camera)
    }
    animate()

    // Mouse drag
    const onDown = (e) => {
      s.isDragging = true
      s.prevX = e.clientX ?? e.touches?.[0]?.clientX
      s.prevY = e.clientY ?? e.touches?.[0]?.clientY
    }
    const onMove = (e) => {
      if (!s.isDragging) return
      const x = e.clientX ?? e.touches?.[0]?.clientX
      const y = e.clientY ?? e.touches?.[0]?.clientY
      s.targetLon -= (x - s.prevX) * 0.25
      s.targetLat += (y - s.prevY) * 0.25
      s.prevX = x
      s.prevY = y
    }
    const onUp = () => { s.isDragging = false }
    const onWheel = (e) => {
      const fov = Math.max(30, Math.min(100, camera.fov + e.deltaY * 0.05))
      camera.fov = fov
      camera.updateProjectionMatrix()
    }

    el.addEventListener('mousedown',  onDown)
    el.addEventListener('mousemove',  onMove)
    el.addEventListener('mouseup',    onUp)
    el.addEventListener('mouseleave', onUp)
    el.addEventListener('touchstart', onDown, { passive: true })
    el.addEventListener('touchmove',  onMove, { passive: true })
    el.addEventListener('touchend',   onUp)
    el.addEventListener('wheel',      onWheel, { passive: true })

    onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      if (renderer) {
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
        renderer.dispose()
      }
      if (geo) geo.dispose()
      if (mat) {
        if (mat.map) mat.map.dispose()
        mat.dispose()
      }
      el.removeEventListener('mousedown',  onDown)
      el.removeEventListener('mousemove',  onMove)
      el.removeEventListener('mouseup',    onUp)
      el.removeEventListener('mouseleave', onUp)
      el.removeEventListener('touchstart', onDown)
      el.removeEventListener('touchmove',  onMove)
      el.removeEventListener('touchend',   onUp)
      el.removeEventListener('wheel',      onWheel)
      if (onResize) window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [panorama, onClose])

  // 2D Pan Drag handler
  const is2DDragging = useRef(false)
  const prev2DPos = useRef({ x: 0, y: 0, startPanX: 0, startPanY: 50 })

  const handle2DDown = (e) => {
    is2DDragging.current = true
    prev2DPos.current.x = e.clientX ?? e.touches?.[0]?.clientX
    prev2DPos.current.y = e.clientY ?? e.touches?.[0]?.clientY
    prev2DPos.current.startPanX = pan2D.x
    prev2DPos.current.startPanY = pan2D.y
  }

  const handle2DMove = (e) => {
    if (!is2DDragging.current) return
    const x = e.clientX ?? e.touches?.[0]?.clientX
    const y = e.clientY ?? e.touches?.[0]?.clientY
    const dx = x - prev2DPos.current.x
    const dy = y - prev2DPos.current.y
    setPan2D({
      x: prev2DPos.current.startPanX - dx * 0.6,
      y: Math.max(10, Math.min(90, prev2DPos.current.startPanY - dy * 0.1)),
    })
  }

  const handle2DUp = () => {
    is2DDragging.current = false
  }


  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: '#000',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        flexShrink: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '0.6rem',
        padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(0.8rem, 2vw, 1.8rem)',
        background: 'rgba(10,1,2,0.92)',
        borderBottom: '1px solid var(--gold-line)',
        zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          {/* Live dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: 'var(--gold)',
              animation: 'pulseDot 2s infinite',
            }} />
            <span style={{
              fontFamily: 'Inter', fontSize: '0.6rem',
              letterSpacing: '0.22em', color: 'var(--gold)',
              textTransform: 'uppercase',
            }}>360° Interactive</span>
          </div>
          <span style={{
            fontFamily: 'Inter', fontSize: '0.58rem',
            color: 'var(--text-faint)', letterSpacing: '0.08em',
          }}>
            Drag to look around · Scroll to zoom
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(0.88rem, 2vw, 1.05rem)', color: 'var(--text)',
            whiteSpace: 'nowrap',
          }}>{panorama.title}</span>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: '1px solid var(--gold-line)',
              color: 'var(--gold)', fontFamily: 'Inter', fontSize: '0.62rem',
              letterSpacing: '0.18em', padding: '0.35rem 0.9rem',
              cursor: 'pointer', textTransform: 'uppercase',
              borderRadius: '2px',
            }}
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Canvas mount / 2D Pan mount */}
      <div
        ref={mountRef}
        onMouseDown={!webglSupported ? handle2DDown : undefined}
        onMouseMove={!webglSupported ? handle2DMove : undefined}
        onMouseUp={!webglSupported ? handle2DUp : undefined}
        onMouseLeave={!webglSupported ? handle2DUp : undefined}
        onTouchStart={!webglSupported ? handle2DDown : undefined}
        onTouchMove={!webglSupported ? handle2DMove : undefined}
        onTouchEnd={!webglSupported ? handle2DUp : undefined}
        style={{
          flex: 1,
          cursor: is2DDragging.current ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none',
          position: 'relative',
          ...(webglSupported ? {} : {
            backgroundImage: `url("${panorama.url}")`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: `${-pan2D.x}px ${pan2D.y}%`,
            backgroundSize: 'auto 100%',
          }),
        }}
      >
        {!webglSupported && (
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(25, 2, 4, 0.92)',
            border: '1px solid var(--gold-faint)',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            color: 'var(--gold)',
            fontFamily: 'Inter',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
          }}>
            🌐 2D Pan Mode (Drag horizontally to look around)
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(1.5); }
        }
      `}</style>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════
   360° THUMBNAIL CARD
══════════════════════════════════════════════════════════════ */
function PanoCard({ pano, index, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => onOpen(pano)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${hovered ? 'var(--gold)' : 'var(--gold-line)'}`,
        transition: 'border-color 0.2s',
        background: '#000',
      }}
    >
      <img
        src={pano.url}
        alt={pano.title}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
          filter: hovered ? 'brightness(0.5)' : 'brightness(0.75)',
        }}
      />
      {/* Centre icon */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '0.7rem',
      }}>
        {/* Circle icon */}
        <div style={{
          width: hovered ? '64px' : '52px',
          height: hovered ? '64px' : '52px',
          borderRadius: '50%',
          border: '1.5px solid var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
          background: 'rgba(24, 15, 17, 0.65)',
        }}>
          {/* 360 text */}
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '0.85rem', color: 'var(--gold)',
            letterSpacing: '0.05em', fontStyle: 'italic',
          }}>360°</span>
        </div>
        <span style={{
          fontFamily: 'Inter', fontSize: '0.6rem',
          letterSpacing: '0.22em', color: 'var(--gold)',
          textTransform: 'uppercase',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.2s',
        }}>
          Click to explore
        </span>
      </div>

      {/* Title badge */}
      <div style={{
        position: 'absolute', bottom: '0.7rem', left: '0.8rem',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '0.85rem',
        color: 'var(--text)', background: 'rgba(24, 15, 17, 0.85)',
        padding: '0.2rem 0.7rem',
        border: '1px solid var(--gold-faint)',
      }}>
        {pano.title}
      </div>

      {/* Number */}
      <div style={{
        position: 'absolute', top: '0.6rem', right: '0.7rem',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '0.7rem',
        color: 'var(--gold)', background: 'rgba(24, 15, 17, 0.85)',
        padding: '0.1rem 0.4rem',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   VIDEO CARD (Continuously autoplays in loop when viewed)
══════════════════════════════════════════════════════════════ */
function VideoCard({ src, index }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  const toggleMute = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    const nextMuted = !muted
    videoRef.current.muted = nextMuted
    setMuted(nextMuted)
  }

  return (
    <div
      style={{
        position: 'relative',
        background: '#000',
        border: '1px solid var(--text-hair)',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          aspectRatio: '16/9',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        style={{
          position: 'absolute', bottom: '0.8rem', right: '0.8rem',
          background: 'rgba(24, 15, 17, 0.85)', border: '1px solid var(--gold-line)',
          color: 'var(--gold)', fontFamily: 'Inter', fontSize: '0.58rem',
          letterSpacing: '0.14em', padding: '0.35rem 0.75rem',
          cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px',
          zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.35rem',
          transition: 'all 0.2s',
        }}
      >
        {muted ? '🔇 Sound Off' : '🔊 Sound On'}
      </button>

      {/* Video badge */}
      <div style={{
        position: 'absolute', top: '0.7rem', left: '0.7rem',
        background: 'rgba(24, 15, 17, 0.85)', border: '1px solid var(--gold-faint)',
        borderRadius: '20px', padding: '0.2rem 0.6rem',
        display: 'flex', alignItems: 'center', gap: '0.35rem',
        zIndex: 2,
      }}>
        <div style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: 'var(--gold)',
          animation: 'pulseDot 2s infinite',
        }} />
        <span style={{
          fontFamily: 'Inter', fontSize: '0.52rem',
          letterSpacing: '0.15em', color: 'var(--gold)',
          textTransform: 'uppercase',
        }}>Autoplay Video</span>
      </div>

      <div style={{
        position: 'absolute', top: '0.7rem', right: '0.7rem',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '0.75rem',
        color: 'var(--gold)', background: 'rgba(24, 15, 17, 0.85)',
        padding: '0.15rem 0.5rem', pointerEvents: 'none',
        zIndex: 2,
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   IMAGE LIGHTBOX
══════════════════════════════════════════════════════════════ */
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
          maxWidth: '92vw', maxHeight: '90vh',
          width: 'auto', height: 'auto',
          objectFit: 'contain',
          borderRadius: '2px',
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

/* ══════════════════════════════════════════════════════════════
   IMAGE CARD
══════════════════════════════════════════════════════════════ */
function ImageCard({ src, index, projectName, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onOpen(src)}
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
      <img
        src={src}
        alt={`${projectName} — ${index + 1}`}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(24, 15, 17, 0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.25s',
      }}>
        <span style={{
          fontFamily: 'Inter', fontSize: '0.62rem',
          letterSpacing: '0.22em', color: 'var(--gold)',
          border: '1px solid var(--gold-line)', padding: '0.35rem 0.9rem',
          textTransform: 'uppercase',
        }}>View</span>
      </div>
      <div style={{
        position: 'absolute', top: '0.5rem', right: '0.5rem',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '0.7rem',
        color: 'var(--gold)', background: 'rgba(24, 15, 17, 0.85)',
        padding: '0.1rem 0.4rem',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════════════════════════════ */
function SectionLabel({ text, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.5rem' }}>
      <div style={{ width: '32px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
      <span style={{
        fontFamily: 'Inter', fontSize: '0.62rem',
        letterSpacing: '0.28em', color: 'var(--gold)',
        textTransform: 'uppercase',
      }}>{text}</span>
      {count !== undefined && (
        <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--text-faint)' }}>
          ({count})
        </span>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function RecentProjectsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeId, setActiveId]         = useState(searchParams.get('project') || projectsData[0].id)
  const [activePano, setActivePano]     = useState(null)   // panorama being viewed
  const [lightboxImg, setLightboxImg]   = useState(null)   // image lightbox
  const contentRef = useRef(null)

  const active   = projectsData.find((p) => p.id === activeId) || projectsData[0]
  const panoramas = active.panoramas || []
  const videos    = active.videos   || []
  const images    = active.images   || []

  const selectProject = (id) => {
    setActiveId(id)
    setSearchParams({ project: id })
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Lock body scroll (Lenis bypass)
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <main className="rp-page-layout">

        {/* ════ LEFT SIDEBAR (Desktop) ════ */}
        <aside className="rp-sidebar">
          {/* Header */}
          <div style={{
            flexShrink: 0,
            padding: '2rem 1.8rem 1.6rem',
            borderBottom: '1px solid var(--text-hair)',
          }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)', marginBottom: '1rem' }} />
            <p style={{
              fontFamily: 'Inter', fontSize: '0.6rem',
              letterSpacing: '0.3em', color: 'var(--gold)',
              textTransform: 'uppercase', margin: 0,
            }}>Ekora Architects</p>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.6rem', fontWeight: 300,
              color: 'var(--heading)', lineHeight: 1.2,
              margin: '0.4rem 0 0',
            }}>Recent Projects</h1>
          </div>

          {/* Nav list */}
          <nav style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
            {projectsData.map((p) => {
              const isActive = p.id === activeId
              return (
                <button
                  key={p.id}
                  onClick={() => selectProject(p.id)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '1rem 1.8rem',
                    background: isActive ? 'rgba(200,169,106,0.08)' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'background 0.18s',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(200,169,106,0.04)' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.05rem', fontWeight: 300,
                    color: isActive ? 'var(--gold)' : 'var(--text)',
                    lineHeight: 1.3, marginBottom: '0.25rem',
                    transition: 'color 0.18s',
                  }}>
                    {p.name}
                    {/* 360 badge if panoramas exist */}
                    {(p.panoramas?.length > 0) && (
                      <span style={{
                        marginLeft: '0.5rem',
                        fontFamily: 'Inter', fontSize: '0.52rem',
                        letterSpacing: '0.1em', color: 'var(--gold)',
                        background: 'rgba(200,169,106,0.12)',
                        border: '1px solid var(--gold-faint)',
                        padding: '0.1rem 0.4rem', borderRadius: '10px',
                        verticalAlign: 'middle',
                      }}>360°</span>
                    )}
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
            padding: '1rem 1.8rem',
            borderTop: '1px solid var(--text-hair)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'Inter', fontSize: '0.58rem',
              letterSpacing: '0.1em', color: 'var(--text-mute)',
            }}>{projectsData.length} Projects</span>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: 'none', border: '1px solid var(--gold-line)',
                color: 'var(--gold)', fontFamily: 'Inter', fontSize: '0.58rem',
                letterSpacing: '0.14em', padding: '0.3rem 0.8rem',
                cursor: 'pointer', textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(200,169,106,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >← Back</button>
          </div>
        </aside>

        {/* ════ MOBILE PROJECT SWITCHER BAR (Tablet / Mobile <= 1024px) ════ */}
        <div className="rp-mobile-bar">
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.75rem 1rem 0.5rem',
          }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', color: 'var(--gold)' }}>Recent Projects</span>
            <button
              onClick={() => navigate(-1)}
              style={{
                background: 'none', border: '1px solid var(--gold-line)',
                color: 'var(--gold)', fontFamily: 'Inter', fontSize: '0.58rem',
                letterSpacing: '0.14em', padding: '0.25rem 0.7rem',
                cursor: 'pointer', textTransform: 'uppercase',
              }}
            >← Back</button>
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
                  onClick={() => selectProject(p.id)}
                  style={{
                    flexShrink: 0,
                    padding: '0.4rem 0.9rem',
                    borderRadius: '20px',
                    border: `1px solid ${isActive ? 'var(--gold)' : 'var(--text-hair)'}`,
                    background: isActive ? 'var(--gold)' : 'var(--bg-deep)',
                    color: isActive ? 'var(--on-gold)' : 'var(--text-dim)',
                    fontFamily: 'Inter', fontSize: '0.65rem',
                    cursor: 'pointer',
                    fontWeight: isActive ? 600 : 400,
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{p.name}</span>
                  {p.panoramas?.length > 0 && (
                    <span style={{
                      fontSize: '0.5rem',
                      background: isActive ? 'var(--on-gold)' : 'rgba(200,169,106,0.15)',
                      color: isActive ? 'var(--gold)' : 'var(--gold)',
                      padding: '0.05rem 0.35rem', borderRadius: '8px',
                    }}>360°</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ════ RIGHT CONTENT ════ */}
        <div
          ref={contentRef}
          style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minWidth: 0 }}
        >
          {/* Sticky header */}
          <div style={{
            padding: '1.4rem clamp(1rem, 4vw, 3.5rem) 1.2rem',
            borderBottom: '1px solid var(--text-hair)',
            background: 'var(--bg-deep)',
            position: 'sticky', top: 0, zIndex: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)',
                fontWeight: 300, color: 'var(--heading)', margin: 0, lineHeight: 1.1,
              }}>{active.name}</h2>
              <span style={{
                fontFamily: 'Inter', fontSize: '0.58rem',
                letterSpacing: '0.18em', color: 'var(--gold)',
                textTransform: 'uppercase',
                background: 'rgba(200,169,106,0.1)',
                border: '1px solid var(--gold-faint)',
                padding: '0.22rem 0.7rem', borderRadius: '20px',
              }}>{active.type}</span>
              {panoramas.length > 0 && (
                <span style={{
                  fontFamily: 'Inter', fontSize: '0.58rem',
                  letterSpacing: '0.18em', color: '#fff',
                  textTransform: 'uppercase',
                  background: 'rgba(200,169,106,0.25)',
                  border: '1px solid var(--gold)',
                  padding: '0.22rem 0.7rem', borderRadius: '20px',
                }}>360° Available</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 'clamp(1.2rem, 3vw, 2.5rem)', marginTop: '1rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Client',   value: active.client   },
                { label: 'Location', value: active.location },
                { label: 'Type',     value: active.type     },
              ].map((m) => (
                <div key={m.label}>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '0.54rem',
                    letterSpacing: '0.22em', color: 'var(--gold)',
                    textTransform: 'uppercase', marginBottom: '0.2rem',
                  }}>{m.label}</div>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '0.95rem', color: 'var(--text)',
                  }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: 'clamp(1.5rem, 3vw, 3rem) clamp(1rem, 4vw, 3.5rem) 5rem' }}>

            {/* About */}
            <section style={{ marginBottom: '3.5rem' }}>
              <SectionLabel text="About the Project" />
              <div style={{
                maxWidth: '780px',
                padding: 'clamp(1.2rem, 2.5vw, 2.2rem)',
                background: 'var(--bg)',
                border: '1px solid var(--text-hair)',
                borderLeft: '3px solid var(--gold)',
              }}>
                {active.about.split('\n\n').map((para, i, arr) => (
                  <p key={i} style={{
                    fontFamily: 'Inter', fontSize: '0.84rem',
                    lineHeight: 1.9, color: 'var(--text-dim)',
                    marginBottom: i < arr.length - 1 ? '1rem' : 0,
                  }}>{para.trim()}</p>
                ))}
              </div>
            </section>

            {/* ── 360° SECTION ── */}
            {panoramas.length > 0 && (
              <section style={{ marginBottom: '3.5rem' }}>
                <SectionLabel text="360° Virtual Walkthrough" count={panoramas.length} />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: panoramas.length === 1
                    ? '1fr'
                    : 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                  gap: '1rem',
                }}>
                  {panoramas.map((pano, i) => (
                    <PanoCard
                      key={i}
                      pano={pano}
                      index={i}
                      onOpen={setActivePano}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Videos */}
            {videos.length > 0 && (
              <section style={{ marginBottom: '3.5rem' }}>
                <SectionLabel text="Project Videos" count={videos.length} />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: videos.length === 1
                    ? '1fr'
                    : 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                  gap: '1.2rem',
                }}>
                  {videos.map((src, i) => (
                    <VideoCard key={i} src={src} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Images */}
            {images.length > 0 && (
              <section>
                <SectionLabel text="Architectural Gallery & Views" count={images.length} />
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                  gap: '1.2rem',
                }}>
                  {images.map((src, i) => (
                    <ImageCard
                      key={i} src={src} index={i}
                      projectName={active.name}
                      onOpen={setLightboxImg}
                    />
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </main>

      {/* 360° Viewer overlay */}
      {activePano && (
        <PanoramaViewer
          panorama={activePano}
          onClose={() => setActivePano(null)}
        />
      )}

      {/* Image lightbox */}
      {lightboxImg && (
        <ImageLightbox src={lightboxImg} onClose={() => setLightboxImg(null)} />
      )}
    </>
  )
}
