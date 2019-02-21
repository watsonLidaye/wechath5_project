<template>
  <div>
    <div class="detail_panel"
         :style="{'min-height':fullHeight+'px'}"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="50">
      <div class="detail_main bg_fff relative"
           :style="{'min-height':fullHeight-40+'px'}">
        <div class="flex flex_v_center"
             v-for="(list_item,list_index) in list"
             :key="list_index">
          <img v-if="list_item.state===2"
               src="./ico_zhi.png"
               class="icon_82 ml35 mr35"
               alt="">
          <img v-else
               src="./ico_shou.png"
               class="icon_82 ml35 mr35"
               alt="">
          <div class="border_e2e2e2 flex_1 pt25 pb25 box_border">
            <h3 class="ft32 color_333 mb15">{{list_item.amount}}</h3>
            <p class="ft20 color_333 mb15">[{{list_item.description}}]</p>
            <p class="ft20 color_999">{{list_item.created_at}}</p>
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
      list: [],
      page: 1,
      loading: true
    }
  },
  created () { },
  mounted () {
    this.getPage()
  },
  methods: {
    getPage () {
      let that = this
      let options = {
        method: 'get',
        url: $utill.api.url + 'api/users/account/' + that.$route.params.type,
        headers: {
          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token'),
        },
        data: {
          page: that.page
        }
      }
      console.log(options)
      $http.request(options).then(res => {
        if (this.page == 1) {
          this.list = res.data.data.data
        } else {
          for (let i in res.data.data.data) {
            this.list.push(res.data.data.data[i])
          }
        }
        // 设置最后一页
        this.last_page = res.data.data.last_page
        // 设置加载动画
        this.loading = false
      }).catch(res => {
        Toast({
          message: res.response.data.msg,
          position: 'bottom',
          duration: 5000
        })
      })
    },
    loadMore () {
      if (this.list.length == 0) {
        return false
      }
      this.page += 1
      if (this.page > this.last_page) {
        return false
      }
      // 显示
      this.loading = true
      this.getPage()
    }
  },
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>