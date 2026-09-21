import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import * as THREE from 'three'

function checkWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
                canvas.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: false })
    return !!ctx
  } catch (e) {
    return false
  }
}

// ── Web Audio Luxury Architectural Ambient Music Engine ──
class LuxuryAmbientMusicEngine {
  constructor() {
    this.ctx = null
    this.masterGain = null
    this.isPlaying = false
    this.timerId = null
    this.chordOscs = []
  }

  start() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      this.ctx = new AudioCtx()
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }

      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime)
      this.masterGain.gain.exponentialRampToValueAtTime(0.14, this.ctx.currentTime + 2.5)
      this.masterGain.connect(this.ctx.destination)

      // Luxury Architectural Ambient Chords (Cmaj9, Am9, Fmaj7#11, Gsus4)
      const chordProgressions = [
        [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9 (C3, E3, G3, B3, D4)
        [110.00, 130.81, 164.81, 196.00, 246.94], // Am9 (A2, C3, E3, G3, B3)
        [87.31, 130.81, 174.61, 246.94, 261.63],  // Fmaj7#11 (F2, C3, F3, B3, C4)
        [98.00, 146.83, 196.00, 261.63, 293.66],  // Gsus4 (G2, D3, G3, C4, D4)
      ]

      let currentChordIdx = 0

      const playChord = (chord) => {
        if (!this.ctx || !this.isPlaying) return

        // Smoothly fade out previous active chord nodes
        this.chordOscs.forEach(({ osc, gain }) => {
          try {
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2)
            setTimeout(() => {
              try { osc.stop(); osc.disconnect() } catch (e) {}
            }, 2300)
          } catch (e) {}
        })
        this.chordOscs = []

        // Spawn rich warm multi-layered oscillators for new chord
        chord.forEach((freq, i) => {
          const osc = this.ctx.createOscillator()
          const filter = this.ctx.createBiquadFilter()
          const gain = this.ctx.createGain()
          const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null

          osc.type = i === 0 ? 'sine' : (i % 2 === 0 ? 'triangle' : 'sine')
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

          // Subtle organic detune
          osc.detune.setValueAtTime((Math.random() - 0.5) * 10, this.ctx.currentTime)

          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(360 + i * 70, this.ctx.currentTime)

          gain.gain.setValueAtTime(0.0001, this.ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.20 / chord.length, this.ctx.currentTime + 2.2)

          osc.connect(filter)
          filter.connect(gain)

          if (panner) {
            panner.pan.setValueAtTime((i - 2) * 0.32, this.ctx.currentTime)
            gain.connect(panner)
            panner.connect(this.masterGain)
          } else {
            gain.connect(this.masterGain)
          }

          osc.start()
          this.chordOscs.push({ osc, gain })
        })
      }

      // Boutique Ethereal Glass/Pentatonic Chime (C5, D5, E5, G5, A5, C6)
      const chimeNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]
      const triggerRandomChime = () => {
        if (!this.ctx || !this.isPlaying) return
        const freq = chimeNotes[Math.floor(Math.random() * chimeNotes.length)]

        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        const filter = this.ctx.createBiquadFilter()
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(freq, this.ctx.currentTime)
        filter.Q.setValueAtTime(4.0, this.ctx.currentTime)

        const now = this.ctx.currentTime
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.linearRampToValueAtTime(0.048, now + 0.09)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0)

        osc.connect(filter)
        filter.connect(gain)

        if (panner) {
          panner.pan.setValueAtTime((Math.random() - 0.5) * 0.85, now)
          gain.connect(panner)
          panner.connect(this.masterGain)
        } else {
          gain.connect(this.masterGain)
        }

        osc.start(now)
        osc.stop(now + 4.2)
      }

      this.isPlaying = true
      playChord(chordProgressions[0])

      let cycleCount = 0
      this.timerId = setInterval(() => {
        if (!this.isPlaying) return
        cycleCount++
        if (cycleCount % 2 === 0) {
          currentChordIdx = (currentChordIdx + 1) % chordProgressions.length
          playChord(chordProgressions[currentChordIdx])
        }
        triggerRandomChime()
      }, 3800)
    } catch (e) {
      console.warn('Ambient music audio error:', e)
    }
  }

  stop() {
    this.isPlaying = false
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }

    try {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2)
        setTimeout(() => {
          this.chordOscs.forEach(({ osc }) => {
            try { osc.stop(); osc.disconnect() } catch (e) {}
          })
          this.chordOscs = []
          if (this.ctx) {
            try { this.ctx.close() } catch (err) {}
            this.ctx = null
          }
        }, 1300)
      }
    } catch (e) {}
  }
}

/**
 * Paronma360Viewer
 * ─────────────────────────────────────────────────────────────
 * World-Class Luxury 360° Architectural Spatial Virtual Tour.
 * Features:
 * - Ultra-Rich Musical Ambient Audio Engine (Warm Chords & Ethereal Chimes).
 * - 100% Fully Responsive Layout across Mobile, Tablet, and Desktop.
 * - Floating Frosted-Glass Top HUD with Animated Equalizer.
 * - Interactive Spaces Filmstrip / Bottom Drawer with Live Previews.
 * - Glowing Spatial Portals with Smart Floating Tooltips.
 * - Real-Time Azimuth Compass & Field-of-View Radar.
 * - Touch Gestures with Pinch-to-Zoom & Inertia Momentum.
 * - Fullscreen, Auto-Tour Mode, and Keyboard Shortcuts.
 */
export default function Paronma360Viewer({
  spaces = [],
  images = [],
  panoramas = [],
  title = '',
  clientName = '',
  projectName = '',
  initialFrame = 0,
  initialActiveId,
  activeId,
  onSelectPanorama,
  onFrameChange,
  height,
}) {
  const containerRef = useRef(null)
  const canvasContainerRef = useRef(null)
  const filmstripScrollRef = useRef(null)
  const effectiveName = title || projectName || clientName || 'Ekora Architectural Project'

  // WebGL availability detection
  const [webglSupported, setWebglSupported] = useState(() => checkWebGL())

  // Normalize panorama data list with spatial metadata
  const items = useMemo(() => {
    let source = []
    if (spaces && spaces.length > 0) {
      source = spaces
    } else if (panoramas && panoramas.length > 0) {
      source = panoramas
    } else if (images && images.length > 0) {
      source = images
    }

    if (!source || source.length === 0) return []

    return source.map((item, idx) => {
      if (typeof item === 'string') {
        return {
          id: `frame-${idx}`,
          url: item,
          title: `${effectiveName} — View ${idx + 1}`,
          room: `View ${String(idx + 1).padStart(2, '0')}`,
          index: idx,
          specs: ['Italian Marble Flooring', 'Ambient Recessed Lighting', 'Panoramic Glass Facade'],
        }
      }
      return {
        ...item,
        id: item.id || `space-${idx}`,
        url: item.url || item.src || '',
        title: item.title || `${effectiveName} — Space ${idx + 1}`,
        room: item.room || item.title || `Space ${idx + 1}`,
        index: idx,
        specs: item.specs || ['Italian Botticino Marble', 'Acoustic Ceiling Treatment', 'Smart Lutron Automation'],
      }
    })
  }, [spaces, images, panoramas, effectiveName])

  // Active space index
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (activeId) {
      const foundIdx = items.findIndex((it) => it.id === activeId)
      if (foundIdx !== -1) return foundIdx
    }
    if (initialActiveId) {
      const foundIdx = items.findIndex((it) => it.id === initialActiveId)
      if (foundIdx !== -1) return foundIdx
    }
    return typeof initialFrame === 'number' ? Math.min(initialFrame, Math.max(0, items.length - 1)) : 0
  })

  // Reset selectedIndex when items list changes (e.g. switching client tabs)
  useEffect(() => {
    if (selectedIndex >= items.length) {
      setSelectedIndex(0)
    }
  }, [items, selectedIndex])

  // Sync if external activeId changes
  useEffect(() => {
    if (activeId) {
      const foundIdx = items.findIndex((it) => it.id === activeId)
      if (foundIdx !== -1 && foundIdx !== selectedIndex) {
        setSelectedIndex(foundIdx)
      }
    }
  }, [activeId, items, selectedIndex])

  const activeItem = items[selectedIndex] || items[0]

  // Shared 360 state
  const [loading360, setLoading360] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [clickedSpotId, setClickedSpotId] = useState(null)
  const [fov, setFov] = useState(70)
  const [zoomScale, setZoomScale] = useState(1.0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hotspotPositions, setHotspotPositions] = useState([])
  const [hoveredHotspot, setHoveredHotspot] = useState(null)

  // Modern UI states
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isGyroActive, setIsGyroActive] = useState(false)
  const [gyroAvailable, setGyroAvailable] = useState(false)
  const [showRadar, setShowRadar] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)
  const [isFilmstripOpen, setIsFilmstripOpen] = useState(true)
  const [showSpacesGridModal, setShowSpacesGridModal] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [currentYawDeg, setCurrentYawDeg] = useState(0)

  const musicEngineRef = useRef(null)

  // 2D Fallback state
  const [pan2D, setPan2D] = useState({ x: 0, y: 50 })
  const is2DDragging = useRef(false)
  const dragStart2D = useRef({ x: 0, y: 0, startPanX: 0, startPanY: 50, lastX: 0, velocityX: 0 })
  const anim2DRef = useRef(null)

  // Touch Pinch state
  const touchDistanceRef = useRef(null)

  // Three.js internal refs
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const materialRef = useRef(null)
  const animFrameRef = useRef(null)

  const isUserInteracting = useRef(false)
  const onPointerDownX = useRef(0)
  const onPointerDownY = useRef(0)
  const onPointerDownLon = useRef(0)
  const onPointerDownLat = useRef(0)
  const lastPointerX = useRef(0)
  const lastPointerY = useRef(0)
  const velocityLon = useRef(0)
  const velocityLat = useRef(0)

  const lon = useRef(0)
  const lat = useRef(0)
  const phi = useRef(0)
  const theta = useRef(0)
  const targetFov = useRef(70)

  // Check Gyroscope capability
  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      if (typeof window.DeviceOrientationEvent?.requestPermission === 'function') {
        setGyroAvailable(true)
      } else {
        setGyroAvailable(true)
      }
    }
  }, [])

  // Gyroscope tracking listener
  useEffect(() => {
    if (!isGyroActive) return

    const handleOrientation = (e) => {
      if (e.alpha !== null && e.beta !== null && e.gamma !== null) {
        lon.current = -e.alpha * 1.2
        lat.current = Math.max(-85, Math.min(85, (e.beta - 45) * 1.1))
      }
    }

    window.addEventListener('deviceorientation', handleOrientation, true)
    return () => window.removeEventListener('deviceorientation', handleOrientation, true)
  }, [isGyroActive])

  const toggleGyro = async () => {
    if (isGyroActive) {
      setIsGyroActive(false)
      return
    }

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission()
        if (response === 'granted') {
          setIsGyroActive(true)
        }
      } catch (err) {
        console.warn('Gyro permission error:', err)
      }
    } else {
      setIsGyroActive(true)
    }
  }

  // Audio Music Engine Toggle
  const toggleMusic = () => {
    if (!musicEngineRef.current) {
      musicEngineRef.current = new LuxuryAmbientMusicEngine()
    }
    if (isAudioPlaying) {
      musicEngineRef.current.stop()
      setIsAudioPlaying(false)
    } else {
      musicEngineRef.current.start()
      setIsAudioPlaying(true)
    }
  }

  useEffect(() => {
    return () => {
      if (musicEngineRef.current) {
        musicEngineRef.current.stop()
      }
    }
  }, [])

  // Select Space handler with smooth cinematic warp zoom animation
  const handleSelectSpace = useCallback((idx, spotId = null) => {
    const targetIdx = (idx + items.length) % items.length
    if (targetIdx === selectedIndex && !spotId) return

    setClickedSpotId(spotId)
    setIsTransitioning(true)

    // Cinematic Dolly-Zoom Warp
    if (webglSupported) {
      targetFov.current = 36
    } else {
      setZoomScale(1.35)
    }

    setTimeout(() => {
      setSelectedIndex(targetIdx)
      const it = items[targetIdx]
      if (it && onSelectPanorama) onSelectPanorama(it.id)
      if (onFrameChange) onFrameChange(targetIdx)

      setTimeout(() => {
        if (webglSupported) {
          targetFov.current = 70
        } else {
          setZoomScale(1.0)
        }
        setIsTransitioning(false)
        setClickedSpotId(null)
      }, 260)
    }, 320)
  }, [items, selectedIndex, webglSupported, onSelectPanorama, onFrameChange])

  const nextSpace = useCallback(() => {
    handleSelectSpace(selectedIndex + 1)
  }, [handleSelectSpace, selectedIndex])

  const prevSpace = useCallback(() => {
    handleSelectSpace(selectedIndex - 1)
  }, [handleSelectSpace, selectedIndex])

  // Generate 3D coordinates & angles for in-scene Hotspots
  const otherSpaces = useMemo(() => {
    const others = items.filter((p) => p.id !== activeItem?.id)
    return others.map((space, idx) => {
      const angleDeg = ((idx + 1) / (others.length + 1)) * 360 - 25
      const rad = (angleDeg * Math.PI) / 180
      const radius = 430
      return {
        ...space,
        angleDeg,
        x: radius * Math.sin(rad),
        y: -14 + (idx % 2 === 0 ? 18 : -14),
        z: radius * Math.cos(rad),
        yPercent: 52 + (idx % 2 === 0 ? 8 : -8),
      }
    })
  }, [items, activeItem?.id])

  const otherSpacesRef = useRef(otherSpaces)
  otherSpacesRef.current = otherSpaces

  const walkToHotspot = useCallback((spot) => {
    if (!spot) return
    const targetIdx = items.findIndex((it) => it.id === spot.id)
    if (targetIdx !== -1) {
      handleSelectSpace(targetIdx, spot.id)
    }
  }, [items, handleSelectSpace])

  // ── THREE.JS WEBGL ENGINE ──
  useEffect(() => {
    if (!webglSupported) return

    const container = canvasContainerRef.current
    if (!container) return

    const width = container.clientWidth || container.offsetWidth || 800
    const height = container.clientHeight || container.offsetHeight || 500

    let renderer, scene, camera, geometry, material, mesh, resizeObserver

    try {
      scene = new THREE.Scene()
      sceneRef.current = scene

      camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1200)
      camera.position.set(0, 0, 0)
      camera.target = new THREE.Vector3(0, 0, 0)
      cameraRef.current = camera

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(width, height)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05

      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
      container.appendChild(renderer.domElement)
      rendererRef.current = renderer

      geometry = new THREE.SphereGeometry(500, 128, 64)
      geometry.scale(-1, 1, 1)

      material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })
      materialRef.current = material

      mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)
    } catch (err) {
      console.warn('WebGL init failed, falling back to 360 Pan Engine:', err)
      setWebglSupported(false)
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      return
    }

    let lastTime = performance.now()
    const animate = (now) => {
      animFrameRef.current = requestAnimationFrame(animate)

      const delta = (now - lastTime) / 1000
      lastTime = now

      if (isUserInteracting.current) {
        // Active drag
      } else {
        if (Math.abs(velocityLon.current) > 0.05 || Math.abs(velocityLat.current) > 0.05) {
          lon.current += velocityLon.current * 0.18
          lat.current += velocityLat.current * 0.18
          velocityLon.current *= 0.92
          velocityLat.current *= 0.92
        } else if (!isGyroActive && autoRotate) {
          lon.current += 2.8 * delta
        }
      }

      lat.current = Math.max(-85, Math.min(85, lat.current))
      phi.current = THREE.MathUtils.degToRad(90 - lat.current)
      theta.current = THREE.MathUtils.degToRad(lon.current)

      const targetX = 500 * Math.sin(phi.current) * Math.cos(theta.current)
      const targetY = 500 * Math.cos(phi.current)
      const targetZ = 500 * Math.sin(phi.current) * Math.sin(theta.current)

      camera.lookAt(targetX, targetY, targetZ)

      const normalizedYaw = ((lon.current % 360) + 360) % 360
      setCurrentYawDeg(Math.round(normalizedYaw))

      if (Math.abs(camera.fov - targetFov.current) > 0.08) {
        camera.fov += (targetFov.current - camera.fov) * 0.15
        camera.updateProjectionMatrix()
      }

      renderer.render(scene, camera)

      // Project hotspots to screen
      const spots = otherSpacesRef.current
      if (spots && spots.length > 0) {
        const cW = container.clientWidth
        const cH = container.clientHeight
        const screenSpots = []

        for (let i = 0; i < spots.length; i++) {
          const s = spots[i]
          const vec = new THREE.Vector3(s.x, s.y, s.z)
          vec.project(camera)

          if (vec.z < 1.0) {
            const screenX = (vec.x * 0.5 + 0.5) * cW
            const screenY = (-(vec.y * 0.5) + 0.5) * cH
            if (screenX >= 20 && screenX <= cW - 20 && screenY >= 40 && screenY <= cH - 40) {
              screenSpots.push({ ...s, screenX, screenY })
            }
          }
        }
        setHotspotPositions(screenSpots)
      } else {
        setHotspotPositions([])
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)

    resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth || 800
      const h = container.clientHeight || 500
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    resizeObserver.observe(container)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (resizeObserver) resizeObserver.disconnect()
      if (renderer) {
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
      if (geometry) geometry.dispose()
      if (material) {
        if (material.map) material.map.dispose()
        material.dispose()
      }
    }
  }, [webglSupported, isGyroActive, autoRotate])

  // Load Three.js Texture
  useEffect(() => {
    if (!webglSupported || !activeItem?.url || !materialRef.current) return
    setLoading360(true)

    const loader = new THREE.TextureLoader()
    loader.load(
      activeItem.url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        texture.generateMipmaps = false

        if (materialRef.current) {
          if (materialRef.current.map) materialRef.current.map.dispose()
          materialRef.current.color.set(0xffffff)
          materialRef.current.map = texture
          materialRef.current.needsUpdate = true
        }
        setLoading360(false)
      },
      undefined,
      (err) => {
        console.warn('360 texture load error:', err)
        setLoading360(false)
      }
    )
  }, [webglSupported, activeItem?.url])

  // Pointer & Touch Handlers
  const handlePointerDown = (e) => {
    setHasInteracted(true)
    isUserInteracting.current = true
    velocityLon.current = 0
    velocityLat.current = 0
    onPointerDownX.current = e.clientX
    onPointerDownY.current = e.clientY
    lastPointerX.current = e.clientX
    lastPointerY.current = e.clientY
    onPointerDownLon.current = lon.current
    onPointerDownLat.current = lat.current
  }

  const handlePointerMove = (e) => {
    if (!isUserInteracting.current) return
    const dx = e.clientX - onPointerDownX.current
    const dy = e.clientY - onPointerDownY.current

    velocityLon.current = (lastPointerX.current - e.clientX) * 0.6
    velocityLat.current = (e.clientY - lastPointerY.current) * 0.6
    lastPointerX.current = e.clientX
    lastPointerY.current = e.clientY

    const sensitivity = (targetFov.current / 70) * 0.18
    lon.current = -dx * sensitivity + onPointerDownLon.current
    lat.current = Math.max(-85, Math.min(85, dy * sensitivity + onPointerDownLat.current))
  }

  const handlePointerUp = () => {
    isUserInteracting.current = false
  }

  // Mobile Pinch-to-Zoom Touch Handlers
  const handleTouchStart = (e) => {
    setHasInteracted(true)
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      touchDistanceRef.current = dist
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchDistanceRef.current) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const diff = touchDistanceRef.current - dist
      if (webglSupported) {
        targetFov.current = Math.max(35, Math.min(95, targetFov.current + diff * 0.08))
      } else {
        setZoomScale((prev) => Math.max(1.0, Math.min(2.5, prev - diff * 0.005)))
      }
      touchDistanceRef.current = dist
    }
  }

  const handleTouchEnd = () => {
    touchDistanceRef.current = null
  }

  // Fallback 2D pan engine
  useEffect(() => {
    if (webglSupported) return

    let lastTime = performance.now()
    const loop2D = (now) => {
      anim2DRef.current = requestAnimationFrame(loop2D)
      const dt = (now - lastTime) / 1000
      lastTime = now

      if (is2DDragging.current) {
        // Active drag
      } else {
        if (Math.abs(dragStart2D.current.velocityX) > 0.1) {
          setPan2D((prev) => ({
            ...prev,
            x: prev.x + dragStart2D.current.velocityX * 0.3,
          }))
          dragStart2D.current.velocityX *= 0.92
        } else if (autoRotate) {
          setPan2D((prev) => ({ ...prev, x: prev.x + 32 * dt }))
        }
      }

      const container = containerRef.current
      if (container) {
        const cW = container.clientWidth
        const cH = container.clientHeight
        const panoWidth = cH * 2 * zoomScale
        const spots = otherSpacesRef.current

        if (spots && spots.length > 0) {
          const screenSpots = []
          for (let i = 0; i < spots.length; i++) {
            const s = spots[i]
            const baseX = (s.angleDeg / 360) * panoWidth
            const screenX = ((baseX - pan2D.x) % panoWidth + panoWidth) % panoWidth
            if (screenX >= 20 && screenX <= cW - 20) {
              const screenY = (cH * (s.yPercent || 50) / 100) + ((50 - pan2D.y) * 1.5)
              screenSpots.push({ ...s, screenX, screenY })
            }
          }
          setHotspotPositions(screenSpots)
        }
      }
    }

    anim2DRef.current = requestAnimationFrame(loop2D)
    return () => {
      if (anim2DRef.current) cancelAnimationFrame(anim2DRef.current)
    }
  }, [webglSupported, pan2D.x, pan2D.y, zoomScale, autoRotate])

  const handle2DDown = (e) => {
    setHasInteracted(true)
    is2DDragging.current = true
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0
    dragStart2D.current = {
      x: clientX,
      y: clientY,
      startPanX: pan2D.x,
      startPanY: pan2D.y,
      lastX: clientX,
      velocityX: 0,
    }
  }

  const handle2DMove = (e) => {
    if (!is2DDragging.current) return
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0
    const dx = clientX - dragStart2D.current.x
    const dy = clientY - dragStart2D.current.y

    dragStart2D.current.velocityX = (dragStart2D.current.lastX - clientX) * 1.2
    dragStart2D.current.lastX = clientX

    setPan2D({
      x: dragStart2D.current.startPanX - dx * 0.85,
      y: Math.max(10, Math.min(90, dragStart2D.current.startPanY - dy * 0.12)),
    })
  }

  const handle2DUp = () => {
    is2DDragging.current = false
  }

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!containerRef.current?.contains(document.activeElement) && document.activeElement?.tagName === 'INPUT') return

      if (e.key === 'ArrowLeft') {
        lon.current -= 6
      } else if (e.key === 'ArrowRight') {
        lon.current += 6
      } else if (e.key === 'ArrowUp') {
        lat.current = Math.min(85, lat.current + 4)
      } else if (e.key === 'ArrowDown') {
        lat.current = Math.max(-85, lat.current - 4)
      } else if (e.key === ' ') {
        e.preventDefault()
        setAutoRotate((prev) => !prev)
      } else if (e.key === '+' || e.key === '=') {
        zoomIn()
      } else if (e.key === '-' || e.key === '_') {
        zoomOut()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Universal Wheel Zoom
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e) => {
      e.preventDefault()
      setHasInteracted(true)
      if (webglSupported) {
        const newFov = Math.max(35, Math.min(95, targetFov.current + e.deltaY * 0.05))
        targetFov.current = newFov
        setFov(Math.round(newFov))
      } else {
        const delta = e.deltaY < 0 ? 0.15 : -0.15
        setZoomScale((prev) => Math.max(1.0, Math.min(2.5, prev + delta)))
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [webglSupported])

  const zoomIn = () => {
    if (webglSupported) {
      const newFov = Math.max(35, targetFov.current - 15)
      targetFov.current = newFov
      setFov(Math.round(newFov))
    } else {
      setZoomScale((prev) => Math.min(2.5, prev + 0.25))
    }
  }

  const zoomOut = () => {
    if (webglSupported) {
      const newFov = Math.min(95, targetFov.current + 15)
      targetFov.current = newFov
      setFov(Math.round(newFov))
    } else {
      setZoomScale((prev) => Math.max(1.0, prev - 0.25))
    }
  }

  const resetView = () => {
    lon.current = 0
    lat.current = 0
    targetFov.current = 70
    setFov(70)
    setZoomScale(1.0)
    setPan2D({ x: 0, y: 50 })
  }

  const toggleFullscreen = () => {
    const elem = containerRef.current
    if (!elem) return

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  const scrollFilmstrip = (direction) => {
    if (filmstripScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220
      filmstripScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={containerRef}
      className="modern-360-tour-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: isFullscreen ? '0px' : '8px',
        overflow: 'hidden',
        background: '#070102',
        border: isFullscreen ? 'none' : '1px solid var(--gold-hair)',
        boxShadow: isFullscreen ? 'none' : '0 24px 70px rgba(0,0,0,0.85)',
        userSelect: 'none',
        transition: 'border-radius 0.3s ease',
      }}
    >
      {/* ── 360° RENDER CANVAS CONTAINER ── */}
      <div
        className="paronma-canvas-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: height || (isFullscreen ? '100vh' : 'clamp(520px, 78vh, 880px)'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#040001',
        }}
      >
        {webglSupported ? (
          <div
            ref={canvasContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{
              width: '100%',
              height: '100%',
              cursor: isUserInteracting.current ? 'grabbing' : 'grab',
              position: 'relative',
              touchAction: 'none',
            }}
          />
        ) : (
          <div
            onMouseDown={handle2DDown}
            onMouseMove={handle2DMove}
            onMouseUp={handle2DUp}
            onMouseLeave={handle2DUp}
            onTouchStart={handle2DDown}
            onTouchMove={handle2DMove}
            onTouchEnd={handle2DUp}
            style={{
              width: '100%',
              height: '100%',
              cursor: is2DDragging.current ? 'grabbing' : 'grab',
              touchAction: 'none',
              position: 'relative',
              backgroundImage: `url("${activeItem?.url}")`,
              backgroundRepeat: 'repeat-x',
              backgroundPosition: `${-pan2D.x}px ${pan2D.y}%`,
              backgroundSize: `${zoomScale * 200}% 100%`,
              transition: is2DDragging.current ? 'none' : 'background-size 0.25s ease',
            }}
          />
        )}

        {/* ── CINEMATIC VIGNETTE & AMBIENT SHADER ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(8, 1, 2, 0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }} />

        {/* ── INTERACTIVE SPATIAL PORTALS (LUMINOUS HOTSPOTS) ── */}
        {!loading360 && hotspotPositions.map((spot) => {
          const isHovered = hoveredHotspot === spot.id
          const isClicked = clickedSpotId === spot.id
          return (
            <div
              key={spot.id}
              style={{
                position: 'absolute',
                left: `${spot.screenX}px`,
                top: `${spot.screenY}px`,
                transform: `translate(-50%, -50%) ${isClicked ? 'scale(2.5)' : isHovered ? 'scale(1.15)' : 'scale(1)'}`,
                zIndex: 20,
                pointerEvents: 'auto',
                transition: 'transform 0.24s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s',
                opacity: isClicked ? 0 : 1,
              }}
            >
              {/* Floating Smart Tooltip Badge */}
              <div
                className="portal-tooltip"
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(15, 1, 3, 0.94)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  borderRadius: '20px',
                  padding: '0.35rem 0.85rem',
                  backdropFilter: 'blur(12px)',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.7), 0 0 16px rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  opacity: isHovered ? 1 : 0,
                  visibility: isHovered ? 'visible' : 'hidden',
                  transition: 'all 0.2s ease',
                  pointerEvents: 'none',
                }}
              >
                <span style={{ fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.15em', color: '#ffffff', textTransform: 'uppercase' }}>
                  Walk to
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: '#ffffff', fontWeight: 500 }}>
                  {spot.room || spot.title}
                </span>
                <span style={{ color: '#ffffff', fontSize: '0.75rem' }}>→</span>
              </div>

              {/* Glowing Interactive Portal Trigger Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  walkToHotspot(spot)
                }}
                onMouseEnter={() => setHoveredHotspot(spot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
                aria-label={`Enter ${spot.room}`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.85)',
                  animation: 'hotspotRadar 2.2s infinite cubic-bezier(0.2, 0.8, 0.2, 1)',
                  pointerEvents: 'none',
                }} />

                <div style={{
                  width: isHovered ? '24px' : '18px',
                  height: isHovered ? '24px' : '18px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: isHovered
                    ? '0 0 24px #ffffff, 0 0 32px rgba(255, 255, 255, 0.95), 0 0 45px var(--gold)'
                    : '0 0 14px rgba(255, 255, 255, 0.95), 0 0 24px var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: isHovered ? '#ffffff' : '#280306',
                  }} />
                </div>
              </button>
            </div>
          )
        })}

        {/* ── CINEMATIC WARP FLASH OVERLAY ── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.45) 0%, rgba(200,169,106,0.2) 55%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 22,
          opacity: isTransitioning ? 1 : 0,
          transition: 'opacity 0.28s ease-out',
        }} />

        {/* ── FIRST-TIME HINT OVERLAY ── */}
        {!hasInteracted && (
          <div className="first-time-hint" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(15, 1, 3, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '30px',
            padding: 'clamp(0.45rem, 1.5vw, 0.65rem) clamp(0.9rem, 2.5vw, 1.4rem)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            zIndex: 21,
            pointerEvents: 'none',
            maxWidth: '85%',
            textAlign: 'center',
            animation: 'fadeInOut 4s infinite alternate ease-in-out',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="m9 12 3-3 3 3" />
              <path d="m9 15 3 3 3-3" />
            </svg>
            <span style={{
              fontFamily: 'Inter',
              fontSize: 'clamp(0.6rem, 1.5vw, 0.68rem)',
              letterSpacing: '0.1em',
              color: '#ffffff',
              textTransform: 'uppercase',
            }}>
              Drag 360° · Pinch or Scroll to Zoom
            </span>
          </div>
        )}

        {/* ── AZIMUTH SPATIAL RADAR COMPASS (Bottom-Left) ── */}
        {showRadar && items.length > 1 && (
          <div
            className="spatial-radar-compass"
            style={{
              position: 'absolute',
              bottom: isFilmstripOpen ? 'clamp(5.2rem, 10vw, 7.5rem)' : 'clamp(1rem, 2vw, 1.8rem)',
              left: 'clamp(0.8rem, 2vw, 1.8rem)',
              zIndex: 24,
              background: 'rgba(12, 1, 2, 0.92)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              width: 'clamp(58px, 9vw, 84px)',
              height: 'clamp(58px, 9vw, 84px)',
              backdropFilter: 'blur(14px)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'bottom 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              pointerEvents: 'auto',
            }}
          >
            {/* North Label */}
            <span style={{
              position: 'absolute',
              top: '3px',
              fontSize: '0.42rem',
              fontFamily: 'Inter',
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '0.12em',
            }}>N</span>

            {/* Rotating Vision Field Cone */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              transform: `rotate(${currentYawDeg}deg)`,
              transition: isUserInteracting.current ? 'none' : 'transform 0.1s linear',
              pointerEvents: 'none',
            }}>
              <div style={{
                position: 'absolute',
                top: '5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '11px solid transparent',
                borderRight: '11px solid transparent',
                borderTop: '24px solid rgba(255, 255, 255, 0.35)',
                filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.6))',
              }} />
            </div>

            {/* Radar Room Markers */}
            {items.map((it, idx) => {
              const isCurrent = idx === selectedIndex
              const angleRad = (idx / items.length) * Math.PI * 2
              const r = 22
              const dotX = r * Math.sin(angleRad)
              const dotY = -r * Math.cos(angleRad)

              return (
                <button
                  key={it.id}
                  onClick={() => handleSelectSpace(idx)}
                  title={it.room || it.title}
                  style={{
                    position: 'absolute',
                    transform: `translate(${dotX}px, ${dotY}px)`,
                    width: isCurrent ? '7px' : '4.5px',
                    height: isCurrent ? '7px' : '4.5px',
                    borderRadius: '50%',
                    background: isCurrent ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    boxShadow: isCurrent ? '0 0 10px #ffffff, 0 0 14px rgba(255, 255, 255, 0.8)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    zIndex: 2,
                    transition: 'all 0.2s',
                  }}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* ── TOP FROSTED GLASS HUD BAR (100% RESPONSIVE) ── */}
      <div
        className="hud-top-bar"
        style={{
          position: 'absolute',
          top: 'clamp(0.5rem, 1.5vw, 1.2rem)',
          left: 'clamp(0.5rem, 1.5vw, 1.2rem)',
          right: 'clamp(0.5rem, 1.5vw, 1.2rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.4rem',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      >
        {/* Left: Active Space Pill */}
        <div
          className="hud-space-badge"
          style={{
            background: 'rgba(15, 1, 3, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: 'clamp(0.32rem, 1vw, 0.45rem) clamp(0.55rem, 1.5vw, 0.95rem)',
            borderRadius: '30px',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            pointerEvents: 'auto',
            minWidth: 0,
            maxWidth: '60%',
          }}
        >
          <div style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 10px #ffffff, 0 0 16px rgba(255, 255, 255, 0.8)',
            flexShrink: 0,
            animation: 'pulseDot 2s infinite ease-in-out',
          }} />
          <span style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(0.85rem, 2vw, 1.2rem)',
            color: '#ffffff',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {activeItem?.room || activeItem?.title}
          </span>
          <span
            className="hud-counter-text"
            style={{
              fontFamily: 'Inter',
              fontSize: '0.52rem',
              letterSpacing: '0.12em',
              color: '#ffffff',
              textTransform: 'uppercase',
              borderLeft: '1px solid rgba(255, 255, 255, 0.25)',
              paddingLeft: '0.45rem',
              whiteSpace: 'nowrap',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {String(selectedIndex + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Luxury Control Island */}
        <div
          className="hud-controls-island"
          style={{
            background: 'rgba(15, 1, 3, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '30px',
            padding: '0.22rem 0.35rem',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            pointerEvents: 'auto',
            flexShrink: 0,
          }}
        >
          {/* All Spaces Grid Modal Button */}
          <button
            onClick={() => setShowSpacesGridModal(true)}
            className="hud-icon-btn"
            title="Explore All Spaces"
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.32rem 0.5rem',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'Inter',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '20px',
              transition: 'background 0.2s',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span className="hud-btn-label" style={{ color: '#ffffff' }}>Spaces</span>
          </button>

          {/* Auto Rotate / Tour Toggle */}
          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            className="hud-icon-btn"
            title={autoRotate ? 'Pause 360 Auto-Tour' : 'Start 360 Auto-Tour'}
            style={{
              background: autoRotate ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
              border: autoRotate ? '1px solid #ffffff' : '1px solid transparent',
              color: '#ffffff',
              padding: '0.32rem 0.5rem',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'Inter',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span className="hud-btn-label" style={{ color: '#ffffff' }}>{autoRotate ? 'Touring' : 'Auto'}</span>
          </button>

          {/* Gyroscope Button for mobile */}
          {gyroAvailable && (
            <button
              onClick={toggleGyro}
              className="hud-icon-btn"
              title={isGyroActive ? 'Disable Gyroscope' : 'Enable Gyroscope Motion'}
              style={{
                background: isGyroActive ? '#ffffff' : 'transparent',
                color: isGyroActive ? '#120204' : '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                padding: '0.32rem 0.5rem',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontFamily: 'Inter',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <span className="hud-btn-label" style={{ color: isGyroActive ? '#120204' : '#ffffff' }}>Gyro</span>
            </button>
          )}

          {/* Luxury Ambient Music Synthesizer */}
          <button
            onClick={toggleMusic}
            className="hud-icon-btn"
            title={isAudioPlaying ? 'Mute Luxury Ambient Music' : 'Play Luxury Spatial Music'}
            style={{
              background: isAudioPlaying ? 'rgba(255, 255, 255, 0.22)' : 'transparent',
              color: '#ffffff',
              border: isAudioPlaying ? '1px solid #ffffff' : '1px solid transparent',
              padding: '0.32rem 0.5rem',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'Inter',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >
            {isAudioPlaying ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
                <span className="music-bar bar-1" />
                <span className="music-bar bar-2" />
                <span className="music-bar bar-3" />
              </div>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
            <span className="hud-btn-label" style={{ color: '#ffffff' }}>{isAudioPlaying ? 'Music On' : 'Music'}</span>
          </button>

          {/* Zoom In */}
          <button
            onClick={zoomIn}
            className="hud-icon-btn zoom-btn"
            title="Zoom In (+)"
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: 'none',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          {/* Zoom Out */}
          <button
            onClick={zoomOut}
            className="hud-icon-btn zoom-btn"
            title="Zoom Out (-)"
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: 'none',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          {/* Reset View */}
          <button
            onClick={resetView}
            className="hud-icon-btn"
            title="Reset Perspective"
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: 'none',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="12" x2="16" y2="14" />
            </svg>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="hud-icon-btn"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Immersive Fullscreen'}
            style={{
              background: 'transparent',
              color: '#ffffff',
              border: 'none',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isFullscreen ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── PREV / NEXT LATERAL CHEVRONS ── */}
      {items.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevSpace() }}
            title="Previous Space"
            className="lateral-nav-btn lateral-prev"
            style={{
              position: 'absolute',
              left: 'clamp(0.4rem, 1.8vw, 1.2rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15, 1, 3, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#ffffff',
              width: 'clamp(34px, 4.5vw, 44px)',
              height: 'clamp(34px, 4.5vw, 44px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 20,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              transition: 'all 0.25s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextSpace() }}
            title="Next Space"
            className="lateral-nav-btn lateral-next"
            style={{
              position: 'absolute',
              right: 'clamp(0.4rem, 1.8vw, 1.2rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15, 1, 3, 0.88)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#ffffff',
              width: 'clamp(34px, 4.5vw, 44px)',
              height: 'clamp(34px, 4.5vw, 44px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 20,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              transition: 'all 0.25s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* ── BOTTOM FLOATING FILMSTRIP DOCK (100% RESPONSIVE) ── */}
      {items.length > 1 && (
        <div
          className="bottom-filmstrip-wrapper"
          style={{
            position: 'absolute',
            bottom: 'clamp(0.5rem, 1.5vw, 1.2rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(96%, 880px)',
            zIndex: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Filmstrip Toggle Pill */}
          <button
            onClick={() => setIsFilmstripOpen((prev) => !prev)}
            style={{
              background: 'rgba(15, 1, 3, 0.94)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              borderBottom: isFilmstripOpen ? 'none' : '1px solid rgba(255, 255, 255, 0.35)',
              padding: '0.25rem 0.85rem',
              borderRadius: isFilmstripOpen ? '14px 14px 0 0' : '20px',
              color: '#ffffff',
              fontFamily: 'Inter',
              fontSize: '0.52rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
              boxShadow: '0 -4px 16px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{ color: '#ffffff' }}>{isFilmstripOpen ? 'Hide Spaces' : `Explore ${items.length} Spaces`}</span>
            <svg
              width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ transform: isFilmstripOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Filmstrip Card Container */}
          {isFilmstripOpen && (
            <div style={{
              width: '100%',
              background: 'rgba(12, 1, 2, 0.94)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '0.4rem 0.5rem',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.85), 0 0 24px rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}>
              {/* Left Scroll Arrow */}
              <button
                onClick={() => scrollFilmstrip('left')}
                className="filmstrip-scroll-arrow"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.85,
                }}
              >
                ‹
              </button>

              {/* Horizontal Scrollable Thumbnails */}
              <div
                ref={filmstripScrollRef}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  WebkitOverflowScrolling: 'touch',
                  padding: '0.15rem 0',
                  flex: 1,
                }}
              >
                {items.map((it, idx) => {
                  const isActive = idx === selectedIndex
                  return (
                    <button
                      key={it.id}
                      onClick={() => handleSelectSpace(idx)}
                      style={{
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.3rem 0.65rem',
                        background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(30, 2, 5, 0.6)',
                        border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.25)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? '0 0 14px rgba(255, 255, 255, 0.25)' : 'none',
                      }}
                    >
                      {/* Mini circular preview with room index */}
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '4px',
                        backgroundImage: `url("${it.url}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: isActive ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.3)',
                        flexShrink: 0,
                      }} />

                      <div>
                        <div style={{
                          fontFamily: 'Inter',
                          fontSize: '0.45rem',
                          letterSpacing: '0.1em',
                          color: '#ffffff',
                          textTransform: 'uppercase',
                        }}>
                          Space {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '0.88rem',
                          color: '#ffffff',
                          fontWeight: isActive ? 600 : 300,
                          whiteSpace: 'nowrap',
                        }}>
                          {it.room || it.title}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Right Scroll Arrow */}
              <button
                onClick={() => scrollFilmstrip('right')}
                className="filmstrip-scroll-arrow"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.85,
                }}
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── ALL SPACES FULL-GRID MODAL (CLICK TO JUMP) ── */}
      {showSpacesGridModal && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(7, 1, 2, 0.96)',
          backdropFilter: 'blur(20px)',
          zIndex: 40,
          padding: 'clamp(1rem, 3.5vw, 2.5rem)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeInModal 0.25s ease-out',
        }}>
          {/* Modal Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
            marginBottom: '1.5rem',
          }}>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.52rem', letterSpacing: '0.2em', color: '#ffffff', textTransform: 'uppercase' }}>
                Spatial Overview
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', color: '#ffffff', margin: '0.2rem 0 0 0' }}>
                Select an Architectural Space
              </h3>
            </div>

            <button
              onClick={() => setShowSpacesGridModal(false)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                color: '#ffffff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
              }}
            >
              ✕
            </button>
          </div>

          {/* Grid of Spaces */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
            gap: '1rem',
          }}>
            {items.map((it, idx) => {
              const isActive = idx === selectedIndex
              return (
                <div
                  key={it.id}
                  onClick={() => {
                    handleSelectSpace(idx)
                    setShowSpacesGridModal(false)
                  }}
                  style={{
                    background: 'rgba(25, 2, 4, 0.8)',
                    border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? '0 8px 24px rgba(255, 255, 255, 0.25)' : 'none',
                  }}
                >
                  <div style={{
                    height: '120px',
                    backgroundImage: `url("${it.url}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}>
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                        background: '#ffffff',
                        color: '#120204',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '3px',
                        fontFamily: 'Inter',
                        fontSize: '0.48rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}>
                        Active
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '0.75rem 0.85rem' }}>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.48rem', letterSpacing: '0.12em', color: '#ffffff', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                      Space {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: '#ffffff', fontWeight: 400 }}>
                      {it.room || it.title}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── LOADING SKELETON ── */}
      {loading360 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8, 1, 2, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 30,
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderTop: '2px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '0.75rem',
          }} />
          <span style={{
            fontFamily: 'Inter',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#ffffff',
            textTransform: 'uppercase',
          }}>
            Loading 360° Perspective...
          </span>
        </div>
      )}

      <style>{`
        .hud-icon-btn {
          color: #ffffff !important;
        }
        .hud-icon-btn:hover {
          background: rgba(255, 255, 255, 0.22) !important;
          color: #ffffff !important;
        }
        .lateral-nav-btn {
          color: #ffffff !important;
        }
        .lateral-nav-btn:hover {
          background: #ffffff !important;
          color: #120204 !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        .music-bar {
          display: inline-block;
          width: 2px;
          background: #ffffff !important;
          border-radius: 1px;
        }
        .bar-1 { height: 10px; animation: musicWave 0.8s ease-in-out infinite alternate; }
        .bar-2 { height: 6px; animation: musicWave 1.1s ease-in-out infinite alternate 0.2s; }
        .bar-3 { height: 12px; animation: musicWave 0.9s ease-in-out infinite alternate 0.4s; }

        @keyframes musicWave {
          0% { height: 3px; }
          100% { height: 12px; }
        }
        @keyframes hotspotRadar {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes fadeInOut {
          0% { opacity: 0.9; }
          100% { opacity: 0.3; }
        }
        @keyframes fadeInModal {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* ── RESPONSIVE MEDIA QUERIES ── */
        @media (max-width: 992px) {
          .paronma-canvas-container {
            height: clamp(480px, 75vh, 750px) !important;
            min-height: 480px !important;
          }
        }
        @media (max-width: 640px) {
          .paronma-canvas-container {
            height: clamp(450px, 72vh, 650px) !important;
            min-height: 450px !important;
          }
          .hud-btn-label {
            display: none !important;
          }
          .zoom-btn {
            display: none !important;
          }
          .hud-space-badge {
            max-width: 58% !important;
          }
          .spatial-radar-compass {
            width: 52px !important;
            height: 52px !important;
          }
          .lateral-nav-btn {
            width: 32px !important;
            height: 32px !important;
          }
        }
        @media (max-width: 440px) {
          .paronma-canvas-container {
            height: clamp(440px, 70vh, 600px) !important;
            min-height: 440px !important;
          }
          .hud-counter-text {
            display: none !important;
          }
          .filmstrip-scroll-arrow {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
