/**
 * eslint规则配置，用于被业务工程引用
 * Created by liuzhengdong on 2018/4/3.
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
  parser: 'babel-eslint',
  parserOptions: {
    // ECMAScript 版本
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: 'standard',
  plugins: [
    'html',
    'import',
    'promise',
  ],
  // add your custom rules here 0忽略 1warn 2 error
  rules: {
    // 缩进4空格 禁用2
    'indent': [1, 2],
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 允许console语句
    'no-console': 1,
    // 允许 debugger
    'no-debugger': 1,
    // var声明
    'no-var': 2,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止重复的函数声明
    'no-func-assign': 2,
    // 忽略分号;
    'semi': [1, 'never'],
    // 使用 === 和 !==
    'eqeqeq': [2, 'allow-null'],
    // warn alert、
    'no-alert': 1,
    // 禁用 eval()
    'no-eval': 2,
    // 禁用 with 语句
    'no-with': 2,
    // 要求或禁止使用严格模式指令
    'strict': 2,
    // 要求或禁止 var 声明中的初始化(初值)
    'init-declarations': 2,
    // 不允许 catch 子句的参数与外层作用域中的变量同名
    'no-catch-shadow': 0,
    // 禁止删除变量
    'no-delete-var': 2,
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁用特定的全局变量
    'no-restricted-globals': 2,
    // 禁止 var 声明 与外层作用域的变量同名
    'no-shadow': 0,
    // 禁止覆盖受限制的标识符
    'no-shadow-restricted-names': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 2,
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止将 undefined 作为标识符
    'no-undefined': 2,
    // 禁止出现未使用过的变量
    'no-unused-vars': [1, { 'vars': 'all', 'args': 'none' }],
    // 不允许在变量定义之前使用它们
    'no-use-before-define': 1,
    // 强制一行的最大长度
    'max-len': [1, 160],
    // 文件末尾强制换行
    'eol-last': 0,
    // 强制使用单引号
    'quotes': [2, 'single'],
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 禁止标识符中有悬空下划线_bar，这里忽略
    'no-underscore-dangle': 0,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': 0,
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [1, `never`],
    //对象字面量项尾不能有逗号 这里忽略
    'comma-dangle': [0, 'always'],
    // 在对象字面量属性中实现键和值之间的一致间隔 {key: value}
    'key-spacing': [1, { 'mode': 'strict' }],
    // 允许对象所有键和值在同一行上
    'object-property-newline': [0, { 'allowMultiplePropertiesPerLine': true }],
    // promise reject 参数设置为 * 任意类型
    'prefer-promise-reject-errors': [0, { 'allowEmptyReject': true }]
  },
}
