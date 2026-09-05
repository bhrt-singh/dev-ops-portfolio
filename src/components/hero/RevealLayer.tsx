import React from 'react';

interface RevealLayerProps {
  mouseX: number;
  mouseY: number;
  radius?: number;
  prefersReducedMotion?: boolean;
}

export const RevealLayer: React.FC<RevealLayerProps> = ({
  mouseX,
  mouseY,
  radius = 260,
  prefersReducedMotion = false,
}) => {
  const maskGradient = `radial-gradient(circle ${radius}px at ${mouseX}px ${mouseY}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.40) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)`;

  const maskStyle: React.CSSProperties = prefersReducedMotion
    ? {
        opacity: 0.85,
      }
    : {
        WebkitMaskImage: maskGradient,
        maskImage: maskGradient,
      };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 30,
        ...maskStyle,
      }}
    >
      {/* Revealed Deeper Technical Infrastructure Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0d131f',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(63, 185, 80, 0.3), transparent 70%),
            radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25), transparent 60%),
            linear-gradient(to right, rgba(63, 185, 80, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(63, 185, 80, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      >
        {/* Terminal Telemetry Code Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '5rem 6rem',
            fontFamily: "'JetBrains Mono', Consolas, Monaco, monospace",
            fontSize: '0.88rem',
            color: 'rgba(63, 185, 80, 0.9)',
            lineHeight: 1.85,
            userSelect: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            opacity: 0.95,
          }}
        >
          <div>
            <div style={{ color: '#38bdf8', marginBottom: '0.6rem', fontWeight: 600 }}>// DEEP INFRASTRUCTURE TELEMETRY</div>
            <div>[SYS_INIT] Loading kernel modules v6.6.42-devops... OK</div>
            <div>[NET_CNI] eBPF Cilium ingress filter active [eth0]</div>
            <div>[K8S_NODE] Cluster control-plane healthy (3/3 nodes)</div>
            <div>[PROM_TSDB] Scraping metrics @ 15s interval... 200 OK</div>
            <div>[SIP_PROBE] OPTIONS latency p99 = 14.2ms</div>
            <div>[IAC_TERRAFORM] State lock acquired (DynamoDB table ok)</div>
          </div>
          <div>
            <div style={{ color: '#f59e0b', marginBottom: '0.6rem', fontWeight: 600 }}>// SYSTEM MONITORING PIPELINE</div>
            <div>kubectl get pods -A --field-selector=status.phase=Running</div>
            <div>docker exec -it prometheus-exporter traceroute sip-trunk</div>
            <div>sysctl -w net.ipv4.tcp_tw_reuse=1</div>
            <div>ansible-playbook -i inventory site.yml --tags hardening</div>
            <div>helm upgrade --install fluxcd fluxcd/flux2 --namespace flux</div>
          </div>
        </div>
      </div>
    </div>
  );
};
