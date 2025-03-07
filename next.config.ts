import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'akamai',
    path: ''
  },
  assetPrefix: './'
};

export default nextConfig;
