export type Project = {
  slug: string;
  title: string;
  category: "Native Mobile" | "Web Apps" | "Backend/Cloud";
  metric: string;
  year: string;
  image: string;
  client: string;
  timeframe: string;
  role: string;
  stack: string[];
  problem: string;
  solution: string;
  roi: string[];
  features: { title: string; description: string }[];
  gallery: { src: string; caption: string }[];
  codeSnippet?: { language: string; label: string; code: string };
  architecture?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "fintech-payments",
    title: "Real-time payments rail",
    category: "Backend/Cloud",
    metric: "$2M / day processed",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    client: "Confidential — EU Fintech",
    timeframe: "14 weeks · Q1–Q2 2024",
    role: "Backend architecture, infrastructure, DevOps",
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Kafka", "AWS ECS", "Terraform", "Datadog"],
    problem:
      "The client's legacy ledger could not settle peer-to-peer transfers under 8 seconds and was failing audit on idempotency. Volume was projected to grow 4x in two quarters.",
    solution:
      "We designed an event-sourced ledger using Kafka for the write path and a CQRS read model in PostgreSQL. Idempotency keys are enforced at the API gateway and replayed deterministically. Everything runs on autoscaled ECS with blue/green deploys via Terraform.",
    roi: [
      "Settlement time reduced from 8s p95 to 320ms p95",
      "$2M+ processed daily with zero double-spends in 9 months",
      "Passed SOC 2 Type II audit on first attempt",
      "Infra cost cut 38% via right-sized autoscaling",
    ],
    features: [
      { title: "Event-sourced ledger", description: "Append-only Kafka log with deterministic replay for audit and recovery." },
      { title: "Idempotent API gateway", description: "Client-supplied keys deduplicated at the edge with Redis SETNX + TTL." },
      { title: "CQRS read models", description: "Materialized PostgreSQL projections kept in sync via consumer workers." },
      { title: "Blue/green deploys", description: "Zero-downtime releases with Terraform-managed ECS task sets." },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80", caption: "Operations dashboard — live throughput" },
      { src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80", caption: "Reconciliation report" },
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80", caption: "Latency monitoring (Datadog)" },
    ],
    codeSnippet: {
      language: "typescript",
      label: "lib/ledger/idempotency.ts",
      code: `export async function withIdempotency<T>(
  key: string,
  ttlSec: number,
  fn: () => Promise<T>,
): Promise<T> {
  const acquired = await redis.set(\`idem:\${key}\`, "1", "EX", ttlSec, "NX");
  if (!acquired) {
    const cached = await redis.get(\`idem:\${key}:result\`);
    if (cached) return JSON.parse(cached);
    throw new ConflictError("In-flight request");
  }
  const result = await fn();
  await redis.set(\`idem:\${key}:result\`, JSON.stringify(result), "EX", ttlSec);
  return result;
}`,
    },
    architecture: "Client → API Gateway (idempotency) → Kafka → Ledger writer → Postgres projections → Read API",
  },
  {
    slug: "consumer-mobile",
    title: "Cross-platform mobile app",
    category: "Native Mobile",
    metric: "100k downloads",
    year: "2024",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    client: "DTC lifestyle brand",
    timeframe: "10 weeks · Q3 2024",
    role: "Mobile engineering, design system, release ops",
    stack: ["React Native", "Expo", "TypeScript", "Reanimated 3", "Zustand", "MMKV", "Sentry", "EAS"],
    problem:
      "The brand needed a single mobile app for iOS and Android with a launch window of 10 weeks, native-feeling animations, and offline-first browsing for spotty in-store networks.",
    solution:
      "We shipped a React Native app on Expo with a custom design system, Reanimated 3 gestures, and an MMKV-backed offline cache. EAS Build + EAS Update gave us OTA hotfixes inside the launch week.",
    roi: [
      "100k downloads in the first 6 weeks",
      "4.8★ on App Store · 4.7★ on Play Store",
      "60fps maintained across 3-year-old hardware",
      "OTA updates shipped in <30 minutes",
    ],
    features: [
      { title: "60fps gesture system", description: "Reanimated 3 worklets for swipe, pinch, and parallax — never drops frames." },
      { title: "Offline-first catalog", description: "MMKV-backed local cache keeps the full catalog browsable without signal." },
      { title: "OTA hotfixes", description: "EAS Update channel lets us patch JS in minutes, not days." },
      { title: "Crash-free 99.8%", description: "Sentry instrumentation with sourcemaps on every release." },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80", caption: "Onboarding flow" },
      { src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80", caption: "Product detail with Reanimated parallax" },
      { src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80", caption: "Checkout — biometric auth" },
    ],
    codeSnippet: {
      language: "tsx",
      label: "components/ParallaxHeader.tsx",
      code: `const scroll = useSharedValue(0);
const onScroll = useAnimatedScrollHandler((e) => {
  scroll.value = e.contentOffset.y;
});
const headerStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: scroll.value * 0.5 }],
  opacity: interpolate(scroll.value, [0, 200], [1, 0]),
}));`,
    },
  },
  {
    slug: "saas-dashboard",
    title: "Multi-tenant analytics suite",
    category: "Web Apps",
    metric: "12k MAU",
    year: "2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    client: "B2B analytics startup (Series A)",
    timeframe: "16 weeks · 2024",
    role: "Full-stack product engineering",
    stack: ["React", "TanStack Query", "tRPC", "PostgreSQL", "ClickHouse", "Redis", "Vercel"],
    problem:
      "The team had outgrown a single-tenant Rails monolith. Queries timed out at 50M rows and the UI couldn't render org hierarchies above 5 levels.",
    solution:
      "We rebuilt the read path on ClickHouse for analytical queries while keeping PostgreSQL as the source of truth. The frontend uses TanStack Query with cursor pagination and virtualized tables for unbounded org trees.",
    roi: [
      "Dashboard p95 dropped from 6.2s to 410ms",
      "Supports 50M+ row datasets per tenant",
      "12k monthly active users across 340 orgs",
      "Closed Series B partly on the back of the rebuild",
    ],
    features: [
      { title: "ClickHouse query layer", description: "Sub-second aggregations across 100M+ row tenant tables." },
      { title: "Virtualized org tree", description: "Renders 10k-node hierarchies at 60fps with windowing." },
      { title: "Type-safe end-to-end", description: "tRPC keeps the contract honest from DB to component." },
      { title: "Tenant isolation", description: "Row-level security + per-tenant ClickHouse databases." },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80", caption: "Analytics overview" },
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80", caption: "Cohort explorer" },
      { src: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1600&q=80", caption: "Admin console" },
    ],
  },
  {
    slug: "logistics-api",
    title: "Logistics microservices API",
    category: "Backend/Cloud",
    metric: "8M req/day",
    year: "2023",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    client: "Pan-Asian logistics operator",
    timeframe: "20 weeks · 2023",
    role: "Backend, platform, observability",
    stack: ["Go", "gRPC", "Kubernetes", "Istio", "PostgreSQL", "Redis", "GCP", "Prometheus"],
    problem:
      "A monolithic dispatcher couldn't keep up with peak surge traffic during festival seasons. One slow downstream caused cascade failures across the fleet API.",
    solution:
      "We split the monolith into 7 Go services behind gRPC, deployed on GKE with Istio for mTLS and circuit breaking. Critical paths have explicit timeouts, retries with jitter, and bulkhead pools.",
    roi: [
      "Handles 8M requests/day with p99 < 80ms",
      "Survived 11x peak surge with zero cascade failures",
      "Deploy cadence went from weekly to ~30/day",
      "MTTR cut from 47 min to 6 min",
    ],
    features: [
      { title: "Service mesh", description: "Istio handles mTLS, retries, and circuit breaking declaratively." },
      { title: "Surge-tested", description: "Load-tested to 11x peak with k6; passed without manual scaling." },
      { title: "Observability built-in", description: "OpenTelemetry traces from edge to database." },
      { title: "Automated rollback", description: "Argo Rollouts with metric-based promotion gates." },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80", caption: "Fleet operations console" },
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80", caption: "Service mesh topology" },
    ],
  },
  {
    slug: "health-tracker",
    title: "Native iOS health tracker",
    category: "Native Mobile",
    metric: "60fps animations",
    year: "2023",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    client: "Wellness startup (seed-stage)",
    timeframe: "12 weeks · 2023",
    role: "Native iOS, HealthKit integration",
    stack: ["Swift", "SwiftUI", "HealthKit", "Core Data", "CloudKit", "Combine"],
    problem:
      "An MVP needed to ingest HealthKit data, render rich charts at 60fps, and sync across a user's devices without running their own backend.",
    solution:
      "Pure SwiftUI app with a Combine-based HealthKit pipeline. Persistence is Core Data + CloudKit so sync is free. Charts are custom Metal-backed for guaranteed frame timing.",
    roi: [
      "Shipped to TestFlight in 8 weeks, App Store in 12",
      "Steady 60fps on iPhone 11 and newer",
      "Zero backend infrastructure to operate",
    ],
    features: [
      { title: "HealthKit pipeline", description: "Combine operators normalize 14 sample types into a unified timeline." },
      { title: "CloudKit sync", description: "Cross-device sync without a custom server." },
      { title: "Metal charts", description: "Custom shader for buttery-smooth scrubbing through years of data." },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1554344728-77cf90d9ed26?auto=format&fit=crop&w=1600&q=80", caption: "Daily summary" },
      { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80", caption: "Trends view" },
    ],
  },
  {
    slug: "commerce-platform",
    title: "Headless commerce platform",
    category: "Web Apps",
    metric: "$14M GMV",
    year: "2023",
    image: "https://images.unsplash.com/photo-1556742400-b5b7c5121f5f?auto=format&fit=crop&w=1600&q=80",
    client: "Fashion DTC group (3 brands)",
    timeframe: "18 weeks · 2023",
    role: "Frontend, BFF, search, performance",
    stack: ["Next.js", "TypeScript", "Shopify Storefront API", "Algolia", "Stripe", "Vercel Edge"],
    problem:
      "Three brands shared a slow Liquid theme with a 4.2s LCP. Conversion was bleeding on mobile and merchandising changes took engineering tickets.",
    solution:
      "Headless Next.js storefronts on Vercel Edge with ISR. Algolia powers search and merchandising rules so the marketing team ships without devs. Stripe handles checkout for non-Shopify SKUs.",
    roi: [
      "$14M GMV in first 12 months across the 3 brands",
      "LCP from 4.2s to 1.1s on mobile (p75)",
      "Mobile conversion +28%",
      "Merchandising changes in <5 min, no deploy",
    ],
    features: [
      { title: "Edge-rendered storefronts", description: "Vercel Edge + ISR for sub-second TTFB globally." },
      { title: "Self-serve merchandising", description: "Algolia rules UI for the marketing team." },
      { title: "Composable checkout", description: "Stripe + Shopify hybrid for catalog flexibility." },
    ],
    gallery: [
      { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80", caption: "Brand storefront" },
      { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80", caption: "Product detail" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
