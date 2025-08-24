/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    SECRET_KEY: process.env.SECRET_KEY,
  },
  images: {
    domains: ["lebabies-public-development.s3.ap-southeast-3.amazonaws.com", "/icons/*", "lebabies-public-production.s3.ap-southeast-3.amazonaws.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false
};

module.exports = nextConfig;
