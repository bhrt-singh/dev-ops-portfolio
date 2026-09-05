import React, { useEffect } from 'react';
import { X, Terminal, Cpu, Server, Code, Layers } from 'lucide-react';
import { profileData } from '../../data/profileData';

interface InspectModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InspectMode: React.FC<InspectModeProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stackSpecs = [
    { category: 'FRONTEND ARCHITECTURE', icon: Code, details: ['React 19.2 (Functional Component Model)', 'TypeScript 6.0 (Strict Type Safety)', 'Vite 5.4 (Fast HMR & Production Bundler)'] },
    { category: 'DESIGN & CINEMATIC SYSTEMS', icon: Layers, details: ['Custom Design Tokens (CSS Variables)', 'CSS Radial Mask Spotlight Reveal', 'Geist Mono & Instrument Serif Typography'] },
    { category: 'MOTION & SCROLL ENGINES', icon: Cpu, details: ['Lenis Smooth Inertial Scroll Engine', '60fps RequestAnimationFrame Lerp Loops', 'Framer Motion 11 Micro-Interactions'] },
    { category: 'CONTAINER & INFRASTRUCTURE', icon: Server, details: ['Multi-stage Docker Containerization', 'Self-hosted Bare-Metal Linux Lab', 'Prometheus & Grafana Telemetry Exporters'] },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(5, 8, 12, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: 'min(720px, 100%)',
          backgroundColor: '#0d1117',
          border: '1px solid #242b3c',
          borderRadius: '8px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
          fontFamily: "'JetBrains Mono', Consolas, Monaco, monospace",
          color: '#f0f6fc',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            backgroundColor: '#121722',
            padding: '0.85rem 1.25rem',
            borderBottom: '1px solid #242b3c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600, color: '#38bdf8' }}>
            <Terminal size={16} style={{ color: '#3fb950' }} />
            <span>$ inspect --system-architecture</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', maxHeight: '75vh', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6, borderBottom: '1px dashed #242b3c', paddingBottom: '1rem' }}>
            Inspect Mode: Real implementation values of <span style={{ color: '#ffffff', fontWeight: 600 }}>{profileData.name}</span>&apos;s portfolio system. No fake telemetry or simulated statistics.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {stackSpecs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.category}
                  style={{
                    backgroundColor: '#121622',
                    border: '1px solid #1f2736',
                    borderRadius: '6px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3fb950', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.85rem' }}>
                    <Icon size={14} />
                    <span>{spec.category}</span>
                  </div>

                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                    {spec.details.map((detail, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <span style={{ color: '#38bdf8' }}>&gt;</span>
                        <span style={{ color: '#f0f6fc' }}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'right', paddingTop: '0.5rem' }}>
            Press <kbd style={{ backgroundColor: '#1c2230', padding: '0.1rem 0.4rem', borderRadius: '3px', color: '#94a3b8' }}>ESC</kbd> to exit inspection
          </div>
        </div>
      </div>
    </div>
  );
};
