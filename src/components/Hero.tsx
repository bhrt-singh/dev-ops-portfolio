import React from 'react';
import { ArrowRight, BookOpen, Terminal, ShieldCheck, Activity } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { profileData } from '../data/profileData';
import { journalArticlesData } from '../data/journalData';
import { projectsData } from '../data/projectsData';
import { journeyData } from '../data/journeyData';
import { TerminalHero } from './TerminalHero';
import { StatCounter } from './StatCounter';
import { Background3D } from './Background3D';

interface HeroProps {
  onExploreProjects: () => void;
  onReadJournal: () => void;
  onNavigateTab: (tab: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onReadJournal, onNavigateTab }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Ambient background drifts slower than the page — a light parallax touch.
  const bgY = useTransform(scrollY, [0, 900], [0, shouldReduceMotion ? 0 : 220]);
  const bgOpacity = useTransform(scrollY, [0, 700], [1, 0.35]);

  return (
    <section id="home" className="zone zone-hero" style={{ position: 'relative', padding: '3.5rem 0 2.5rem 0', overflow: 'hidden' }}>
      <Background3D variant="nodes" intensity={0.85} />
      {/* Ambient parallax backdrop: a faint terminal grid + glow, unique to a DevOps identity */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-10% -5% auto -5%',
          height: '620px',
          y: bgY,
          opacity: bgOpacity,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `
            radial-gradient(circle at 18% 20%, rgba(63, 185, 80, 0.16), transparent 42%),
            radial-gradient(circle at 82% 8%, rgba(56, 189, 248, 0.12), transparent 38%),
            linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, auto, 42px 42px, 42px 42px',
        }}
      />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Headlines & CTAs */}
          <div>
            {/* Status Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(63, 185, 80, 0.08)',
                border: '1px solid rgba(63, 185, 80, 0.25)',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--accent-green)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--accent-green)' }}
                className="pulse-glow"
              ></span>
              <span>SYS_STATUS: ONLINE &amp; LEARNING</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontSize: '2.75rem',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                letterSpacing: '-0.03em',
              }}
            >
              Building systems.
              <br />
              <span style={{ color: 'var(--accent-green)', textShadow: '0 0 20px var(--accent-green-glow)' }}>
                Learning every day.
              </span>
              <br />
              Sharing the journey.
            </motion.h1>

            {/* Sub-role pills */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--accent-cyan)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{profileData.role}</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span>Infrastructure</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span>Automation</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span>Observability</span>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.65,
                marginBottom: '2rem',
                maxWidth: '540px',
              }}
            >
              {profileData.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={onExploreProjects} className="btn-primary">
                <span>Explore My Work</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={onReadJournal} className="btn-secondary">
                <BookOpen size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>Read My Journal</span>
              </button>
            </motion.div>

            {/* Technical Highlights Bar */}
            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                display: 'flex',
                gap: '1.5rem',
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Terminal size={14} style={{ color: 'var(--accent-green)' }} />
                <span>Linux Workstation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} style={{ color: 'var(--accent-cyan)' }} />
                <span>Zero-Trust IaC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Activity size={14} style={{ color: 'var(--accent-amber)' }} />
                <span>Real-Time Telemetry</span>
              </div>
            </motion.div>

            {/* Live stats strip — real counts pulled straight from the site's own data */}
            <motion.div
              custom={6}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '1.75rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'TIL entries logged', value: journalArticlesData.length },
                { label: 'Projects shipped', value: projectsData.length },
                { label: 'Milestones tracked', value: journeyData.length },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    <StatCounter value={stat.value} />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Linux Terminal Hero Component */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{ width: '100%' }}
          >
            <TerminalHero onNavigateTab={onNavigateTab} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          h1 {
            font-size: 2.1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
