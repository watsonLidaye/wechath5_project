<style scoped>
 @import 'item.css'
</style>
<template>
	<div id="share"  :style="{'height':fullHeight+'px'}" v-if="show">
		<div class="h_50 relative  w596 b-b-d">
			<img src="@/assets/image/index/t1.png" class="w359h167">
			<div class="bottom">
				<div class=" w_100 jub_jub_center pb30">
					<div class="flex_align">
						<img class="w60h60 mr15" :src="user.avatar">
						<div>
							<div class="color_ff ft26">{{user.name}}推荐新职位给你</div>
						</div>
					</div>
				</div>
				<div class="h195 w_100 jub_jub_center">
					<div class="flex_align">
						<img class="w130h130" :src="detail.company.logo">
						<div class="w460 pl20 box_border">
							<div class="w_100 jub_jub_center mb25">
								<div class="ft32 color_ff ">{{detail.name}}</div>
								<div class="ft32 color_FFF600">{{detail.salary_begin}}-{{detail.salary_end}}元</div>
							</div>
							<div class="ft22 color_ff">{{detail.company.name}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="h_50 w596 juv_colum" v-if="detail.reward.length>0">
			<div>
				<div class="ft24 color_ff pt30">推荐规则：</div>
				<div class="ft20 color_ff pt25">推荐他人入职，返现{{detail.reward[0].amount}}元</div>
			</div>
			<div class="flex_align">
				<img src="@/assets/image/index/jinbi.png" class="w75h72 mr25">
				<div>
					<div class="ft20 color_ff mb10">该职位已有</div>
					<div class="ft20 color_ff"> {{detail.number}} 人获得返现！</div>
				</div>
			</div>
			<div class="pb60">
				<img :src="img" class="w185h185 mb40">
				<div class="flex_align">
					<img src="@/assets/image/index/zhiwen.png" class="w34h34">
					<div class="ft20 ml20">长按识别图中二维码</div>
				</div>
			</div>
		</div>
		<img src="@/assets/image/index/chahua.png" class="w334h568">
	</div>
</template>

<script>
export default {
	name: 'share',
	data () {
		return {
			fullHeight: document.documentElement.clientHeight,
			detail:{},
			user:{},
			show:false,
			img:''
		}
	},
	mounted(){
		console.log(this.$route.params)
		if (this.$route.params.detail) {
			this.detail = this.$route.params.detail
			this.user = this.$route.params.user
			this.qrcode()
		}
		if (!this.$route.params.detail) {
			this.$router.push({name:'index'})
		}
	},
	methods:{
		qrcode(){
			let data = {}
			let id =this.detail.id
			let recommend = this.user.id
			data.q ='http://recruit.ztsdjy.com/jobdetail?query='+recommend+'reid'+id
			$http.post(`${$utill.api.url}api/qrcode`,data).then( res => {
			 		this.img = 'data:image/png;base64,'+res.data.data.qrcode
			 		this.show = true
			 }).catch(res => {
				console.log(res.data.data)
			 })
		}
	},
	computed:{
		tokens(){
			return Lockr.get('token')
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

