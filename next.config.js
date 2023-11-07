/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'placehold.co', 'js-post-api.herokuapp.com']
  }
}

module.exports = nextConfig
