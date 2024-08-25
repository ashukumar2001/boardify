/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@aws-sdk"],
  },
};

export default nextConfig;
