/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([]);

const nextConfig = {
  images: {
    domains: ["d3juy0zp6vqec8.cloudfront.net", "images.ctfassets.net"],
    deviceSizes: [
      359, 427, 480, 519, 929, 1139, 1359, 1399, 1439, 1659, 1849, 1999,
    ],
  },
  distDir: "build",
};

module.exports = withTM(nextConfig);
