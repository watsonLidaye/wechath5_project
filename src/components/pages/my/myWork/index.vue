<template>
  <div>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="50">
      <div class="work_panel">
        <div class="work_list"
             v-if="list.length > 0">
          <div v-for="(list_item,list_index) in list"
               :key="list_index"
               class="work_item mb25">
            <div class="work_avatar">
              <img v-lazy="list_item.company.cover_img"
                   class="w116h116">
            </div>
            <div class="item_r ml30">
              <div class="work_info">
                <h3 class="info_type">{{list_item.job.name}}</h3>
                <p class="info_describe mb10"
                   v-if="list_item.status === 1">入职时间：{{list_item.worked_at}}</p>
                <p class="info_describe">{{list_item.company.name}}</p>
              </div>
              <img v-if="list_item.status === 0"
                   src="./join.png"
                   class="work_status">
              <img v-else
                   src="./work.png"
                   class="work_status">
            </div>
          </div>
        </div>
        <nodata v-if="list.length === 0"
                :show-type="'work'"
                class="h_100"></nodata>
      </div>
    </div>
  </div>
</template>
<script>
import nodata from '@/components/common/nodata/index.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'myWork',
  components: {
    nodata
  },
  data () {
    return {
      page: 1, //分页
      last_page: 1, //最后一页
      loading: false,
      list: [] //数据对象
    }
  },
  created () { },
  mounted () {
    this.pageGet()
  },
  methods: {
    // 获取
    pageGet () {
      let _this = this
      let options = {
        method: 'get',
        url: $utill.api.url + 'api/users/work',
        headers: {
          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token'),
        },
        data: {
          page: _this.page
        }
      }
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
      this.pageGet()
    }
  },
  computed: {},
  destroyed () { }
}
</script>
<style scoped>
@import './index.css';
</style>