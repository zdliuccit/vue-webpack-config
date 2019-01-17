module.exports = {
  apps: [{
    name: 'ml-app', // app名称
    script: 'config/index.js', // 要运行的脚本的路径。
    args: '', // 由传递给脚本的参数组成的字符串或字符串数​​组。
    output: './log/out.log',
    error: './log/error.log',
    log: './log/combined.outerr.log',
    merge_logs: true, // 集群的所有实例的日志文件合并
    log_date_format: "DD-MM-YYYY",
    instances: 4, // 进程数 1、数字 2、'max'根据cpu内核数
    max_memory_restart: '1G', // 当内存超过1024M时自动重启
    watching: true,
    env_test: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
}
