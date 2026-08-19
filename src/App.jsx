import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Preloader from './components/ui/Preloader'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/ui/Navbar'

import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import BookTourPage from './pages/BookTourPage'
import RecentProjectsPage from './pages/RecentProjectsPage'

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

    // Don't run Lenis on pages that manage their own scroll
    const noLenisRoutes = ['/recent-projects']
    if (noLenisRoutes.includes(location.pathname)) return

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove()
    }
  }, [loaded, location.pathname])

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <>
          <CustomCursor />
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/recent-projects" element={<RecentProjectsPage />} />
            <Route path="/book-a-tour" element={<BookTourPage />} />
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
