import React, { useState, useEffect } from 'react';

export type SystemStateType = 'OPERATIONAL' | 'BUILDING' | 'CONFIGURING' | 'DEGRADED' | 'SYSTEM_404' | 'RECOVERED' | 'ONLINE';

interface SystemStatusProps {
  fixed?: boolean;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ fixed = true }) => {
  const [systemState, setSystemState] = useState<SystemStateType>('OPERATIONAL');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      // Check for 404 sequence region
      const errorEl = document.getElementById('scroll-404-sequence');
      if (errorEl) {
        const rect = errorEl.getBoundingClientRect();
        const totalScrollable = errorEl.clientHeight - window.innerHeight;
        if (rect.top <= 0 && rect.bottom >= 0 && totalScrollable > 0) {
          const p = Math.max(0, Math.min(1, -rect.top / totalScrollable));
          if (p < 0.25) {
            setSystemState('DEGRADED');
          } else if (p <= 0.65) {
            setSystemState('SYSTEM_404');
          } else if (p < 0.9) {
            setSystemState('RECOVERED');
          } else {
            setSystemState('OPERATIONAL');
          }
          return;
        }
      }

      // Check section progress based on scroll position
      const projectsEl = document.getElementById('projects');
      const labEl = document.getElementById('lab');
      
      if (labEl && labEl.getBoundingClientRect().top < window.innerHeight / 2 && labEl.getBoundingClientRect().bottom > 0) {
        setSystemState('CONFIGURING');
      } else if (projectsEl && projectsEl.getBoundingClientRect().top < window.innerHeight / 2 && projectsEl.getBoundingClientRect().bottom > 0) {
        setSystemState('BUILDING');
      } else if (progress > 0.92) {
        setSystemState('ONLINE');
      } else {
        setSystemState('OPERATIONAL');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatusColor = (state: SystemStateType) => {
    switch (state) {
      case 'OPERATIONAL':
      case 'ONLINE':
      case 'RECOVERED':
        return '#3fb950'; // Green
      case 'BUILDING':
      case 'CONFIGURING':
        return '#38bdf8'; // Cyan
      case 'DEGRADED':
        return '#f59e0b'; // Amber
      case 'SYSTEM_404':
        return '#f85149'; // Red
      default:
        return '#3fb950';
    }
  };

  const getStatusLabel = (state: SystemStateType) => {
    switch (state) {
      case 'OPERATIONAL':
        return '● OPERATIONAL';
      case 'BUILDING':
        return '● BUILDING';
      case 'CONFIGURING':
        return '● CONFIGURING';
      case 'DEGRADED':
        return '⚠ DEGRADED';
      case 'SYSTEM_404':
        return '✖ SYSTEM 404';
      case 'RECOVERED':
        return '✓ RECOVERED';
      case 'ONLINE':
        return '● ONLINE';
    }
  };

  return (
    <div
      style={{
        position: fixed ? 'fixed' : 'relative',
        bottom: fixed ? '1.75rem' : 'auto',
        left: fixed ? '2rem' : 'auto',
        zIndex: 90,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.85rem',
        backgroundColor: 'rgba(10, 13, 18, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '9999px',
        fontFamily: "'JetBrains Mono', Consolas, Monaco, monospace",
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.15em',
        color: '#ffffff',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        userSelect: 'none',
        transition: 'all 0.3s ease',
      }}
      className="system-status-indicator"
    >
      <span
        style={{
          color: getStatusColor(systemState),
          transition: 'color 0.3s ease',
        }}
      >
        SYSTEM
      </span>
      <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
      <span
        style={{
          color: getStatusColor(systemState),
          transition: 'color 0.3s ease',
        }}
      >
        {getStatusLabel(systemState)}
      </span>

      <style>{`
        @media (max-width: 640px) {
          .system-status-indicator {
            bottom: 1rem !important;
            left: 1rem !important;
            font-size: 0.65rem !important;
            padding: 0.3rem 0.65rem !important;
          }
        }
      `}</style>
    </div>
  );
};
