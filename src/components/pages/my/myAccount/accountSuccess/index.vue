<template>
  <div>
    <div class="borrow_panel margin_center"
         :style="{'min-height':fullHeight+'px'}">
      <div class="bg_fff w_100 borrow_main">
        <img src="./insert.png"
             alt=""
             class="w301h365 margin_center">
        <p class="ft32 color_333 text_center mb25">您的资料修改成功</p>
        <router-link to="/my">
          <div class="gohome_btn">返回首页</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'accountSuccess',
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