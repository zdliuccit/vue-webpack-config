/**
 * Created by liuzhengdong on 2017/9/22.
 * log模块，依赖winston
 */

const winston = require('winston')

module.exports = function (filename) {
  return winston.loggers.get(filename, {
    console: {
      level: 'info', // 定死这个级别，只允许使用debug,warn,error三个方法
      colorize: true,
      label: filename,
    },
  })
}
