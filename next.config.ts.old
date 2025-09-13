/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'jazzentech.fr',
          },
        ],
        destination: 'https://www.jazzentech.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.jazzentech.fr',
          },
        ],
        destination: 'https://www.jazzentech.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig