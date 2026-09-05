export interface StackGroup {
  category: string;
  items: Array<{
    name: string;
    level: "Core" | "Advanced" | "Proficient";
    description?: string;
  }>;
}

export const stackData: StackGroup[] = [
  {
    category: "OPERATING SYSTEMS",
    items: [
      { name: "Linux", level: "Core", description: "Kernel parameters, systemd, process management" },
      { name: "Fedora", level: "Core", description: "Daily driver workstation OS" },
      { name: "Ubuntu", level: "Core", description: "Server distribution & cloud instances" }
    ]
  },
  {
    category: "CONTAINERS",
    items: [
      { name: "Docker", level: "Core", description: "Multi-stage builds, bridge networks, compose" },
      { name: "Podman", level: "Proficient", description: "Rootless container runtime" },
      { name: "Kubernetes", level: "Advanced", description: "K3s, deployments, ingress, CNI & storage" }
    ]
  },
  {
    category: "OBSERVABILITY",
    items: [
      { name: "Prometheus", level: "Core", description: "TSDB, PromQL metrics & custom exporters" },
      { name: "Grafana", level: "Core", description: "Visual dashboarding & alerting rules" },
      { name: "Loki", level: "Advanced", description: "Log aggregation & Promtail pipeline" },
      { name: "OpenTelemetry", level: "Proficient", description: "Distributed tracing & metrics" }
    ]
  },
  {
    category: "NETWORKING",
    items: [
      { name: "NGINX", level: "Core", description: "Reverse proxy, SSL termination, load balancing" },
      { name: "HAProxy", level: "Advanced", description: "High availability TCP/HTTP load balancing" },
      { name: "DNS", level: "Core", description: "Bind9, CoreDNS, record management" },
      { name: "TCP/IP", level: "Core", description: "Packet tracing with tcpdump, sngrep, wireshark" },
      { name: "SIP", level: "Advanced", description: "VoIP signaling, trunking & response debugging" }
    ]
  },
  {
    category: "AUTOMATION",
    items: [
      { name: "Bash", level: "Core", description: "System scripting, automation, CLI tools" },
      { name: "Python", level: "Advanced", description: "Automation scripts, API integration, parsing" },
      { name: "Ansible", level: "Core", description: "Idempotent server configuration & playbooks" },
      { name: "Terraform", level: "Advanced", description: "Infrastructure as Code, state locking, modules" }
    ]
  },
  {
    category: "CI/CD",
    items: [
      { name: "GitHub Actions", level: "Core", description: "Automated test, build, and deploy workflows" },
      { name: "GitLab CI", level: "Advanced", description: "Multi-stage pipeline automation" },
      { name: "Jenkins", level: "Proficient", description: "Pipeline maintenance & agent nodes" }
    ]
  }
];
