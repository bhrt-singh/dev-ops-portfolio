export interface Milestone {
  year: string;
  title: string;
  skills: string[];
  description: string;
  keyProjects: string[];
  highlight?: boolean;
}

export const journeyData: Milestone[] = [
  {
    year: "2024",
    title: "Linux Foundations & Networking Essentials",
    skills: ["Linux Admin", "Networking", "Bash Scripting", "SIP Telemetry"],
    description: "Deep dive into Linux kernel fundamentals, systemd service management, storage partitioning, TCP/IP networking, and writing automated Bash scripts for system maintenance. Built initial VoIP SIP trunk troubleshooting utilities.",
    keyProjects: ["Automated Linux Hardening Script", "VoIP SIP Packet Analyzer"]
  },
  {
    year: "2025",
    title: "Containerization & Infrastructure Automation",
    skills: ["Docker", "Ansible", "Terraform", "CI/CD Pipelines"],
    description: "Mastered containerization with Docker and container orchestration principles. Built multi-stage CI/CD pipelines using GitHub Actions and automated host server provisioning using Ansible playbooks and Terraform IaC state locking.",
    keyProjects: ["Infrastructure as Code Homelab", "Multi-stage GitHub Actions CI/CD"]
  },
  {
    year: "2026",
    title: "Observability & Kubernetes Homelab",
    skills: ["Kubernetes", "Prometheus", "Grafana", "Cilium eBPF", "GitOps"],
    description: "Built a self-hosted multi-node Kubernetes (K3s) homelab cluster with FluxCD GitOps. Integrated eBPF networking with Cilium, and deployed end-to-end observability stacks using Prometheus, Grafana, and Loki.",
    keyProjects: ["SIP Monitoring & Telemetry Stack", "Kubernetes GitOps Homelab"],
    highlight: true
  },
  {
    year: "NEXT",
    title: "Cloud Architecture & Platform Engineering",
    skills: ["Multi-cloud (AWS/GCP)", "Platform Engineering", "Infrastructure Security"],
    description: "Expanding into enterprise multi-cloud architectures, internal developer platforms (IDP), zero-trust security policies, and high-availability cloud-native infrastructure engineering.",
    keyProjects: ["Zero-Trust Microservices Mesh", "Automated Cloud Platform CLI"]
  }
];
