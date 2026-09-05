import React, { useState } from 'react';
import { Search, Mail, Menu, X } from 'lucide-react';
import { profileData } from '../data/profileData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCmdPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openCmdPalette }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'journal', label: 'Journal' },
    { id: 'projects', label: 'Projects' },
    { id: 'lab', label: 'Lab & Stack' },
    { id: 'journey', label: 'Journey' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(10, 13, 18, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Left: Terminal Brand / Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--text-primary)',
          }}
        >
          <span style={{ color: 'var(--accent-green)' }}>&gt;</span>
          <span>{profileData.name}</span>
          <span className="animate-blink" style={{
            display: 'inline-block',
            width: '8px',
            height: '16px',
            backgroundColor: 'var(--accent-green)',
            marginLeft: '4px'
          }}></span>
        </div>

        {/* Center: Desktop Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent-green)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '0.4rem 0',
                  position: 'relative',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {item.label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent-green)',
                    borderRadius: '2px',
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Cmd+K Search + Social Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Command Palette Button */}
          <button
            onClick={openCmdPalette}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            title="Search command palette (Ctrl+K or Cmd+K)"
          >
            <Search size={14} style={{ color: 'var(--accent-green)' }} />
            <span style={{ display: 'inline' }}>Search</span>
            <kbd style={{
              backgroundColor: '#1c2230',
              border: '1px solid var(--border-color-hover)',
              borderRadius: '3px',
              padding: '0.05rem 0.35rem',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
            }}>⌘K</kbd>
          </button>

          {/* Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-nav">
            <a href={profileData.socials.github} target="_blank" rel="noreferrer" title="GitHub Profile">
              <GithubIcon size={18} style={{ color: 'var(--text-secondary)' }} />
            </a>
            <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" title="LinkedIn Profile">
              <LinkedinIcon size={18} style={{ color: 'var(--text-secondary)' }} />
            </a>
            <a href={`mailto:${profileData.socials.email}`} title="Send Email">
              <Mail size={18} style={{ color: 'var(--text-secondary)' }} />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none',
              padding: '0.25rem',
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontFamily: 'var(--font-mono)',
                fontSize: '1rem',
                fontWeight: activeTab === item.id ? 600 : 400,
                color: activeTab === item.id ? 'var(--accent-green)' : 'var(--text-primary)',
                padding: '0.5rem 0',
                cursor: 'pointer',
              }}
            >
              &gt; {item.label}
            </button>
          ))}
          <div style={{ display: 'flex', gap: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <a href={profileData.socials.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>GitHub</a>
            <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>LinkedIn</a>
            <a href={`mailto:${profileData.socials.email}`} style={{ color: 'var(--text-secondary)' }}>Email</a>
          </div>
        </div>
      )}

      {/* Dynamic CSS inline to handle mobile nav media queries */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
