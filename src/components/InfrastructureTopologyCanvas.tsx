import React, { useEffect, useRef } from 'react';

interface Node {
  id: string;
  label: string;
  xRatio: number; // 0 to 1
  yRatio: number; // 0 to 1
  pulse: number; // 0 to 1
}

interface Path {
  from: string;
  to: string;
}

interface Packet {
  fromNodeId: string;
  toNodeId: string;
  progress: number; // 0 to 1
  speed: number;
  color: string;
}

interface NodeEvent {
  nodeId: string;
  text: string;
  opacity: number;
  life: number;
}

interface InfrastructureTopologyCanvasProps {
  highlightedNodeIds?: string[];
}

const NODES_DEF: Omit<Node, 'pulse'>[] = [
  { id: 'edge-01', label: 'EDGE-01', xRatio: 0.12, yRatio: 0.18 },
  { id: 'dns-01', label: 'DNS-01', xRatio: 0.25, yRatio: 0.15 },
  { id: 'nginx-01', label: 'NGINX-01', xRatio: 0.42, yRatio: 0.22 },
  { id: 'haproxy-01', label: 'HAPROXY-01', xRatio: 0.58, yRatio: 0.20 },
  { id: 'sip-gw', label: 'SIP-GW', xRatio: 0.78, yRatio: 0.16 },
  
  { id: 'k8s-01', label: 'K8S-01', xRatio: 0.35, yRatio: 0.48 },
  { id: 'k8s-02', label: 'K8S-02', xRatio: 0.52, yRatio: 0.45 },
  { id: 'k8s-03', label: 'K8S-03', xRatio: 0.70, yRatio: 0.50 },
  { id: 'docker-01', label: 'DOCKER-01', xRatio: 0.85, yRatio: 0.42 },
  
  { id: 'prom-01', label: 'PROM-01', xRatio: 0.20, yRatio: 0.78 },
  { id: 'grafana', label: 'GRAFANA', xRatio: 0.38, yRatio: 0.85 },
  { id: 'loki', label: 'LOKI', xRatio: 0.55, yRatio: 0.80 },
  { id: 'otel', label: 'OTEL', xRatio: 0.72, yRatio: 0.76 },
  
  { id: 'ci-01', label: 'CI-01', xRatio: 0.08, yRatio: 0.45 },
  { id: 'runner-02', label: 'RUNNER-02', xRatio: 0.20, yRatio: 0.46 },
  { id: 'tf-state', label: 'TF-STATE', xRatio: 0.88, yRatio: 0.78 },
  { id: 'db-01', label: 'DB-01', xRatio: 0.82, yRatio: 0.90 },
];

const PATHS_DEF: Path[] = [
  { from: 'edge-01', to: 'dns-01' },
  { from: 'dns-01', to: 'nginx-01' },
  { from: 'nginx-01', to: 'haproxy-01' },
  { from: 'sip-gw', to: 'haproxy-01' },
  { from: 'haproxy-01', to: 'k8s-01' },
  { from: 'haproxy-01', to: 'k8s-02' },
  { from: 'ci-01', to: 'runner-02' },
  { from: 'runner-02', to: 'k8s-01' },
  { from: 'k8s-01', to: 'k8s-02' },
  { from: 'k8s-02', to: 'k8s-03' },
  { from: 'k8s-03', to: 'docker-01' },
  { from: 'k8s-01', to: 'prom-01' },
  { from: 'prom-01', to: 'grafana' },
  { from: 'k8s-02', to: 'loki' },
  { from: 'loki', to: 'grafana' },
  { from: 'k8s-03', to: 'otel' },
  { from: 'tf-state', to: 'db-01' },
];

const SAMPLE_EVENTS: { nodeId: string; text: string }[] = [
  { nodeId: 'nginx-01', text: '[200] nginx' },
  { nodeId: 'sip-gw', text: '[ACK] sip' },
  { nodeId: 'k8s-01', text: '[OK] k8s-node' },
  { nodeId: 'prom-01', text: '[SCRAPE] prometheus' },
  { nodeId: 'otel', text: '[TRACE] otel' },
  { nodeId: 'loki', text: '[LOG] loki' },
  { nodeId: 'runner-02', text: '[DEPLOY] runner' },
];

export const InfrastructureTopologyCanvas: React.FC<InfrastructureTopologyCanvasProps> = ({
  highlightedNodeIds = []
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const isHoveredRef = useRef(false);
  const highlightedRef = useRef<string[]>(highlightedNodeIds);

  useEffect(() => {
    highlightedRef.current = highlightedNodeIds;
  }, [highlightedNodeIds]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    let bootTime = performance.now();

    // Node state array
    const nodes: Node[] = NODES_DEF.map((n) => ({ ...n, pulse: 0 }));

    // Packets
    const packets: Packet[] = [];
    const spawnPacket = (overridePath?: Path) => {
      if (packets.length >= 8) return;
      const path = overridePath || PATHS_DEF[Math.floor(Math.random() * PATHS_DEF.length)];
      packets.push({
        fromNodeId: path.from,
        toNodeId: path.to,
        progress: 0,
        speed: 0.004 + Math.random() * 0.005,
        color: Math.random() > 0.3 ? '#3fb950' : '#38bdf8',
      });
    };

    // Initial packet batch
    for (let i = 0; i < 4; i++) {
      spawnPacket();
    }

    // Active transient events
    let events: NodeEvent[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // Resize handler
    const resizeCanvas = () => {
      if (!canvas || !parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Event spawner interval
    const eventInterval = setInterval(() => {
      if (events.length >= 2 || prefersReducedMotion) return;
      const sample = SAMPLE_EVENTS[Math.floor(Math.random() * SAMPLE_EVENTS.length)];
      events.push({
        nodeId: sample.nodeId,
        text: sample.text,
        opacity: 1,
        life: 1000,
      });
    }, 2800);

    // Main render loop
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min(100, now - lastTime);
      lastTime = now;

      if (!document.hidden) {
        const width = canvas.width;
        const height = canvas.height;
        const bootAge = now - bootTime;

        // Boot sequence opacities
        const lineGlobalAlpha = Math.min(1, Math.max(0, (bootAge - 300) / 400));
        const nodeGlobalAlpha = Math.min(1, Math.max(0, (bootAge - 700) / 500));
        const packetGlobalAlpha = Math.min(1, Math.max(0, (bootAge - 1200) / 400));

        ctx.clearRect(0, 0, width, height);

        const activeNodeIds = highlightedRef.current;
        const hasHighlights = activeNodeIds.length > 0;

        // Parallax offset
        let parallaxX = 0;
        let parallaxY = 0;
        if (isHoveredRef.current) {
          parallaxX = (mousePosRef.current.x - width / 2) * 0.008;
          parallaxY = (mousePosRef.current.y - height / 2) * 0.008;
        }

        // Draw connection lines
        PATHS_DEF.forEach((path) => {
          const fromNode = nodes.find((n) => n.id === path.from);
          const toNode = nodes.find((n) => n.id === path.to);
          if (!fromNode || !toNode) return;

          const fx = fromNode.xRatio * width + parallaxX;
          const fy = fromNode.yRatio * height + parallaxY;
          const tx = toNode.xRatio * width + parallaxX;
          const ty = toNode.yRatio * height + parallaxY;

          const isPathActive = hasHighlights && (activeNodeIds.includes(path.from) || activeNodeIds.includes(path.to));

          let lineAlpha = 0.08 * lineGlobalAlpha;
          if (isPathActive) {
            lineAlpha = 0.45 * lineGlobalAlpha;
          } else if (hasHighlights) {
            lineAlpha = 0.03 * lineGlobalAlpha;
          }

          if (isHoveredRef.current && !hasHighlights) {
            const midX = (fx + tx) / 2;
            const midY = (fy + ty) / 2;
            const dist = Math.hypot(mousePosRef.current.x - midX, mousePosRef.current.y - midY);
            if (dist < 200) {
              lineAlpha += (1 - dist / 200) * 0.22;
            }
          }

          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = isPathActive ? 'rgba(56, 189, 248, 0.7)' : `rgba(56, 189, 248, ${lineAlpha})`;
          ctx.lineWidth = isPathActive ? 1.5 : 1;
          ctx.stroke();
        });

        // Update and draw packets
        if (!prefersReducedMotion && packetGlobalAlpha > 0) {
          for (let i = packets.length - 1; i >= 0; i--) {
            const p = packets[i];
            p.progress += p.speed;

            const fromNode = nodes.find((n) => n.id === p.fromNodeId);
            const toNode = nodes.find((n) => n.id === p.toNodeId);

            if (fromNode && toNode) {
              const fx = fromNode.xRatio * width + parallaxX;
              const fy = fromNode.yRatio * height + parallaxY;
              const tx = toNode.xRatio * width + parallaxX;
              const ty = toNode.yRatio * height + parallaxY;

              const px = fx + (tx - fx) * p.progress;
              const py = fy + (ty - fy) * p.progress;

              const isPacketHighlighted = hasHighlights && (activeNodeIds.includes(p.fromNodeId) || activeNodeIds.includes(p.toNodeId));

              // Draw packet particle
              ctx.beginPath();
              ctx.arc(px, py, isPacketHighlighted ? 3 : 2, 0, Math.PI * 2);
              ctx.fillStyle = isPacketHighlighted ? '#38bdf8' : p.color;
              ctx.globalAlpha = isPacketHighlighted ? 1 : (hasHighlights ? 0.2 : 0.7 * packetGlobalAlpha);
              ctx.fill();
              ctx.globalAlpha = 1;

              // Packet reach destination node
              if (p.progress >= 1) {
                toNode.pulse = 1.0;
                packets.splice(i, 1);
                spawnPacket();
              }
            } else {
              packets.splice(i, 1);
            }
          }
        }

        // Draw nodes & labels
        nodes.forEach((node) => {
          const nx = node.xRatio * width + parallaxX;
          const ny = node.yRatio * height + parallaxY;

          const isNodeHighlighted = hasHighlights && activeNodeIds.includes(node.id);

          // Pulse decay
          if (node.pulse > 0) {
            node.pulse = Math.max(0, node.pulse - dt * 0.002);
          }

          let nodeAlpha = 0.15 * nodeGlobalAlpha;
          let radius = 3;

          if (isNodeHighlighted) {
            nodeAlpha = 0.85 * nodeGlobalAlpha;
            radius = 5;
          } else if (hasHighlights) {
            nodeAlpha = 0.05 * nodeGlobalAlpha;
          } else if (isHoveredRef.current) {
            const dist = Math.hypot(mousePosRef.current.x - nx, mousePosRef.current.y - ny);
            if (dist < 180) {
              const hoverBoost = (1 - dist / 180) * 0.45;
              nodeAlpha += hoverBoost;
              radius += hoverBoost * 2;
            }
          }

          if (node.pulse > 0) {
            nodeAlpha += node.pulse * 0.4;
          }

          // Node Outer Circle
          ctx.beginPath();
          ctx.arc(nx, ny, radius + (node.pulse * 3), 0, Math.PI * 2);
          ctx.strokeStyle = isNodeHighlighted ? '#38bdf8' : `rgba(63, 185, 80, ${nodeAlpha})`;
          ctx.lineWidth = isNodeHighlighted ? 1.8 : 1;
          ctx.stroke();

          // Node Inner Dot
          ctx.beginPath();
          ctx.arc(nx, ny, Math.max(1.5, radius - 1.5), 0, Math.PI * 2);
          ctx.fillStyle = isNodeHighlighted ? '#38bdf8' : (node.pulse > 0.2 ? '#3fb950' : '#38bdf8');
          ctx.globalAlpha = Math.min(1, nodeAlpha + 0.2);
          ctx.fill();
          ctx.globalAlpha = 1;

          // Node Label
          ctx.font = isNodeHighlighted
            ? "bold 10px 'JetBrains Mono', Consolas, Monaco, monospace"
            : "9px 'JetBrains Mono', Consolas, Monaco, monospace";
          ctx.fillStyle = isNodeHighlighted
            ? 'rgba(255, 255, 255, 0.95)'
            : `rgba(255, 255, 255, ${Math.min(0.25, nodeAlpha)})`;
          ctx.fillText(node.label, nx + 6, ny + 3);
        });

        // Update and draw transient events
        for (let i = events.length - 1; i >= 0; i--) {
          const ev = events[i];
          ev.life -= dt;
          if (ev.life <= 0) {
            events.splice(i, 1);
            continue;
          }

          const targetNode = nodes.find((n) => n.id === ev.nodeId);
          if (targetNode) {
            const nx = targetNode.xRatio * width + parallaxX;
            const ny = targetNode.yRatio * height + parallaxY;

            ctx.font = "10px 'JetBrains Mono', Consolas, Monaco, monospace";
            ctx.fillStyle = `rgba(63, 185, 80, ${Math.min(0.85, ev.life / 300)})`;
            ctx.fillText(ev.text, nx + 8, ny - 6);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(eventInterval);
      window.removeEventListener('resize', resizeCanvas);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
