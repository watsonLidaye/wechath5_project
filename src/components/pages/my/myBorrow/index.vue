<template>
  <div>
    <div class="borrow_panel margin_center"
         :style="{'min-height':fullHeight+'px'}">
      <div class="borrow_hd mb25 pl35 pr35 box_border bg_fff">
        <div><span class="ft40 color_333">{{user_info.name}}</span>
          <img v-if="user_info.sex === 1"
               class="icon_sex ml15"
               src="./image/ico_nan@2x.png">
          <img v-else
               class="icon_sex ml15"
               src="./image/ico_nv@2x.png">
        </div>
        <div><img class="icon_card inline_block"
               src="./image/idcard@2x.png"
               alt=""><span class="ml20 ft32 color_999">{{user_info.idcard}}</span></div>
      </div>
      <div class="borrow_main">
        <div class="borrow_inputer relative mb25 bg_fff">
          <div class="border_e2e2e2 flex flex_v_center flex_nowrap">
            <span class="icon_cny">¥</span>
            <input class="borrow_input w_100"
                   type="number"
      
                   min="10"
                   max="1000"
                   v-model="amount"
                   placeholder="借款金额(100-1000)">
          </div>
          <div class="pt30 ft24 color_999 pl10">最多可借
            <span class="ml10 mr10">{{account_info.allow_borrow}}</span>
            元</div>
        </div>
        <div class="borrow_info pl35 pr35 box_border bg_fff">
          <div class="flex flex_h_between flex_1 pt40 pb40 ft32 border_e2e2e2 box_border">
            <span class="color_333">借款用途</span>
            <input v-model="borrow_remark" class="t_r"
                   placeholder="请输入借款用途">
          </div>
          <div class="flex flex_h_between flex_1 pt40 pb40 ft32 border_e2e2e2 box_border">
            <span class="color_333">开户银行</span>
            <span class="color_999">{{bank_name}}</span>
          </div>
          <div class="flex flex_h_between flex_1 pt40 pb40 ft32 box_border">
            <span class="color_333">银行卡号</span>
            <span class="color_999">{{user_info.bank_card}}</span>
          </div>
        </div>
      </div>
      <div v-if="amount > 0"
           class="next_btn"
           @click="borrowMoney">下一步</div>
      <div v-else
           class="next_btn forbid">下一步</div>
    </div>
    <popup :pop-type="popType"
           :pop-visible="popVisible"></popup>
  </div>
</template>
<script>
import {Toast,MessageBox} from 'mint-ui'
import popup from '@/components/common/popup/index.vue'
import bankList from '@/assets/js/mock/bank.json'
export default {
  name: 'myBorrow',
  components: {
    popup: popup
  },
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      user_info: '',
      amount: 0,
      borrow_remark: '',
      bank_name: '',
      popType: 'person',
      popVisible: false,
      account_info:{},
    }
  },
  created () { },
  mounted () {
    this.getUser()
    this.getAccount()
    this.user_info=Lockr.get('user_info')
  },
  methods: {
    getUser () {
      setTimeout(() => {
        if (Lockr.get('user_info')) {
          this.user_info = Lockr.get('user_info')
          this.loopUserInfo()
          this.showingBankName()
        } else {
          this.getUser()
        }
      }, 100)
    },
    loopUserInfo () {
      for (let i in this.user_info) {
        if (this.user_info[i] === '' || this.user_info[i] === null) {
          this.popVisible = true
        }
      }
    },
    showingBankName () {
      let bank_list = Lockr.get('bank_list')
      for (let i in bank_list) {
        if (bank_list[i].key === this.user_info.bank_code) {
          this.bank_name = bank_list[i].val
        }
      }
    },
    borrowMoney () {
      if (!this.user_info.is_entry) {
           MessageBox.confirm(' 未入职不能提交借款申请').then(action => {
              this.$router.push({name:'index'})
          })
          return false 
      }
      let _this = this
      let options = {
        method: 'POST',
        url: $utill.api.url + 'api/users/borrow',
        headers: {
          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token'),
        },
        data: {
          amount: _this.amount,
          borrow_remark: _this.borrow_remark
        }
      }
      $http.request(options).then(res => {
        console.log(res.data.code)
        if (res.data.code==1) {
            this.$router.push({ name: 'borrowSubmit' })
        } else {
             Toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 5000
        })
        }
      }).catch( res => {
        Toast({
          message: res.response.data.msg,
          position: 'bottom',
          duration: 5000
        })
      })
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
  },
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>