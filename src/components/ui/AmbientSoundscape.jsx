import { useState, useRef, useEffect } from 'react'

export default function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const gainNodeRef = useRef(null)
  const oscNodesRef = useRef([])

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const startAmbientTone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime)
      masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2.5) // gentle, calm whisper volume
      masterGain.connect(ctx.destination)
      gainNodeRef.current = masterGain

      // Create warm architectural atmospheric harmonic drone (F# pentatonic resonance: 92.5Hz, 138.6Hz, 185Hz)
      const freqs = [92.5, 138.6, 185.0, 277.2]
      const oscs = []

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle LFO for gentle breathing movement
        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, ctx.currentTime)
        lfoGain.gain.setValueAtTime(2.0, ctx.currentTime)
        lfo.connect(osc.frequency)
        lfo.start()

        gain.gain.setValueAtTime(0.15 / (idx + 1), ctx.currentTime)
        osc.connect(gain)
        gain.connect(masterGain)
        osc.start()
        oscs.push(osc)
      })

      oscNodesRef.current = oscs
      setIsPlaying(true)
    } catch (err) {
      console.warn('Audio context init prevented by browser policy:', err)
    }
  }

  const stopAmbientTone = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2)
      setTimeout(() => {
        if (audioCtxRef.current) {
          audioCtxRef.current.close().catch(() => {})
          audioCtxRef.current = null
        }
        setIsPlaying(false)
      }, 1300)
    } else {
      setIsPlaying(false)
    }
  }

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientTone()
    } else {
      startAmbientTone()
    }
  }

  return (
    <button
      onClick={toggleSound}
      aria-label={isPlaying ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
      title={isPlaying ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: 'clamp(1rem, 3vw, 2rem)',
        zIndex: 900,
        background: 'var(--bg-alt)',
        border: `1px solid ${isPlaying ? 'var(--gold)' : 'var(--gold-hair)'}`,
        padding: '0.45rem 0.9rem',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.55rem',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Dynamic Animated Soundwave Equalizer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '14px' }}>
        {[0.6, 1.2, 0.4, 0.9, 0.5].map((scale, i) => (
          <span
            key={i}
            style={{
              width: '2px',
              height: isPlaying ? `${Math.max(4, scale * 12)}px` : '3px',
              background: isPlaying ? 'var(--gold)' : 'var(--text-faint)',
              borderRadius: '2px',
              animation: isPlaying ? `soundwaveAnim ${0.7 + i * 0.2}s ease-in-out infinite alternate` : 'none',
              transition: 'height 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          color: isPlaying ? 'var(--gold)' : 'var(--text-dim)',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {isPlaying ? 'Soundscape On' : 'Soundscape'}
      </span>

      <style>{`
        @keyframes soundwaveAnim {
          0%   { height: 4px; }
          100% { height: 13px; }
        }
      `}</style>
    </button>
  )
}
