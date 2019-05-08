const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
// cdn预加载使用
const externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    'mint-ui': 'MINT',
    axios: 'axios'

}

const cdn = {
    // 开发环境
    dev: {
        css: [
            'https://lib.baomitu.com/mint-ui/2.2.13/style.min.css'
        ],
        js: []
    },
    // 生产环境
    build: {
        css: [
            'https://lib.baomitu.com/mint-ui/2.2.13/style.min.css'
        ],
        js: [
            'https://lib.baomitu.com/vue/2.6.6/vue.min.js',
            'https://lib.baomitu.com/vue-router/3.0.1/vue-router.min.js',
            'https://lib.baomitu.com/vuex/3.0.1/vuex.min.js',
            'https://lib.baomitu.com/axios/0.18.0/axios.min.js',
            'https://lib.baomitu.com/mint-ui/2.2.13/index.js'
        ]
    }
}

module.exports = {
    // 项目部署的基础路径 默认/
    // 放在子目录时使用./或者加你的域名
    publicPath: process.env.BASE_URL,
    configureWebpack: config => {
        if (isProduction) {
            // externals里的模块不打包
            Object.assign(config, {
                externals: externals
            })
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
            )
            // if (process.env.npm_config_report) {
            //     // 打包后模块大小分析//npm run build --report
            //     config.plugins.push(new BundleAnalyzerPlugin())
            // }
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: config => {
        // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
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
            .set('api', '@/api')
            .set('store', '@/store')
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract:isProduction ? true:false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
        loaderOptions: {
            postcss: {
                // 这是rem适配的配置
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 100
                    })
                ]
            },
            sass: {
                data: '@import "style/_mixin.scss";@import "style/_variables.scss";' // 全局引入
            }
        }
    },
    lintOnSave: true, // default false
    // 打包时不生成.map文件
    productionSourceMap: false,
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        host: '127.0.0.1',
        port: 8088, // 服务端口
        https: false,
        hotOnly: false,
        // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
        proxy: 'https://easy-mock.com/' // 设置代理
    }
}
