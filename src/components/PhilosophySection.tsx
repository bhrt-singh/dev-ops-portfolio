import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Wrench, FileCode, CheckSquare } from 'lucide-react';
import { profileData } from '../data/profileData';
import { Reveal } from './Reveal';
import { Background3D } from './Background3D';
import './PhilosophySection.css';

const STEP_STATUS_MAP = [
  { label: 'BUILDING', color: '#38bdf8' },
  { label: 'BREAKING', color: '#f85149' },
  { label: 'ANALYZING', color: '#38bdf8' },
  { label: 'AUTOMATING', color: '#a855f7' },
  { label: 'DOCUMENTING', color: '#22c55e' },
];

export const PhilosophySection: React.FC = () => {
  const [inView, setInView] = useState(false);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const steps = [
    { num: '01', title: 'BUILD IT', desc: 'Deploy raw systems on bare-metal and containers to understand baseline behavior.', icon: Terminal, iconClass: 'icon-terminal' },
    { num: '02', title: 'BREAK IT', desc: 'Simulate high load, packet loss, network partition, and node failures.', icon: Wrench, iconClass: 'icon-wrench' },
    { num: '03', title: 'UNDERSTAND IT', desc: 'Trace kernel metrics, packet captures, and log streams to pinpoint root causes.', icon: Shield, iconClass: 'icon-shield' },
    { num: '04', title: 'AUTOMATE IT', desc: 'Codify resolution logic using Ansible, Terraform, and GitOps workflows.', icon: FileCode, iconClass: 'icon-code' },
    { num: '05', title: 'DOCUMENT IT', desc: 'Write precise post-mortems and technical logs so knowledge is shared.', icon: CheckSquare, iconClass: 'icon-check' },
  ];

  const quoteLines = [
    { text: 'Build it.', stepIdx: 0, highlight: false },
    { text: 'Break it.', stepIdx: 1, highlight: false },
    { text: 'Understand it.', stepIdx: 2, highlight: true },
    { text: 'Automate it.', stepIdx: 3, highlight: false },
    { text: 'Document it.', stepIdx: 4, highlight: false },
  ];

  // IntersectionObserver for one-time entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll listener to update active step as user scrolls through section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight)));
        const idx = Math.min(4, Math.floor(progress * 5));
        setActiveStepIdx(idx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStatus = STEP_STATUS_MAP[activeStepIdx] || STEP_STATUS_MAP[0];

  return (
    <section id="philosophy" className="zone zone-deep" style={{ padding: '3.5rem 0 4.5rem 0' }}>
      <div className="container-wide">
        <div
          ref={sectionRef}
          style={{
            backgroundColor: '#0c0f16',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-terminal)',
          }}
        >
          <Background3D variant="knot" intensity={0.35} />

          {/* Animated Left Accent Bar */}
          <div className={`philosophy-accent-bar ${inView ? 'active' : ''}`} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Section Header with Synced Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--accent-green)',
                  letterSpacing: '0.08em',
                }}
              >
                // ENGINEERING PHILOSOPHY
              </div>

              {/* Synced Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(10, 14, 20, 0.8)',
                  border: `1px solid ${currentStatus.color}40`,
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: currentStatus.color,
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>SYSTEM</span>
                <span>•</span>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: currentStatus.color,
                    boxShadow: `0 0 8px ${currentStatus.color}`,
                    animation: 'pulse 1.5s infinite',
                  }}
                />
                <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>{currentStatus.label}</span>
              </div>
            </div>

            {/* Staggered Quote Lines with Quote-to-Step Linking */}
            <blockquote
              aria-label="Build it. Break it. Understand it. Automate it. Document it."
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                lineHeight: 1.3,
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '-0.02em',
              }}
            >
              {quoteLines.map((line, idx) => {
                const isLineActive = activeStepIdx === line.stepIdx;
                return (
                  <React.Fragment key={line.text}>
                    <span
                      tabIndex={0}
                      role="button"
                      aria-label={`Highlight step ${line.text}`}
                      className={`quote-line ${inView ? 'visible' : ''}`}
                      onMouseEnter={() => setActiveStepIdx(line.stepIdx)}
                      onClick={() => setActiveStepIdx(line.stepIdx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveStepIdx(line.stepIdx);
                        }
                      }}
                      style={{
                        transitionDelay: `${idx * 150}ms`,
                        color: isLineActive ? '#22c55e' : line.highlight ? 'var(--accent-green)' : 'var(--text-primary)',
                        textShadow: isLineActive ? '0 0 12px rgba(34, 197, 94, 0.6)' : 'none',
                        outline: 'none',
                      }}
                    >
                      &quot;{line.text}
                    </span>
                    {idx < quoteLines.length - 1 && <br />}
                  </React.Fragment>
                );
              })}
              &quot;
            </blockquote>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                maxWidth: '650px',
                lineHeight: 1.65,
                marginBottom: '2rem',
              }}
            >
              {profileData.philosophyText}
            </p>

            {/* Pipeline Connector Line */}
            <div className="pipeline-connector-line">
              <div className="pipeline-connector-dot" />
            </div>

            {/* 5 Principles Grid with Scroll-Driven Active Step Highlighting & Micro-Animations */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.25rem',
                paddingTop: '1.5rem',
              }}
            >
              {steps.map((step, i) => {
                const IconComp = step.icon;
                const isStepActive = activeStepIdx === i;

                return (
                  <Reveal key={step.num} index={i}>
                    <div
                      className="step-card"
                      tabIndex={0}
                      role="region"
                      aria-label={`Step ${step.num} ${step.title}`}
                      onMouseEnter={() => setActiveStepIdx(i)}
                      onClick={() => setActiveStepIdx(i)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md, 6px)',
                        backgroundColor: isStepActive ? 'rgba(34, 197, 94, 0.06)' : 'transparent',
                        borderLeft: isStepActive ? '3px solid #22c55e' : '3px solid transparent',
                        boxShadow: isStepActive ? '0 0 14px rgba(34, 197, 94, 0.2)' : 'none',
                        opacity: isStepActive ? 1 : 0.6,
                        transform: isStepActive ? 'scale(1.02)' : 'scale(1)',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: isStepActive ? '#22c55e' : 'var(--accent-cyan)',
                            fontWeight: 700,
                            transition: 'color 0.2s',
                          }}
                        >
                          {step.num}
                        </span>
                        <div className={step.iconClass} style={{ display: 'inline-flex', transition: 'transform 0.2s' }}>
                          <IconComp size={16} style={{ color: isStepActive ? '#22c55e' : 'var(--accent-green)' }} />
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: isStepActive ? '#ffffff' : 'var(--text-primary)',
                          transition: 'color 0.2s',
                        }}
                      >
                        {step.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: isStepActive ? 'rgba(255, 255, 255, 0.85)' : 'var(--text-muted)',
                          lineHeight: 1.45,
                          transition: 'color 0.2s',
                        }}
                      >
                        {step.desc}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
