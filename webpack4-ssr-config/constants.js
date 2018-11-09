/**
 *
 */
module.exports = {
  proxy: {
    '/api': 'http://10.200.92.98:7001',
    // '/api': 'http://192.168.199.177:7001',
  },
  prodProxy: {
    '/api': 'http://172.16.119.198:7001',
  }
}
