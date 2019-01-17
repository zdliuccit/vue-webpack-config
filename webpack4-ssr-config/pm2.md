# pm2

#### 安装

```npm
npm install pm2 -g // sudo
```

#### 1、常用命令

* pm2  start app.js                   # 启动，守护进程。自动重启应用程序，加环境变量，比如配置 env_pro  --> 加 --env pro
* pm restart                                # 重启
* pm2 stop                                  # 停止 参数 = id|name|all|json|stdin
* pm2 delete| del                      # 删除  参数 = name|id|script|all|json|stdin

#### 2、集群模式

* pm2 start app.js  -i 4               # 参数 = 数字|max    在集群模式下，启动4个应用程序实例 同时，将网络请求，负载均衡到每个应用实例

*  pm2 reload all                         # 0秒重启所有应用 

  pm2 scale appName 10         # 将应用进程调整到10

*  pm2 reset appName              # 重置所有计数器

#### 3、 进程监控

* pm2 list|ls                               # 列出所有用PM2启动的进程
* pm2 monit                              # 显示每个应用占用的cpu和内存
* pm2 show appName or id   # 显示某个进程的所有信息

#### 4、日志管理

* pm2 logs                          # 显示所有应用的日志  

* pm2 logs appName       # 显示某个应用的日志 

* pm2 logs --json               # json化日志 

* pm2 flush                        #  刷新日志

* pm2 reloadLogs             # 重新加载所有日志

#### 5、启动／引导管理 

* pm2 startup                    # 检测init系统，在启动时生成和配置pm2
* pm2 save                         # 保存当前进程列表
* pm2 resurrect                 # 恢复以前保存的进程。
* pm2 unstartup               # 停用和删除启动系统
* pm2 update                    # 保存进程，终止PM2并恢复进程
* pm2 generate                 # 生成样本json配置文件。

#### 6、部署

* pm2 deploy app.json prod setup       # 设置“生产环境”远程服务器。
* pm2 deploy app.json prod                  # 更新“生产环境”远程服务器。 
* pm2 deploy app.json prod revert 2   # 将“生产环境”远程服务器恢复2。

#### 7、模块系统

* pm2 module:generate [name]    # 生成名称为[name]的示例模块。
* pm2 install pm2-logrotate           # 安装模块（这里是日志循环系统）。
* pm2 uninstall pm2-logrotate      # 卸载模块。
* pm2 publish                                  # 增量版本，git push和npm发布。



options具有以下选项的对象（这些选项的其他说明在此处）：

- `name` - 可用于在其他命令中稍后与进程交互（例如，重新启动）的任意名称。默认为脚本名称，不带其扩展名（例如`"testScript"`for `"testScript.js"`）。
- `script` - 要运行的脚本的路径。
- `args` - 由传递给脚本的参数组成的字符串或字符串数组。
- `interpreterArgs` - 由调用解释器进程的参数组成的字符串或字符串数组。例如“-harmony”或[“-harmony”，“ - debug”]。仅适用`interpreter`于“none”以外的其他内容（默认情况下为“节点”）。
- `cwd` - 用于启动进程的工作目录。
- `output`- （默认值`"~/.pm2/logs/app_name-out.log"`:)将stdout输出追加到的文件的路径。可以是同一个文件`error`。
- `error`- （默认值`"~/.pm2/logs/app_name-error.err"`:)将stderr输出附加到的文件的路径。可以是同一个文件`output`。
- `logDateFormat` - 日志时间戳的显示格式（例如“YYYY-MM-DD HH：mm Z”）。格式是[时刻显示格式](http://momentjs.com/docs/#/displaying/)。
- `pid`- （默认值`"~/.pm2/pids/app_name-id.pid"`:)用于写入已启动进程的pid的文件的路径。该文件将被覆盖。请注意，pm2不会以任何方式使用该文件，因此用户可以随时自由操作或删除该文件。当进程停止或守护程序被终止时，将删除该文件。
- `minUptime` - 脚本在成功启动之前的最短正常运行时间。
- `maxRestarts`- 如果脚本以小于的速率退出，则将重新启动脚本的最大行数`min_uptime`。
- `maxMemoryRestart`- 如果设置和`script`内存使用量与配置的数量有关，则pm2重新启动`script`。使用人性化的后缀：'K'表示千字节，“M”表示兆字节，“G”表示千兆字节等。例如“150M”。
- killTimeout`- （默认值：）`1600`在`stop`或`restart`命令发出`SIGINT`信号以强制使用`SIGKILL`信号终止脚本之后等待的毫秒数。
- `restartDelay`- （默认值`0`:)重新启动已退出的脚本之前等待的毫秒数。
- `interpreter`- （默认值`'node'`:)脚本的解释器（例如“python”，“ruby”，“bash”等）。值“none”将执行“脚本”作为二进制可执行文件。
- `execMode`- （默认值:) `'fork'`如果设置为'cluster'，将启用群集（运行多个实例`script`）。[在这里看到更多的细节](http://pm2.keymetrics.io/docs/usage/cluster-mode/)。
- `instances`- （*默认值1* :) `script`要创建的实例数。仅与`exec_mode`'集群' 相关。
- `mergeLogs`- （默认值`false`:)如果为true，则将所有实例的日志文件合并`script`为一个stderr日志和一个stdout日志。仅适用于“群集”模式。例如，如果您通过pm2启动了4个'test.js'实例，通常会有4个stdout日志文件和4个stderr日志文件，但是如果将此选项设置为true，则只有一个stdout文件和一个stderr文件。
- `watch`- 如果设置为`true`，则在更改`script`文件时将重新启动应用程序。
- `force`（默认值`false`:)默认情况下，pm2仅在该脚本尚未运行时才启动脚本（脚本是应用程序的路径，而不是已运行的应用程序的名称）。如果`force`设置为true，则pm2将启动该脚本的新实例。
- `autorestart`（默认`true`）。如果`false`，pm2 在成功完成或进程失败后将*不会*尝试重新启动它。
- `cron`
- `executeCommand`
- `write`
- `sourceMapSupport`
- `disableSourceMapSupport`





































