import React from 'react';
import { Mail, FileText, Terminal } from 'lucide-react';
import { profileData } from '../data/profileData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { Background3D } from './Background3D';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="zone zone-close" style={{ padding: '3.5rem 0 5rem 0' }}>
      <Background3D variant="field" intensity={0.4} />
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-label">
            <span style={{ color: 'var(--accent-green)' }}>//</span> PERSONAL LAB PROFILE
          </div>
          <h2 className="section-title">ABOUT ME</h2>
          <p className="section-desc" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 600 }}>
            Engineer. Problem solver. Constant learner.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '2.5rem',
          alignItems: 'start',
        }} className="about-grid">

          {/* Left Column: Authentic Bio & Story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="lab-card">
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                &gt; Who I Am
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem', marginBottom: '1rem' }}>
                I&apos;m Bharat Singh, a DevOps &amp; Infrastructure Engineer who believes that system reliability comes from deep understanding rather than abstract magic. My engineering approach centers around building lab environments, analyzing packet flows, writing automation scripts, and documenting root-cause fixes.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem' }}>
                Whether it&apos;s configuring Prometheus histogram alerts for SIP VoIP trunks, tuning Linux kernel sysctl variables for NGINX load balancers, or deploying GitOps-managed Kubernetes clusters, I focus on building infrastructure that is predictable, observable, and easy to maintain.
              </p>
            </div>

            <div className="lab-card">
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                &gt; Why This Lab Exists
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem' }}>
                This website is my public laboratory notebook. Instead of keeping learning buried in private shell histories or local text files, I publish daily engineering logs, post-mortems, and open-source infrastructure templates here for anyone navigating similar DevOps challenges.
              </p>
            </div>

            {/* Workstation Environment Box */}
            <div style={{
              backgroundColor: '#0a0d12',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-cyan)',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                <Terminal size={15} />
                <span>DEV WORKSTATION SPECIFICATIONS</span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
              }}>
                <div><span style={{ color: 'var(--text-muted)' }}>OS:</span> Fedora Workstation 40 / Linux 6.8</div>
                <div><span style={{ color: 'var(--text-muted)' }}>Shell:</span> zsh + tmux + neovim</div>
                <div><span style={{ color: 'var(--text-muted)' }}>Terminal:</span> Ptyxis / Alacritty</div>
                <div><span style={{ color: 'var(--text-muted)' }}>Virtualization:</span> KVM / QEMU + Podman</div>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Profile Sidebar & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="lab-card" style={{ borderLeft: '3px solid var(--accent-green)' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent-green)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
              }}>
                LAB STATUS
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {profileData.status}
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Uptime: {profileData.uptime}
              </div>
            </div>

            {/* Quick Profile Links */}
            <div className="lab-card">
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-green)',
                marginBottom: '1rem',
              }}>
                // CONNECT &amp; REPOSITORIES
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                  }}
                >
                  <GithubIcon size={18} style={{ color: 'var(--accent-green)' }} />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                  }}
                >
                  <LinkedinIcon size={18} style={{ color: 'var(--accent-cyan)' }} />
                  <span>LinkedIn Network</span>
                </a>

                <a
                  href={`mailto:${profileData.socials.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                  }}
                >
                  <Mail size={18} style={{ color: 'var(--accent-amber)' }} />
                  <span>{profileData.socials.email}</span>
                </a>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  <a
                    href={profileData.socials.resume}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <FileText size={16} />
                    <span>Download Engineering CV</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
