export interface Project {
  id: string;
  name: string;
  category: "All" | "Infrastructure" | "DevOps" | "Monitoring" | "Networking";
  shortDescription: string;
  longDescription: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  architectureOverview: string;
  challenges: string;
  lessonsLearned: string;
}

export const projectsData: Project[] = [
  {
    id: "sip-monitoring-stack",
    name: "SIP Monitoring & Telemetry Stack",
    category: "Monitoring",
    shortDescription: "Prometheus + Grafana + SIP protocol exporter for real-time VoIP telemetry, call setup latency tracking, and metric alerting.",
    longDescription: "A specialized monitoring stack built to monitor VoIP infrastructure. It uses a custom Go exporter to send active SIP OPTIONS probes, aggregate latency distribution histogram metrics, and visualize call quality on Grafana dashboards.",
    tags: ["Prometheus", "Grafana", "SIP", "Linux", "Docker", "Go"],
    githubUrl: "https://github.com/your-username/sip-monitoring-stack",
    liveUrl: "https://grafana-demo.lab.engineering",
    features: [
      "Custom Go-based SIP OPTIONS exporter for active probe testing",
      "Prometheus histogram metrics for 50th, 90th, and 99th percentile SIP latency",
      "Real-time Grafana dashboard with call completion rate thresholds",
      "Alertmanager integrations for Telegram and PagerDuty alerts"
    ],
    architectureOverview: "Synthetic SIP probes -> Custom Go Exporter -> Prometheus TSDB -> Grafana Dashboards -> Alertmanager",
    challenges: "Handling SIP UDP packet jitter and packet retransmissions across unreliable network links without generating false positive alerts.",
    lessonsLearned: "Active protocol probes give drastically more reliable operational telemetry than passive ping probes for real-time media workloads."
  },
  {
    id: "iac-homelab-automation",
    name: "Infrastructure as Code Homelab",
    category: "Infrastructure",
    shortDescription: "Automated bare-metal to Kubernetes cluster bootstrapping using Terraform, Ansible, and GitOps workflows.",
    longDescription: "End-to-end infrastructure automation repository that provisions bare-metal Linux nodes, configures OS hardening baseline policies, and bootstraps a multi-node Kubernetes cluster with automated SSL certificate renewal.",
    tags: ["Terraform", "Ansible", "Kubernetes", "Linux", "Cloud-Init"],
    githubUrl: "https://github.com/your-username/iac-homelab",
    features: [
      "Declarative bare-metal server provisioning with Terraform & Cloud-Init",
      "Idempotent Ansible playbooks for OS security hardening & sysctl tuning",
      "Automated K3s Kubernetes cluster initialization with HA control plane",
      "Cert-manager + Let's Encrypt automated TLS certificate provisioning"
    ],
    architectureOverview: "Terraform (Provisioning) -> Ansible (OS Hardening) -> K3s (Kubernetes) -> FluxCD (GitOps state synchronization)",
    challenges: "Ensuring idempotency across multiple Ansible runs on nodes with varying Linux distributions (Ubuntu vs Fedora).",
    lessonsLearned: "Modular role design in Ansible drastically simplifies cluster maintenance and package updates."
  },
  {
    id: "kubernetes-gitops-cluster",
    name: "Self-Hosted Kubernetes Homelab & GitOps",
    category: "DevOps",
    shortDescription: "Production-style self-hosted K3s Kubernetes cluster running microservices, Cilium CNI, and FluxCD GitOps automation.",
    longDescription: "A self-hosted home infrastructure lab built on K3s Kubernetes. Operates microservices with automated GitOps deployment pipelines via FluxCD, ingress routing via NGINX Ingress, and observability via Prometheus + Grafana.",
    tags: ["Kubernetes", "K3s", "FluxCD", "Helm", "Observability", "Cilium"],
    githubUrl: "https://github.com/your-username/k8s-homelab",
    liveUrl: "https://k8s-status.lab.engineering",
    features: [
      "GitOps workflow: any git push to main automatically deploys cluster state",
      "Cilium eBPF CNI for network policy enforcement and Hubble packet inspection",
      "Automated storage persistent volumes with Longhorn distributed block storage",
      "Centralized logging pipeline using Grafana Loki and Promtail agents"
    ],
    architectureOverview: "GitHub Repository -> FluxCD Operator -> K3s Nodes -> Longhorn Storage + Cilium eBPF + Loki Logging",
    challenges: "Configuring distributed Longhorn storage across heterogeneous SSD nodes with reliable disk replication.",
    lessonsLearned: "GitOps eliminates manual kubectl deployments and guarantees cluster state reproducibility."
  },
  {
    id: "linux-hardening-suite",
    name: "Automated Linux Hardening & Auditing Script",
    category: "Networking",
    shortDescription: "Modular Bash and Python automation suite enforcing CIS benchmarks, SSH security, and iptables firewall rules.",
    longDescription: "A security auditing tool designed for Linux server provisioning. Automatically audits SSH configuration, disables unnecessary kernel modules, sets up fail2ban rules, and generates audit reports.",
    tags: ["Linux", "Bash", "Python", "Security", "Systemd"],
    githubUrl: "https://github.com/your-username/linux-hardening",
    features: [
      "Automated CIS Benchmark compliance checks & remediation actions",
      "Strict SSH daemon hardening (disables root login, enforces key-only auth, tunes ciphers)",
      "Dynamic iptables/ufw rule generator for minimalist port exposure",
      "Automated security patch notification via webhook"
    ],
    architectureOverview: "Linux Host -> Hardening Script -> CIS Auditor -> Firewall Rules & Systemd Lockdowns",
    challenges: "Avoiding accidental SSH lockouts during strict iptables default drop rule application.",
    lessonsLearned: "Always test security hardening scripts inside isolated KVM or Docker containers before production application."
  }
];
