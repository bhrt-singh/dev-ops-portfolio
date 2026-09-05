import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Filter, Terminal } from 'lucide-react';
import { stackData } from '../data/stackData';
import { techMetadataMap, type TechDetails } from '../data/techMetadata';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';
import { InfrastructureTopologyCanvas } from './InfrastructureTopologyCanvas';
import { TechIcon } from './TechIcon';
import { TechInspectionPanel } from './TechInspectionPanel';
import './DevOpsStack.css';

// CLI Output Map for Terminal Tooltip
const cliCommandsMap: Record<string, string> = {
  Linux: "$ uname -r → 6.8.0-1017-aws (x86_64)",
  Fedora: "$ cat /etc/fedora-release → Fedora release 40",
  Ubuntu: "$ lsb_release -d → Ubuntu 24.04 LTS (Noble)",
  Docker: "$ docker ps → CONTAINER ID 7a9e STATUS Up 42h",
  Podman: "$ podman info → rootless: true runtime: crun",
  Kubernetes: "$ kubectl version --short → Server: v1.30.2",
  Prometheus: "$ promtool check config → SUCCESS (12 targets)",
  Grafana: "$ grafana-cli --version → Grafana v10.4.2",
  Loki: "$ logcli query '{job=\"k8s\"}' → 200 OK (0.04s)",
  OpenTelemetry: "$ otelcol-contrib -v → v0.101.0 (OTLP gRPC)",
  NGINX: "$ nginx -t → syntax is ok, test successful",
  HAProxy: "$ haproxy -v → HAProxy v2.9.7 (epoll)",
  DNS: "$ dig +short @127.0.0.1 k8s.internal → 10.96.0.1",
  "TCP/IP": "$ tcpdump -i eth0 -n tcp port 443 → 15 pkts",
  SIP: "$ sngrep -d eth0 -c sip → 200 OK (INVITE cseq 101)",
  Bash: "$ bash --version → GNU bash v5.2.21",
  Python: "$ python3 -c 'import sys; print(sys.version)' → 3.12.3",
  Ansible: "$ ansible --version → ansible [core 2.16.5]",
  Terraform: "$ terraform -v → Terraform v1.8.5 on linux_amd64",
  "GitHub Actions": "$ gh run status → ✓ Workflow #4812 passed",
  "GitLab CI": "$ gitlab-runner status → service running",
  Jenkins: "$ jenkins-cli version → 2.452.1"
};

// System Status Cycle States
const STATUS_CYCLES = [
  { label: 'CONFIGURING', color: '#f59e0b' },
  { label: 'SYNCING', color: '#38bdf8' },
  { label: 'ONLINE', color: '#22c55e' },
];

export const DevOpsStack: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [pinnedTech, setPinnedTech] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [statusIdx, setStatusIdx] = useState<number>(0);
  const [cliTooltip, setCliTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeTechName = pinnedTech || hoveredTech;
  const activeDetails: TechDetails | null = activeTechName ? techMetadataMap[activeTechName] || null : null;
  const activeBgNodes = activeDetails ? activeDetails.bgNodes : [];

  // Cycle system status badge every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % STATUS_CYCLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Click outside listener to unpin inspection panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPinnedTech(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinnedTech(null);
        setHoveredTech(null);
        setCliTooltip(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTechClick = (techName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pinnedTech === techName) {
      setPinnedTech(null);
    } else {
      setPinnedTech(techName);
    }
  };

  const handleSelectRelated = (relatedName: string) => {
    if (techMetadataMap[relatedName]) {
      setPinnedTech(relatedName);
    }
  };

  const handleFilterClick = (level: string) => {
    if (selectedFilter === level) {
      setSelectedFilter('All');
    } else {
      setSelectedFilter(level);
    }
  };

  const handleItemMouseMove = (techName: string, e: React.MouseEvent) => {
    const text = cliCommandsMap[techName];
    if (text && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCliTooltip({
        text,
        x: e.clientX - rect.left + 15,
        y: e.clientY - rect.top - 15,
      });
    }
  };

  const handleItemMouseLeave = () => {
    setHoveredTech(null);
    setCliTooltip(null);
  };

  const currentStatus = STATUS_CYCLES[statusIdx];

  return (
    <section
      id="lab"
      className="zone zone-panel"
      ref={containerRef}
      style={{
        padding: '3rem 0 4.5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Circuit Grid Background */}
      <div className="devops-circuit-bg" />

      {/* Infrastructure Topology Background Canvas */}
      <InfrastructureTopologyCanvas highlightedNodeIds={activeBgNodes} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span style={{ color: 'var(--accent-green)' }}>//</span> LAB INFRASTRUCTURE
            </div>

            {/* Cycling System Status Badge */}
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
                className="status-pulse-dot"
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: currentStatus.color,
                  boxShadow: `0 0 8px ${currentStatus.color}`,
                }}
              />
              <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>{currentStatus.label}</span>
            </div>
          </div>

          <h2 className="section-title" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
            DEVOPS STACK &amp; TOOLING
          </h2>
          <p className="section-desc">
            Central catalog of operating systems, container runtimes, monitoring pipelines, network protocols, and IaC tooling.
            <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '0.4rem', fontFamily: 'var(--font-mono)' }}>
              [ HOVER OR CLICK ANY NODE FOR LIVE CONTROL PLANE DIAGNOSTICS ]
            </span>
          </p>

          {/* Interactive Skill-Level Filter Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.2rem',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginRight: '0.2rem' }}>
              <Filter size={12} style={{ color: 'var(--accent-green)' }} /> FILTER BADGE:
            </span>

            {['All', 'Core', 'Advanced', 'Proficient'].map((level) => {
              const isActive = selectedFilter === level;
              return (
                <button
                  key={level}
                  role="button"
                  aria-pressed={isActive}
                  onClick={() => handleFilterClick(level)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.7rem',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    backgroundColor: isActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: isActive ? '#22c55e' : 'var(--text-secondary)',
                    border: isActive ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {level === 'All' ? 'ALL LEVELS' : level.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Diagnostic Inspection Panel */}
        {activeDetails && (
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 100,
              maxWidth: '380px',
              width: 'calc(100vw - 2rem)',
              pointerEvents: 'auto',
            }}
          >
            <TechInspectionPanel
              details={activeDetails}
              isPinned={!!pinnedTech}
              onClose={() => setPinnedTech(null)}
              onSelectRelated={handleSelectRelated}
            />
          </div>
        )}

        {/* Hover Terminal CLI Tooltip */}
        {cliTooltip && (
          <div
            className="cli-tooltip"
            style={{
              left: `${cliTooltip.x}px`,
              top: `${cliTooltip.y}px`,
            }}
          >
            <Terminal size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            {cliTooltip.text}
          </div>
        )}

        {/* Stack Groups Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {stackData.map((group, i) => (
            <Reveal key={group.category} index={i}>
              <TiltCard
                className="lab-card"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
              >
                {/* Category Header with Micro-Interaction */}
                <div
                  className="lab-card-header"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '0.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div className="lab-card-header-icon" style={{ display: 'inline-flex', transition: 'all 0.25s ease' }}>
                    <Cpu size={16} style={{ color: 'var(--accent-green)' }} />
                  </div>
                  <h3
                    className="lab-card-header-title"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--accent-green)',
                      letterSpacing: '0.05em',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {group.category}
                  </h3>
                </div>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {group.items.map((item) => {
                    const isItemActive = activeTechName === item.name;
                    const isFilteredOut = selectedFilter !== 'All' && item.level !== selectedFilter;
                    const meta = techMetadataMap[item.name] || { brandColor: '#38bdf8' };

                    return (
                      <div
                        key={item.name}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isItemActive}
                        aria-label={`Inspect ${item.name} technology details`}
                        onMouseEnter={() => setHoveredTech(item.name)}
                        onMouseMove={(e) => handleItemMouseMove(item.name, e)}
                        onMouseLeave={handleItemMouseLeave}
                        onClick={(e) => handleTechClick(item.name, e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setPinnedTech(pinnedTech === item.name ? null : item.name);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          padding: '0.4rem 0.5rem',
                          margin: '-0.4rem -0.5rem',
                          borderRadius: 'var(--radius-sm, 6px)',
                          cursor: isFilteredOut ? 'default' : 'pointer',
                          backgroundColor: isItemActive ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
                          border: isItemActive ? `1px solid ${meta.brandColor}50` : '1px solid transparent',
                          opacity: isFilteredOut ? 0.25 : 1,
                          pointerEvents: isFilteredOut ? 'none' : 'auto',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          outline: 'none',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              fontWeight: 600,
                              color: isItemActive ? '#ffffff' : 'var(--text-primary)',
                              fontSize: '0.925rem',
                              transition: 'color 0.15s',
                            }}
                          >
                            <TechIcon
                              name={item.name}
                              brandColor={meta.brandColor}
                              size={18}
                              active={isItemActive}
                            />
                            <span>{item.name}</span>

                            {/* Activity Indicator Pulse */}
                            {isItemActive && (
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--accent-green)',
                                  boxShadow: '0 0 8px var(--accent-green)',
                                  animation: 'statusDotPulse 1.5s infinite',
                                }}
                              />
                            )}
                          </div>
                          {item.description && (
                            <div
                              style={{
                                fontSize: '0.78rem',
                                color: isItemActive ? 'rgba(255, 255, 255, 0.85)' : 'var(--text-secondary)',
                                marginTop: '0.2rem',
                                paddingLeft: '1.6rem',
                                transition: 'color 0.15s',
                              }}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>

                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            padding: '0.1rem 0.45rem',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: isItemActive ? `${meta.brandColor}25` : 'rgba(56, 189, 248, 0.08)',
                            color: isItemActive ? '#ffffff' : 'var(--accent-cyan)',
                            border: isItemActive ? `1px solid ${meta.brandColor}80` : '1px solid rgba(56, 189, 248, 0.2)',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.15s',
                          }}
                        >
                          {item.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
