/**
 * 这只是一个环境配置文件的例子，请手动复制，并重命名为server.config.js!!!
 * 配置服务端口，以及代理
 */
const constants = require('./constants')
// 通用后台&登陆&菜单,三端同步切换，dev/test/prepub/product
const common = 'dev'
// 菜单
const menu = ''
module.exports = {
  appPort: 9008,
  proxy: {
    '/member/api/common-service': constants.loginTargets[menu || common],
  },
}
