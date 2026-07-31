import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/jobs/:platform(greenhouse|lever|ashby|workday|smartrecruiters|bamboohr|jazzhr|breezy|icims|jobvite|recruiterbox|workable)/:role/:location',
        destination: '/jobs/:role-in-:location',
        permanent: true,
      },
      {
        source: '/jobs/platform/:platform(greenhouse|lever|ashby|workday|smartrecruiters|bamboohr|jazzhr|breezy|icims|jobvite|recruiterbox|workable)/:role/:location',
        destination: '/jobs/:role-in-:location',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

