import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Forced rebuild for Tailwind v4
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
