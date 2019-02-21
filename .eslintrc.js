module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  "rules": {
    // "linebreak-style": ["error", "windows"],   // 换行风格
    "quotes": [1, "single"], // 引号类型：使用单引号
    "semi": ["error", "never"], // 禁止分号作为语句结尾
    "eqeqeq": 0, // 关闭强制使用 '===' 和 '!==' 来做判断比较
    "no-unused-vars": 0, // 关闭强制 声明未使用变量
    "space-before-function-paren": 0, // 关闭函数名后的空格
    "prefer-const": 0, // 关闭首选const
    "no-undef": 0, // 关闭不能使用未定义变量
    "camelcase": 0,
    "indent": [0, 4], //缩进风格
    "no-tabs": 0,
    "eol-last": 0, //文件以单一的换行符结束
    "space-before-blocks": 0,
    "comma-dangle": 0,
    "no-multiple-empty-lines": [1, {
      "max": 2
    }], //空行最多不能超过2行
    "no-trailing-spaces": 0,
    "spaced-comment": 0,
    "key-spacing": [0, {
      "beforeColon": false,
      "afterColon": true
    }],
    "space-infix-ops": 0,
    "comma-spacing": 0,
    "require-v-for-key": 0,
    "no-side-effects-in-computed-properties": 0,
    "object-curly-even-spacing": 0,
    "no-mixed-spaces-and-tabs": 0,
    "template-curly-spacing": [0],
    "quotes ": [0],
    "no-useless-escape": 0,
    "space-in-parens": [0, "never"],
    "no-unneeded-ternary": 0,
    "one-var": 1,
    "no-class-assign": 2,
    "no-const-assign": 2,
    "no-constant-condition": 2,
    "no-delete-var": 2,
    "no-div-regex": 1,
    "no-dupe-keys": 2,
    "no-dupe-args": 2,
    "no-empty": 2,
    "no-empty-character-class": 2,
    "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": 2,
    "no-extra-semi": 0,
    "no-fallthrough": 1,
    "no-func-assign": 2,
    "no-implicit-coercion": 1,
    "no-inner-declarations": [2, "functions"],
    "no-irregular-whitespace": 2,
    "no-lone-blocks": 2,
    "no-loop-func": 1,
    "no-mixed-requires": [0, false],
    "linebreak-style": [0, "windows"],
    "no-multi-spaces": 1,
    "no-multiple-empty-lines": [
      1, {
        "max": 2
      }
    ],
    "no-new": 1,
    "no-plusplus": 0,
    "no-redeclare": 2,
    "no-self-compare": 2,
    "no-shadow": 2,
    "no-spaced-func": 2,
    "no-sparse-arrays": 2,
    "no-this-before-super": 0,
    "no-unexpected-multiline": 2,
    "no-unneeded-ternary": 2,
    "no-unreachable": 2,
    "no-use-before-define": 2,
    "default-case": 2,
  }
}