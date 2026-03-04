import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/mosesmawela/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // For potential future use or placeholder flexibility
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For music player artwork
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com', // For brand logos
      },
    ],
  },
};

export default nextConfig;
