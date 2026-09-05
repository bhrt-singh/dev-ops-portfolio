import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, FolderGit2 } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { journeyData } from '../data/journeyData';
import { Reveal } from './Reveal';
import { Background3D } from './Background3D';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 900 : true
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
};

const getVersionTag = (year: string) => {
  switch (year) {
    case '2024': return 'v0.1';
    case '2025': return 'v0.5';
    case '2026': return 'v1.0';
    case 'NEXT': return 'vNext';
    default: return `v${year}`;
  }
};

const MilestoneDetail: React.FC<{ item: (typeof journeyData)[number] }> = ({ item }) => (
  <div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <span
        style={{
          backgroundColor: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          color: 'var(--accent-cyan)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '0.2rem 0.55rem',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        {getVersionTag(item.year)}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: item.highlight ? 'var(--accent-green)' : 'var(--text-primary)',
        }}
      >
        {item.year}
      </span>
      {item.highlight && (
        <span
          style={{
            backgroundColor: 'rgba(63, 185, 80, 0.15)',
            color: 'var(--accent-green)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          CURRENT FOCUS
        </span>
      )}
    </div>

    <h3
      style={{
        fontSize: '1.6rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '0.85rem',
        letterSpacing: '-0.01em',
        maxWidth: '520px',
      }}
    >
      {item.title}
    </h3>

    <p
      style={{
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        lineHeight: 1.65,
        marginBottom: '1.25rem',
        maxWidth: '520px',
      }}
    >
      {item.description}
    </p>

    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
      {item.skills.map((sk) => (
        <span key={sk} className="tag-pill">
          {sk}
        </span>
      ))}
    </div>

    {item.keyProjects.length > 0 && (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          paddingTop: '0.75rem',
          borderTop: '1px dashed var(--border-color)',
        }}
      >
        <FolderGit2 size={14} style={{ color: 'var(--accent-green)' }} />
        <span>{item.keyProjects.join(' • ')}</span>
      </div>
    )}
  </div>
);

/** Desktop: a pinned rail + cross-fading detail panel driven by scroll progress. */
const PinnedJourney: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = journeyData.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    setActiveIndex(idx);
  });

  return (
    <div ref={trackRef} style={{ position: 'relative', height: `${total * 85}vh` }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          alignItems: 'center',
          gap: '3rem',
        }}
        className="journey-pin-grid"
      >
        <Background3D variant="field" intensity={0.5} />
        {/* Left rail: progress line + year markers */}
        <div style={{ position: 'relative', height: '70%', paddingLeft: '0.5rem' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: 'var(--border-color)',
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '2px',
              backgroundColor: 'var(--accent-green)',
              transformOrigin: 'top',
              scaleY: scrollYProgress,
              boxShadow: '0 0 8px var(--accent-green-glow)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            {journeyData.map((item, i) => (
              <div
                key={item.year}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  paddingLeft: '1rem',
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    marginLeft: '-1.55rem',
                    backgroundColor:
                      i <= activeIndex ? 'var(--accent-green)' : 'var(--bg-card)',
                    border: `2px solid ${
                      i <= activeIndex ? 'var(--accent-green)' : 'var(--border-color-hover)'
                    }`,
                    transition: 'background-color 0.3s ease, border-color 0.3s ease',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: i === activeIndex ? 700 : 400,
                    color: i === activeIndex ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: active milestone detail, cross-fading */}
        <div className="lab-card" style={{ minHeight: '360px', padding: '2rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <MilestoneDetail item={journeyData[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .journey-pin-grid {
            grid-template-columns: 160px 1fr !important;
            gap: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

/** Mobile / reduced-motion fallback: the original stacked vertical timeline. */
const StackedJourney: React.FC = () => (
  <div style={{ position: 'relative', maxWidth: '840px', margin: '0 auto', paddingLeft: '2rem' }}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '7px',
        width: '2px',
        backgroundColor: 'var(--border-color)',
      }}
    />
    {journeyData.map((item, index) => (
      <Reveal key={item.year} index={index}>
        <div style={{ position: 'relative', marginBottom: index === journeyData.length - 1 ? 0 : '2.5rem' }}>
          <div
            style={{
              position: 'absolute',
              left: '-2rem',
              top: '0.2rem',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: item.highlight ? 'var(--accent-green)' : 'var(--bg-card)',
              border: item.highlight ? '3px solid var(--bg-primary)' : '2px solid var(--accent-cyan)',
              boxShadow: item.highlight ? '0 0 12px var(--accent-green-glow)' : 'none',
              zIndex: 2,
            }}
          />
          <div
            className="lab-card"
            style={{
              borderLeft: item.highlight ? '3px solid var(--accent-green)' : '1px solid var(--border-color)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: item.highlight ? 'var(--accent-green)' : 'var(--accent-cyan)',
                }}
              >
                [{item.year}] {item.title}
              </div>
              {item.highlight && (
                <span
                  style={{
                    backgroundColor: 'rgba(63, 185, 80, 0.15)',
                    color: 'var(--accent-green)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  CURRENT FOCUS
                </span>
              )}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {item.description}
            </p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {item.skills.map((sk) => (
                <span key={sk} className="tag-pill">
                  {sk}
                </span>
              ))}
            </div>
            {item.keyProjects.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  paddingTop: '0.65rem',
                  borderTop: '1px dashed var(--border-color)',
                }}
              >
                <FolderGit2 size={13} style={{ color: 'var(--accent-green)' }} />
                <span>Projects: {item.keyProjects.join(' • ')}</span>
              </div>
            )}
          </div>
          {index < journeyData.length - 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginLeft: '-2rem', width: '16px' }}>
              <ArrowDown size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
          )}
        </div>
      </Reveal>
    ))}
  </div>
);

export const JourneyTimeline: React.FC = () => {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = useReducedMotion();
  const usePinned = isDesktop && !shouldReduceMotion;

  return (
    <section id="journey" className="zone zone-control" style={{ padding: usePinned ? '2.5rem 0 0 0' : '2.5rem 0 4rem 0' }}>
      <div className="container-wide">
        <div className="section-header">
          <div className="section-label">
            <span style={{ color: 'var(--accent-green)' }}>//</span> EVOLUTION TRAJECTORY
          </div>
          <h2 className="section-title">DEVOPS JOURNEY</h2>
          <p className="section-desc">
            Chronological roadmap of engineering milestones, core competencies acquired, and ongoing technical domain expansion
            {usePinned ? ' — keep scrolling, the timeline follows you.' : '.'}
          </p>
        </div>
      </div>

      {usePinned ? (
        <div className="container-wide">
          <PinnedJourney />
        </div>
      ) : (
        <div className="container-wide">
          <StackedJourney />
        </div>
      )}
    </section>
  );
};
