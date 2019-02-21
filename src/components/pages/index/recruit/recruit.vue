<style scoped>
 @import 'item.css';
</style>
<template>
	<div id="recruit" :style="{'min-height':fullHeight+'px'}">

	 		<div class="w_100 h208 flex_align" >
	 			<img src="./image/ico_zhaopin@2x.png" class="w112h112 ml35">
	 			<div class="ft48 ml25">名企 <span class="color_5E98D9">招聘</span></div>
	 		</div>

	 		<div v-infinite-scroll="loadMore"
		     infinite-scroll-disabled="loading"
		     infinite-scroll-distance="50">
		 		<router-link :to="'/companyDetail?id='+item.id" class="w680 bg_ff mb30" v-for="(item,index) in list" :key="index+'company'">
		 			<img v-lazy="item.logo" class="w_100 h218" align="middle">
		 			<div class="w_100 box_border h140 flex_align pl20 pr20">
		 				<div class="ft32">{{item.introduction}}</div>
		 			</div>
		 		</router-link>
	 		</div>
	</div>
</template>

<script>

export default {
	name: 'recruit',
	data () {
		return {
			fullHeight: document.documentElement.clientHeight,
			page:1,
			list:[],
		}
	},
	mounted(){
		this.pageGet()
	},
	methods:{
		pageGet(){
			let data = {}
			$http.get($utill.api.url + 'api/company?page='+this.page).then( res => {
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
			}
		},
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

