<template>
  <div>
    <div class="borrow_panel margin_center"
         :style="{'min-height':fullHeight+'px'}">
      <div class="bg_fff w_100 borrow_main">
        <img src="./inset@2x.png"
             alt=""
             class="w301h365 margin_center">
        <p class="ft32 color_333 text_center mb25">您的借款申请已提交</p>
        <p class="ft32 color_333 text_center">请等待客服审核</p>
        <router-link to="/my">
          <div class="gohome_btn">返回首页</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'borrowSubmit',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight
    }
  },
  created () { },
  mounted () {
    console.log(this.fullHeight)
  },
  methods: {},
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>