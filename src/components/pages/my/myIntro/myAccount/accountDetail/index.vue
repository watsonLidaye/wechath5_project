<template>
  <div>
    <div class="detail_panel"
         :style="{'min-height':fullHeight+'px'}">
      <div class="detail_hd">
        <p class="ft32 color_333 mb15">2018 年 10 月</p>
        <p class="ft24 color_999"><span>支出 1,228.96 元</span><span>收入600.00 元</span></p>
      </div>
      <div class="detail_main bg_fff relative"
           :style="{'min-height':fullHeight-40+'px'}">
        <div class="flex flex_v_center">
          <img src="./image/ico_shou@2x.png"
               class="icon_82 ml35 mr35"
               alt="">
          <div class="border_e2e2e2 flex_1 pt25 pb25 box_border">
            <h3 class="ft32 color_333 mb15">200.00</h3>
            <p class="ft20 color_333 mb15">[王五入职富士康工厂返现]</p>
            <p class="ft20 color_999">01-15 18:00</p>
          </div>
        </div>
        <div class="flex flex_v_center">
          <img src="./image/ico_zhi@2x.png"
               class="icon_82 ml35 mr35"
               alt="">
          <div class="border_e2e2e2 flex_1 pt25 pb25 box_border">
            <h3 class="ft32 color_333 mb15">200.00</h3>
            <p class="ft20 color_333 mb15">[提现]</p>
            <p class="ft20 color_999">01-15 18:00</p>
          </div>
        </div>
        <div class="flex flex_v_center">
          <img src="./image/ico_shou@2x.png"
               class="icon_82 ml35 mr35"
               alt="">
          <div class="border_e2e2e2 flex_1 pt25 pb25 box_border">
            <h3 class="ft32 color_333 mb15">200.00</h3>
            <p class="ft20 color_333 mb15">[王五入职富士康工厂返现]</p>
            <p class="ft20 color_999">01-15 18:00</p>
          </div>
        </div>
        <div class="flex flex_v_center">
          <img src="./image/ico_zhi@2x.png"
               class="icon_82 ml35 mr35"
               alt="">
          <div class="border_e2e2e2 flex_1 pt25 pb25 box_border">
            <h3 class="ft32 color_333 mb15">200.00</h3>
            <p class="ft20 color_333 mb15">[提现]</p>
            <p class="ft20 color_999">01-15 18:00</p>
          </div>
        </div>
        <div class="ft24 pt65 pb65 box_border color_999 text_center">住手！到底了~</div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  name: 'accountDetail',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
    }
  },
  created () { },
  mounted () { },
  methods: {},
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>