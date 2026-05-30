import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirects are now handled via filesystem routes for maximum reliability on Netlify
  async redirects() {
    return [
      {
        source: '/jobs/greenhouse/:role/:location',
        destination: '/jobs/:role-in-:location',
        permanent: true,
      },
      // Note: Other legacy platform structures are now handled 
      // robustly in src/app/jobs/[platform]/[role]/[location]/page.tsx
    ];
  },
};

export default nextConfig;
