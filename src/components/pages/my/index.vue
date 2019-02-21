<template>
  <div>
    <!-- panel -->
    <div class="user_panel"
         :style="{'min-height':fullHeight+'px'}">
      <!-- hd -->
      <div class="user_hd mb15">
        <!-- user -->
        <div class="user_info jub_jub_center">
          <div class="ml40">
            <div class="user_name mb25">{{user_info.name}}
              <img v-if="user_info.sex === 1"
                   class="icon_30 ml15"
                   src="./image/ico_nan.png">
              <img v-else
                   class="icon_30 ml15"
                   src="./image/ico_nv.png">
            </div>
            <router-link to="/myInfo">
              <p class="mine_info ">我的信息<img class="icon_30 ml10"
                     src="./image/_icobj.png"></p>
            </router-link>
          </div>
          <img class="user_avatar mr40"
               v-lazy="user_info.avatar">
        </div>
      </div>
      <!-- mian -->
      <div class="user_main">
        <!-- operation -->
        <div class="user_operation">
          <router-link to="/myWork">
            <div class="operation_item">
              <img class="icon_60 mr25"
                   src="./image/ico_work.png">
              <div class="w_100 operation_item_r border_e2e2e2">
                我的工作<img class="icon_30"
                     src="./image/arrow_1.png">
              </div>
            </div>
          </router-link>
          <router-link to="/myIntro">
            <div class="operation_item">
              <img class="icon_60 mr25"
                   src="./image/ico_tuijian.png">
              <div class="w_100 operation_item_r border_e2e2e2">
                我的推荐<img class="icon_30"
                     src="./image/arrow_1.png">
              </div>
            </div>
          </router-link>
          <router-link to="/myAccount">
            <div class="operation_item mb15">
              <img class="icon_60 mr25"
                   src="./image/ico_zhanghu.png">
              <div class="w_100 operation_item_r">
                我的账户<img class="icon_30"
                     src="./image/arrow_1.png">
              </div>
            </div>
          </router-link>
          <div @click="jumpBorrow">
            <div class="operation_item">
              <img class="icon_60 mr25"
                   src="./image/ico_jieqian.png">
              <div class="w_100 operation_item_r border_e2e2e2">
                我要借钱<img class="icon_30"
                     src="./image/arrow_1.png">
              </div>
            </div>
          </div>
          <a :href="tel"
             class="operation_item">
            <img class="icon_60 mr25"
                 src="./image/ico_kefu.png">
            <div class="w_100 operation_item_r">
              联系客服<img class="icon_30"
                   src="./image/arrow_1.png">
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Toast,Indicator,MessageBox} from 'mint-ui'
export default {
  name: 'my',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      user_info: {},
      tel: ''
    }
  },
  created () { 
    Indicator.open('Loading...')
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
          let data = {}
          $http.get($utill.api.url + 'api/users', {
            headers: { 
              'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token')
            }
          }).then(res => {
             Lockr.set('user_info',res.data.data)
             this.user_info=res.data.data
             Indicator.close()
             this.getBankList()
          }).catch(res => {
              Indicator.close()
               Toast({
                message: res.response.data.msg,
                position: 'bottom',
                duration: 5000
              })
          })
        },
    getBankList () {
      if (Lockr.get('bank_list')){
        let bank_list = Lockr.get('bank_list')
       let user_info = Lockr.get('user_info')
        for (let i in bank_list) {
          if (bank_list[i].key ==user_info.bank_code) {
           user_info.bank_name=bank_list[i].val
          }
        }
        Lockr.set('user_info', user_info)
        return false 
      }
    
      let that = this
      let options = {
        method: 'get',
        url: $utill.api.url + 'api/common'
      }
      $http.request(options).then(res => {
        if (res.data.code === 1) {
          // 客服电话
          this.tel = 'tel:+' + res.data.data.customerPhone
          // 获取银行信息传入
          this.getBank(res.data.data.bank)
           console.log(res.data.data.bank)
        } else {
          Toast({
            message: res.data.msg,
            position: 'bottom',
            duration: 3000
          })
        }
      }).catch(res => {
        console.log(res)
      })
    },
    getBank (tmpData) {
      // 银行列表
      let bank_list = []
      for (let i in tmpData) {
        let bank_item = {}
        bank_item.key = i
        bank_item.val = tmpData[i]
        bank_list.push(bank_item)
      }
      // 添加到本地
      //设置用户选择的银
     let user_info = Lockr.get('user_info')
        for (let i in bank_list) {
          if (bank_list[i].key ==user_info.bank_code) {
           user_info.bank_name=bank_list[i].val
          }
        }
        Lockr.set('user_info', user_info)
        Lockr.set('bank_list',bank_list)
    },
    jumpBorrow(){
      let user = Lockr.get('user_info')
      if (!user.is_entry) {
          MessageBox.confirm(' 未入职不能提交借款申请').then(action => {
              this.$router.push({name:'index'})
          })
          return false 
      }
      this.$router.push({name:'myBorrow'})
    }
   
  },
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>