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
      // --- REDIRECTS FOR LEGACY URLS (WITHOUT "MOBIL") TO CANONICAL URLS ---
      {
        source: '/sewa-brio-jogja',
        destination: '/sewa-mobil-brio-jogja',
        permanent: true,
      },
      {
        source: '/sewa-avanza-jogja',
        destination: '/sewa-mobil-avanza-jogja',
        permanent: true,
      },
      {
        source: '/sewa-alphard-jogja',
        destination: '/sewa-mobil-alphard-jogja',
        permanent: true,
      },
      {
        source: '/sewa-alphard-facelift-jogja',
        destination: '/sewa-mobil-alphard-facelift-jogja',
        permanent: true,
      },
      {
        source: '/sewa-hiace-premio-jogja',
        destination: '/sewa-mobil-hiace-premio-jogja',
        permanent: true,
      },
      {
        source: '/sewa-hiace-commuter-jogja',
        destination: '/sewa-mobil-hiace-commuter-jogja',
        permanent: true,
      },
      {
        source: '/sewa-fortuner-jogja',
        destination: '/sewa-mobil-fortuner-jogja',
        permanent: true,
      },
      {
        source: '/sewa-pajero-jogja',
        destination: '/sewa-mobil-pajero-jogja',
        permanent: true,
      },
      {
        source: '/sewa-elf-jogja',
        destination: '/sewa-mobil-elf-jogja',
        permanent: true,
      },
      {
        source: '/sewa-inova-reborn-jogja',
        destination: '/sewa-mobil-inova-reborn-jogja',
        permanent: true,
      },
      {
        source: '/sewa-inova-zenix-jogja',
        destination: '/sewa-mobil-inova-zenix-jogja',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
