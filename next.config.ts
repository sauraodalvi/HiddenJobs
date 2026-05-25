import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/jobs/greenhouse/:role/:location',
        destination: '/jobs/:role-in-:location',
        permanent: true,
      },
      {
        source: '/jobs/lever/:role/:location',
        destination: '/jobs/:role-in-:location',
        permanent: true,
      },
      {
        source: '/jobs/ashby/:role/:location',
        destination: '/jobs/:role-in-:location',
        permanent: true,
      },
      {
        source: '/jobs/workday/:role/:location',
        destination: '/jobs/:role-in-:location',
        permanent: true,
      },
      {
        source: '/jobs/smartrecruiters/:role/:location',
        destination: '/jobs/:role-in-:location',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
