const pluginName = 'ml-plugin';

class mlPlugin {
  constructor(option) {
    this.option = option
  }
  
  apply(compiler) {
    compiler.hooks.entryOption.tap(pluginName, (context, entry) => {
      console.log('entryOption 在处理来自webpack选项的entry配置后调用。\n')
    })
    compiler.hooks.afterPlugins.tap(pluginName, compiler => {
      console.log('afterPlugins 在设置初始内部插件集之后调用。\n')
    })
    compiler.hooks.afterResolvers.tap(pluginName, compiler => {
      console.log('afterResolvers 解析器设置完成后触发。\n')
    })
    compiler.hooks.environment.tap(pluginName, compiler => {
      console.log('environment 在初始化配置文件中的插件之后，在准备编译器环境时调用。\n')
    })
    compiler.hooks.afterEnvironment.tap(pluginName, compiler => {
      console.log('afterEnvironment environment编译器环境设置完成后，在挂钩之后立即调用。\n')
    })
    compiler.hooks.beforeRun.tap(pluginName, compiler => {
      console.log('beforeRun 在运行编译器之前添加一个挂钩。\n')
    })
    compiler.hooks.run.tap(pluginName, compiler => {
      console.log('run 开始阅读之前，请先钩住编译器records。\n')
    })
    compiler.hooks.watchRun.tap(pluginName, compiler => {
      console.log('watchRun 在触发新的编译之后但实际开始编译之前，在监视模式下执行插件。\n')
    })
    compiler.hooks.normalModuleFactory.tap(pluginName, normalModuleFactory => {
      console.log('normalModuleFactory NormalModuleFactory创建a后调用。\n')
    })
    compiler.hooks.contextModuleFactory.tap(pluginName, contextModuleFactory => {
      console.log('contextModuleFactory ContextModuleFactory创建a后运行插件。\n')
    })
    compiler.hooks.beforeCompile.tap(pluginName, compilationParams => {
      console.log('beforeCompile 创建编译参数后执行插件。\n')
    })
    compiler.hooks.compile.tap(pluginName, compilationParams => {
      console.log('compile beforeCompile在创建新编译之前，在之后立即调用。\n')
    })
    compiler.hooks.thisCompilation.tap(pluginName, (compilation, compilationParams) => {
      console.log('thisCompilation 在初始化编译时执行，恰好在发出compilation事件之前执行。\n')
    })
    compiler.hooks.compilation.tap(pluginName, (compilation, compilationParams) => {
      console.log('compilation 创建编译后运行插件。\n')
    })
    compiler.hooks.make.tap(pluginName, (compilation) => {
      console.log('make 在完成编译之前执行。\n')
    })
    compiler.hooks.afterCompile.tap(pluginName, (compilation) => {
      console.log('afterCompile 在完成并密封编译后调用。\n')
    })
    compiler.hooks.shouldEmit.tap(pluginName, (compilation) => {
      console.log('shouldEmit 在释放资产之前调用。应该返回一个布尔值，告诉是否发出。\n')
      return true
    })
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      console.log('emit 在将资产释放到输出目录之前立即执行。\n')
    })
    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      console.log('afterEmit 在将资产释放到输出目录后调用。\n')
    })
    compiler.hooks.assetEmitted.tap(pluginName, (file, info) => {
      console.log('assetEmitted 当资产被排放时执行。提供对有关发出的资产的信息的访问，例如其输出路径和字节内容。\n')
    })
    compiler.hooks.done.tap(pluginName, (stats) => {
      console.log('done 编译完成后执行。\n')
    })
    compiler.hooks.failed.tap(pluginName, (error) => {
      console.log('failed 如果编译失败则调用。\n')
    })
    compiler.hooks.invalid.tap(pluginName, (fileName, changeTime) => {
      console.log('invalid 当监视编译无效时执行。\n')
    })
    compiler.hooks.watchClose.tap(pluginName, () => {
      console.log('watchClose 监视编译停止时调用。\n')
    })
  }
}

module.exports = mlPlugin
