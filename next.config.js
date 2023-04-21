/** @type {import('next').NextConfig} */
// next.config.js
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? '/jeram.ai/' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,

}
