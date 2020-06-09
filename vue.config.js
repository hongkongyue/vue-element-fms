const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
})

var HtmlWebpackPlugin = require('html-webpack-plugin');

const buildMsg = 'build at ' + new Date()

const resolve = dir => {
    return path.join(__dirname, dir)
}

// 这里需要修改为你线上项目存放的路径
// 比如你打包的文件放到服务器的my-app文件夹，域名为a.com，则应改为
// http(s)://a.com/my-app/
const BASE_URL = '/'

module.exports = {
    publicPath: BASE_URL,
    productionSourceMap: false,
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('libs', resolve('src/libs'))
            .set('mixins', resolve('src/mixins'))
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'iview': 'iview',
            'echarts': 'echarts'
        })
        const jsRule = config.module.rule('js')
        // clear all existing loaders.
        // if you don't do this, the loader below will be appended to
        // existing loaders of the rule.
        jsRule.uses.clear()
        // add replacement loader(s)
        jsRule
            .use('happypack/loader?id=happy-babel-js')
            .loader('happypack/loader?id=happy-babel-js')
    },
    lintOnSave: false,
    devServer: {
        disableHostCheck: true,
        port: 8070, //端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            // '/eop-boot': {
            //     target: 'http://newweb.eptison.com/',
            //     // target: 'http://localhost:8091/',

            //     // target:'http://suppliertest.yptcgroup.com/',
            //     changeOrigin: true,
            //     secure: false
            // },
            '/eop-boot': {
                //    target: 'http://eop.quanshangtech.com:888/',
                //    target: 'http://localhost:9080/',     
                //    target:'http://172.168.109.22:9080/',               //许克胜
                //    target : 'http://172.168.109.16:9080/',            //刘新星
                //    target : 'http://172.168.108.64:9080/',             //石明科
                //    target : 'http://172.168.108.151:9080/',         //张明杰
                      target: 'http://newweb.eptison.com/',            
                //    target:'http://172.168.109.82:9080',                //刘孟洋
                //    target:'http://172.168.110.253:9080/',              //高露
                //    pathRewrite: { '^/eop-boot': '/' },                 //重写代理路径
                      changeOrigin: true,
                      secure: false,
                // pathRewrite: {
                //     '^/eop-boot': '/'
                // }
            },
            '/eop-node': {
                // target: 'http://eop.quanshangtech.com:888/',
                target: 'http://localhost:8091/',
                changeOrigin: true,
                secure: false
            },
            '/eop': {
                target: 'http://localhost:8091/',
                //target:'http://172.168.108.66:8080',
                //target: 'http://eopsit.eptison.com:8080',
               
                changeOrigin: true,
                secure: false
            },
            '/WebReport': {
                target: 'http://localhost:8091/',
                changeOrigin: true
            }
        }
    },
    //If the value is an Object, it will be merged into the final config using webpack-merge.
    configureWebpack: {
        plugins: [
            new HtmlWebpackPlugin( {
                template : './public/index.html'
            }),
            new webpack.BannerPlugin(buildMsg),
            new HappyPack({
                id: 'happy-babel-js',
                loaders: ['babel-loader?cacheDirectory=true'],
                threadPool: happyThreadPool,
            })
        ]
    },
    css:{
        sourceMap:false
    }
}