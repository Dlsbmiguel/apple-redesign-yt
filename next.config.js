/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "rb.gy",
      "cdn.sanity.io",
      "gravatar.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
