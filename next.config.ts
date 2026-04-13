import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve("crypto-browserify"),
    };
    return config;
  },
};
export default nextConfig;
