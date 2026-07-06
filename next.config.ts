import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
