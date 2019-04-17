module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ], // 空格缩进 off 关闭
        semi: 0, // 不检查结尾分号,
        //强制使用单引号
        quotes: ['error', 'single'],
        //关闭函数名与后面括号间必须空格规则
        'space-before-function-paren': 0,
        // 关闭var 声明，每个声明占一行规则。
        'one-var': 0,
        "no-console": 0

    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
