/** @type {import('next').NextConfig} */

// const { useSelector } = require('react-redux');

// const homePageReduxData = useSelector(state => state.homePagedata);

module.exports = {
  images: {
    domains: ["d3juy0zp6vqec8.cloudfront.net"],
  },
  distDir: "build",
  async redirects() {
    return [
      {
        source: "/user_sign_up/:path*",
        destination: "/login/:path*",
        permanent: true,
      },
      {
        source: "/:city/rent-electronics/:path*",
        destination: "/:city/home-appliances-rental/:path*",
        permanent: true,
      },
      {
        source: "/:city/living-room-furniture/:path*",
        destination: "/:city/living-room-furniture-on-rent/:path*",
        permanent: true,
      },
      {
        source: "/:city/storage-on-rent/:path*",
        destination: "/:city/home-furniture-rental/:path*",
        permanent: true,
      },
      {
        source: "/:city/bedroom-furniture/:path*",
        destination: "/:city/bedroom-furniture-on-rent/:path*",
        permanent: true,
      },
      {
        source: "/:city/dining-room-furniture/:path*",
        destination: "/:city/dining-furniture-on-rent/:path*",
        permanent: true,
      },
      {
        source: "/:city/office-furniture/:path*",
        destination: "/:city/office-furniture-rental/:path*",
        permanent: true,
      },
      {
        source: "/shopby/:category/:path*",
        destination: `/bangalore/:category/:path*?viaShopBy=true`,
        permanent: true,
      },
    ];
  },
};

// module.exports = nextConfig;
