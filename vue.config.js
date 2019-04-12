const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
// cdn预加载使用
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex'
}

const cdn = {
    // 开发环境
    dev: {
        css: [],
        js: []
    },
    // 生产环境
    build: {
        css: [],
        js: ['https://lib.baomitu.com/vue/2.6.6/vue.min.js',
            'https://lib.baomitu.com/vue-router/3.0.1/vue-router.min.js',
            'https://lib.baomitu.com/vuex/3.0.1/vuex.min.js'
        ]
    }
}

module.exports = {
    // 项目部署的基础路径 默认/
    // 放在子目录时使用./或者加你的域名
    publicPath: process.env.PUBLIC_PATH,
    configureWebpack: config => {
        if (isProduction) {
            // cdn预加载使用
            Object.assign(config, {
                externals: externals
            });
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
    chainWebpack: config => { // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
        // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改

        config.plugin('html').tap(args => {
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = cdn.build
            }
            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = cdn.dev
            }
            return args
        })
        // 设置目录别名alias
        config.resolve.alias
            .set('assets', '@/assets')
            .set('components', '@/components')
            .set('view', '@/view')
            .set('style', '@/style')
    },
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
                data: `@import "style/mixin.scss";`
            }
        }
    },
    // 打包时不生成.map文件
    productionSourceMap: false

}
