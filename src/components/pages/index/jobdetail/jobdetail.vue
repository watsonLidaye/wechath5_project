<style scoped>
 @import 'item.css';
</style>
<template>
	<div id="jobdetail">
		<template v-if="show_detail">
			<div class="w_100 pl35 pr35 box_border">
				<div class="w_100 bt_b">
					<div class="w_100 jub_jub_center pt60 pb25 ">
						<div class="ft46 w_50">{{detail.name}}</div>
						<div class="price ft28 ">{{detail.salary_begin}}-{{detail.salary_end}}元</div>
					</div>
					<div class="w_100 flex_align  mb30 ">
						<img src="@/assets/image/index/zb.png" class="w20h24 mr10">
						<div class="color_99 ft28">{{detail.province}}-{{detail.city}}-{{detail.district}}-{{detail.address}}</div>
					</div>
				</div>
			</div>
			<div class="w_100 mb40">
				<router-link :to="'/companyDetail?id='+detail.company_id" class="w_100 jub_jub_center pt60 pb70">
					<div class="flex_align ml35">
						<img class="logo_img mr15" :src="detail.company.logo">
						<div class="logo_img_height juc_colum_b">
							<div>
								<div class="ft22 mb15">{{detail.company.name}}</div>
								<div class="ft22 ">{{detail.company.scale_str}}/ {{detail.company.industry_str}}</div>
							</div>
						</div>
					</div>
					<img src="@/assets/image/index/arrow.png" class="w32h32 mr35">
				</router-link>
				<div class="w724h173" v-if="detail.reward.length>0">
					<div class="w684h184">
						<div class="mb20">
							<img src="@/assets/image/index/tjyj.png" class="w119h22">
						</div>
						<div class="ft24 color_ff">.入职7天返现 {{detail.had_rewards}} 元。</div>
						<div class="ft24 color_ff">.推荐他人入职，确认入职工作{{detail.reward[0].days}}天，返现{{detail.reward[0].amount}}元（可提现）</div>
						<div class="w_100 text_right ft20 color_ff">该职位已有{{detail.number}}人获得返现</div>
					</div>
				</div>
			</div>
			<div class="w_100 pl35 pr35 box_border pb100">
				<div class="w_100 flex_align mb40">
					<div class="w190 ft38 ">薪资待遇</div>
					<div class="w490"></div>
				</div>
				<div class="textline">{{detail.salary_deal}}</div>
			</div>
			<div class="w_100 pl35 pr35 box_border pb100">
				<div class="w_100 flex_align mb40">
					<div class="w190 ft38 ">福利待遇</div>
					<div class="w490"></div>
				</div>
				<div class="flex_warp w_100 mb25">
						<div class="label_index" v-for="(item,index) in detail.welfare_tags" :key="index+'welfare_tags'">{{item}}</div>
						<div class="label_index">包吃</div>
					</div>
				<div class="textline mb40">{{detail.welfare_deal}}</div>
				<!-- <div class="textline mb40">2、员工享有国家法定假日(每年11天)、工伤假、婚假、产假、带薪年休假等假期。</div>
				<div class="textline mb40">3、每年免费提供春、夏工衣各2套，免费为员工洗衣服。</div>
				<div class="textline">4、公司依法与员工签订劳动合同、购买社保、办理住房公积金，并额外为每位员工办理医疗自保基金，提供双份保障。</div> -->
			</div>
			<div class="w_100 pl35 pr35 box_border pb100">
				<div class="w_100 flex_align mb40">
					<div class="w190 ft38 ">招聘要求</div>
					<div class="w490"></div>
				</div>
				<div class="textline">{{detail.requirement}}</div>
			</div>
			<div class="w_100 pl35 pr35 box_border pb100">
				<div class="w_100 flex_align mb40">
					<div class="w190 ft38 ">温馨提示</div>
					<div class="w490"></div>
				</div>
				<div class="textline">{{detail.notice}}</div>
				<!-- <div class="textline mb40">24小时短信接收报名：姓名+年龄+富士康发送至鲁小姐会第一时间给您录好系统</div>
				<div class="textline ">拨打下面热线24小时接受报名</div>
				<div class="textline ">85250002</div> -->
			</div>
			<div class="pb130">
				<div class="mbbb"></div>
			</div>
			<div class="bto_bar flex_align box_border pl35"  v-if="!second_jump&&detail.is_reward">
				<div class="left_btn box_border juc_colum_b mr15 br14" @click="jump('share')">
					<div class="flex_align ">
						<img src="@/assets/image/index/gift_btn.png" class="w32h32 mr10">
						<div class="ft30">有奖推荐</div>
					</div>
				</div>
				<div class="rightbtn juc_colum_b" @click="jumpInput">
					<div class="flex_align ">
						<img src="@/assets/image/index/sign up_btn.png" class="w32h32 mr10">
						<div class="ft30 color_ff">在线报名</div>
					</div>
				</div>
			</div>
			<div class="bto_bar juc_colum_b box_border pl35"  v-if="second_jump|| !detail.is_reward">
				<div class="rightbtn juc_colum_b" @click="jumpInput">
					<div class="flex_align ">
						<img src="@/assets/image/index/sign up_btn.png" class="w32h32 mr10">
						<div class="ft30 color_ff">在线报名</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
	name: 'jobdetail',
	data () {
		return {
			fullHeight: document.documentElement.clientHeight,
			detail:{},
			show_detail:false,
			second_jump:false,
			job_id:''
		}
	},
	computed:{
		userInfo(){
			return Lockr.get('user_info')
		},
		recommend(){
			return Lockr.get('recommend')
		}
	},
	mounted(){
		let recommend = this.$route.fullPath.split('reid')[0].split('=')[1]
		if (this.$route.fullPath.split('reid')[1].indexOf('&')!=-1) {
			this.job_id = this.$route.fullPath.split('reid')[1].split('&')[0]
		} else {
			this.job_id = this.$route.fullPath.split('reid')[1]
		}
		if (recommend!=0) {
				this.second_jump = true
				this.user_id = recommend
				Lockr.set('recommend',recommend)
			}
		this.pageGet()
	},
	methods:{
		jump(path){
			this.$router.push({name:path,params:{user:this.userInfo,detail:this.detail,user_id:this.user_id}})
		},
		pageGet(){
			let user = Lockr.get('user_info')
			$http.get($utill.api.url + 'api/job/'+this.job_id).then( res => {
				if (res.data.data.length!=0) {
					this.detail = res.data.data
					this.show_detail = true
					Lockr.set('shareimg',this.detail.company.logo)
					Lockr.set('shareurldesc', this.detail.company.name+'正在招聘'+this.detail.name)
					Lockr.set('shareurltitle', user.name+'推荐一家高薪职位给你，快来报名吧！')
					if (!this.detail.name) {
						this.$router.push({name:'index'})
					}
				}
			 }).catch(res => {
				console.log(res)
			 })
		},
		jumpInput(){
			 $utill.common.checktoken().then(() => {
            this.getUser()
          })
		},
		getUser () {
          let data = {}
          $http.get($utill.api.url + 'api/users', {
            headers: {
              'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token')
            }
          }).then(res => {
             Lockr.set('user_info',res.data.data)
             if (!res.data.data.idcard) {
             	this.$router.push({name:'inputfile',query:{'job_id':this.job_id}})
             } else {
             	let param = {}
             	param.job_id = this.job_id
				if (this.recommend) {
					param.referee_user_id = this.recommend
					param.referee_job_id = this.job_id
				}
			$http.post($utill.api.url + 'api/users/enrolls/auto',param, {
           		headers: {
              		'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token')
           	 	}
          	}).then(resss => {
          		Toast({
					  message:'报名成功',
					  iconClass: 'icon icon-success',
					  duration: 3000
				})
				setTimeout(() => {
					this.$router.push({name:'index'})
				},1000)
          	}).catch(ress => {
				Toast({
					  message: ress.data.data.msg,
					  duration: 3000
					})
          		})
          }
         }).catch(res => {
					Toast({
					  message: res.data.data.msg,
					  duration: 3000
					})
          		})
      	},
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

