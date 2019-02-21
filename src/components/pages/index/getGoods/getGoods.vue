<style scoped>
 @import 'item.css'
</style>
<template>
	<div id="getGoods" :style="{'min-height':fullHeight+'px'}">
	 		<div class="w_100 h208 flex_align" >
	 			<img src="@/assets/image/index/ico_youjiang.png" class="w112h112 ml35">
	 			<div class="ft48 ml25">有奖 <span class="color_FA846C">专区</span></div>
	 		</div>
 			<div class="input_box  relative mb30">
 				<input type="text" name="" class="w_100 h_100 text_center bg_ff input_box_intput" placeholder="请输入职位或者公司名" v-model="searching">
 				<div class="el-icon-search seatching"></div>
 			</div>
 			<div  v-infinite-scroll="loadMore" infinite-scroll-distance="0" class="pb50">
 			<div @click="toJobDetail(item.id)" class="block relative w680 pd30 box_border pb15 bg_ff  " v-for="(item,index) in list" :key="index+'list'">
				<div class="w_100 jub_jub_center mb25">
					<div class="ft30 flex_align ">
						<div>{{item.name}}</div>
						<div class="ml20 label_price" v-if="item.category==1">有奖</div>
					</div>
					<div class="ft24 index_money">{{item.salary_begin}}-{{item.salary_end}}元</div>
				</div>
				<div class="flex_warp w_100 mb25">
					<div class="label_index" v-for="(sitem,sindex) in item.welfare_tags" :key="sindex+'welfare_tags'">{{sitem}}</div>
				</div>
				<div class="flex_align">
					<img class="logo_img mr15" v-lazy="item.company.logo">
					<div class="logo_img_height juc_colum_b">
						<div>
							<div class="ft22 mb15">{{item.company.name}}</div>
							<div class="ft22 color_99">已报名 {{item.user_enrolls_count}} 人</div>
						</div>
					</div>
				</div>
				<img src="@/assets/image/index/置顶.png" class="top">
			</div>
			</div>

	</div>
</template>

<script>

export default {
	name: 'getGoods',
	data () {
		return {
			fullHeight: document.documentElement.clientHeight,
			list:[],
			page:1,
			searching:'',
			pages:1
		}
	},
	mounted(){
		this.pageGet()
	},
	methods:{
		pageGet(){
			let data = {}
			data.page = this.page
			$http.get($utill.api.url + 'api/job/reward').then( res => {
			 	if (this.page == 1) {
			 		this.list = res.data.data.data
			 	} else {
					for (let i in res.data.data.data) {
						this.list.push(res.data.data.data[i])
					}
			 	}
				this.last_page = res.data.data.last_page
			 }).catch(res => {
				console.log(res)
			 })
		},
		loadMore () {
			if (!this.searching) {
				if (this.list.length == 0) {
				return false
			}
			this.page += 1
			if (this.page > this.last_page) {
				return false
			}
			this.pageGet()
			} else {
				if (!this.searching) {
					if (this.list.length == 0) {
						return false
					}
				}
				this.pages += 1
				if (this.pages > this.last_page) {
					return false
				}
			this.loading = true
			this.searchOp()
			}
		},
		searchOp(){
			$http.get($utill.api.url + 'api/job/search?q='+ this.searching+'&page='+ this.pages+'&is_reward=1').then( res => {
			 	if (this.pages == 1) {
			 		this.list = res.data.data.data
			 	} else {
					for (let i in res.data.data.data) {
						this.list.push(res.data.data.data[i])
					}
			 	}
				this.last_page = res.data.data.last_page
			 }).catch(res => {
				console.log(res)
			 })
		},
		toJobDetail(id){
			this.$router.push({
				path:'/jobdetail?query='+'0'+'reid'+id,
			})
		}
	},
	watch:{
		searching(val,old) {
			console.log(val)
			if (val!=old) {
				this.pages = 1
			}
			if (val) {
				this.searchOp()
			} else {
				this.page = 1
				this.pageGet()
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

