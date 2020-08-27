const withPWA = require('next-pwa')

module.exports = withPWA({
  basePath: '/yar2048',
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    subdomainPrefix: '/yar2048',
    scope: '/',
  },
})
