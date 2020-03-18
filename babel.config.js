module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/preset-env',
    {
        "targets": "> 5%",
        "useBuiltIns": "usage",
        "corejs": 3
    }]
  ]
}
