/**
 * eslint规则配置，用于被业务工程引用
 */
module.exports = {
  root: true,
  env: {
    // 环境定义了预定义的全局变量。
    browser: true,
    node: true,
    es6: true,
    mocha: true
  },
  parser: 'babel-eslint', //使用babel-eslint来作为eslint的解析器
  parserOptions: {
    // ECMAScript 版本
    ecmaVersion: 6,
    sourceType: 'module',
    // // 想使用的额外的语言特性:
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    }
  },
  extends: 'standard',
  plugins: [
    'html',
    'import',
    'promise',
  ],
  // add your custom rules here
  rules: {
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 允许console语句
    'no-console': 1,
    // 允许 debugger
    'no-debugger': 0,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // var声明
    'no-var': 1,
    // 分号;
    'semi': [
      0,
      'always'
    ],
    // 使用 === 替代 == allow-null允许null和undefined==
    'eqeqeq': [
      2,
      'allow-null'
    ],
    // 禁用 alert、confirm 和 prompt
    'no-alert': 2,
    // 禁用 eval()
    'no-eval': 2,
    // 禁用 with 语句
    'no-with': 2,
    // 要求或禁止使用严格模式指令
    'strict': 2,
    //////////////
    // 要求或禁止 var 声明中的初始化(初值)
    'init-declarations': 2,
    // 不允许 catch 子句的参数与外层作用域中的变量同名
    'no-catch-shadow': 0,
    // 禁止删除变量
    'no-delete-var': 2,
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁用特定的全局变量
    'no-restricted-globals': 0,
    // 禁止 var 声明 与外层作用域的变量同名
    'no-shadow': 0,
    // 禁止覆盖受限制的标识符
    'no-shadow-restricted-names': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 2,
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止将 undefined 作为标识符
    'no-undefined': 0,
    // 禁止出现未使用过的变量
    'no-unused-vars': [
      0,
      {
        'vars': 'all',
        'args': 'none'
      }
    ],
    // 不允许在变量定义之前使用它们
    'no-use-before-define': 0,
    // 强制一行的最大长度
    'max-len': [
      1,
      200
    ],
    // 文件末尾强制换行
    'eol-last': 0,
    // 强制使用一致的反勾号、双引号或单引号
    'quotes': [
      2,
      'single'
    ],
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 禁止标识符中有悬空下划线_bar
    'no-underscore-dangle': 0,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': 0,
    // 函数定义时括号前面要不要有空格 这里忽略
    'space-before-function-paren': [0, `always`],
    //对象字面量项尾不能有逗号 这里忽略
    'comma-dangle': [0, 'always'],
  },
}
