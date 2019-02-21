<template>
  <div>
    <div class="intro_panel"
         :style="{'min-height':fullHeight+'px'}">
      <div class="intro_list">
        <!-- 0未入职 1已入职 2已离职 -->
        <!-- 0 none -->
        <div class="intro_item bg_grey"
             v-if="list.status===0">
          <div class="color_f8f8f8">
            <div class="mb35">
              <img v-lazy="list.avatar"
                   class="intro_avatar">
              <div class="inline_block">
                <h3 class="ft32 font_weight">{{list.name}}</h3>
                <span class="intro_status color_grey">{{list.status_str}}</span>
              </div>
            </div>
            <p class="ft24">入职公司：{{list.company_name}}</p>
          </div>
          <div class="intro_reward color_f8f8f8">
            <div class="reward_num">{{list.reward}}</div>
            <div class="ft24">最高可得</div>
          </div>
        </div>
        <!-- 1 check-in -->
        <div class="intro_item bg_red"
             v-if="list.status===1">
          <div class="color_f8f8f8">
            <div class="mb35">
              <img v-lazy="list.avatar"
                   class="intro_avatar">
              <div class="inline_block">
                <h3 class="ft32 font_weight">{{list.name}}</h3>
                <span class="intro_status color_red">{{list.status_str}}</span>
              </div>
            </div>
            <p class="ft24">入职公司：{{list.company_name}}</p>
          </div>
          <div class="intro_reward color_f8f8f8">
            <div class="reward_num">{{list.reward}}</div>
            <div class="ft24">最高可得</div>
          </div>
        </div>
        <!-- 2 leave -->
        <div class="intro_item bg_blue"
             v-if="list.status===2">
          <div class="color_f8f8f8">
            <div class="mb35">
              <img v-lazy="list.avatar"
                   class="intro_avatar">
              <div class="inline_block">
                <h3 class="ft32 font_weight">{{list.name}}</h3>
                <span class="intro_status color_blue">{{list.status_str}}</span>
              </div>
            </div>
            <p class="ft24">入职公司：{{list.company_name}}</p>
          </div>
          <div class="intro_reward color_f8f8f8">
            <div class="reward_num">{{list.reward}}</div>
            <div class="ft24">最高可得</div>
          </div>
        </div>
        <!-- intro_item_end -->
        <!-- 进度 -->
        <div v-if="list.status_str!='未入职'">
          <div class="intro_step">
            <div class="step_title">推荐状态</div>
            <div class="step_titleline"></div>
          </div>
          <!-- 进度 -->
          <div class="step_vertical" >
            <!-- 报名 -->
            <div v-if="list.created_at"
                 class="step_item clearfix">
              <div class="step_head">
                <img src="./image/ico_success.png"
                     class="step_icon">
              </div>
              <div v-if="list.worked_at"
                   class="step_line"></div>
              <span class="step_main">已报名</span>
              <span class="step_date">{{list.created_at}}</span>
            </div>
            <!-- 入职 -->
            <div v-if="list.worked_at"
                 class="step_item clearfix">
              <div class="step_head">
                <img src="./image/ico_success.png"
                     class="step_icon">
              </div>
              <div v-if="list.reward_at"
                   class="step_line"></div>
              <span class="step_main">已入职</span>
              <span class="step_date">{{list.worked_at}}</span>
            </div>
            <!-- 奖金 -->
            <div v-if="list.reward_at"
                 class="step_item clearfix">
              <div class="step_head">
                <img src="./image/ico_success.png"
                     class="step_icon">
              </div>
              <div v-if="list.quited_at"
                   class="step_line quited"></div>
              <span class="step_main">满足奖金条件，奖金已发放</span>
              <span class="step_date">{{list.reward_at}}</span>
            </div>
            <!-- 离职 -->
            <div v-if="list.quited_at"
                 class="step_item clearfix">
              <div class="step_head">
                <img src="./image/ico_failure.png"
                     class="step_icon">
              </div>
              <span class="step_main">离职</span>
              <span class="step_date">{{list.quited_at}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myIntro',
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,
      list: [],
      page: '',
      last_page: '',
      loading: ''
    }
  },
  created () { },
  mounted () {
    console.log( this.$route.params)
    this.list = this.$route.params
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