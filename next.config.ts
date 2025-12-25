import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'standalone',
   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default nextConfig;
