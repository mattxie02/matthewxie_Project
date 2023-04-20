/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LOTR_TOKEN: process.env.LOTR_TOKEN
  }
}

module.exports = nextConfig
