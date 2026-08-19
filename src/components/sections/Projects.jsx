import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { allPanoramas } from '../../data/panoramasData'

const panoramas = allPanoramas.slice(0, 6).map((p, idx) => ({
  id: p.id,
  title: p.title,
  category: p.type || 'Luxury Architecture',
  location: p.location,
  year: '2024',
  url: p.url,
}))

function PanoramaViewer({ project, onClose }) {
  const mountRef = useRef(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [pan2D, setPan2D] = useState({ x: 0, y: 50 })
  const stateRef = useRef({ isDragging: false, lon: 0, lat: 0, prevX: 0, prevY: 0, targetLon: 0, targetLat: 0 })

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const w = el.clientWidth, h = el.clientHeight
    const s = stateRef.current
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
      tex = new THREE.TextureLoader().load(project.url)
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
      if (!s.isDragging) s.targetLon += 0.03
      s.lon += (s.targetLon - s.lon) * 0.08
      s.lat += (s.targetLat - s.lat) * 0.08
      s.lat = Math.max(-85, Math.min(85, s.lat))
      const phi = THREE.MathUtils.degToRad(90 - s.lat)
      const theta = THREE.MathUtils.degToRad(s.lon)
      camera.lookAt(500 * Math.sin(phi) * Math.cos(theta), 500 * Math.cos(phi), 500 * Math.sin(phi) * Math.sin(theta))
      renderer.render(scene, camera)
    }
    animate()

    const onDown = (e) => { s.isDragging = true; s.prevX = e.clientX; s.prevY = e.clientY; el.style.cursor = 'grabbing' }
    const onMove = (e) => { if (!s.isDragging) return; s.targetLon -= (e.clientX - s.prevX) * 0.15; s.targetLat += (e.clientY - s.prevY) * 0.15; s.prevX = e.clientX; s.prevY = e.clientY }
    const onUp = () => { s.isDragging = false; el.style.cursor = 'grab' }
    const onTouchDown = (e) => { s.isDragging = true; s.prevX = e.touches[0].clientX; s.prevY = e.touches[0].clientY }
    const onTouchMove = (e) => { if (!s.isDragging) return; s.targetLon -= (e.touches[0].clientX - s.prevX) * 0.15; s.targetLat += (e.touches[0].clientY - s.prevY) * 0.15; s.prevX = e.touches[0].clientX; s.prevY = e.touches[0].clientY }
    const onWheel = (e) => { camera.fov = Math.max(30, Math.min(100, camera.fov + e.deltaY * 0.05)); camera.updateProjectionMatrix() }
    onResize = () => { if (!el) return; camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight) }

    el.addEventListener('mousedown', onDown); window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp)
    el.addEventListener('touchstart', onTouchDown, { passive: true }); window.addEventListener('touchmove', onTouchMove, { passive: true }); window.addEventListener('touchend', onTouchDown)
    el.addEventListener('wheel', onWheel, { passive: true }); window.addEventListener('resize', onResize)

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
      el.removeEventListener('mousedown', onDown); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp)
      el.removeEventListener('touchstart', onTouchDown); window.removeEventListener('touchmove', onTouchMove); window.removeEventListener('touchend', onTouchDown)
      el.removeEventListener('wheel', onWheel); window.removeEventListener('resize', onResize)
    }
  }, [project.url])

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
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '1rem clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
        background: 'linear-gradient(to bottom, rgba(40,3,6,0.95), transparent)',
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#D8CFCF', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.title}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8A96A', animation: 'blink 2s infinite', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Inter', fontSize: 'clamp(0.52rem, 1.8vw, 0.6rem)', letterSpacing: '0.15em', color: 'rgba(216,207,207,0.7)', textTransform: 'uppercase' }}>
              {webglSupported ? '360° Drag · Scroll Zoom' : '2D Pan Mode · Drag to Look Around'}
            </span>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close 360 viewer" style={{
          background: 'rgba(216,207,207,0.12)', border: '1px solid rgba(216,207,207,0.2)',
          color: '#D8CFCF', width: '38px', height: '38px', borderRadius: '50%',
          cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C8A96A'; e.currentTarget.style.color = '#380408' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(216,207,207,0.12)'; e.currentTarget.style.color = '#D8CFCF' }}
        >✕</button>
      </div>
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
          width: '100%', height: '100%',
          cursor: is2DDragging.current ? 'grabbing' : 'grab',
          touchAction: 'none',
          ...(webglSupported ? {} : {
            backgroundImage: `url("${project.url}")`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: `${-pan2D.x}px ${pan2D.y}%`,
            backgroundSize: 'auto 100%',
          }),
        }}
      />
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', fontFamily: 'Inter', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(216,207,207,0.45)', textTransform: 'uppercase', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
        {project.location} · {project.year}
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  )
}

function ProjectCard({ project, index, onView }) {
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
    <div ref={cardRef} onMouseMove={onMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={onMouseLeave}
      style={{
        background: 'var(--text-hair)',
        border: `1px solid ${hovered ? 'var(--gold-line)' : 'var(--text-hair)'}`,
        overflow: 'hidden',
        transition: 'border 0.3s, transform 0.4s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ position: 'relative', height: 'clamp(200px, 28vw, 240px)', overflow: 'hidden' }}>
        <img src={project.url} alt={project.title}
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
          <button className="btn-outline" onClick={() => onView(project)} style={{ padding: '0.65rem 1.6rem' }}>
            View 360°
          </button>
        </div>
      </div>
      <div style={{ padding: '1.5rem 1.6rem 1.8rem' }}>
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
            onClick={() => onView(project)}
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

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="section-pad" style={{ background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="projects-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
              <div style={{ width: '36px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>Featured Work</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4.5vw, 4.5rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.1 }}>
              Selected Projects
            </h2>
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'var(--text-faint)', letterSpacing: '0.1em' }}>2021 — 2024</span>
        </div>
        <div className="projects-grid">
          {panoramas.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onView={setActiveProject} />)}
        </div>
      </div>
      {activeProject && <PanoramaViewer project={activeProject} onClose={() => setActiveProject(null)} />}
    </section>
  )
}

