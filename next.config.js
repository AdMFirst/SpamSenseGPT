/** @type {import('next').NextConfig} */
const nextConfig = {}
const withPWA = require('next-pwa')({
    dest: 'public'
})

module.exports = withPWA({
    // next.js config
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true
    }
  })
