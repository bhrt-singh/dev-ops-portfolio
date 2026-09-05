export interface TechConcept {
  label: string;
  value: string;
}

export interface TechDetails {
  name: string;
  category: string;
  role: string;
  brandColor: string;
  status: string;
  bgNodes: string[];
  components: string[];
  concepts: TechConcept[];
  related: string[];
}

export const techMetadataMap: Record<string, TechDetails> = {
  Linux: {
    name: "Linux",
    category: "OPERATING SYSTEMS",
    role: "Kernel & Process Management Core",
    brandColor: "#FCC624",
    status: "● CORE SYSTEM DEPENDENCY",
    bgNodes: ["edge-01", "dns-01", "k8s-01"],
    components: ["systemd / init supervisor", "cgroups v2 & namespaces", "sysctl & kernel parameters", "eBPF & syslogs"],
    concepts: [
      { label: "Kernel", value: "POSIX / Linux 6.x" },
      { label: "Process", value: "Tree / Signals / IPC" },
      { label: "Memory", value: "Virtual / Swap / OOM" }
    ],
    related: ["Bash", "Fedora", "Ubuntu"]
  },
  Fedora: {
    name: "Fedora",
    category: "OPERATING SYSTEMS",
    role: "Primary Workstation OS",
    brandColor: "#51A2DA",
    status: "● ACTIVE WORKSTATION",
    bgNodes: ["ci-01", "runner-02"],
    components: ["RPM / DNF5 package engine", "SELinux security policy", "Wayland compositor", "Flatpak sandboxing"],
    concepts: [
      { label: "Upstream", value: "RHEL / CoreOS" },
      { label: "Package", value: "RPM / DNF5" },
      { label: "Security", value: "Enforcing SELinux" }
    ],
    related: ["Linux", "Podman", "Bash"]
  },
  Ubuntu: {
    name: "Ubuntu",
    category: "OPERATING SYSTEMS",
    role: "Cloud Instance & Server Distribution",
    brandColor: "#E95420",
    status: "● PRODUCTION SERVER OS",
    bgNodes: ["k8s-01", "k8s-02", "k8s-03"],
    components: ["APT / dpkg package engine", "Cloud-Init provisioning", "systemd service units", "UFW / iptables firewall"],
    concepts: [
      { label: "Release", value: "LTS 24.04 Server" },
      { label: "Cloud", value: "AWS / GCP AMIs" },
      { label: "Security", value: "AppArmor / UFW" }
    ],
    related: ["Linux", "Docker", "Ansible"]
  },
  Docker: {
    name: "Docker",
    category: "CONTAINERS",
    role: "Container Runtime & Build Tooling",
    brandColor: "#2496ED",
    status: "● ACTIVE RUNTIME",
    bgNodes: ["docker-01", "k8s-01"],
    components: ["containerd runtime engine", "Docker Daemon & REST API", "BuildKit multi-stage builder", "Docker Compose engine"],
    concepts: [
      { label: "Runtime", value: "containerd / runc" },
      { label: "Networking", value: "bridge / host / overlay" },
      { label: "Images", value: "OCI Specs / Multi-stage" }
    ],
    related: ["Podman", "Kubernetes", "Linux"]
  },
  Podman: {
    name: "Podman",
    category: "CONTAINERS",
    role: "Rootless Container Engine",
    brandColor: "#892CA0",
    status: "● PROFICIENT",
    bgNodes: ["docker-01", "runner-02"],
    components: ["conmon process monitor", "crun / OCI runtime", "Podman CLI engine", "Kube YAML play/generate"],
    concepts: [
      { label: "Daemon", value: "Daemonless / Rootless" },
      { label: "Pods", value: "Shared namespaces" },
      { label: "Compat", value: "Docker CLI Alias" }
    ],
    related: ["Docker", "Kubernetes", "Fedora"]
  },
  Kubernetes: {
    name: "Kubernetes",
    category: "CONTAINERS",
    role: "Container Orchestration Engine",
    brandColor: "#326CE5",
    status: "● ACTIVE ORCHESTRATOR",
    bgNodes: ["k8s-01", "k8s-02", "k8s-03", "prom-01", "grafana"],
    components: ["kube-apiserver", "kube-scheduler", "kube-controller-manager", "etcd / K3s control plane"],
    concepts: [
      { label: "Workloads", value: "Pods / Deployments" },
      { label: "Network", value: "CNI / Ingress / DNS" },
      { label: "Storage", value: "PV / PVC / StorageClass" }
    ],
    related: ["Docker", "Prometheus", "Terraform"]
  },
  Prometheus: {
    name: "Prometheus",
    category: "OBSERVABILITY",
    role: "Metrics & Time-Series DB",
    brandColor: "#E6522C",
    status: "● CORE METRICS TSDB",
    bgNodes: ["prom-01", "grafana", "k8s-01"],
    components: ["TSDB Storage Engine", "PromQL Query Processor", "Alertmanager dispatcher", "Node & Kube Exporters"],
    concepts: [
      { label: "Scrape", value: "Pull-based HTTP" },
      { label: "Query", value: "PromQL Range Vector" },
      { label: "Alerts", value: "Rule evaluation" }
    ],
    related: ["Grafana", "OpenTelemetry", "Kubernetes"]
  },
  Grafana: {
    name: "Grafana",
    category: "OBSERVABILITY",
    role: "Observability Dashboard Engine",
    brandColor: "#F46800",
    status: "● ACTIVE DASHBOARD",
    bgNodes: ["grafana", "prom-01", "loki"],
    components: ["Dashboard Panels", "Data Source Connectors", "Unified Alerting Engine", "Explore Logs & Traces"],
    concepts: [
      { label: "Sources", value: "Prometheus / Loki / OTel" },
      { label: "Panels", value: "Time-series / Heatmap" },
      { label: "Auth", value: "RBAC / OAuth2" }
    ],
    related: ["Prometheus", "Loki", "OpenTelemetry"]
  },
  Loki: {
    name: "Loki",
    category: "OBSERVABILITY",
    role: "Log Aggregation System",
    brandColor: "#F7B942",
    status: "● ACTIVE LOG PIPELINE",
    bgNodes: ["loki", "grafana", "k8s-02"],
    components: ["Promtail Log Collector", "Loki Ingester & Querier", "Chunk & Index Store", "LogQL Query Engine"],
    concepts: [
      { label: "Indexing", value: "Label-only indexing" },
      { label: "Query", value: "LogQL parsing" },
      { label: "Pipeline", value: "Grafana integration" }
    ],
    related: ["Grafana", "Prometheus", "Kubernetes"]
  },
  OpenTelemetry: {
    name: "OpenTelemetry",
    category: "OBSERVABILITY",
    role: "Distributed Tracing Framework",
    brandColor: "#F5A623",
    status: "● ACTIVE TRACING",
    bgNodes: ["otel", "k8s-03"],
    components: ["OTel Collector pipeline", "OTLP Protocol (gRPC/HTTP)", "Instrumentation SDKs", "Span Exporters"],
    concepts: [
      { label: "Traces", value: "Distributed Trace ID" },
      { label: "Spans", value: "Context propagation" },
      { label: "Metrics", value: "Unified telemetry" }
    ],
    related: ["Prometheus", "Loki", "Grafana"]
  },
  NGINX: {
    name: "NGINX",
    category: "NETWORKING",
    role: "Web & Reverse Proxy Engine",
    brandColor: "#009639",
    status: "● ACTIVE REVERSE PROXY",
    bgNodes: ["nginx-01", "haproxy-01", "dns-01"],
    components: ["Master & Worker processes", "HTTP Core Module", "Upstream Load Balancer", "SSL/TLS Termination"],
    concepts: [
      { label: "Proxy", value: "Reverse proxy / FastCGI" },
      { label: "Security", value: "TLS 1.3 / Rate Limiting" },
      { label: "Performance", value: "Event-driven epoll" }
    ],
    related: ["HAProxy", "DNS", "Kubernetes"]
  },
  HAProxy: {
    name: "HAProxy",
    category: "NETWORKING",
    role: "TCP/HTTP Load Balancer",
    brandColor: "#00A3E0",
    status: "● ACTIVE LOAD BALANCER",
    bgNodes: ["haproxy-01", "nginx-01", "k8s-01", "k8s-02"],
    components: ["Event-driven Engine", "Health Checking probes", "Sticky Session Store", "Stats Socket Interface"],
    concepts: [
      { label: "Balancing", value: "Layer 4 & Layer 7" },
      { label: "Reliability", value: "Hitless Reloads" },
      { label: "Algorithms", value: "Round-robin / Leastconn" }
    ],
    related: ["NGINX", "SIP", "TCP/IP"]
  },
  DNS: {
    name: "DNS",
    category: "NETWORKING",
    role: "Domain Name & Service Discovery",
    brandColor: "#38BDF8",
    status: "● CORE NETWORKING",
    bgNodes: ["dns-01", "nginx-01", "edge-01"],
    components: ["CoreDNS plugin engine", "Bind9 name server", "A/AAAA & CNAME Records", "SRV Record Resolution"],
    concepts: [
      { label: "Discovery", value: "Kube-DNS / ClusterIP" },
      { label: "Caching", value: "TTL & Recursive lookup" },
      { label: "Protocols", value: "UDP 53 / DoH / DoT" }
    ],
    related: ["NGINX", "HAProxy", "Kubernetes"]
  },
  "TCP/IP": {
    name: "TCP/IP",
    category: "NETWORKING",
    role: "Transport & Network Protocol Stack",
    brandColor: "#34D399",
    status: "● CORE PROTOCOL STACK",
    bgNodes: ["edge-01", "dns-01", "haproxy-01", "sip-gw"],
    components: ["TCP 3-Way Handshake", "IP Routing Tables", "tcpdump / wireshark capture", "Socket Layer API"],
    concepts: [
      { label: "Analysis", value: "Packet dumps / PCAP" },
      { label: "Flow", value: "Windowing / Congestion" },
      { label: "Debugging", value: "SYN-ACK / FIN-WAIT" }
    ],
    related: ["SIP", "HAProxy", "DNS"]
  },
  SIP: {
    name: "SIP",
    category: "NETWORKING",
    role: "VoIP & Session Signaling Protocol",
    brandColor: "#A855F7",
    status: "● TELECOM PROTOCOL",
    bgNodes: ["sip-gw", "haproxy-01", "k8s-01"],
    components: ["SIP Proxy / Registrar", "Kamailio / OpenSIPS", "SDP Session Negotiator", "sngrep Packet Inspector"],
    concepts: [
      { label: "Signaling", value: "INVITE / ACK / BYE" },
      { label: "Debugging", value: "sngrep / 200 OK / 503" },
      { label: "Media", value: "RTP / SRTP Traversal" }
    ],
    related: ["HAProxy", "TCP/IP", "Linux"]
  },
  Bash: {
    name: "Bash",
    category: "AUTOMATION",
    role: "Command Line Shell & Scripting",
    brandColor: "#4EAA25",
    status: "● CORE SHELL",
    bgNodes: ["ci-01", "runner-02", "k8s-01"],
    components: ["POSIX Shell Engine", "Standard I/O Streams", "grep / awk / sed text pipeline", "Job Control"],
    concepts: [
      { label: "Scripting", value: "Automation & CLI tools" },
      { label: "Parsing", value: "Regex / Text processing" },
      { label: "Environment", value: "Exports / Variables" }
    ],
    related: ["Linux", "Python", "Ansible"]
  },
  Python: {
    name: "Python",
    category: "AUTOMATION",
    role: "Automation & Integration Language",
    brandColor: "#3776AB",
    status: "● ADVANCED SCRIPTING",
    bgNodes: ["runner-02", "otel", "prom-01"],
    components: ["Python 3 Interpreter", "pip & venv package manager", "requests / httpx API client", "pyyaml & json parsers"],
    concepts: [
      { label: "Automation", value: "REST API & Cloud SDKs" },
      { label: "Tooling", value: "CLI utilities / Parsers" },
      { label: "Parsing", value: "Structured log/data processing" }
    ],
    related: ["Ansible", "Bash", "Terraform"]
  },
  Ansible: {
    name: "Ansible",
    category: "AUTOMATION",
    role: "Agentless Configuration Engine",
    brandColor: "#EE0000",
    status: "● CORE CONFIG MGMT",
    bgNodes: ["ci-01", "runner-02", "k8s-01", "k8s-02"],
    components: ["YAML Playbooks", "Inventory Manager", "Jinja2 Template Engine", "SSH / WinRM Executor"],
    concepts: [
      { label: "Idempotency", value: "State enforcement" },
      { label: "Agentless", value: "SSH-based execution" },
      { label: "Modularity", value: "Roles & Collections" }
    ],
    related: ["Terraform", "Linux", "Python"]
  },
  Terraform: {
    name: "Terraform",
    category: "AUTOMATION",
    role: "Infrastructure as Code (IaC)",
    brandColor: "#844FBA",
    status: "● ADVANCED IaC",
    bgNodes: ["tf-state", "db-01", "k8s-01"],
    components: ["HCL Engine", "State File Manager", "Cloud Provider Plugins", "Reusable Modules"],
    concepts: [
      { label: "Declarative", value: "Target State Graph" },
      { label: "Workflow", value: "init -> plan -> apply" },
      { label: "State", value: "S3 / DynamoDB Locking" }
    ],
    related: ["Ansible", "Kubernetes", "Python"]
  },
  "GitHub Actions": {
    name: "GitHub Actions",
    category: "CI/CD",
    role: "CI/CD Workflow Automation",
    brandColor: "#2088FF",
    status: "● CORE WORKFLOW",
    bgNodes: ["ci-01", "runner-02", "k8s-01"],
    components: ["YAML Workflows", "Hosted / Self-hosted Runners", "GitHub Marketplace Actions", "Encrypted Secrets Store"],
    concepts: [
      { label: "Triggers", value: "push / pr / schedule" },
      { label: "Matrix", value: "Multi-OS / Version testing" },
      { label: "Deploy", value: "K8s & Cloud automated deploy" }
    ],
    related: ["GitLab CI", "Docker", "Kubernetes"]
  },
  "GitLab CI": {
    name: "GitLab CI",
    category: "CI/CD",
    role: "Pipeline Automation System",
    brandColor: "#FC6D26",
    status: "● ADVANCED PIPELINE",
    bgNodes: ["ci-01", "runner-02", "docker-01"],
    components: ["GitLab Runner", ".gitlab-ci.yml definition", "Job Artifacts & Caching", "Environment Deployments"],
    concepts: [
      { label: "Stages", value: "Build -> Test -> Deploy" },
      { label: "Runners", value: "Docker / Kubernetes executor" },
      { label: "Variables", value: "Protected CI/CD Variables" }
    ],
    related: ["GitHub Actions", "Jenkins", "Docker"]
  },
  Jenkins: {
    name: "Jenkins",
    category: "CI/CD",
    role: "Extensible Automation Server",
    brandColor: "#D24939",
    status: "● PROFICIENT",
    bgNodes: ["ci-01", "runner-02", "k8s-02"],
    components: ["Jenkins Controller", "Agent Nodes & Executor", "Declarative Jenkinsfile", "Plugin Ecosystem"],
    concepts: [
      { label: "Pipeline", value: "Groovy DSL Pipelines" },
      { label: "Distributed", value: "Master-Agent Workers" },
      { label: "Integrations", value: "Webhook & SCM Triggers" }
    ],
    related: ["GitHub Actions", "GitLab CI", "Docker"]
  }
};
