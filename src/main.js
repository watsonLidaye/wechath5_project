// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './router/index'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLazyload from 'vue-lazyload'
import Lockr from 'Lockr'
import axios from 'axios'
import moment from 'moment'
import utill from './assets/js/util.js'
import store from './vuex/store'
import filter from './assets/js/utils/fitter.js'
import echarts from 'echarts'
import '@/assets/css/cssrest.css'
import '@/assets/css/public.css'
import '@/assets/css/commons.css'
import '@/assets/js/public.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import wx from 'weixin-js-sdk'


const router = new VueRouter({
  mode: 'history',
  // scrollBehavior(to, from, savedPosition) {},
  routes
})

//只有存在appid才能访问授权页面
function appidConfig(){
  let url = location.href
  Lockr.get('appid')
  if ( !Lockr.get('appId')) {
    setTimeout(() => {
      appidConfig()
    },200)
  } else {
    let appid= Lockr.get('appId')
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${url}&res&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  }
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.pageTitle
  if (location.href.indexOf('state=STATE') != -1) {
    Lockr.set('enterclick', 2)
  }
  if (Lockr.get('enterclick') != 2) {
    appidConfig()
  }
  next()
})

var special = ''
router.afterEach((to, from) => {
  switch (to.path) {
    case '/':
      $store.commit('tabbas', 'index')
      break
    case '/my':
      $store.commit('tabbas', 'my')
      break
    default:
      $store.commit('tabbas', 'none')
      break
  }
  let shareurl = ''
  let sharetitle = ''
  let id = ''
  if (to.name == 'jobdetail') {
    let recommend = Lockr.get('user_info') ? Lockr.get('user_info').id : 0
    if (to.fullPath.split('reid')[1].indexOf('&') != -1) {
      id = to.fullPath.split('reid')[1].split('&')[0]
    } else {
      id = to.fullPath.split('reid')[1]
    }
    Lockr.set('url', 'http://recruit.ztsdjy.com/jobdetail?query=' + recommend + 'reid' + id)
    Lockr.set('shareurltitle', document.title)
  }
  
  // if (to.name != 'share') {
  //   shareurl = 'http://recruit.ztsdjy.com' + to.fullPath
  //   sharetitle = document.title
  // } else {
  //   shareurl = special
  //   sharetitle = '1111'
  // }
})

// let that = this
// $http.get($utill.api.url + $utill.api.api.jssdk + '?url=' + encodeURIComponent(location.href.split('#')[0])).then((res) => {
//   Lockr.set('appId', res.data.data.appId)
//   if (res.data.code == 1) {
//     wx.config({
//       debug: false,
//       appId: res.data.data.appId, // 必填，公众号的唯一标识
//       timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
//       nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
//       signature: res.data.data.signature, // 必填，签名，见附录1
//       jsApiList: res.data.data.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//     }) //通过config接口注入权限验证配置
//   }
// })
// wx.ready(function() {
//   wx.hideMenuItems({
//     menuList: ['menuItem:copyUrl'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
//   })
//   wx.showMenuItems({
//     menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:addContact'] // 要显示的菜单项，所有menu项见附录3
//   })
//   let link = shareurl
//   // wx.updateAppMessageShareData({
//   //   title: sharetitle, // 分享标题
//   //   desc: sharetitle, // 分享描述
//   //   link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//   //   // imgUrl: '', // 分享图标
//   //   success: function(res) {
//   //     console.log(res)
//   //     // 设置成功
//   //   }
//   // })
//   // 
//   console.log(sharetitle)
//   wx.onMenuShareAppMessage({
//     title: sharetitle, // 分享标题
//     desc: sharetitle, // 分享描述
//     link: link,
//     imgUrl: 'xxx', // 分享图标
//     type: 'link', // 分享类型,music、video或link，不填默认为link
//     success: function(res) {
//       // 用户确认分享后执行的回调函数
//     },
//     cancel: function() {

//       // 用户取消分享后执行的回调函数
//     }
//   })
//   wx.onMenuShareTimeline({
//     title: sharetitle, // 分享标题
//     link: link,
//     // imgUrl: imgUrl, // 分享图标
//     success: function() {

//     },
//     cancel: function() {}
//   })
// })
// wx.error(function(res) {})


axios.defaults.timeout = 1000 * 15
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueLazyload)
Vue.use(Lockr)
Vue.use(Mint)
Vue.prototype.axios = axios


window.$http = axios
window.$utill = utill
Vue.prototype.$utill = utill
window.$store = store
window.router = router
window.moment = moment
window.Lockr = Lockr
Vue.prototype.$echarts = echarts
Vue.prototype.wxconfig = wx

const bus = new Vue()
window.bus = bus

Vue.config.productionTip = true
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router: router,
  components: {
    App
  },
  template: '<App/>',
  filters: filter
}).$mount('#app')
//进入页面的通用方法