import 'babel-polyfill'
import path from 'path'
import webpack from 'webpack'
import memoryfs from 'memory-fs'

function resolve(dir) {
  return path.resolve(process.cwd(), dir)
}

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.txt$/,
        use: {
          loader: resolve('loaders/ml-loader.js'),
          options: {
            name: 'Alice'
          }
        }
      }]
    }
  })
  compiler.outputFileSystem = new memoryfs()
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      resolve(stats)
    })
  })
}
