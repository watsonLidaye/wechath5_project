<template>
  <div>
    <div class="setting_panel relative"
         :style="{'min-height':fullHeight+'px'}">
      <div class="setting_mian pl35 pt35 pr35 box_border">
        <div class="input_wrapper">
          <label for="name"
                 class="input_label">姓名</label>
          <input id="name"
                 v-model="user_info.name"
                 placeholder="请输入姓名"
                 class="input_place">
        </div>
        <div class="input_wrapper"
             @click="popupVisible = true">
          <label for="openbank"
                 class="input_label">开户银行</label>
          <div id="openbank"
               class="input_place">{{bank_name}}</div>
        </div>
        <div class="input_wrapper">
          <label for="banknumber"
                 class="input_label">银行卡号</label>
          <input id="banknumber"
                 v-model="user_info.bank_card"
                 placeholder="请输入银行卡号"
                 class="input_place border_e2">
        </div>
        <div class="split_line"></div>
        <div class="input_wrapper">
          <label for="phone"
                 class="input_label">手机号码</label>
          <input id="phone"
                 type="number"
                 v-model="user_info.phone"
                 placeholder="请输入已绑定银行卡的手机号码"
                 class="input_place">
        </div>
        <div class="input_wrapper">
          <label for="valicode"
                 class="input_label">请输入验证码</label>
          <div class="auth_wrapper">
            <input id="valicode"
                   v-model="verification_code"
                   class="auth_code_input border_e2e2e2">
            <div class="auth_code_btn"
                 :class="timer_second==='获取验证码'?'':'interval'"
                 @click="getAuthCode">{{timer_second}}</div>
          </div>
        </div>
      </div>
      <div class="setting_btn"
           @click="accountSet">保存</div>
    </div>
    <mt-popup v-model="popupVisible"
              position="bottom"
              class="w_100">
      <mt-picker :slots="slots"
                 valueKey="label"
                 @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script type='text/ecmascript-6'>
  import { Toast } from 'mint-ui'
export default {
  name: 'accountSetting',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      popupVisible: false,
      slots: [
        {
          flex: 1,
          values: [
            {
              label: '中国工商银行',
              value: '0102'
            },
            {
              label: '中国建设银行',
              value: '0105'
            },
            {
              label: '中国银行',
              value: '0104'
            },
            {
              label: '中国农业银行',
              value: '0103'
            },
            {
              label: '中国民生银行',
              value: '0305'
            },
            {
              label: '华夏银行',
              value: '0304'
            },
            {
              label: '招商银行',
              value: '0308'
            },
            {
              label: '深圳发展银行',
              value: '0316'
            },
            {
              label: '上海浦东发展银行',
              value: '0310'
            },
            {
              label: '兴业银行',
              value: '0309'
            }
          ]
        }
      ],
      timer_second: '获取验证码',
      verification_code: '',
      verification_key: '',
      user_info: Lockr.get('user_info'),
      bank_name:'',
    }
  },
  created () { 
  },
  mounted () {
    console.log(Lockr.get('user_info').bank_name)
    this.bank_name=Lockr.get('user_info').bank_name
    console.log(this.bank_name)
   },
  methods: {
    getAuthCode () { 
      let _this = this
      let timer = null
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
      if (!this.user_info.phone) {
        Toast({
              message: '请填写手机号码',
              duration: 3000
            })
            return false
      }
      if (this.timer_second === '获取验证码') {
        $http.request(options).then(res => {
          _this.verification_key = res.data.data.key
           this.settime(60)
        }).catch(res => {
           Toast({
            message: res.response.data.message ? res.response.data.message : res.response.data.msg,
            position: 'bottom',
            duration: 5000
          })
        })
        // timer = setInterval(() => {
        //   this.timer_second--
        //   if (this.timer_second === 0) {
        //     clearInterval(timer)
        //     console.log('run 次数')
        //     this.timer_second = '获取验证码'
        //   }
        // }, 1000)
        this.settime(60)
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
    onValuesChange (picker, values) {
      this.user_info.bank_code = picker.getValues()[0].value
      this.bank_name = picker.getValues()[0].label
      this.user_info.bank_name = picker.getValues()[0].label
      this.popupVisible = false
    },
    // 账户设置
    accountSet () {
      if (this.bank_card) {
        Toast({
              message: '请输入银行卡号',
              duration: 3000
            })
        return false
      }
      if (!this.verification_code) {
        Toast({
              message: '请输入验证码',
              duration: 3000
            })
        return false
      }

      let _this = this
      console.log(Lockr.get('token_type') + ' ' + Lockr.get('token'))
      let options = {
        method: 'post',
        url: $utill.api.url + 'api/users/account/bank',
        headers: {
          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token'),
        },
        data: {
          name: _this.user_info.name,
          bank_code: this.user_info.bank_code,
          bank_card: _this.user_info.bank_card,
          verification_key: _this.verification_key,
          verification_code: _this.verification_code
        }
      }
      console.log(options)
      $http(options).then(res => {
        this.user_info.bank_code = options.data.bank_code
           //设置银行名字
        let list = Lockr.get('bank_list')
        for (let i in list) {
          if (list[i].key ==this.user_info.bank_code) {
           this.user_info.bank_name=list[i].val
          }
        }
        Lockr.set('user_info', this.user_info)
        console.log(Lockr.get('user_info'))
        console.log('重设缓存')
          this.$router.push({ name: 'accountSuccess' })
      }).catch(res => {
        console.log(res)
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