const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')
const fs = require('fs')
const path = require('path')
const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
}
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const callback = this.async()
  const msPath = path.resolve('loaders/ms.js')
  
  this.addDependency(msPath)
  console.log('options', options)
  validateOptions(schema, options, 'Example Loader')
  
  fs.readFile(msPath, 'utf-8', function (err, header) {
    if (err) return callback(err)
    callback(null, header + "\n" + source);
  })
  // return source
}

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  source = source.replace(/\[name\]/g, options.name)
  return `export default ${JSON.stringify(source)}`
}
