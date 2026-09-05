import React from 'react';
import { profileData } from '../../data/profileData';

interface Scroll404TransitionProps {
  opacity: number;
  prefersReducedMotion?: boolean;
}

export const Scroll404Transition: React.FC<Scroll404TransitionProps> = ({
  opacity,
  prefersReducedMotion,
}) => {
  return (
    <>
      {/* Minimal Brand Mark Header */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#ffffff',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          zIndex: 10,
          opacity,
          transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
          fontFamily: '"Geist Mono 404", "JetBrains Mono", Consolas, Monaco, monospace',
          pointerEvents: opacity > 0.1 ? 'auto' : 'none',
        }}
        className="scroll-404-brand"
        aria-label={profileData.name}
      >
        <span style={{ color: '#ffffff', fontWeight: 700 }}>&gt;</span>
        <span>{profileData.name}</span>
      </div>

      {/* Centered Content Group */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: 'min(483px, calc(100% - 40px))',
          zIndex: 10,
          gap: '44px',
          opacity,
          transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
          fontFamily: '"Geist Mono 404", "JetBrains Mono", Consolas, Monaco, monospace',
          pointerEvents: opacity > 0.1 ? 'auto' : 'none',
        }}
        className="scroll-404-content"
      >
        {/* Large Editorial 404 Text */}
        <h1
          style={{
            fontSize: '290px',
            fontWeight: 600,
            lineHeight: 0.85,
            letterSpacing: '-0.05em',
            margin: 0,
            padding: 0,
            background:
              'linear-gradient(247.3282658084845deg, rgb(255, 255, 255) 2.5334%, rgba(255, 255, 255, 0.4) 93.612%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'block',
          }}
          className="scroll-404-title"
        >
          404
        </h1>

        {/* Solid White Divider Line */}
        <div
          style={{
            width: '425px',
            height: '1px',
            backgroundColor: '#ffffff',
            border: 'none',
            margin: 0,
          }}
          className="scroll-404-divider"
          aria-hidden="true"
        />

        {/* Minimal Error Message */}
        <p
          style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            margin: 0,
            maxWidth: '100%',
          }}
          className="scroll-404-message"
        >
          The path may be broken, but the journey isn&apos;t. Let&apos;s get you back.
        </p>
      </div>

      <style>{`
        .scroll-404-brand {
          top: 80px;
        }
        @media (max-width: 640px) {
          .scroll-404-brand {
            top: 32px;
            transform: translateX(-50%) scale(0.75);
          }
          .scroll-404-content {
            width: min(100% - 40px, 360px);
            gap: 28px;
          }
          .scroll-404-title {
            font-size: clamp(140px, 52vw, 200px) !important;
            letter-spacing: -0.09em !important;
          }
          .scroll-404-divider {
            width: 100% !important;
          }
          .scroll-404-message {
            font-size: clamp(16px, 4.5vw, 20px) !important;
            letter-spacing: -1.3px !important;
          }
        }
      `}</style>
    </>
  );
};
