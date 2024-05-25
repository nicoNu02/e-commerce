/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "u8v8yhe8bp8fkg64.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
