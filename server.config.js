/**
 * 这只是一个环境配置文件的例子，请手动复制，并重命名为server.config.js!!!
 * 配置服务端口，以及代理
 */
const constants = require('./constants')
// 通用后台&登陆&菜单,三端同步切换，dev/test/prepub/product
const common = 'test'
// 菜单
const menu = ''
module.exports = {
  appPort: 9009,
  proxy: {
    '/api/member': constants.loginTargets[menu || common],
    '/api/goods': constants.loginTargets[menu || common],
    '/v3/assistant': 'http://restapi.amap.com/v3/',
  },
}
