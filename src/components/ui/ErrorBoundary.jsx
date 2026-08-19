import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div style={{
          padding: '2rem',
          background: 'rgba(25,2,4,0.9)',
          border: '1px solid var(--gold-line)',
          borderRadius: '6px',
          textAlign: 'center',
          color: 'var(--text)',
        }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
            360° Panoramic View Unavailable
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-faint)' }}>
            Your browser could not initialize graphics hardware acceleration.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
