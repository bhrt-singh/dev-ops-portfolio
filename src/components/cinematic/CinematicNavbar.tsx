import React from 'react';
import { profileData } from '../../data/profileData';

interface CinematicNavbarProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  contrast: 'light' | 'dark';
  onOpenMobileMenu: () => void;
}

export const CinematicNavbar: React.FC<CinematicNavbarProps> = ({
  activeTab,
  onNavigateTab,
  contrast,
  onOpenMobileMenu,
}) => {
  const isLight = contrast === 'light';
  const textColor = isLight ? '#1D3045' : '#FFFFFF';
  const dimColor = isLight ? 'rgba(29, 48, 69, 0.7)' : 'rgba(255, 255, 255, 0.7)';
  const underlineColor = isLight ? '#1D3045' : '#FFFFFF';

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
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '2rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'color 0.4s ease',
        fontFamily: '"Helvetica Neue ME", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Left: Name / Brand */}
      <button
        onClick={() => onNavigateTab('home')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: textColor,
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          transition: 'color 0.4s ease',
        }}
      >
        {profileData.name}
      </button>

      {/* Center: Desktop Links */}
      <nav
        className="cinematic-desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
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
                padding: '0.25rem 0',
                color: isActive ? textColor : dimColor,
                fontSize: '0.75rem',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                position: 'relative',
                transition: 'color 0.4s ease',
              }}
            >
              {item.label}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: underlineColor,
                    borderRadius: '1px',
                    transition: 'background-color 0.4s ease',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right: Socials & Menu button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <div
          className="cinematic-desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noreferrer"
            style={{
              color: dimColor,
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.4s ease',
            }}
          >
            GITHUB
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              color: dimColor,
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.4s ease',
            }}
          >
            LINKEDIN
          </a>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={onOpenMobileMenu}
          className="cinematic-mobile-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: textColor,
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
          .cinematic-desktop-nav {
            display: none !important;
          }
          .cinematic-mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
