import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.pokemondb.net', // หรือ hostname อื่นที่ได้จาก API
      },
    ],
  },
};

export default nextConfig;
