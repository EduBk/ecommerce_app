/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // This tells Next.js that your pages are in src/app instead of pages/
  experimental: {
    appDir: true
  }
}

export default nextConfig
