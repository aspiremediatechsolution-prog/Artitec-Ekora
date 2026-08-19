import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    // Disable on touch / mobile devices
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches || window.innerWidth <= 1024
    if (isTouch) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = -100, mouseY = -100
    let followerX = -100, followerY = -100
    let animId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.14
      followerY += (mouseY - followerY) * 0.14
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      animId = requestAnimationFrame(animate)
    }

    const onMouseEnter = () => cursor.classList.add('hover')
    const onMouseLeave = () => cursor.classList.remove('hover')

    window.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}

