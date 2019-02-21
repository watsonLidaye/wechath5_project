<template>
  <div>
    <div class="info_panel">
      <div class="info_hd">
        <div class="hd_avatar">
          <img :src="user_info.avatar"
               class="avatar">
          <img src="./ico_bj_blue.png"
               class="icon_edit">
        </div>
        <div class="name">{{user_info.name}}</div>
      </div>
      <div class="info_main">
        <div class="input_wrap">
          <label class="block input_label">姓名</label>
          <input class="input_val w_100"
                 v-model="user_info.name"
                 type="text"
                 placeholder="请输入你的姓名">
        </div>
        <div class="input_wrap">
          <label class="block input_label">年龄</label>
          <input class="input_val w_100"
                 type="text"
                 v-model="user_info.age"
                 placeholder="请输入你的年龄">
        </div>
        <div class="input_wrap border_e2e2e2">
          <label class="block input_label">性别</label>
          <el-radio-group class="input_val"
                          v-model="user_info.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </div>
        <div class="input_wrap">
          <label class="block input_label">身份证号码</label>
          <input class="input_val w_100"
                 type="text"
                 maxlength="18"
                 v-model="user_info.idcard"
                 placeholder="请输入身份证号码">
        </div>
        <div class="input_wrap">
          <label class="block input_label">手机号码</label>
          <input class="input_val w_100"
                 type="text"
                 maxlength="11"
                 v-model="user_info.phone"
                 placeholder="请输入你的手机号码">
        </div>
        <div class="input_wrap">
          <label class="block input_label">请输入验证码</label>
          <div class="flex_between">
            <input class="input_val border_e2e2e2"
                   type="text"
                   v-model="verification_code"
                   placeholder="请输入验证码">
            <div class="auth_code_btn"
                 :class="timer_second==='获取验证码'?'':'interval'"
                 @click="authCodeGet">{{timer_second}}</div>
          </div>
        </div>
        <div class="block_100"></div>
        <div class="save_btn"
             @click="storeuser_info">保存</div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import { Toast } from 'mint-ui'
export default {
  name: 'myInfo',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      user_info: Lockr.get('user_info'),
      verification_key: '', //短信凭证
      verification_code: '', //短信code码
      timer_second: '获取验证码',
      sexOptions: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ]
    }
  },
  created () { },
  mounted () {

  },
  methods: {
    // 获取登录验证码和短信凭证
    authCodeGet () {
      let _this = this
      let options = {
        method: 'post',
        url: $utill.api.url + 'api/verificationCodes',
        headers: {
          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token'),
        },
        data: {
          phone: _this.user_info.phone
        }
      }
      let timer = null
      if (this.timer_second === '获取验证码') {
        if (!_this.user_info.phone) {
          Toast({
            message: '请输入正确的手机号',
            position: 'bottom',
            duration: 5000
          })
          _this.timer_second = '获取验证码'
          return false
        }
        $http.request(options).then(res => {
          _this.verification_key = res.data.data.key
              // this.timer_second = 60
              //  timer = setInterval(() => {
              //   this.timer_second--
              //   if (this.timer_second === 0) {
              //     clearInterval(timer)
              //     this.timer_second = '获取验证码'
              //   }
              // }, 1000)
              this.settime(60)
        }).catch(res => {
          Toast({
            message: res.response.data.message ? res.response.data.message : res.response.data.msg,
            position: 'bottom',
            duration: 5000
          })
        })
      }
    },
    settime(time){
			setTimeout(() => {
				if (time<0) {
					this.timer_second='获取验证码'	
				} else {
					time-=1
					this.timer_second=time
					this.settime(time)
				}
			},1000)
		},
    // 修改用户信息
    storeuser_info () {
      let that = this
      let options = {
        method: 'post',
        url: $utill.api.url + 'api/users',
        headers: {
          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token'),
        },
        data: {
          name: that.user_info.name,
          age: that.user_info.age,
          sex: that.user_info.sex ? that.user_info.sex : 1,
          idcard: that.user_info.idcard,
          verification_key: that.verification_key,
          verification_code: that.verification_code
        }
      }
      $http.request(options).then(res => {
        Lockr.set('user_info', res.data.data)
        let template = Lockr.get('user_info')
        template.idcard=that.user_info.idcard
        Lockr.set('user_info', template)
        Toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 2000
        })
        setTimeout(() => {
          that.$router.push({ name: 'my' })
        }, 3000)
      }).catch(res => {
        Toast({
          message: res.response.data.message ? res.response.data.message : res.response.data.msg,
          position: 'bottom',
          duration: 3000
        })
      })
    }
  },
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>