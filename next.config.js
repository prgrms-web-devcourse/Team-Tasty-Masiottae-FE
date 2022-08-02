/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['user-images.githubusercontent.com']
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `http://13.125.177.126:8080/:path*`
      }
    ]
  }
}

module.exports = nextConfig
