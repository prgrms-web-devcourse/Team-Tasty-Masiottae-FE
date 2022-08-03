/** @type {import('next').NextConfig} */

const API_KEY = process.env.NEXT_PUBLIC_API_URL

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['user-images.githubusercontent.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_KEY}/:path*`
      }
    ]
  }
}

module.exports = nextConfig
