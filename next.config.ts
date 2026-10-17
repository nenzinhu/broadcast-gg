import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: origins allowed to load dev resources (HMR WebSocket, /_next/*).
  // Passed via env so machine-specific hosts (preview proxies) stay out of the
  // repository, e.g. NEXT_ALLOWED_DEV_ORIGINS=127.0.0.1,my-host.style.dev
  allowedDevOrigins: (process.env.NEXT_ALLOWED_DEV_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

export default nextConfig;