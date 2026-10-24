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
      {
        source: '/sewa-hiace-di-jogja',
        destination: '/sewa-hiace-jogja',
        permanent: true,
      },
      {
        source: '/sewa-mobil-hiace-jogja',
        destination: '/sewa-hiace-jogja',
        permanent: true,
      },
      {
        source: '/mobil/sewa-hiace-jogja-murah',
        destination: '/sewa-hiace-jogja',
        permanent: true,
      },
      {
        source: '/sewa-mobil-di-jogja-dengan-sopir',
        destination: '/sewa-mobil-jogja-dengan-sopir-murah',
        permanent: true,
      },
      {
        source: '/artikel/sewa-mobil-jogja-dengan-sopir-murah',
        destination: '/sewa-mobil-jogja-dengan-sopir-murah',
        permanent: true,
      },
      {
        source: '/sewa-mobil-dengan-sopir-murah',
        destination: '/sewa-mobil-jogja-dengan-sopir-murah',
        permanent: true,
      },
      {
        source: '/sewa-mobil-jogja-dengan-supir',
        destination: '/sewa-mobil-jogja-dengan-sopir-murah',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
