export type Member = {
  id: string;
  slug: string;
  name: string;
  role: string;
  avatar: string;
  glow: string;
  accent: string; // tailwind gradient classes
  power: string;
  bio: string;
  personal: {
    location: string;
    email: string;
    languages: string[];
  };
  skills: { name: string; level: number }[];
  education: { year: string; degree: string; school: string }[];
  experience: { period: string; role: string; company: string; desc: string }[];
  projects: { type: string; title: string; tags: string[] }[];
  certificates: { title: string }[];
  socials?: { github?: string; linkedin?: string; portfolio?: string };
};

export const TEAM: Member[] = [
  {
    id: "FC-001",
    slug: "priya-raman",
    name: "Priya Raman",
    role: "Lead Mobile Architect",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2.5&w=900&q=80",
    glow: "#34d399",
    accent: "from-emerald-400 to-cyan-400",
    power: "Obsessed with reducing mobile payload sizes and shipping 60fps animations.",
    bio: "I build mobile experiences that feel weightless. Every frame, every byte, every interaction is a deliberate choice — not an accident.",
    personal: {
      location: "Bengaluru, India",
      email: "priya@forge.collective",
      languages: ["English", "Tamil", "Hindi"],
    },
    skills: [
      { name: "React Native", level: 95 },
      { name: "Swift / iOS", level: 88 },
      { name: "Kotlin / Android", level: 82 },
      { name: "Performance Profiling", level: 92 },
      { name: "Animation Systems", level: 90 },
    ],
    education: [
      { year: "2016", degree: "B.Tech Computer Science", school: "IIT Madras" },
    ],
    experience: [
      { period: "2022 — Now", role: "Lead Mobile Architect", company: "Forge Collective", desc: "Architecting cross-platform mobile systems for fintech and health clients." },
      { period: "2019 — 2022", role: "Senior Mobile Engineer", company: "Swiggy", desc: "Owned the rider app performance overhaul. Cut cold-start by 40%." },
      { period: "2016 — 2019", role: "Mobile Engineer", company: "Flipkart", desc: "Shipped checkout flows used by 100M+ monthly users." },
    ],
    projects: [
      { type: "Fintech", title: "Vault Mobile", tags: ["React Native", "Reanimated", "Swift"] },
      { type: "Health", title: "Pulse Companion", tags: ["Kotlin", "HealthKit", "BLE"] },
    ],
    certificates: [{ title: "Apple Certified iOS Developer" }, { title: "Google Mobile Web Specialist" }],
  },
  {
    id: "FC-002",
    slug: "arjun-mehta",
    name: "Arjun Mehta",
    role: "Backend / Cloud Lead",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.5&w=900&q=80",
    glow: "#60a5fa",
    accent: "from-blue-500 to-cyan-400",
    power: "Designs distributed systems that don't fall over at peak traffic.",
    bio: "Resilience is not a feature you bolt on — it's how the system is shaped from day one. I design for the failure modes nobody wants to talk about.",
    personal: {
      location: "Pune, India",
      email: "arjun@forge.collective",
      languages: ["English", "Hindi", "Marathi"],
    },
    skills: [
      { name: "Go", level: 94 },
      { name: "Rust", level: 80 },
      { name: "AWS / GCP", level: 92 },
      { name: "Kubernetes", level: 88 },
      { name: "Postgres / Distributed DB", level: 90 },
    ],
    education: [{ year: "2014", degree: "M.S. Distributed Systems", school: "Carnegie Mellon" }],
    experience: [
      { period: "2021 — Now", role: "Backend / Cloud Lead", company: "Forge Collective", desc: "Designs the backbone for every Forge build. Multi-region by default." },
      { period: "2017 — 2021", role: "Staff Engineer", company: "Stripe", desc: "Worked on the payments orchestration layer. Five-nines or it didn't ship." },
      { period: "2014 — 2017", role: "Backend Engineer", company: "Uber", desc: "Surge pricing infra. Real-time data at city scale." },
    ],
    projects: [
      { type: "SaaS", title: "Helios Pipeline", tags: ["Go", "Kafka", "Postgres"] },
      { type: "Open Source", title: "Tessera", tags: ["Rust", "WASM", "CRDT"] },
    ],
    certificates: [{ title: "AWS Solutions Architect — Pro" }, { title: "CKA — Certified Kubernetes Admin" }],
  },
  {
    id: "FC-003",
    slug: "sana-kapoor",
    name: "Sana Kapoor",
    role: "Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2.5&w=900&q=80",
    glow: "#f472b6",
    accent: "from-pink-400 to-rose-400",
    power: "Pixel-perfect interfaces with sub-100ms interaction budgets.",
    bio: "An interface either feels right or it doesn't. There's no in-between. I sweat the milliseconds so the user never has to notice them.",
    personal: {
      location: "Mumbai, India",
      email: "sana@forge.collective",
      languages: ["English", "Hindi", "Punjabi"],
    },
    skills: [
      { name: "React / TypeScript", level: 96 },
      { name: "CSS / Animation", level: 94 },
      { name: "Design Systems", level: 90 },
      { name: "Accessibility", level: 88 },
      { name: "WebGL / Three.js", level: 75 },
    ],
    education: [{ year: "2018", degree: "B.Des Interaction Design", school: "NID Ahmedabad" }],
    experience: [
      { period: "2022 — Now", role: "Frontend Engineer", company: "Forge Collective", desc: "Owns the frontend craft bar across every client engagement." },
      { period: "2020 — 2022", role: "Product Engineer", company: "Linear", desc: "Shipped the keyboard-first command UX." },
      { period: "2018 — 2020", role: "UI Engineer", company: "Razorpay", desc: "Checkout interface across 9 languages." },
    ],
    projects: [
      { type: "Design System", title: "Forge UI", tags: ["React", "Radix", "CSS"] },
      { type: "Marketing", title: "Helios Site", tags: ["Next.js", "Framer Motion"] },
    ],
    certificates: [{ title: "IAAP Web Accessibility Specialist" }],
  },
  {
    id: "FC-004",
    slug: "devon-hayes",
    name: "Devon Hayes",
    role: "Full-Stack Engineer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2.5&w=900&q=80",
    glow: "#fbbf24",
    accent: "from-amber-400 to-orange-500",
    power: "Ships end-to-end features faster than most teams ship a PR.",
    bio: "I don't believe in handoffs. The same brain that designs the schema should ship the UI. That's how you keep the loop tight.",
    personal: {
      location: "Austin, USA",
      email: "devon@forge.collective",
      languages: ["English", "Spanish"],
    },
    skills: [
      { name: "TypeScript", level: 94 },
      { name: "Node.js", level: 92 },
      { name: "Postgres", level: 88 },
      { name: "React", level: 90 },
      { name: "Product Sense", level: 85 },
    ],
    education: [{ year: "2017", degree: "B.S. Computer Science", school: "UT Austin" }],
    experience: [
      { period: "2023 — Now", role: "Full-Stack Engineer", company: "Forge Collective", desc: "End-to-end ownership of client features. Schema to pixel." },
      { period: "2020 — 2023", role: "Founding Engineer", company: "Notion (early)", desc: "Built core block editor primitives." },
      { period: "2017 — 2020", role: "Software Engineer", company: "Atlassian", desc: "Jira automation engine." },
    ],
    projects: [
      { type: "SaaS", title: "Atlas CRM", tags: ["Next.js", "tRPC", "Postgres"] },
      { type: "Internal Tools", title: "Forge Ops Console", tags: ["React", "Node", "Redis"] },
    ],
    certificates: [{ title: "MongoDB Certified Developer" }],
  },
  {
    id: "FC-005",
    slug: "mei-lin",
    name: "Mei Lin",
    role: "Platform / DevOps",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2.5&w=900&q=80",
    glow: "#a78bfa",
    accent: "from-violet-400 to-fuchsia-500",
    power: "Zero-downtime deploys and incident response that reads like a playbook.",
    bio: "A good platform team is invisible — until something breaks, and then it's the reason nothing actually broke for the user.",
    personal: {
      location: "Singapore",
      email: "mei@forge.collective",
      languages: ["English", "Mandarin"],
    },
    skills: [
      { name: "Terraform", level: 92 },
      { name: "Kubernetes", level: 90 },
      { name: "Observability (OTel)", level: 88 },
      { name: "CI/CD Pipelines", level: 94 },
      { name: "Incident Response", level: 90 },
    ],
    education: [{ year: "2015", degree: "B.Eng Computer Engineering", school: "NUS Singapore" }],
    experience: [
      { period: "2022 — Now", role: "Platform Lead", company: "Forge Collective", desc: "Production hardening across all client deployments." },
      { period: "2018 — 2022", role: "SRE", company: "Shopify", desc: "Black Friday on-call. No outages on her watch." },
      { period: "2015 — 2018", role: "DevOps Engineer", company: "Grab", desc: "Built the regional CI platform from scratch." },
    ],
    projects: [
      { type: "Platform", title: "Forge Deploy", tags: ["Terraform", "K8s", "ArgoCD"] },
      { type: "Tooling", title: "Trace Lens", tags: ["OpenTelemetry", "Grafana"] },
    ],
    certificates: [{ title: "HashiCorp Certified Terraform Associate" }, { title: "CKA — Certified Kubernetes Admin" }],
  },
  {
    id: "FC-006",
    slug: "jonas-becker",
    name: "Jonas Becker",
    role: "Product Engineer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2.5&w=900&q=80",
    glow: "#22d3ee",
    accent: "from-cyan-400 to-teal-400",
    power: "Translates fuzzy product specs into shipping software.",
    bio: "Specs lie. Users don't. I'd rather ship a rough thing today and learn from it than ship a perfect thing in three months that nobody asked for.",
    personal: {
      location: "Berlin, Germany",
      email: "jonas@forge.collective",
      languages: ["English", "German"],
    },
    skills: [
      { name: "Product Discovery", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "React", level: 90 },
      { name: "User Research", level: 84 },
      { name: "Prototyping", level: 92 },
    ],
    education: [{ year: "2016", degree: "M.Sc HCI", school: "TU Berlin" }],
    experience: [
      { period: "2023 — Now", role: "Product Engineer", company: "Forge Collective", desc: "Embeds with clients to turn ambiguous goals into shipped product." },
      { period: "2019 — 2023", role: "Product Engineer", company: "Figma", desc: "Worked on FigJam early surfaces." },
      { period: "2016 — 2019", role: "Frontend Engineer", company: "SoundCloud", desc: "Creator analytics." },
    ],
    projects: [
      { type: "Product Discovery", title: "Helios MVP", tags: ["React", "Postgres", "Mixpanel"] },
      { type: "Internal", title: "Forge Insights", tags: ["TypeScript", "DuckDB"] },
    ],
    certificates: [{ title: "Reforge — Product Strategy" }],
  },
];

export function getMember(slug: string): Member | undefined {
  return TEAM.find((m) => m.slug === slug);
}

export function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export function personnelRef(id: string): string {
  return `// PERSONNEL_REF :: ${id.toUpperCase()}`;
}
