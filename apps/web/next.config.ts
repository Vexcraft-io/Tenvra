import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ["@tenvra/config", "@tenvra/ui"],
};

export default nextConfig;
