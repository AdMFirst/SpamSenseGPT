/** @type {import('next').NextConfig} */
const nextConfig = {}
const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
    dest: 'public'
})

module.exports = withPWA({
    // next.js config
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        disable: prod ? false : true,
    }
  })
