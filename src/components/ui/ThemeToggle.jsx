import { useState } from 'react'
import { useTheme } from '../../useTheme'

export default function ThemeToggle({ className = '', variant = 'circle', showLabel = false }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  const [hovered, setHovered] = useState(false)

  const labelText = isDark ? 'White Cherry' : 'Dark Cherry'
  const tooltipText = isDark ? 'Switch to Imperial White Cherry Theme' : 'Switch to Nocturne Black Cherry Theme'

  if (variant === 'pill') {
    return (
      <button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={tooltipText}
        title={tooltipText}
        className={`theme-toggle-pill ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.55rem',
          padding: '0.45rem 0.95rem',
          borderRadius: '30px',
          background: 'var(--bg-alt)',
          border: `1px solid ${hovered ? 'var(--gold)' : 'var(--gold-mid)'}`,
          color: hovered ? 'var(--gold)' : 'var(--text)',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.68rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: hovered ? '0 0 16px var(--gold-glow)' : 'none',
          transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
          outline: 'none',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '18px',
            height: '18px',
            position: 'relative',
            color: 'var(--gold)',
          }}
        >
          {isDark ? (
            /* Sun Icon (shown in dark mode to switch to light) */
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: hovered ? 'rotate(90deg) scale(1.15)' : 'rotate(0deg) scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            /* Crescent Moon Icon (shown in light mode to switch to dark) */
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: hovered ? 'rotate(-30deg) scale(1.15)' : 'rotate(0deg) scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </span>
        <span>{labelText}</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={tooltipText}
      title={tooltipText}
      className={`btn-theme-toggle ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'var(--bg-alt)',
        border: `1.2px solid ${hovered ? 'var(--gold)' : 'var(--gold-mid)'}`,
        color: hovered ? 'var(--on-gold)' : 'var(--gold)',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hovered ? '0 0 18px var(--gold-glow), 0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-1.5px) scale(1.06)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Subtle glowing halo on hover */}
      <div
        style={{
          position: 'absolute',
          inset: '-3px',
          borderRadius: '50%',
          border: '1px solid var(--gold)',
          opacity: hovered ? 0.35 : 0,
          transform: hovered ? 'scale(1.15)' : 'scale(0.85)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          pointerEvents: 'none',
        }}
      />

      {isDark ? (
        /* Sun Icon for switching to light */
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: hovered ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s ease',
          }}
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon Icon for switching to dark */
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: hovered ? 'rotate(-25deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.3s ease',
          }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}

      {showLabel && (
        <span
          style={{
            marginLeft: '0.45rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.66rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text)',
          }}
        >
          {labelText}
        </span>
      )}
    </button>
  )
}
