/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["imagedelivery.net"] },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
