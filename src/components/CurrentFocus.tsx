import React from 'react';
import { Terminal, Box, Server, Activity, Network, PhoneCall, Cpu, Cloud } from 'lucide-react';
import { profileData } from '../data/profileData';
import { Reveal } from './Reveal';
import { Background3D } from './Background3D';

const iconMap: Record<string, React.FC<{ size?: number; style?: React.CSSProperties }>> = {
  Terminal,
  Box,
  Server,
  Activity,
  Network,
  PhoneCall,
  Cpu,
  Cloud,
};

export const CurrentFocus: React.FC = () => {
  return (
    <section id="focus" className="zone zone-elevated" style={{ padding: '2.75rem 0 3.5rem 0' }}>
      <Background3D variant="circuit" intensity={0.6} />
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <span style={{ color: 'var(--accent-green)' }}>//</span> DASHBOARD
          </div>
          <h2 className="section-title">CURRENT FOCUS</h2>
          <p className="section-desc">
            Core technologies and engineering domains I build, optimize, and experiment with daily in my lab.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          {profileData.currentFocus.map((tech, i) => {
            const IconComp = iconMap[tech.iconName] || Terminal;
            return (
              <Reveal
                key={tech.name}
                index={i}
                className="lab-card"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                }}
              >
                <div style={{
                  padding: '0.55rem',
                  backgroundColor: 'rgba(63, 185, 80, 0.08)',
                  border: '1px solid rgba(63, 185, 80, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <IconComp size={20} style={{ color: 'var(--accent-green)' }} />
                </div>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                  }}>
                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}>
                      {tech.name}
                    </h3>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-cyan)',
                    marginTop: '0.1rem',
                  }}>
                    {tech.category}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.35rem',
                    lineHeight: '1.4',
                  }}>
                    {tech.description}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
