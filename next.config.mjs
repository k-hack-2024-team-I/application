/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hfokuhoievsxeyuxtzkv.supabase.co',
        pathname: '/storage/v1/object/sign/thumbnails/*',
      },
    ],
  },
}

export default nextConfig
