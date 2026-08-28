export default function SectionHeading({ kicker, title, align = 'left', sub, light = false }) {
  const center = align === 'center'
  const right = align === 'right'

  return (
    <div
      style={{
        textAlign: align,
        maxWidth: '1200px',
        margin: center ? '0 auto' : right ? '0 0 0 auto' : '0',
        width: '100%',
      }}
    >
      {kicker && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.85rem',
            justifyContent: center ? 'center' : right ? 'flex-end' : 'flex-start',
          }}
        >
          <div style={{ width: '24px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}
          >
            {kicker}
          </span>
          {center && <div style={{ width: '24px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />}
        </div>
      )}

      <h2
        className="section-heading-title"
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
          fontWeight: 300,
          color: light ? '#FFFFFF' : 'var(--heading)',
          lineHeight: 1.18,
          letterSpacing: '-0.01em',
          maxWidth: '840px',
          margin: center ? '0 auto' : '0',
          textWrap: 'balance',
          wordWrap: 'break-word',
        }}
      >
        {title}
      </h2>

      {sub && (
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)',
            lineHeight: 1.8,
            color: light ? 'rgba(255, 255, 255, 0.75)' : 'var(--text-soft)',
            maxWidth: '680px',
            marginTop: '1rem',
            marginLeft: center ? 'auto' : '0',
            marginRight: center ? 'auto' : '0',
            textWrap: 'pretty',
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
