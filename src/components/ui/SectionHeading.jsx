export default function SectionHeading({ kicker, title, align = 'left', sub }) {
  const center = align === 'center'

  return (
    <div style={{ textAlign: align, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {kicker && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem',
          justifyContent: center ? 'center' : 'flex-start',
        }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.28em', color: 'var(--gold)', textTransform: 'uppercase' }}>
            {kicker}
          </span>
          {center && <div style={{ width: '32px', height: '1px', background: 'var(--gold)', flexShrink: 0 }} />}
        </div>
      )}
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
        fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
        maxWidth: '820px', margin: center ? '0 auto' : '0',
        wordWrap: 'break-word',
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          fontFamily: 'Inter', fontSize: '0.82rem', lineHeight: 1.85,
          color: 'var(--text-soft)',
          maxWidth: '640px', marginTop: '1rem',
          marginLeft: center ? 'auto' : '0', marginRight: center ? 'auto' : '0',
        }}>{sub}</p>
      )}
    </div>
  )
}

