import { useState } from 'react'
import { FiSliders, FiCalendar, FiLayers, FiCheckCircle } from 'react-icons/fi'

const typologies = [
  { id: 'villa', label: 'Luxury Private Villa', baseWeeks: 12, execMonths: 14 },
  { id: 'penthouse', label: 'Bespoke Penthouse Interior', baseWeeks: 8, execMonths: 6 },
  { id: 'commercial', label: 'Corporate & Workplace Studio', baseWeeks: 10, execMonths: 8 },
  { id: 'landscape', label: 'Estate & Landscape Architecture', baseWeeks: 8, execMonths: 5 },
]

const serviceScopes = [
  { id: 'arch', label: 'Architectural Concept & Form', addWeeks: 4 },
  { id: 'interior', label: 'Bespoke Turnkey Interiors', addWeeks: 4 },
  { id: 'mep', label: 'Structural, MEP & Smart Automation', addWeeks: 2 },
  { id: 'landscape', label: 'Landscape & Water Elements', addWeeks: 2 },
]

export default function ProjectScopeEstimator() {
  const [typology, setTypology] = useState(typologies[0])
  const [sqft, setSqft] = useState(6500)
  const [selectedScopes, setSelectedScopes] = useState(['arch', 'interior', 'mep'])

  const toggleScope = (id) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    )
  }

  // Calculate design phase and execution timeline based on inputs
  const extraWeeks = selectedScopes.reduce((acc, sId) => {
    const s = serviceScopes.find((item) => item.id === sId)
    return acc + (s ? s.addWeeks : 0)
  }, 0)

  const sizeMultiplier = Math.max(0.8, sqft / 6000)
  const totalDesignWeeks = Math.round((typology.baseWeeks + extraWeeks * 0.6) * Math.min(1.4, sizeMultiplier))
  const totalExecMonths = Math.round(typology.execMonths * Math.min(1.5, Math.max(0.8, sizeMultiplier * 0.9)))

  const handleGenerateWhatsApp = () => {
    const scopeNames = selectedScopes
      .map((id) => serviceScopes.find((s) => s.id === id)?.label)
      .filter(Boolean)
      .join(', ')

    const text = [
      '🏛️ *New Project Scope Inquiry — Ekora Architects*',
      '',
      `📐 *Typology:* ${typology.label}`,
      `📏 *Approx. Area:* ${sqft.toLocaleString()} Sq. Ft.`,
      `✨ *Requested Scopes:* ${scopeNames}`,
      `⏱️ *Estimated Roadmap:* ~${totalDesignWeeks} Weeks Design · ~${totalExecMonths} Months Execution`,
      '',
      'We would like to schedule an initial consultation with Ar. Ishwer Singh & the principal team.',
    ].join('\n')

    window.open(`https://wa.me/919999033566?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div
      style={{
        background: 'var(--bg-alt)',
        border: '1px solid var(--text-hair)',
        borderRadius: '2px',
        padding: 'clamp(1.5rem, 3.5vw, 3rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem',
          borderBottom: '1px solid var(--gold-hair)',
          paddingBottom: '1.5rem',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginBottom: '0.35rem',
              fontWeight: 500,
            }}
          >
            Spatial Configurator
          </div>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
              fontWeight: 300,
              color: 'var(--heading)',
              margin: 0,
            }}
          >
            Project Roadmap &amp; Scope Estimator.
          </h3>
        </div>

        <div
          style={{
            background: 'var(--bg-deep)',
            border: '1px solid var(--gold-hair)',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FiSliders size={14} color="var(--gold)" />
          <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase' }}>
            Interactive Calculator
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2.5rem' }}>
        {/* Left Column: Interactive Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Typology */}
          <div>
            <label style={{ fontFamily: 'Inter', fontSize: '0.68rem', letterSpacing: '0.16em', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
              01 · Project Typology
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {typologies.map((t) => {
                const isActive = t.id === typology.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTypology(t)}
                    style={{
                      padding: '0.75rem 1.1rem',
                      background: isActive ? 'rgba(200, 169, 106, 0.12)' : 'var(--bg-deep)',
                      border: isActive ? '1px solid var(--gold)' : '1px solid var(--text-hair)',
                      borderLeft: isActive ? '3px solid var(--gold)' : '1px solid var(--text-hair)',
                      color: isActive ? 'var(--gold)' : 'var(--text)',
                      fontFamily: 'Inter',
                      fontSize: '0.78rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{t.label}</span>
                    {isActive && <FiCheckCircle size={14} color="var(--gold)" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Area Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={{ fontFamily: 'Inter', fontSize: '0.68rem', letterSpacing: '0.16em', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                02 · Built-up / Plot Scale
              </label>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', color: 'var(--text)' }}>
                {sqft.toLocaleString()} Sq. Ft.
              </span>
            </div>
            <input
              type="range"
              min={2500}
              max={25000}
              step={500}
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--gold)',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter', fontSize: '0.6rem', color: 'var(--text-faint)', marginTop: '0.35rem' }}>
              <span>2,500 Sq. Ft.</span>
              <span>12,000 Sq. Ft.</span>
              <span>25,000+ Sq. Ft.</span>
            </div>
          </div>

          {/* Service Scopes Multi-select */}
          <div>
            <label style={{ fontFamily: 'Inter', fontSize: '0.68rem', letterSpacing: '0.16em', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
              03 · Discipline Scope
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '0.6rem' }}>
              {serviceScopes.map((s) => {
                const isSelected = selectedScopes.includes(s.id)
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleScope(s.id)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      background: isSelected ? 'var(--bg-deep)' : 'transparent',
                      border: isSelected ? '1px solid var(--gold)' : '1px solid var(--text-hair)',
                      color: isSelected ? 'var(--gold)' : 'var(--text-dim)',
                      fontFamily: 'Inter',
                      fontSize: '0.72rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <span style={{ color: isSelected ? 'var(--gold)' : 'var(--text-faint)' }}>
                      {isSelected ? '✓' : '+'}
                    </span>
                    <span style={{ fontSize: '0.7rem' }}>{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Architectural Roadmap */}
        <div
          style={{
            background: 'var(--bg-deep)',
            border: '1px solid var(--gold-hair)',
            padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '1.75rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Inter',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                fontWeight: 600,
              }}
            >
              Estimated Architectural Milestones
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1rem' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 1 }}>
                  ~{totalDesignWeeks}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: '0.35rem' }}>
                  Design &amp; 3D Modeling Weeks
                </div>
              </div>

              <div style={{ borderLeft: '2px solid var(--gold-mid)', paddingLeft: '1rem' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--text)', lineHeight: 1 }}>
                  ~{totalExecMonths}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: '0.35rem' }}>
                  On-Site Execution Months
                </div>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--text-hair)', paddingTop: '1.25rem' }}>
              {[
                'Contextual Site Analysis & Solar Shading Studies',
                'Parametric 3D Volumetric Renders & Virtual Walkthrough',
                'Comprehensive GFC (Good-For-Construction) Architectural Drawings',
                'Turnkey BOQ, Material Specifications & Procurement Schedule',
                'Dedicated Site Supervision & Project Operations Oversight',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.75rem', marginTop: '0.1rem' }}>✦</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: 'var(--text-soft)', lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateWhatsApp}
            className="btn-gold"
            style={{ width: '100%', padding: '0.9rem 1.5rem', fontSize: '0.7rem', display: 'flex', justifyContent: 'center' }}
          >
            Consult Principal Team with This Scope 💬
          </button>
        </div>
      </div>
    </div>
  )
}
