<template>
  <div>
    <div class="popup_modal"
         v-if="popVisible"
         @click.self="closeMask">
      <div class="popup_wrap">
        <template v-if="popType === 'person'">
          <p class="mb20">您的账户资料未填写</p>
          <p class="mb60">请填写账户资料后提交借款申请</p>
          <div class="flex flex_h_between flex_v_center">
            <div class="pop_cancle"
                 @click="toMy">取消</div>
            <div class="pop_write"
                 @click="toWriting">去填写</div>
          </div>
        </template>
        <template v-if="popType === 'company'">
          <p class="mb20">你还未入职任何公司</p>
          <p class="mb60">如有疑问请联系驻场管理员</p>
          <div class="pop_confirm"
               @click="toIndex">
            确定
          </div>
        </template>
        <template v-if="popType === 'nomoney'">
          <p class="mb20">余额不足</p>
           <p class="mb60"></p>
          <div class="pop_confirm"
               @click="toIndex">
            确定
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: 'popup',
  props: {
    popType: {
      type: String,
      value: ''
    },
    popVisible: {
      type: Boolean,
      value: ''
    }
  },
  data () {
    return {
      fullHeight: document.documentElement.clientHeight
    }
  },
  created () { },
  mounted () {
  },
  methods: {
    toMy () {
      this.$router.push({ name: 'my' })
    },
    toWriting () {
      this.$router.push({ name: 'accountSetting' })
    },
    toIndex () {
      this.$router.push({ name: 'index' })
    },
    closeMask () {
      this.$emit('pop-mask', false)
    }
  },
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>