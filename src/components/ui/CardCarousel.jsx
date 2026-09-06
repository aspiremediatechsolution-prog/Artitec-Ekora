import { useRef, useState, useEffect, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function CardCarousel({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 24,
  autoPlay = true,
  autoPlayInterval = 3200,
  showArrows = true,
  showDots = true,
  showCounter = true,
  className = '',
  style = {},
}) {
  const trackRef = useRef(null)
  const isDraggingRef = useRef(false)
  const isResettingRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)

  const items = Array.isArray(children) ? children.filter(Boolean) : children ? [children] : []
  const count = items.length

  // Duplicate items for seamless continuous infinite looping (Set A, Set B, Set C)
  const displayItems = count > 1 ? [...items, ...items, ...items] : items

  // Get slide width including gap
  const getSlideWidth = useCallback(() => {
    const el = trackRef.current
    if (!el || !el.children || el.children.length === 0) return 300
    const firstChild = el.children[0]
    return firstChild ? firstChild.offsetWidth + gap : el.clientWidth * 0.85
  }, [gap])

  // Single set width (N items * slideWidth)
  const getSingleSetWidth = useCallback(() => {
    const slideWidth = getSlideWidth()
    return slideWidth * count
  }, [getSlideWidth, count])

  // Initialize scroll position to the start of Set B (middle set)
  useEffect(() => {
    if (count <= 1) return
    const el = trackRef.current
    if (!el) return

    const timer = setTimeout(() => {
      const setWidth = getSingleSetWidth()
      if (setWidth > 0) {
        isResettingRef.current = true
        el.scrollLeft = setWidth
        setTimeout(() => { isResettingRef.current = false }, 50)
      }
    }, 80)

    return () => clearTimeout(timer)
  }, [count, getSingleSetWidth])

  // Update active index and wrap coordinates seamlessly
  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el || count <= 1 || isResettingRef.current) return

    const slideWidth = getSlideWidth()
    const setWidth = getSingleSetWidth()
    if (slideWidth <= 0 || setWidth <= 0) return

    // Seamless Infinite Wrap without visual jump
    if (el.scrollLeft >= setWidth * 2) {
      isResettingRef.current = true
      el.scrollLeft -= setWidth
      setTimeout(() => { isResettingRef.current = false }, 40)
      return
    } else if (el.scrollLeft <= setWidth * 0.2) {
      isResettingRef.current = true
      el.scrollLeft += setWidth
      setTimeout(() => { isResettingRef.current = false }, 40)
      return
    }

    // Calculate nearest active item (mod count)
    const relativePos = (el.scrollLeft - setWidth)
    let idx = Math.round(relativePos / slideWidth) % count
    if (idx < 0) idx += count
    setActiveIndex(idx)
  }, [count, getSlideWidth, getSingleSetWidth])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState, { passive: true })

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  // Continuous Forward Step
  const scrollNext = useCallback(() => {
    const el = trackRef.current
    if (!el || count <= 1) return

    const slideWidth = getSlideWidth()
    const setWidth = getSingleSetWidth()

    if (el.scrollLeft >= setWidth * 2 - slideWidth) {
      // Seamlessly normalize position first, then advance
      el.scrollLeft -= setWidth
    }

    el.scrollBy({ left: slideWidth, behavior: 'smooth' })
  }, [count, getSlideWidth, getSingleSetWidth])

  // Continuous Backward Step
  const scrollPrev = useCallback(() => {
    const el = trackRef.current
    if (!el || count <= 1) return

    const slideWidth = getSlideWidth()
    const setWidth = getSingleSetWidth()

    if (el.scrollLeft <= setWidth * 0.5) {
      // Seamlessly normalize position first, then step back
      el.scrollLeft += setWidth
    }

    el.scrollBy({ left: -slideWidth, behavior: 'smooth' })
  }, [count, getSlideWidth, getSingleSetWidth])

  // Jump to specific slide
  const scrollToIndex = useCallback((targetIndex) => {
    const el = trackRef.current
    if (!el || count <= 1) return

    const slideWidth = getSlideWidth()
    const setWidth = getSingleSetWidth()
    const targetScroll = setWidth + (targetIndex * slideWidth)
    el.scrollTo({ left: targetScroll, behavior: 'smooth' })
  }, [count, getSlideWidth, getSingleSetWidth])

  // Infinite Autoplay Loop that NEVER stops and NEVER rewinds
  useEffect(() => {
    if (!autoPlay || count <= 1) return

    const interval = setInterval(() => {
      if (isDraggingRef.current) return
      scrollNext()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, count, scrollNext])

  // Mouse Drag to Scroll
  const onMouseDown = (e) => {
    const el = trackRef.current
    if (!el) return
    isDraggingRef.current = true
    setIsDragging(true)
    setStartX(e.pageX - el.offsetLeft)
    setScrollLeftState(el.scrollLeft)
  }

  const onMouseMove = (e) => {
    if (!isDraggingRef.current) return
    e.preventDefault()
    const el = trackRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - startX) * 1.5
    el.scrollLeft = scrollLeftState - walk
  }

  const onMouseUp = () => {
    isDraggingRef.current = false
    setIsDragging(false)
  }

  return (
    <div
      className={`card-carousel-wrapper ${className}`}
      onMouseLeave={() => { isDraggingRef.current = false; setIsDragging(false) }}
      style={{
        position: 'relative',
        width: '100%',
        ...style,
      }}
    >
      {/* Top Header / Counter Bar */}
      {(showCounter || showArrows) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
            padding: '0 0.25rem',
          }}
        >
          {showCounter ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span style={{ opacity: 0.35 }}>/</span>
              <span style={{ opacity: 0.55 }}>{String(count).padStart(2, '0')}</span>
            </div>
          ) : <div />}

          {showArrows && count > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous slide"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid var(--gold-line)',
                  background: 'var(--bg-alt)',
                  color: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.background = 'var(--gold-hair)'
                  e.currentTarget.style.transform = 'scale(1.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold-line)'
                  e.currentTarget.style.background = 'var(--bg-alt)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next slide"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1px solid var(--gold-line)',
                  background: 'var(--bg-alt)',
                  color: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.background = 'var(--gold-hair)'
                  e.currentTarget.style.transform = 'scale(1.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gold-line)'
                  e.currentTarget.style.background = 'var(--bg-alt)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Horizontal Carousel Track with Native Snap & Seamless Flow */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{
          display: 'flex',
          gap: `${gap}px`,
          overflowX: 'auto',
          scrollSnapType: isDragging ? 'none' : 'x mandatory',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          paddingBottom: '0.5rem',
          userSelect: 'none',
        }}
      >
        {displayItems.map((child, idx) => (
          <div
            key={idx}
            className="card-carousel-slide"
            style={{
              flexShrink: 0,
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Pagination Indicators / Dots */}
      {showDots && count > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '1.75rem',
          }}
        >
          {items.map((_, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: isActive ? '28px' : '8px',
                  height: '6px',
                  borderRadius: '3px',
                  background: isActive ? 'var(--gold)' : 'var(--gold-mid)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 0 8px var(--gold-glow)' : 'none',
                }}
              />
            )
          })}
        </div>
      )}

      <style>{`
        .card-carousel-wrapper ::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        /* Responsive slide widths based on itemsPerView */
        .card-carousel-slide {
          width: calc((100% - ${(itemsPerView.desktop - 1) * gap}px) / ${itemsPerView.desktop});
        }

        @media (max-width: 1024px) {
          .card-carousel-slide {
            width: calc((100% - ${(itemsPerView.tablet - 1) * gap}px) / ${itemsPerView.tablet}) !important;
            min-width: 260px;
          }
        }

        @media (max-width: 680px) {
          .card-carousel-slide {
            width: 88% !important;
            min-width: 240px;
          }
        }
      `}</style>
    </div>
  )
}
