import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Preloader from './components/ui/Preloader'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/ui/Navbar'
import AmbientSoundscape from './components/ui/AmbientSoundscape'
import ScrollProgress from './components/ui/ScrollProgress'

import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import BookTourPage from './pages/BookTourPage'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
    ScrollTrigger.refresh()
  }, [pathname])
  return null
}

function Shell() {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (!loaded) return

    // Lenis ultra-smooth inertial scroll
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.3,
      infinite: false,
    })
    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const updateTicker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateTicker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      window.__lenis = null
      lenis.destroy()
      gsap.ticker.remove(updateTicker)
    }
  }, [loaded, location.pathname])

  // Universal Silky Scroll-Reveal & Micro-Parallax Engine on Route Change
  useEffect(() => {
    if (!loaded) return

    let ctx = gsap.context(() => {
      ScrollTrigger.refresh()

      // 1. Grid Containers: Synchronized Cascading Stagger
      const gridContainers = document.querySelectorAll(
        '.grid-resp-4, .grid-resp-3, .grid-resp-2, .about-grid, .services-grid, .testimonials-grid-container, .home-stats'
      )

      gridContainers.forEach((grid) => {
        const children = grid.children
        if (children && children.length > 0) {
          gsap.fromTo(
            children,
            { y: 36, opacity: 0, scale: 0.985 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.05,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })

      // 2. Standalone Reveal Elements (Sections, Headings, Lone Cards)
      const standaloneElements = document.querySelectorAll(
        '.reveal:not(.grid-resp-4 > *):not(.grid-resp-3 > *):not(.grid-resp-2 > *):not(.about-grid > *):not(.services-grid > *):not(.testimonials-grid-container > *):not(.home-stats > *), .page-reveal'
      )

      standaloneElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // 3. Editorial Project Rows
      const editorialRows = document.querySelectorAll('.aparna-lyt2')
      editorialRows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // 4. Smooth Media Parallax inside Photo Frames
      const parallaxImages = document.querySelectorAll('.aparna-lyt2 .pc img')
      parallaxImages.forEach((img) => {
        gsap.fromTo(
          img,
          { y: -14 },
          {
            y: 14,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.25,
            },
          }
        )
      })
    })

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [loaded, location.pathname])

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <ScrollProgress />
          <CustomCursor />
          <ScrollToTop />
          <Navbar />
          <AmbientSoundscape />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/recent-projects" element={<ProjectsPage />} />
            <Route path="/book-a-tour" element={<BookTourPage />} />
            <Route path="/contact" element={<BookTourPage />} />
            <Route path="/contact-us" element={<BookTourPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
