import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  allowedDevOrigins: ['192.168.10.18', 'localhost:3000'],
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tips-sewa-mobil-lepas-kunci.html',
        destination: '/artikel/tips-sewa-mobil-lepas-kunci-jogja-pemula',
        permanent: true,
      },
      {
        source: '/tips-memilih-mobil-rental-keluarga.html',
        destination: '/artikel/rental-avanza-jogja-hemat-keluarga',
        permanent: true,
      },
      {
        source: '/:slug.html',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
