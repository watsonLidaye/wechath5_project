<template>
  <div class="nodata_wrap">
    <template v-if="showType === 'home'">
      <div class="nodata_wall w466h344">
        <img src="./image/home_kong.png"
             class="w_100 h_100">
        <div class="nodata_text">没有更多数据～</div>
      </div>
    </template>
    <template v-if="showType === 'work'">
      <div class="nodata_wall w466h326">
        <img src="./image/work_kong.png"
             class="w_100 h_100">
        <div class="nodata_text">没有工作状态，快去报名吧～</div>
      </div>
    </template>
    <template v-if="showType === 'intro'">
      <div class="nodata_wall w466h207">
        <img src="./image/tuijian_kong.png"
             class="w_100 h_100 mb60">
        <div class="nodata_text">暂无推荐，快去邀请吧～</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'nodata',
  props: {
    showType: {
      type: String,
      value: ''
    }
  },
  data () {
    return {}
  },
  created () { },
  mounted () {
  },
  methods: {
  },
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>