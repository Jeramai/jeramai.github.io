/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  images: {
    unoptimized: true,
    loader: 'akamai',
    path: '',
  },
  assetPrefix: './',
};
