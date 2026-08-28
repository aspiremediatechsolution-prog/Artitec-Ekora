import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // Disable on mobile/touch screens
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

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (lastX === -100 || lastY === -100) {
        lastX = mouseX
        lastY = mouseY
        cursorX = mouseX
        cursorY = mouseY
        cursor.style.left = cursorX + 'px'
        cursor.style.top = cursorY + 'px'
        return
      }

      /* Create architectural drafting line trail */
      const distance = Math.hypot(mouseX - lastX, mouseY - lastY)

      if (distance > 18) {
        const line = document.createElement('div')
        line.className = 'arch-line'

        const angle = (Math.atan2(mouseY - lastY, mouseX - lastX) * 180) / Math.PI

        line.style.left = lastX + 'px'
        line.style.top = lastY + 'px'
        line.style.width = Math.min(distance, 35) + 'px'
        line.style.transform = `rotate(${angle}deg)`

        document.body.appendChild(line)

        setTimeout(() => {
          if (line.parentNode) line.remove()
        }, 500)

        lastX = mouseX
        lastY = mouseY
      }
    }

    /* Smooth RAF cursor physics */
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.18
      cursorY += (mouseY - cursorY) * 0.18

      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'

      frame = requestAnimationFrame(animateCursor)
    }

    animateCursor()

    /* Hover detection for Projects, Links/Buttons, and Text */
    const onMouseOver = (e) => {
      const element = e.target
      if (!element || !cursor) return

      cursor.classList.remove('project', 'text', 'link')

      /* Project images / media cards / 360 viewer canvas */
      if (
        element.tagName === 'IMG' ||
        element.tagName === 'VIDEO' ||
        element.tagName === 'CANVAS' ||
        element.closest(
          '.project, .projects, .portfolio, .aparna-project-card, .tilt-card, [data-cursor="project"], [data-cursor="explore"], .pano-thumb-card'
        )
      ) {
        cursor.classList.add('project')
      }
      /* Links and interactive buttons */
      else if (
        element.tagName === 'A' ||
        element.tagName === 'BUTTON' ||
        element.closest("a, button, [role='button'], .btn-gold, .btn-outline, .btn-text, [data-cursor='link']")
      ) {
        cursor.classList.add('link')
      }
      /* Text elements */
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
        element.tagName === 'LI'
      ) {
        cursor.classList.add('text')
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      if (frame) cancelAnimationFrame(frame)
      document.querySelectorAll('.arch-line').forEach((el) => el.remove())
    }
  }, [])

  return <div ref={cursorRef} className="arch-drawing-cursor" />
}
