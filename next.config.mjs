/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets.coingecko.com", "raw.githubusercontent.com"], // ✅ Add more domains here if needed
  },
}

export default nextConfig
