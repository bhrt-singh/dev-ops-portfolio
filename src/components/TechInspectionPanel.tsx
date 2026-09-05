import React from 'react';
import { X, Cpu, Radio, Layers } from 'lucide-react';
import type { TechDetails } from '../data/techMetadata';
import { TechIcon } from './TechIcon';

interface TechInspectionPanelProps {
  details: TechDetails;
  isPinned: boolean;
  onClose: () => void;
  onSelectRelated?: (techName: string) => void;
}

export const TechInspectionPanel: React.FC<TechInspectionPanelProps> = ({
  details,
  isPinned,
  onClose,
  onSelectRelated
}) => {
  return (
    <div
      role="dialog"
      aria-label={`${details.name} Infrastructure Diagnostic Panel`}
      style={{
        backgroundColor: 'rgba(11, 15, 25, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${details.brandColor}50`,
        borderRadius: 'var(--radius-md, 8px)',
        boxShadow: `0 12px 32px rgba(0, 0, 0, 0.6), 0 0 16px ${details.brandColor}20`,
        padding: '1.25rem',
        maxWidth: '380px',
        width: '100%',
        color: 'var(--text-primary, #e2e8f0)',
        fontFamily: 'var(--font-mono, "JetBrains Mono", Consolas, monospace)',
        fontSize: '0.825rem',
        position: 'relative',
        zIndex: 40,
        animation: 'panelFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      {/* Top Accent Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: details.brandColor,
          borderRadius: '8px 8px 0 0',
        }}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <TechIcon name={details.name} brandColor={details.brandColor} size={22} active={true} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.04em', color: '#ffffff' }}>
                {details.name}
              </span>
              {isPinned && (
                <span style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', borderRadius: '3px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  PINNED
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {details.role}
            </div>
          </div>
        </div>

        {isPinned && (
          <button
            onClick={onClose}
            aria-label="Close Diagnostic Panel"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', margin: '0.5rem 0 0.85rem 0' }} />

      {/* Core Components Tree */}
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Cpu size={12} /> CORE COMPONENTS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingLeft: '0.2rem', color: '#cbd5e1', fontSize: '0.78rem' }}>
          {details.components.map((comp, idx) => {
            const isLast = idx === details.components.length - 1;
            const prefix = isLast ? '└─ ' : '├─ ';
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ color: 'var(--accent-green)', opacity: 0.8 }}>{prefix}</span>
                <span>{comp}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Concepts / Specs */}
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Layers size={12} /> ARCHITECTURE SPEC
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.25rem', backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          {details.concepts.map((c, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{c.label}:</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{c.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Technologies */}
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Radio size={12} /> RELATED STACK
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {details.related.map((rel) => (
            <button
              key={rel}
              onClick={() => onSelectRelated && onSelectRelated(rel)}
              style={{
                fontFamily: 'inherit',
                fontSize: '0.7rem',
                padding: '0.15rem 0.45rem',
                borderRadius: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: 'var(--text-primary)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.color = 'var(--accent-cyan)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              {rel}
            </button>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.7rem',
        }}
      >
        <span style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-green)',
              boxShadow: '0 0 6px var(--accent-green)',
            }}
          />
          {details.status}
        </span>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>
          {isPinned ? '[ CLICK OUTSIDE TO UNPIN ]' : '[ HOVER / CLICK TO PIN ]'}
        </span>
      </div>
    </div>
  );
};
