import React from 'react';

const ITEMS = [
  'KUBERNETES', 'TERRAFORM', 'ANSIBLE', 'PROMETHEUS', 'GRAFANA', 'DOCKER',
  'LINUX KERNEL', 'GITOPS', 'ZERO-TRUST', 'OBSERVABILITY', 'CI/CD', 'IaC',
];

/**
 * Full-width ticker that bleeds edge-to-edge — the first thing that breaks
 * the "everything lives in a centered 1140px column" pattern.
 */
export const TickerMarquee: React.FC = () => {
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div
      aria-hidden
      style={{
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-terminal)',
        padding: '0.9rem 0',
      }}
    >
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              color: i % ITEMS.length === 0 ? 'var(--accent-green)' : 'var(--text-muted)',
              padding: '0 1.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.75rem',
              whiteSpace: 'nowrap',
              borderRight: '1px solid var(--border-color)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
