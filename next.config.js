/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "rb.gy" },
      { hostname: "cdn.sanity.io" },
      { hostname: "gravatar.com" },
      { hostname: "www.gravatar.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
