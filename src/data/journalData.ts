export interface JournalArticle {
  id: string;
  title: string;
  date: string;
  summary: string;
  readTime: string;
  tags: string[];
  isTodayILearned?: boolean;
  content: {
    whatHappened: string;
    investigation: string;
    rootCause: string;
    solution: string;
    commands: string[];
    whatILearned: string;
    nextSteps: string;
  };
}

export const journalArticlesData: JournalArticle[] = [
  {
    id: "debugging-docker-network-connectivity",
    title: "Debugging Docker Network Connectivity & Container Isolation",
    date: "September 04, 2026",
    readTime: "5 min read",
    tags: ["docker", "networking", "linux"],
    isTodayILearned: true,
    summary: "Today I learned how Docker bridge networking works under the hood and how I diagnosed container-to-container communication problems across custom subnets.",
    content: {
      whatHappened: "A newly deployed Prometheus monitoring container inside a custom bridge network failed to resolve or ping an NGINX reverse proxy running on the same host system.",
      investigation: "Checked container status using `docker ps`. Confirmed both containers were running. However, running `docker exec -it prometheus ping nginx` returned request timeout errors. I verified iptables rules on the host and noticed conflicting FORWARD chain drop policies.",
      rootCause: "Docker assigns separate veth pairs to containers. When a custom bridge network is created without explicitly specifying IP isolation, iptables daemon rules managed by Docker can clash with existing host firewall (`ufw` / `iptables-nft`) rules, preventing inter-bridge FORWARD packets.",
      solution: "Updated Docker's daemon configuration (`/etc/docker/daemon.json`) to preserve iptables FORWARD rules and recreated the user-defined bridge network with explicit subnet routing and `--opt com.docker.network.bridge.enable_icc=true`.",
      commands: [
        "$ docker network ls",
        "$ docker inspect bridge_app_net",
        "$ sudo iptables -L FORWARD -v -n --line-numbers",
        "$ ss -lntup | grep 9090",
        "$ docker exec -it app_prometheus traceroute nginx_proxy"
      ],
      whatILearned: "Containers on custom bridge networks get isolated iptables chains (`DOCKER-USER` and `FORWARD`). Always inspect host iptables chains and check Docker daemon iptables integration when containers fail to communicate over virtual bridges.",
      nextSteps: "Investigate eBPF-based container networking with Cilium to bypass traditional iptables overhead for high-concurrency packet inspection."
    }
  },
  {
    id: "prometheus-sip-monitoring-telemetry",
    title: "Building Custom Prometheus Exporters for SIP VoIP Telemetry",
    date: "August 28, 2026",
    readTime: "7 min read",
    tags: ["observability", "sip", "prometheus", "linux"],
    isTodayILearned: false,
    summary: "How I created a Go-based SIP OPTIONS exporter to monitor VoIP trunk availability, response latency distributions, and packet loss in real time.",
    content: {
      whatHappened: "VoIP gateways occasionally dropped calls without triggering standard ping alerts because ICMP echo requests were succeeding while SIP port 5060 UDP packets were silently delayed or throttled.",
      investigation: "Captured SIP packet traces using `tcpdump` and `sngrep`. Analyzed SIP 200 OK response times under peak call volume. Standard HTTP health checks were insufficient for protocol-level SIP handshake timing.",
      rootCause: "Network routers were prioritizing web traffic over UDP port 5060 during burst periods, causing SIP message retransmissions and call setup timeouts.",
      solution: "Wrote a Prometheus exporter in Go that transmits synthetic `SIP OPTIONS` pings every 15 seconds, parses the `200 OK` header timestamp, and calculates histogram buckets for call setup latency.",
      commands: [
        "$ sngrep -d eth0 port 5060",
        "$ tcpdump -i eth0 -nn -s0 -v port 5060 -w sip_capture.pcap",
        "$ ./sip_exporter --sip.target=192.168.1.100:5060 --web.listen-address=:9115",
        "$ curl -s http://localhost:9115/metrics | grep sip_response_seconds"
      ],
      whatILearned: "Protocol-specific active probing is vastly superior to generic ICMP pinging for real-time media and signaling infrastructure monitoring.",
      nextSteps: "Add Grafana alert rules with dynamic thresholds based on 95th percentile latency anomalies."
    }
  },
  {
    id: "k8s-homelab-cilium-ebpf-migration",
    title: "Migrating Kubernetes Homelab from Flannel to Cilium eBPF",
    date: "August 15, 2026",
    readTime: "8 min read",
    tags: ["kubernetes", "observability", "networking", "linux"],
    isTodayILearned: false,
    summary: "Replacing legacy Flannel CNI with Cilium in a bare-metal K3s homelab cluster to unlock eBPF kernel packet filtering and Hubble network topology visualizer.",
    content: {
      whatHappened: "Wanted granular layer-7 network policies and low-overhead observability in my 3-node bare-metal home lab without running resource-heavy sidecars.",
      investigation: "Tested Cilium CLI in strict eBPF replacement mode (`kube-proxy-replacement=true`) on a test node. Evaluated kernel version compatibility (`linux 6.6.x LTS`).",
      rootCause: "Legacy kube-proxy relies on thousands of iptables rules, scaling poorly as pod density increases.",
      solution: "Uninstalled Flannel CNI, disabled `kube-proxy` in K3s flags, and deployed Cilium via Helm chart with eBPF host routing enabled.",
      commands: [
        "$ helm repo add cilium https://helm.cilium.io/",
        "$ cilium install --version 1.15.0 --set kubeProxyReplacement=true",
        "$ cilium status --wait",
        "$ hubble observe --follow --namespace default"
      ],
      whatILearned: "eBPF bypasses host network stack bottlenecks entirely, yielding 25% lower pod-to-pod latency and instantaneous packet tracing with Hubble.",
      nextSteps: "Configure WireGuard transparent encryption between cluster nodes for secure inter-node pod communications."
    }
  },
  {
    id: "terraform-state-locking-workflow",
    title: "Terraform State Locking & Production IaC Architecture",
    date: "August 02, 2026",
    readTime: "4 min read",
    tags: ["automation", "terraform", "cloud", "devops"],
    isTodayILearned: false,
    summary: "Designing automated Terraform state locking pipelines with remote S3 backends and DynamoDB lock tables for team concurrency.",
    content: {
      whatHappened: "Concurrent CI runs created race conditions when modifying cloud network security groups, risking state file corruption.",
      investigation: "Reviewed local `.tfstate` files and verified missing state locking configurations in backend blocks.",
      rootCause: "Without distributed state locking, two parallel execution runners can overwrite state metadata simultaneously.",
      solution: "Architected a reusable Terraform backend module configuring AES-256 encrypted S3 storage with DynamoDB state locking.",
      commands: [
        "$ terraform init -backend-config=backend.hcl",
        "$ terraform plan -out=tfplan",
        "$ terraform force-unlock <LOCK-ID>"
      ],
      whatILearned: "Never run production Infrastructure as Code without strict backend remote locking and automated state snapshot backups.",
      nextSteps: "Integrate Terraform Sentinel / OPA policy checks into GitHub Actions pipeline."
    }
  },
  {
    id: "nginx-performance-tuning-high-concurrency",
    title: "Tuning NGINX Keepalive & Upstream Buffers under Load",
    date: "July 21, 2026",
    readTime: "6 min read",
    tags: ["linux", "networking", "nginx", "devops"],
    isTodayILearned: false,
    summary: "Solving upstream connection pool exhaustion and tweaking sysctl net.core parameters for high-throughput web proxies.",
    content: {
      whatHappened: "NGINX proxy threw intermittent `502 Bad Gateway` and `110: Connection timed out` under 5,000 requests/sec load test.",
      investigation: "Analyzed `/var/log/nginx/error.log` and host socket states using `ss -s`. Found thousands of sockets stuck in `TIME_WAIT` status.",
      rootCause: "Default NGINX upstream configuration created a new TCP handshake for every incoming request instead of re-using persistent keepalive sockets.",
      solution: "Added `keepalive 64;` in upstream block, enabled `proxy_http_version 1.1;`, and tuned Linux kernel `net.ipv4.tcp_tw_reuse = 1`.",
      commands: [
        "$ ss -ant | grep TIME_WAIT | wc -l",
        "$ sysctl net.ipv4.tcp_tw_reuse",
        "$ nginx -t",
        "$ sudo systemctl reload nginx"
      ],
      whatILearned: "Upstream keepalive connections drastically reduce TCP handshake CPU overhead and socket exhaustion on high-traffic reverse proxies.",
      nextSteps: "Benchmark HTTP/3 QUIC support in NGINX mainline builds."
    }
  }
];
