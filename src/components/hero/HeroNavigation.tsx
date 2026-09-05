import React from 'react';
import { profileData } from '../../data/profileData';

interface HeroNavigationProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onOpenMobileMenu: () => void;
}

export const HeroNavigation: React.FC<HeroNavigationProps> = ({
  activeTab,
  onNavigateTab,
  onOpenMobileMenu,
}) => {
  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'journal', label: 'JOURNAL' },
  ];

  return (
    <header
      style={{
        position: 'absolute',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(1140px, calc(100% - 3rem))',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.75rem',
        backgroundColor: 'rgba(15, 20, 28, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '9999px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Brand Mark */}
      <button
        onClick={() => onNavigateTab('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#ffffff',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span style={{ color: 'var(--accent-green)' }}>&gt;</span>
        <span>{profileData.name}</span>
      </button>

      {/* Desktop Links */}
      <nav
        className="measured-desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.25rem',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigateTab(item.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.2rem 0',
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                fontSize: '0.75rem',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                position: 'relative',
                transition: 'color 0.25s ease',
              }}
            >
              {item.label}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent-green)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Social Links & Mobile Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div
          className="measured-desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
        >
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            GITHUB
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            LINKEDIN
          </a>
        </div>

        <button
          onClick={onOpenMobileMenu}
          className="measured-mobile-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'none',
          }}
        >
          MENU
        </button>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .measured-desktop-nav {
            display: none !important;
          }
          .measured-mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
