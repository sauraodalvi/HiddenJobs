import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/jobs/:platform(greenhouse|lever|ashby|workday|smartrecruiters)/:role/:location',
        destination: '/jobs/platform/:platform/:role/:location',
      },
    ];
  },
};

export default nextConfig;
