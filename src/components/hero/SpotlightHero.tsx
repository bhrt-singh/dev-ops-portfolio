import React, { useState, useEffect, useRef } from 'react';
import { profileData } from '../../data/profileData';
import { RevealLayer } from './RevealLayer';
import { HeroNavigation } from './HeroNavigation';
import { MobileMenu } from '../cinematic/MobileMenu';

interface SpotlightHeroProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onSelectArticle: (articleId: string) => void;
}

export const SpotlightHero: React.FC<SpotlightHeroProps> = ({
  activeTab,
  onNavigateTab,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const targetPosRef = useRef({ x: -1000, y: -1000 });
  const currentPosRef = useRef({ x: -1000, y: -1000 });
  const rafIdRef = useRef<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize spotlight at center
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetPosRef.current = { x: centerX, y: centerY };
      currentPosRef.current = { x: centerX, y: centerY };
      setMousePos({ x: centerX, y: centerY });
    }
  }, []);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsUserInteracted(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      targetPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  // Touch move handler
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsUserInteracted(true);
    if (containerRef.current && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      targetPosRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
  };

  // Smooth lerp loop with gentle automated float if no mouse interaction
  useEffect(() => {
    let floatAngle = 0;

    const loop = () => {
      const el = containerRef.current;
      if (!isUserInteracted && el) {
        const rect = el.getBoundingClientRect();
        floatAngle += 0.015;
        const radius = Math.min(rect.width, rect.height) * 0.22;
        targetPosRef.current = {
          x: rect.width / 2 + Math.cos(floatAngle) * radius,
          y: rect.height / 2 + Math.sin(floatAngle * 0.7) * (radius * 0.6),
        };
      }

      const target = targetPosRef.current;
      const current = currentPosRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;

      current.x += dx * 0.1;
      current.y += dy * 0.1;

      setMousePos({ x: current.x, y: current.y });
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isUserInteracted]);

  return (
    <div
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        backgroundColor: '#0a0d12',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* z-0: Faint Atmospheric Depth Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* z-10: Surface Base Image Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0a0d12',
          backgroundImage: `
            radial-gradient(ellipse 1000px 600px at 20% -10%, rgba(63, 185, 80, 0.10), transparent 65%),
            radial-gradient(ellipse 800px 500px at 100% 10%, rgba(56, 189, 248, 0.08), transparent 60%)
          `,
          zIndex: 10,
        }}
      />

      {/* z-30: Revealed Deeper Engineering Infrastructure Layer */}
      <RevealLayer
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        radius={260}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* z-50: Hero Navigation Header */}
      <HeroNavigation
        activeTab={activeTab}
        onNavigateTab={onNavigateTab}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        onNavigateTab={onNavigateTab}
      />

      {/* z-60: Hero Editorial Typography Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          pointerEvents: 'none',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.65)',
            display: 'block',
            marginBottom: '1.25rem',
          }}
        >
          {profileData.name} /// {profileData.role}
        </span>

        {/* Large Editorial Headline with Instrument Serif Accent */}
        <h1
          style={{
            fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '1.25rem',
            maxWidth: '1050px',
          }}
        >
          BUILDING{' '}
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--accent-green)',
            }}
          >
            SYSTEMS.
          </span>
          <br />
          <span style={{ fontWeight: 300, color: 'rgba(255, 255, 255, 0.85)' }}>
            LEARNING WHAT&apos;S BENEATH THEM.
          </span>
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: '650px',
            color: 'rgba(255, 255, 255, 0.75)',
            marginBottom: '2.5rem',
          }}
        >
          {profileData.bio}
        </p>

        {/* Supporting Metadata */}
        <span
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(56, 189, 248, 0.85)',
            fontFamily: 'var(--font-mono)',
            marginBottom: '2rem',
          }}
        >
          INFRASTRUCTURE • AUTOMATION • OBSERVABILITY
        </span>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            pointerEvents: 'auto',
          }}
        >
          <button
            onClick={() => onNavigateTab('projects')}
            style={{
              background: 'transparent',
              border: '1px solid #ffffff',
              color: '#ffffff',
              padding: '0.85rem 2.25rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            EXPLORE MY WORK
          </button>

          <button
            onClick={() => onNavigateTab('journal')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.75)',
              padding: '0.85rem 1.5rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
          >
            READ MY JOURNAL →
          </button>
        </div>

        {/* Subtle Signature Interaction Hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>[ LOOK CLOSER /// THERE&apos;S MORE UNDERNEATH ]</span>
        </div>
      </div>
    </div>
  );
};
