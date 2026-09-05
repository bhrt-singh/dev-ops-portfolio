export interface Profile {
  name: string;
  handle: string;
  role: string;
  heroHeadline: string;
  heroHighlight: string;
  subRole: string;
  bio: string;
  status: string;
  uptime: string;
  philosophyQuote: string;
  philosophyText: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    resume: string;
  };
  currentFocus: Array<{
    name: string;
    category: string;
    iconName: string;
    description: string;
  }>;
}

export const profileData: Profile = {
  name: "BHARAT SINGH",
  handle: "bharat@lab",
  role: "DevOps Engineer",
  heroHeadline: "Building systems.",
  heroHighlight: "Learning every day.",
  subRole: "DevOps Engineer • Infrastructure • Automation • Observability",
  bio: "I build, automate, monitor and troubleshoot reliable infrastructure. This is where I document what I learn, build and discover every day.",
  status: "LEARNING_EVERY_DAY",
  uptime: "continuously building",
  philosophyQuote: "Build it. Break it. Understand it. Automate it. Document it.",
  philosophyText: "I believe the best way to learn infrastructure is to build it, break it, understand why it broke, and document the fix.",
  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-profile",
    email: "bharat@lab.engineering",
    resume: "#resume"
  },
  currentFocus: [
    { name: "Linux", category: "OS & Kernel", iconName: "Terminal", description: "Kernel tuning, systemd, storage & process tracing" },
    { name: "Docker", category: "Containerization", iconName: "Box", description: "Multi-stage builds, bridge networking & security" },
    { name: "Kubernetes", category: "Orchestration", iconName: "Server", description: "Cluster deployment, CNI, ingress & workloads" },
    { name: "Observability", category: "Monitoring", iconName: "Activity", description: "Prometheus, Grafana dashboarding & Loki logs" },
    { name: "Networking", category: "Protocols", iconName: "Network", description: "DNS, TCP/IP, iptables, routing & HAProxy" },
    { name: "SIP", category: "VoIP Infrastructure", iconName: "PhoneCall", description: "Session Initiation Protocol & call telemetry" },
    { name: "Automation", category: "IaC & Scripting", iconName: "Cpu", description: "Bash, Python, Ansible & Terraform" },
    { name: "Cloud", category: "Platform", iconName: "Cloud", description: "AWS fundamentals, cloud-init & hybrid infrastructure" }
  ]
};
