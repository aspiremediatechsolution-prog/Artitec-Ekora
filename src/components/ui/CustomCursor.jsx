import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // Disable on touch screens or mobile
    const isTouch =
      window.matchMedia('(hover: none) or (pointer: coarse)').matches ||
      window.innerWidth <= 768

    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = -100
    let mouseY = -100
    let cursorX = -100
    let cursorY = -100
    let lastX = -100
    let lastY = -100
    let frame = null
    let isVisible = false

    // Mouse movement
    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        cursor.style.opacity = '1'
      }

      if (cursorX === -100 || cursorY === -100) {
        cursorX = mouseX
        cursorY = mouseY
        lastX = mouseX
        lastY = mouseY
        cursor.style.left = `${cursorX}px`
        cursor.style.top = `${cursorY}px`
      }

      // Create short architectural drafting line trail (Exact Sanjay Puri Architects mechanic)
      const distance = Math.sqrt(
        Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2)
      )

      if (distance > 18) {
        const line = document.createElement('div')
        line.className = 'arch-line'

        const angle =
          (Math.atan2(mouseY - lastY, mouseX - lastX) * 180) / Math.PI

        line.style.left = `${lastX}px`
        line.style.top = `${lastY}px`
        line.style.width = `${Math.min(distance, 35)}px`
        line.style.transform = `rotate(${angle}deg)`

        document.body.appendChild(line)

        setTimeout(() => {
          if (line.parentNode) {
            line.parentNode.removeChild(line)
          }
        }, 500)

        lastX = mouseX
        lastY = mouseY
      }
    }

    const onMouseLeave = () => {
      isVisible = false
      cursor.style.opacity = '0'
    }

    const onMouseEnter = () => {
      isVisible = true
      cursor.style.opacity = '1'
    }

    // Smooth lerp movement (Exact Sanjay Puri Architects 0.15 lerp factor)
    const animateCursor = () => {
      if (cursorX !== -100 && mouseY !== -100) {
        cursorX += (mouseX - cursorX) * 0.15
        cursorY += (mouseY - cursorY) * 0.15

        cursor.style.left = `${cursorX}px`
        cursor.style.top = `${cursorY}px`
      }

      frame = requestAnimationFrame(animateCursor)
    }

    frame = requestAnimationFrame(animateCursor)

    // Detect what element the user is hovering
    const onMouseOver = (e) => {
      const element = e.target
      if (!element) return

      cursor.classList.remove('project', 'text', 'link')

      // 1. Project images & visual cards -> "+ EXPLORE" reticle
      if (
        element.tagName === 'IMG' ||
        element.tagName === 'VIDEO' ||
        element.tagName === 'CANVAS' ||
        element.closest(
          '.project, .projects, .portfolio, .elementor-portfolio-item, .project-card, .camera-aperture-card, [data-cursor="explore"]'
        )
      ) {
        cursor.classList.add('project')
      }
      // 2. Links and interactive buttons -> 45deg rotated diamond brackets
      else if (
        element.tagName === 'A' ||
        element.tagName === 'BUTTON' ||
        element.closest(
          'a, button, [role="button"], input, textarea, select, .btn-gold, .btn-outline, .btn-text, .nav-link, .nav-arrow, [data-hoversize]'
        )
      ) {
        cursor.classList.add('link')
      }
      // 3. Typography & paragraphs -> Tiny precision drafting dot
      else if (
        element.tagName === 'P' ||
        element.tagName === 'H1' ||
        element.tagName === 'H2' ||
        element.tagName === 'H3' ||
        element.tagName === 'H4' ||
        element.tagName === 'H5' ||
        element.tagName === 'H6' ||
        element.tagName === 'SPAN' ||
        element.tagName === 'BLOCKQUOTE' ||
        element.tagName === 'LABEL'
      ) {
        cursor.classList.add('text')
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      if (frame) cancelAnimationFrame(frame)

      // Clean up any remaining arch-line elements
      document.querySelectorAll('.arch-line').forEach((el) => el.remove())
    }
  }, [])

  return <div ref={cursorRef} className="arch-drawing-cursor" />
}

