import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import filters from './filters/index'
import { weChatJsSDK } from '@/api/index';
// 注入全局过滤器
Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item])
})
const wx = window.wx;
const userAgent = navigator.appVersion
const userAgentL = userAgent.toLowerCase()
Vue.prototype.$client = Vue.client = {
    IE: userAgentL.indexOf('msie') > -1 && !userAgentL.indexOf('opera') > -1,
    GECKO: userAgentL.indexOf('gecko') > -1 && !userAgentL.indexOf('khtml') > -1, // 火狐内核
    WEBKIT: userAgentL.indexOf('applewebkit') > -1, // 苹果、谷歌内核
    OPERA: userAgentL.indexOf('opera') > -1 && userAgentL.indexOf('presto') > -1, // opera内核
    TRIDENT: userAgentL.indexOf('trident') > -1, // IE内核
    MOBILE: !!userAgent.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    MOBILEDEVICE: !!userAgentL.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i), // 是否为移动终端
    IOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    ANDROID: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1, // android终端或者uc浏览器
    IPHONE: userAgent.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    IPAD: userAgent.indexOf('iPad') > -1, // 是否iPad
    // WEBAPP: !userAgent.indexOf('Safari') > -1, //是否web应该程序，没有头部与底部
    QQBROWSER: userAgent.indexOf('QQBrowser') > -1, // 是否QQ浏览器
    WEIXIN: userAgent.indexOf('MicroMessenger') > -1, // 是否微信
    QQ: !!userAgent.match(/QQ\/[0-9]/i), // 是否QQ
    WEIBO: userAgent.match(/WeiBo/i) == 'weibo', // 微博
    ALIPAY: userAgent.indexOf('AlipayClient') > -1 // 是否支付宝

}

/**
 * 微信JSSDK
 */
Vue.prototype.$wechatInit = Vue.wechatInit = function (config) {
    let link = location.href.split('#')[0]
    if (window.__wxjs_is_wkwebview) { // 微信iOS
        link = window.entryUrl || location.href.split('#')[0]
    }
    const permissions = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'updateTimelineShareData', 'updateAppMessageShareData']// 就的即将废弃
    let shareConfig =
      config.config || {
          title: '秒懂书院',
          desc: '热门免费小说--都市生活、东方玄幻、官场职场、奇幻修真…',
          link: process.env.VUE_APP_BASE_WEIXIN_URL + '',
          imgUrl: process.env.VUE_APP_BASE_WEIXIN_URL + '/logo.png',
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () { },
          cancel: function () { }
      }
    let getConfig = async function () {
        try {
            let res = await weChatJsSDK({ url: link, t: new Date().getTime() })
            let _data = res.result
            if (_data && typeof _data === 'object') {
                let reslt = {
                    // debug: true,
                    appId: process.env.VUE_APP_APPID,
                    jsApiList: permissions,
                    timestamp: _data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: _data.noncestr, // 必填，生成签名的随机串
                    signature: _data.signature// 必填，签名，见附录1
                }
                wx.config(reslt)
                wx.ready(() => {
                    wx.updateTimelineShareData(shareConfig)
                    wx.updateAppMessageShareData(shareConfig)
                })
                wx.error(function (res) {
                    console.log('wx.error', res);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    getConfig()
}
router.afterEach((to, from, next) => {
    console.log('to', to);
    if (Vue.client.WEIXIN) {
        if (window.__wxjs_is_wkwebview) { // IOS
            console.log('IOS');
            if (window.entryUrl == '' || window.entryUrl == undefined) {
                var url = `${process.env.VUE_APP_BASE_WEIXIN_URL}${to.fullPath}` || location.href.split('#')[0]
                window.entryUrl = url // 将后面的参数去除
            }
            Vue.wechatInit('')
        } else { // 安卓
            console.log('安卓');
            setTimeout(function () {
                Vue.wechatInit('')
            }, 500);
        }
    }
})
// 开发测试环境显示console
if (process.env.VUE_APP_SHOWCONSOLE === 'true') {
    let Vconsole = require('../node_modules/vconsole/dist/vconsole.min');
    new Vconsole();
}
Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
