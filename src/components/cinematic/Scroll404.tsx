import React, { useState, useEffect, useRef } from 'react';
import { Scroll404Video } from './Scroll404Video';
import { Scroll404Transition } from './Scroll404Transition';

export type Scroll404State = 'inactive' | 'entering' | 'active' | 'recovering' | 'complete';

interface Scroll404Props {
  onStateChange?: (state: Scroll404State) => void;
}

export const Scroll404: React.FC<Scroll404Props> = ({ onStateChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentState, setCurrentState] = useState<Scroll404State>('inactive');

  // Measure scroll progress through the 300vh container
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

      // Determine state phase
      let state: Scroll404State = 'inactive';
      if (rawProgress > 0 && rawProgress < 0.2) {
        state = 'entering';
      } else if (rawProgress >= 0.2 && rawProgress <= 0.65) {
        state = 'active';
      } else if (rawProgress > 0.65 && rawProgress < 0.85) {
        state = 'recovering';
      } else if (rawProgress >= 0.85) {
        state = 'complete';
      }

      if (state !== currentState) {
        setCurrentState(state);
        if (onStateChange) {
          onStateChange(state);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentState, onStateChange]);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Calculate opacities
  let videoOpacity = 0;
  let contentOpacity = 0;

  if (prefersReducedMotion) {
    videoOpacity = progress > 0.05 && progress < 0.9 ? 1 : 0;
    contentOpacity = progress > 0.2 && progress < 0.8 ? 1 : 0;
  } else {
    // 404 Video Opacity
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
    } else if (progress < 0.45) {
      contentOpacity = (progress - 0.2) / 0.25;
    } else if (progress <= 0.65) {
      contentOpacity = 1;
    } else if (progress < 0.8) {
      contentOpacity = (0.8 - progress) / 0.15;
    } else {
      contentOpacity = 0;
    }
  }

  return (
    <div
      ref={containerRef}
      id="scroll-404-sequence"
      style={{
        position: 'relative',
        minHeight: '300vh',
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
          pointerEvents: videoOpacity > 0.05 ? 'auto' : 'none',
        }}
      >
        {/* Fullscreen 404 Video Backdrop */}
        <Scroll404Video opacity={videoOpacity} prefersReducedMotion={prefersReducedMotion} />

        {/* Centered 404 Composition */}
        <Scroll404Transition opacity={contentOpacity} prefersReducedMotion={prefersReducedMotion} />
      </div>
    </div>
  );
};
