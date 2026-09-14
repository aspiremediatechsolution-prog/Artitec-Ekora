import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiArrowRight, FiCompass, FiLayers, FiMapPin, FiMessageCircle, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { projectsData } from '../../data/projectsData'
import { useTheme } from '../../useTheme'

const staticItems = [
  { id: 'home', title: 'Home Studio', category: 'Navigation', path: '/', icon: FiCompass },
  { id: 'about', title: 'Practice & 7 Principles', category: 'Navigation', path: '/about', icon: FiLayers },
  { id: 'services', title: 'Services & Turnkey Framework', category: 'Navigation', path: '/services', icon: FiLayers },
  { id: 'projects', title: 'Selected Commissions & Portfolio', category: 'Navigation', path: '/projects', icon: FiLayers },
  { id: 'tour', title: 'Contact Us / Schedule Studio Consultation', category: 'Experience', path: '/contact', icon: FiCompass },
  { id: 'delhi', title: 'Head Office — Statesman House, Connaught Place, New Delhi', category: 'Studio Location', path: '/contact', icon: FiMapPin },
  { id: 'lucknow', title: 'Regional Studio — Sushant Golf City, Lucknow', category: 'Studio Location', path: '/contact', icon: FiMapPin },
  { id: 'whatsapp', title: 'Direct WhatsApp Architectural Concierge (+91 99990 33566)', category: 'Direct Concierge', external: 'https://wa.me/919999033566', icon: FiMessageCircle },
]

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()

  const themeItem = {
    id: 'theme-toggle',
    title: theme === 'dark' ? 'Switch to Imperial White Cherry Theme' : 'Switch to Nocturne Black Cherry Theme',
    category: 'Theme Preference',
    action: () => toggle(),
    icon: theme === 'dark' ? FiSun : FiMoon,
  }

  // Build searchable items list
  const projectItems = projectsData.map((p) => ({
    id: p.id,
    title: `${p.name} — ${p.location}`,
    category: `Commission · ${p.type}`,
    path: '/projects',
    icon: FiLayers,
  }))

  const allItems = [themeItem, ...staticItems, ...projectItems]

  const filtered = query.trim() === ''
    ? allItems.slice(0, 7)
    : allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault()
        handleSelect(filtered[selectedIndex])
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filtered, selectedIndex])

  const handleSelect = (item) => {
    onClose()
    if (item.action) {
      item.action()
    } else if (item.external) {
      window.open(item.external, '_blank')
    } else if (item.path) {
      navigate(item.path)
    }
  }

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(10, 6, 8, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(3rem, 12vh, 6rem) 1.5rem 2rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '620px',
          background: 'var(--bg-alt)',
          border: '1px solid var(--gold-line)',
          borderRadius: '4px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
        }}
      >
        {/* Search Bar Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '1.1rem 1.4rem',
            borderBottom: '1px solid var(--text-hair)',
          }}
        >
          <FiSearch size={18} color="var(--gold)" />
          <input
            ref={inputRef}
            placeholder="Search projects, 360° tours, disciplines, offices (⌘K)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.92rem',
              color: 'var(--text)',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-faint)',
              cursor: 'pointer',
              padding: '0.2rem',
            }}
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.6rem 0' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-dim)', fontFamily: 'Inter', fontSize: '0.85rem' }}>
              No matching architectural projects found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex
              const Icon = item.icon
              return (
                <button
                  key={item.id + idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1.4rem',
                    background: isSelected ? 'rgba(200, 169, 106, 0.12)' : 'transparent',
                    border: 'none',
                    borderLeft: isSelected ? '3px solid var(--gold)' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <Icon size={15} color={isSelected ? 'var(--gold)' : 'var(--text-soft)'} />
                    <div>
                      <div
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '1.08rem',
                          color: isSelected ? 'var(--gold)' : 'var(--text)',
                          lineHeight: 1.2,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '0.58rem',
                          letterSpacing: '0.12em',
                          color: 'var(--text-faint)',
                          textTransform: 'uppercase',
                          marginTop: '0.15rem',
                        }}
                      >
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <FiArrowRight
                    size={14}
                    color="var(--gold)"
                    style={{
                      opacity: isSelected ? 1 : 0,
                      transform: isSelected ? 'translateX(0)' : 'translateX(-6px)',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </button>
              )
            })
          )}
        </div>

        {/* Footer info bar */}
        <div
          style={{
            padding: '0.65rem 1.4rem',
            borderTop: '1px solid var(--text-hair)',
            background: 'var(--bg-deep)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--text-faint)', letterSpacing: '0.08em' }}>
            Use <strong style={{ color: 'var(--gold)' }}>↑</strong> <strong style={{ color: 'var(--gold)' }}>↓</strong> to navigate · <strong style={{ color: 'var(--gold)' }}>↵</strong> to select
          </span>
          <span style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Ekora Architects Index
          </span>
        </div>
      </div>
    </div>
  )
}
