<template>
  <div>
    <div class="account_panel"
         :style="{'min-height':fullHeight+'px'}">
      <div class="account_wrap">
        <div class="account_hd">
          <img v-lazy="user_info.avatar"
               class="avatar">
          <div class="user_name">{{user_info.name}}</div>
        </div>
        <div class="account_main">
          <!--  -->
          <div class="account_item bg_grey mb30">
            <div class="flex flex_h_between flex_v_center">
              <span class="account_title color_grey">账户余额</span>
              <div @click="checkDetail('transaction')"
                   class="color_fff ft24">明细<img src="./image/arrow_white.png"
                     class="icon_arrow"></div>
            </div>
            <div class="account_balance_wrap">
              <div class="account_balance color_fff">{{account_info.wallet}}</div><span class="ft32 color_fff">元</span>
            </div>
            <div class="ft24 color_fff flex flex_v_center pt15 box_border">
              <span>累计奖金:{{account_info.reward_total}}元</span><span class="ml60">待返现:{{account_info.stay_reward}}元</span>
            </div>
          </div>
          <!--  -->
          <div class="account_item bg_golden">
            <div class="flex flex_h_between flex_v_center">
              <span class="account_title color_golden">可借额度</span>
              <div @click="checkDetail('credit')"
                   class="color_brown ft24">明细<img src="./image/arrow_gold.png"
                     class="icon_arrow"></div>
            </div>
            <div class="account_balance_wrap border_1a8">
              <div class="account_balance color_brown">{{account_info.allow_borrow}}</div><span class="ft32 color_brown">元</span>
            </div>
            <div class="ft24 color_brown flex flex_v_center pt15 box_border">
              <span>账户额度:{{account_info.credit}}元</span><span class="ml60">已借金额:{{account_info.had_borrow}}元</span>
            </div>
          </div>
          <!--  -->
          <div class="account_op">
            <div class="account_op_item"
                 @click="checkCredit">
              <div class="ft32 color_333">提现</div>
              <img src="./image/arrow_2.png"
                   alt=""
                   class="icon_arrow">
            </div>
            <router-link to="/accountSetting">
              <div class="account_op_item">
                <div class="ft32 color_333">账户资料设置</div>
                <img src="./image/arrow_2.png"
                     alt=""
                     class="icon_arrow">
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible"
              pop-transition="popup-fade"
              position="omitted">
      <!-- 提现输入框 -->
      <div class="withdraw_box"
           v-if="withdraw_step === 1">
        <h3 class="withdraw_title">提现</h3>
        <div class="withdraw_form">
          <input type="number"
                 placeholder="请输入提现金额"
                 class="withdraw_price"
                 v-model="money" @input="inputMoney">
          <div v-if="money>0"
               class="next_step_btn"
               @click="filterUserInfo">下一步</div>
          <div v-else
               class="next_step_btn forbid">下一步</div>
        </div>
      </div>
      <!-- 提现确认 -->
      <div class="confirm_panel"
           v-if="withdraw_step === 2">
        <h3 class="confirm_title">提现</h3>
        <div class="input_wrapper">
          <p class="ft24 color_999 mb15">本次提现金额：</p>
          <p class="ft32 color_333">{{money}}</p>
        </div>
        <div class="input_wrapper">
          <p class="ft24 color_999 mb15">开户姓名：</p>
          <p class="ft32 color_333">{{user_info.name}}</p>
        </div>
        <div class="input_wrapper">
          <p class="ft24 color_999 mb15">开户银行：</p>
          <p class="ft32 color_333">{{open_bank}}</p>
        </div>
        <div class="input_wrapper">
          <p class="ft24 color_999 mb15">银行账号：</p>
          <p class="ft32 color_333">{{user_info.bank_card}}</p>
        </div>
        <div class="input_wrapper">
          <p class="ft24 color_999 mb15">手机号码：</p>
          <p class="ft32 color_333">{{user_info.phone}}</p>
        </div>
        <div class="input_wrapper ">
          <label for="valicode"
                 class="color_999 ft24 block">请输入验证码</label>
          <div class="auth_wrapper">
            <input id="valicode"
                   type="text"
                   v-model="verification_code"
                   class="auth_code_input border_e2e2e2">
            <div class="auth_code_btn"
                 :class="timer_second==='获取验证码'?'':'interval'"
                 @click="getAuthCode">{{timer_second}}</div>
          </div>
        </div>
        <div class="confirm_control flex flex_v_center flex_h_between">
          <div class="back_btn"
               @click="withdraw_step =1">上一步</div>
          <div class="confirm_btn"
               @click="drawMoney">确认</div>
        </div>
      </div>
    </mt-popup>
    <popup :pop-type="popType"
           :pop-visible="popVisible"></popup>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import bankList from '@/assets/js/mock/bank.json'
import popup from '@/components/common/popup/index'
export default {
  name: 'myAccount',
  components: {
    popup
  },
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      popupVisible: false,
      popType: 'nomoney',
      popVisible: false,
      account_info: {}, //账户信息
      user_info: Lockr.get('user_info'), //用户信息
      money: 0, //提现金额
      timer_second: '获取验证码',
      withdraw_step: 1, //提现阶段
      verification_key: '', //短信凭证
      verification_code: '', //短信码
      open_bank: '' //开户行
    }
  },
  created () { },
  mounted () {
    this.getAccount()
    this.showingOpenBank()
    console.log(Lockr.get('user_info'))
  },
  methods: {
    showingOpenBank () {
      for (let i in bankList) {
        // console.log(bankList[i].value)
        if (bankList[i].value == Number(this.user_info.bank_code)) {
          this.open_bank = bankList[i].label
        }
      }
      // console.log(this.open_bank)
    },
    checkCredit () {
      if (this.account_info.wallet === undefined || this.account_info.wallet == '0.00') {
        console.log(this.popType)
        this.popVisible = true
      } else {
        this.popupVisible = true
      }
    },
    filterUserInfo () {
      for (let i in this.user_info) {
        if (this.user_info[i] === '' || this.user_info[i] === null) {
          this.$router.push({ name: 'accountSetting' })
          Toast({
            message: '用户信息不完整，请补充',
            position: 'bottom',
            duration: 3000
          })
        } else {
          this.withdraw_step = 2
        }
      }
    },
    // 用户账户信息，金额等
    getAccount () {
      let _this = this
      let options = {
        method: 'get',
        url: $utill.api.url + 'api/users/account',
        headers: {
          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token'),
        }
      }
      $http.request(options).then(res => {
        if (res.data.code === 1) {
          this.account_info = res.data.data
        }
      }).catch(fail => {
        Toast({
          message: fail.response.data.msg,
          position: 'bottom',
          duration: 5000
        })
      })
    },
    // 获取短信验证码和凭证
    getAuthCode () {
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
        $http.request(options).then(res => {
          _this.verification_key = res.data.data.key
            this.timer_second = 60
           timer = setInterval(() => {
          this.timer_second--
          if (this.timer_second === 0) {
            clearInterval(timer)
            this.timer_second = '获取验证码'
          }
        }, 1000)
        }).catch(res => {
          Toast({
            message: fail.response.data.msg,
            position: 'bottom',
            duration: 5000
          })
        })
      }
    },
    drawMoney () {
      let _this = this
      let options = {
        method: 'post',
        url: $utill.api.url + 'api/users/withdraw',
        headers: {
          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token'),
        },
        data: {
          amount: _this.money,
          name: _this.user_info.name,
          bank_code: _this.user_info.bank_code,
          bank_card: _this.user_info.bank_card,
          verification_key: _this.verification_key,
          verification_code: _this.verification_code
        }
      }
      $http.request(options).then(res => {
        // 不能提交成功的情况会跳转到账户设置
        if (res.data.code === 1) {
          _this.$router.push({ name: 'borrowSubmit' })
        } else {
          this.$router.push({ name: 'accountSetting' })
        }
      }).catch(res => {
        console.log(res)
      })
    },
    checkDetail (type) {
      this.$router.push({
        name: 'accountDetail',
        params: {
          type: type
        }
      })
    },
    inputMoney(e){
         if (Number(this.money)>Number(this.account_info.wallet)) {
           this.popupVisible=false
         Toast({
            message: '输入金额不得超过用户余额',
            duration: 5000
          })
          this.money=0
        }
    }
  },
}
</script>
<style scoped>
@import './index.css';
</style>