<style scoped>
 @import 'item.css';
</style>
<template>
	<div id="companyDetail" v-if="show_detail">
		<div class="header relative mb100">
			<img class="header_img" v-lazy="detail.cover_img">
		</div>
		<div class="w_100 jub_jub_center  pb30">
				<div class="flex_align ml35">
					<div class="logo_img_height juc_colum_b">
						<div>
							<div class="ft22 mb15 ft40 font_weight">{{detail.name}}</div>
							<div class="ft22 ">{{detail.scale_str}} / {{detail.industry_str}}</div>
						</div>
					</div>
				</div>
		</div>
		<div class="w_100 h90 box_border pl35 pr35">
			<div class="h_100 w_100 b-b-d flex_align">
				<div class='nav_list mr40 flex_align' :class="{'act':index_type==0}" @click="checks(0)">公司信息</div>
				<div class='nav_list flex_align' :class="{'act':index_type==1}" @click="checks(1)">在招职位({{length}})</div>
			</div>
		</div>
		<template v-if="index_type==0">
			<div class="w_100 pl35 pr35 box_border pb100 pt40">
				<div class="textline">{{detail.description}}</div>
			</div>
			<div class="w_100 pl35 pr35 box_border pb100">
				<div class="w_100 flex_align mb40">
					<div class="w190 ft38 ">办公环境</div>
					<div class="w490"></div>
				</div>
				<div class="w_100  srcoll">
					<div class="bto_box">
					<img :src="item" v-for="(item,index) in detail.office_space" :key="index+'companydetail'" class="bottom_img mr25">
					</div>
				</div>
			</div>
			<div class="w_100 pl35 pr35 box_border pb100">
				<div class="w_100 flex_align mb40">
					<div class="w190 ft38 ">工作地点</div>
					<div class="w490"></div>
				</div>
				<div class="w_100 ">
					<div class="flex_align mb25">
						<img src="@/assets/image/index/gs_zb.png" class="w22h26 mr20">
						<div class="ft28">{{detail.province}}-{{detail.city}}-{{detail.district}}</div>
					</div>
					<div class="color_99 ft24">
						{{detail.address}}
					</div>
				</div>
			</div>
		</template>
		<template v-if="index_type==1">
			<div @click="toJobDetail(item.id)" class="w_100 pl35 pr35 box_border h182 block" v-for="(item,index ) in detail.jobs" :key="index+'job'">
				<div class="w_100 h_100 flex">
					<div class="w115 h_100 flex_align">
						<img class="iitem_header" v-lazy="detail.cover_img">
					</div>
					<div class="w565 h_100 juv_column">
						<div class="w_100 jub_jub_center">
							<div class="flex_align pt30">
								<div class="ft30 mr20 w200">{{item.name}}</div>
								<div class="label_price" v-if="item.is_reward">有奖</div>
							</div>
							<div class="color_E77956  ft25">{{item.salary_begin}}-{{item.salary_end}}元</div>
						</div>
						<div class="color_99 ft22 pt25">{{detail.name}}</div>
						<div class="pt15 jub_jub_center ft20">
							<div class="color_99">{{detail.province}}-{{detail.city}}-{{detail.district}} | {{detail.address}}</div>
							<div class="color_99">{{item.deadline}}</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>

export default {
	name: 'companyDetail',
	data () {
		return {
			fullHeight: document.documentElement.clientHeight,
			index_type:0,
			detail:{},
			length:0,
			show_detail:false,
		}
	},
	mounted(){
		// if (!Lockr.get('token')) {
  //   let urls = location.href
  //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx87e20aec5c6a0954&redirect_uri=${urls}&res&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  // }
		this.pageGet()
	},
	methods:{
		checks(e) {
			if (e!=this.index_type) {
				this.index_type = e
			}
		},
		pageGet(){
			let data = {}
			$http.get($utill.api.url + 'api/company/'+this.$route.query.id).then( res => {
				if (res.data.data.length!=0) {
					this.detail = res.data.data
					this.length = res.data.data.jobs.length
					if (res.data.data.name) {
						this.show_detail = true
					}
				}
			 }).catch(res => {
				console.log(res)
			 })
		},
		toJobDetail(id){
			this.$router.push({
				path:'/jobdetail?query='+'0'+'reid'+id,
			})
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

