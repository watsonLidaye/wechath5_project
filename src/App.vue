<style>
@import './assets/css/cssrest.css';
@import './assets/css/public.css';
@import './assets/css/commons.css';

.app {
}
/*.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}*/
</style>
<template>
  <div id="app" class="app">
    <transition name="slide-fade" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
    <tabbas act="index"></tabbas>
  </div>
</template>

<script>
import tabbas from './components/common/tabbas/tabbas.vue'
import wx from 'weixin-js-sdk'

export default {
  name: 'App',
  components:{
    tabbas
  },
  data () {
    return {
      login_success: true
    }
  },
  created(){
  },
  mounted(){
    // $http.get($utill.api.url + $utill.api.api.jssdk+'?url='+encodeURIComponent(location.href.split('#')[0])).then((res) => {
    //    Lockr.set('appId',res.data.data.appId)
    //   if (res.data.code == 1) {
    //     this.wxconfig.config({
    //         debug: false,
    //         appId: res.data.data.appId, // 必填，公众号的唯一标识
    //         timestamp:res.data.data.timestamp , // 必填，生成签名的时间戳
    //         nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    //         signature: res.data.data.signature,// 必填，签名，见附录1
    //         jsApiList:res.data.data.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //       })//通过config接口注入权限验证配置
    //   }
       this.login()
    // }).catch((res) => {

    // })
  },
  methods:{
    login(){
      if ( Lockr.get('token')) {
          $utill.common.checktoken().then(() => {
            this.getUser()
          }).catch(res => {
            let url = location.href
            Lockr.flush()
           this.appidConfig()
          })
      } else {
       this.autho()
     }
    },
    appidConfig(){
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
    },
    autho(){
       let data = {}
        data.code = location.href.split('code=')[1].split('&')[0]
        $http.post($utill.api.url + $utill.api.api.authorizations,data).then((res) => {
          if (res.data.code == 1) {
            Lockr.set('token',res.data.data.access_token)
            Lockr.set('token_type',res.data.data.token_type)
            let time = {}
            time.expires_in = res.data.data.expires_in
            time.tokenrecode = Date.parse(new Date())
            Lockr.set('time',time)
            this.getUser()
          } else {
            console.log(res)
            }
          }).catch((res) => {
            console.log(res)
          })
    },
    getUser () {
          let data = {}
          $http.get($utill.api.url + 'api/users', {
            headers: { 
              'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token')
            }
          }).then(res => {
             Lockr.set('user_info',res.data.data)
          }).catch(res => {
            // console.log(res)
          })
        },
    // 分享 我的专属二维码
    shareOut () {
        let that = this
        $http.get($utill.api.url + $utill.api.api.jssdk+'?url='+encodeURIComponent(location.href.split('#')[0])).then((res) => {
       Lockr.set('appId',res.data.data.appId)
       if (res.data.code == 1) {
        wx.config({
            debug: false,
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp:res.data.data.timestamp , // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature,// 必填，签名，见附录1
            jsApiList:res.data.data.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })//通过config接口注入权限验证配置
        wx.ready(function() {
           //  这个链接去详情但是我不知道详情具体要传什么参数  你得修改一下
          let link =location.href
          wx.onMenuShareAppMessage({
            title:Lockr.get('shareurltitle'),
            desc: Lockr.get('shareurldesc'),
            link: Lockr.get('url'),
            imgUrl: Lockr.get('shareimg'),
            type: 'link',
            success: function() {
            },
            cancel: function() {

            }
          })
          wx.onMenuShareTimeline({
            title: document.title, // 分享标题
            link: link,
            // imgUrl: imgUrl, // 分享图标
            success: function() {

            },
            cancel: function() {}
          })
        })
      }
      }).catch((res) => {

      })
    },
    //分享 其他页面的
    shareOutTwo () {
      let that = this
      $http.get($utill.api.url + $utill.api.api.jssdk+'?url='+encodeURIComponent(location.href.split('#')[0])).then((res) => {
       Lockr.set('appId',res.data.data.appId)
      if (res.data.code == 1) {
        this.wxconfig.config({
            debug: false,
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp:res.data.data.timestamp , // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature,// 必填，签名，见附录1
            jsApiList:res.data.data.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })//通过config接口注入权限验证配置
      }
        wx.ready(function() {
          let link = location.href
          wx.onMenuShareAppMessage({
            title: document.title,
            desc: document.title,
            link: link,
            imgUrl: 'xxx',
            type: 'link',
            success: function() {
            },
            cancel: function() {
            }
          })
          wx.onMenuShareTimeline({
            title: document.title,
            link: link,
            // imgUrl: imgUrl, // 分享图标
            success: function() {

            },
            cancel: function() {}
          })
        })
        }).catch((res) => {

    })
    }

  },
  watch: {
    // 监听 $route 变化调用分享链接
        '$route'(to, from) {
            let currentRouter = this.$router.currentRoute.name
            if (currentRouter == 'share') { //如果不是userShare分享页面,则分享另外一个接口
                this.shareOut()
            } else {
                this.shareOutTwo() //当前页面是userShare页面时分享调用另外一个接口
            }
        }
}
}
</script>

