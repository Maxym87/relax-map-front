import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
      },
      {
        protocol: "https",
        hostname: "ftp.goit.study",
      },
    ],
  },
};
export default nextConfig;
