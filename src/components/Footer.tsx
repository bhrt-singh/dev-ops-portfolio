import React from 'react';
import { Terminal } from 'lucide-react';
import { profileData } from '../data/profileData';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer style={{
      backgroundColor: '#07090d',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 0 2rem 0',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {/* Brand & Tagline */}
          <div>
            <div
              onClick={() => onNavigateTab('home')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                marginBottom: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span style={{ color: 'var(--accent-green)' }}>&gt;</span>
              <span>{profileData.name}</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {profileData.role}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '0.2rem' }}>
              Building. Learning. Documenting.
            </div>
          </div>

        {/* Terminal Deployment End State Indicator */}
        <div style={{
          backgroundColor: '#0c0f17',
          border: '1px solid #1a202c',
          borderRadius: '6px',
          padding: '0.75rem 1.25rem',
          marginBottom: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>$ git status clean</span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span style={{ color: 'var(--accent-green)' }}>$ deploy ✓ build ✓ test ✓ ready</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontWeight: 600 }}>
            <span>SITE STATUS</span>
            <span style={{ backgroundColor: 'rgba(63, 185, 80, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(63, 185, 80, 0.3)' }}>● ONLINE</span>
          </div>
        </div>

        {/* Minimal Social Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
          }}>
            <a href={profileData.socials.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              GitHub
            </a>
            <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              LinkedIn
            </a>
            <a href={`mailto:${profileData.socials.email}`} style={{ color: 'var(--text-secondary)' }}>
              Email
            </a>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid #161b26',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}>
          <div>© 2026 Bharat Singh</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a href="/404" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              [ 404 SYSTEM STATE ]
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)' }}>
              <Terminal size={14} />
              <span>Built with curiosity + Linux.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
