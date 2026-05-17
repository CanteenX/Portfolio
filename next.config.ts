import type { NextConfig } from "next";

const ADMIN_ORIGIN = process.env.ADMIN_PROXY_ORIGIN;
const API_ORIGIN = process.env.API_PROXY_ORIGIN;

const nextConfig: NextConfig = {
  async rewrites() {
    const rules: Awaited<ReturnType<NonNullable<NextConfig["rewrites"]>>> = [];

    if (ADMIN_ORIGIN) {
      rules.push(
        { source: "/admin", destination: `${ADMIN_ORIGIN}/admin` },
        { source: "/admin/:path*", destination: `${ADMIN_ORIGIN}/admin/:path*` }
      );
    }

    if (API_ORIGIN) {
      rules.push(
        { source: "/api/:path*", destination: `${API_ORIGIN}/api/:path*` },
        { source: "/uploads/:path*", destination: `${API_ORIGIN}/uploads/:path*` }
      );
    }

    return rules;
  },
};

export default nextConfig;
