import { useState, useRef, useEffect, useCallback } from 'react'

const defaultImgBefore = '/image/WhatsApp Image 2026-08-13 at 13.25.13.jpeg'
const defaultImgAfter = '/image/WhatsApp Image 2026-08-13 at 13.25.20 (1).jpeg'

export default function ConceptSplitSlider({
  imageBefore = defaultImgBefore,
  imageAfter = defaultImgAfter,
  labelBefore = '01 · 3D Concept & Render',
  labelAfter = '02 · Physical Built Reality',
}) {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)
  const [containerDim, setContainerDim] = useState({ width: 800, height: 800 })

  // Keep exact container dimensions in sync for pixel-perfect clipping
  useEffect(() => {
    if (!containerRef.current) return
    const updateDim = () => {
      if (containerRef.current) {
        setContainerDim({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }
    updateDim()
    const ro = new ResizeObserver(updateDim)
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const onMouseDown = (e) => {
    setIsDragging(true)
    handleMove(e.clientX)
  }

  const onTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      setIsDragging(true)
      handleMove(e.touches[0].clientX)
    }
  }

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX)
    }
    const onTouchMove = (e) => {
      if (isDragging && e.touches && e.touches.length > 0) {
        handleMove(e.touches[0].clientX)
      }
    }
    const onEnd = () => setIsDragging(false)

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onEnd)
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onEnd)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isDragging, handleMove])

  return (
    <div style={{ width: '100%', maxWidth: '840px', margin: '0 auto' }}>
      {/* Container with Interactive Slider fitted to the exact architectural portrait/square proportions */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1.05',
          maxHeight: '760px',
          overflow: 'hidden',
          borderRadius: '2px',
          border: '1px solid var(--gold-line)',
          cursor: isDragging ? 'ew-resize' : 'col-resize',
          userSelect: 'none',
          touchAction: 'none',
          boxShadow: 'var(--shadow-card)',
          background: 'var(--bg-deep)',
        }}
      >
        {/* Underneath Image (Built Reality) */}
        <img
          src={imageAfter}
          alt={labelAfter}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
            pointerEvents: 'none',
            background: 'var(--bg-deep)',
          }}
        />

        {/* Top Image (3D Render / Computational model, clipped by slider position) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${sliderPos}%`,
            overflow: 'hidden',
            pointerEvents: 'none',
            borderRight: '1.5px solid var(--gold)',
            background: 'var(--bg-deep)',
          }}
        >
          <img
            src={imageBefore}
            alt={labelBefore}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${containerDim.width}px`,
              height: `${containerDim.height}px`,
              objectFit: 'cover',
              objectPosition: 'center center',
              maxWidth: 'none',
            }}
          />
        </div>

        {/* Left Badge: 3D Render */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--gold-hair)',
            padding: '0.35rem 0.85rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            backdropFilter: 'blur(10px)',
            borderRadius: '2px',
          }}
        >
          {labelBefore}
        </div>

        {/* Right Badge: Built Reality */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--gold-hair)',
            padding: '0.35rem 0.85rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            color: 'var(--text-bright)',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            backdropFilter: 'blur(10px)',
            borderRadius: '2px',
          }}
        >
          {labelAfter}
        </div>

        {/* Draggable Gold Divider & Handle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPos}%`,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Circular Gold Knob */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--bg-alt)',
              border: '2px solid var(--gold)',
              boxShadow: '0 0 20px var(--gold-glow), 0 8px 24px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              transform: isDragging ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          >
            <span style={{ color: 'var(--gold)', fontSize: '0.75rem', lineHeight: 1 }}>‹</span>
            <span style={{ color: 'var(--gold)', fontSize: '0.75rem', lineHeight: 1 }}>›</span>
          </div>
        </div>

        {/* Bottom Hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.85rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--card-bg)',
            border: '1px solid var(--gold-hair)',
            borderRadius: '20px',
            padding: '0.25rem 0.75rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.58rem',
            letterSpacing: '0.15em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            backdropFilter: 'blur(8px)',
          }}
        >
          Drag horizontally to compare execution fidelity
        </div>
      </div>
    </div>
  )
}
