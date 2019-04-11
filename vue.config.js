const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')
module.exports = {
    // 项目部署的基础路径 默认/
    // 放在子目录时使用./
    publicPath: process.env.PUBLIC_PATH,
    configureWebpack: config => {
        // 使用cdn引入固定库
        Object.assign(config, {
            externals: {
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter'
            }
        });
        if (isProduction) {
            // 为生产环境修改配置...
            // 上线压缩去除console等信息
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log'] // 移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            )
            // 开启gzip压缩
            const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            if (process.env.npm_config_report) { // 打包后模块大小分析//npm run build --report
                config.plugins.push(
                    new BundleAnalyzerPlugin()
                )
            }
        } else {
            // 为开发环境修改配置...
        }
    },
    // 打包时不生成.map文件
    css: {
        loaderOptions: {
            postcss: {
                // 这是rem适配的配置  注意： remUnit在这里要根据common.scss规则来配制，如果您的设计稿是750px的，用75就刚刚好。
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 75
                    })
                ]
            },
            sass: {
                // @是src的别名,共享的全局变量  https://cli.vuejs.org/zh/guide/css.html#%E5%90%91%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8-loader-%E4%BC%A0%E9%80%92%E9%80%89%E9%A1%B9
                data: `
                  @import "@/assets/scss/mixin.scss"; @import "@/assets/scss/common.scss";
                `
            }
        }
    },
    productionSourceMap: false

}
