<template>
  <div>
    <div class="info_panel">
      <div class="info_hd">
        <div class="hd_avatar">
          <img src="//upload.jianshu.io/users/upload_avatars/3343569/3cd46650-54bc-4383-989f-80aacb0c42fe.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180"
               class="avatar">
        </div>
        <div class="name">Leslie Cheung</div>
      </div>
      <div class="info_main">
        <div class="input_wrap">
          <label class="block input_label">姓名</label>
          <input class="input_val w_100"
                 :value="name"
                 type="text"
                 placeholder="请输入你的姓名">
        </div>
        <div class="input_wrap">
          <label class="block input_label">年龄</label>
          <input class="input_val w_100"
                 type="text"
                 placeholder="请输入你的年龄">
        </div>
        <div class="input_wrap border_e2e2e2 l152">
          <label class="block input_label">性别</label>
          <input class="input_val w_100"
                 type="text"
                 placeholder="请选择性别">
        </div>
        <div class="input_wrap">
          <label class="block input_label">身份证号码</label>
          <input class="input_val w_100"
                 type="text"
                 placeholder="请输入身份证号码">
        </div>
        <div class="input_wrap">
          <label class="block input_label">手机号码</label>
          <input class="input_val w_100"
                 type="text"
                 placeholder="请输入你的手机号码">
        </div>
        <div class="input_wrap">
          <label class="block input_label">请输入验证码</label>
          <div class="flex_between">
            <input class="input_val border_e2e2e2"
                   type="text"
                   placeholder="请输入验证码">
            <div class="auth_code_btn">验证码</div>
          </div>
        </div>
        <div class="block_100"></div>
        <div class="save_btn">保存</div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  name: 'myInfo',
  data () {
    return {
      name: 'Leslie Cheung'
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