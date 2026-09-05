import React, { useState, useEffect, useRef } from 'react';
import { profileData } from '../../data/profileData';

const VIDEO_404_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4';

export const ErrorState: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Measure scroll progress through this 300vh region
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScrollable = el.clientHeight - window.innerHeight;
      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Calculate opacities based on scroll progress
  // 0% - 25%: Video & background transition in
  // 25% - 60%: Peak 404 interruption
  // 60% - 85%: Subtle recovery transition
  // 85% - 100%: Fade into TodayILearned
  let videoOpacity = 0;
  let contentOpacity = 0;

  if (prefersReducedMotion) {
    videoOpacity = progress > 0.1 && progress < 0.9 ? 1 : 0;
    contentOpacity = progress > 0.15 && progress < 0.85 ? 1 : 0;
  } else {
    // Video opacity
    if (progress < 0.2) {
      videoOpacity = progress / 0.2;
    } else if (progress <= 0.65) {
      videoOpacity = 1;
    } else if (progress < 0.9) {
      videoOpacity = (0.9 - progress) / 0.25;
    } else {
      videoOpacity = 0;
    }

    // 404 Content Opacity
    if (progress < 0.2) {
      contentOpacity = 0;
    } else if (progress < 0.35) {
      contentOpacity = (progress - 0.2) / 0.15;
    } else if (progress <= 0.6) {
      contentOpacity = 1;
    } else if (progress < 0.8) {
      contentOpacity = (0.8 - progress) / 0.2;
    } else {
      contentOpacity = 0;
    }
  }

  return (
    <div
      ref={containerRef}
      id="system-error-sequence"
      style={{
        position: 'relative',
        height: '300vh',
        width: '100%',
        backgroundColor: '#0a0d12',
      }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#0a0d12',
          pointerEvents: contentOpacity > 0.1 ? 'auto' : 'none',
        }}
      >
        {/* Fullscreen Video Background */}
        <video
          src={VIDEO_404_URL}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: videoOpacity,
            transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
            pointerEvents: 'none',
          }}
        />

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
            opacity: contentOpacity,
            transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
            fontFamily: '"Geist Mono 404", "JetBrains Mono", Consolas, Monaco, monospace',
          }}
          className="error-state-brand"
          aria-label={profileData.name}
        >
          <span style={{ color: '#ffffff', fontWeight: 700 }}>&gt;</span>
          <span>{profileData.name}</span>
        </div>

        {/* Centered 404 Composition */}
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
            opacity: contentOpacity,
            transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
            fontFamily: '"Geist Mono 404", "JetBrains Mono", Consolas, Monaco, monospace',
          }}
          className="error-state-content"
        >
          {/* Large Editorial 404 Text */}
          <h1
            style={{
              fontSize: 'clamp(140px, 22vw, 290px)',
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
          >
            404
          </h1>

          {/* Solid White Line Divider */}
          <div
            style={{
              width: '425px',
              height: '1px',
              backgroundColor: '#ffffff',
              border: 'none',
              margin: 0,
            }}
            className="error-state-divider"
            aria-hidden="true"
          />

          {/* Message */}
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
            className="error-state-message"
          >
            The path may be broken, but the journey isn&apos;t. Let&apos;s get you back.
          </p>
        </div>
      </div>

      <style>{`
        .error-state-brand {
          top: 80px;
        }
        @media (max-width: 640px) {
          .error-state-brand {
            top: 32px;
            transform: translateX(-50%) scale(0.75);
          }
          .error-state-content {
            width: min(100% - 40px, 360px);
            gap: 28px;
          }
          .error-state-divider {
            width: 100% !important;
          }
          .error-state-message {
            font-size: clamp(16px, 4.5vw, 20px) !important;
            letter-spacing: -1.3px !important;
          }
        }
      `}</style>
    </div>
  );
};
