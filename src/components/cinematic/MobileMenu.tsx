import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { profileData } from '../../data/profileData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onNavigateTab: (tab: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigateTab,
}) => {
  // Disable body scrolling while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'journal', label: 'JOURNAL' },
  ];

  const handleSelect = (id: string) => {
    onNavigateTab(id);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: '#0a0d12',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem 2rem',
        fontFamily: '"Helvetica Neue ME", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header: Title & Close Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.25em', color: 'rgba(255, 255, 255, 0.5)' }}>
          {profileData.name}
        </span>
        <button
          onClick={onClose}
          aria-label="Close Menu"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                fontSize: '1.8rem',
                fontWeight: isActive ? 500 : 300,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                padding: '0.25rem 0',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Social Links & Footer info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.2em' }}
          >
            GITHUB
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.2em' }}
          >
            LINKEDIN
          </a>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.1em' }}>
          {profileData.role} • {profileData.subRole}
        </span>
      </div>
    </div>
  );
};
