<style scoped>
 @import 'item.css';
</style>
<template>
	<div id="inputfile"  :style="{'min-height':fullHeight+'px'}">
		<div class="header relative mb50">
			<img src="@/assets/image/index/img_one.png" class="w327h101 ml35">
				<input type="text" class="header_input_name ft30 box_border pl40 header_input" placeholder="姓名" maxlength="10" v-model="name">
		</div>
		<div class="w680 jub_jub_center pb48">
			<div class="sex_age jub_jub_center">
				<input type="number" class="w_100 ft30 box_border pl40 h_100"  placeholder="年龄" maxlength="2" v-model="age">
			</div>
			<div class="sex_age jub_jub_center" @click="setselect">
				<div class="ft30 ml45">{{sex}}</div>
				<img src="@/assets/image/index/arrow_down.png" class="w36h36 mr40">
			</div>
		</div>
		<div class="pb48 w680">
			<input type="number" class="header_input_name ft30 box_border pl40 h_100" placeholder="手机号码" maxlength="11" v-model="phone">
		</div>
		<div class="w680 jub_jub_center pb48">
			<div class="sex_age jub_jub_center">
				<input type="number" class="w_100 ft30 box_border pl40 h_100" placeholder="验证码" maxlength="4" v-model="verification_code">
			</div>
			<div class="sex_age juc_colum_b ft30 borderl" @click="getCode">
				{{code}}
			</div>
		</div>
		<div class="pb48 w680">
			<input type="number" class="header_input_name ft30 box_border pl40" placeholder="身份证" maxlength="20" v-model="idcard">
		</div>
		<div class="pb100 w680 relative" v-if="recommend">
			<div class="recommend ft30">推荐人：</div>
			<input type="text" class="header_input_name ft30 box_border plinput" v-model="utm_medium" maxlength="10" :disabled="recommend">
		</div>
		<div class="pb40">
		<div class="bottom_btn" @click="submit">提交</div>
		</div>
		<div class="w_100 bg_b" :style="{'height':fullHeight+'px'}" v-if="select" @click="setselect">
		</div>
		<mt-picker :slots="slots" @change="onValuesChange" class="bg_ff picksex" :class="{'dwon':!select}"></mt-picker>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
	name: 'inputfile',
	data () {
		return {
			fullHeight: document.documentElement.clientHeight,
			select:false,
			slots:[
				{
					flex: 1,
					values:['男','女']
				}
			],
			sex:'性别',
			name:'',
			age:'',
			idcard:'',
			job_id:'',
			utm_medium:'',
			verification_code:'',
			verification_key:'',
			code:'获取验证码',
			phone:'',
			ajaxcount:0
		}
	},
	mounted(){
		this.job_id = this.$route.query.job_id
	},
	methods:{
		jump(path){
			this.$router.push({name:path})
		},
		onValuesChange(picker, values) {
			this.sex = values[0]
			this.select = false
		},
		setselect(){
			let sectes = !this.select
			this.select = sectes
		},
		submit(){
			if (!this.name) {
				Toast({
					  message: '名字不能为空',
					  duration: 3000
					})
				return false
			}
			if (!this.age) {
				Toast({
					  message: '年龄不能为空',
					  duration: 3000
					})
				return false
			}
			if (!this.idcard) {
				Toast({
					  message: '身份证不能为空',
					  duration: 3000
					})
				return false
			}
			if (this.sex=='性别') {
				Toast({
					  message: '请选择性别',
					  duration: 3000
					})
				return false
			}
			let reg =/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/g
			if (this.phone.length!=11) {
				Toast({
					  message: '请输入正确的手机号码',
					  duration: 3000
					})
				return false
			}
			if (!this.phone.match(reg)) {
				Toast({
					  message: '请输入正确的手机号码',
					  duration: 3000
					})
				return false
			}
			
			if (this.idcard.length!=18) {
				Toast({
					  message: '请输入正确的身份证',
					  duration: 3000
					})
				return false
			}
			if (!this.verification_code) {
				Toast({
					  message: '请填写验证码',
					  duration: 3000
					})
				return false
			}
			$utill.common.checktoken().then(this.subajax())
		},
		subajax(){
			let data = {}
			data.name = this.name
			data.age = this.age
			data.sex = this.sex=='男'?1:2
			data.idcard = this.idcard
			data.verification_key = this.verification_key
			data.verification_code = this.verification_code
			data.job_id = this.job_id
			if (this.recommend) {
				data.referee_user_id = this.recommend
				data.referee_job_id = this.job_id
			}
			if (!this.recommend) {
				data.referee_user_id = 0
				data.referee_job_id = 0
			}
			data.utm_medium = this.utm_medium
			$http({
				method: 'post',
				url: $utill.api.url + 'api/users/enrolls',
				headers: {
		          'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token')
		        },
				data: data,
			}).then(res => {
				console.log(res)
				Toast({
					  message: '报名成功',
					  iconClass: 'icon icon-success',
					   duration: 3000
					})
					setTimeout(() => {
						this.$router.push({name:'index'})
					},3000)
			}).catch(res => {
				console.log(res.response)
				Toast({
					  message: res.response.data.msg,
					  duration: 3000
					})
			})
		},
		getCode(){
			if (this.code!='获取验证码') {
				Toast({
					  message: '请稍后再试',
					  duration: 3000
					})
			}
			let reg =/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/g
			if (this.phone.length!=11) {
				Toast({
					  message: '请输入正确的手机号码',
					  duration: 3000
					})
				return false
			}
			if (!this.phone.match(reg)) {
				Toast({
					  message: '请输入正确的手机号码',
					  duration: 3000
					})
				return false
			}
			
			if (this.code=='获取验证码') {
				this.getMessage()
			}
		},
		getMessage(){
			let time = 120
			let data= {}
			data.phone = this.phone
				$http.post($utill.api.url + 'api/verificationCodes',data).then( res => {
				console.log(res)
				this.verification_key = res.data.data.key
					this.code = time
					var a = setInterval(() => {
					this.code-=1
					if (this.code<=0) {
						this.code='获取验证码'
						clearInterval(a)
					}
				},1000)
			 }).catch(res => {
				console.log(res)
				Toast({
					  message: res.data.data.msg,
					  duration: 3000
					})
				return false
			 })
		},
		settime(time){
			setTimeout(() => {
				if (time<0) {
					this.code='获取验证码'	
				} else {
					time-=1
					this.code=time
					this.settime(time)
				}
			},1000)
		}
	},
	computed:{
		recommend(){
			if (Lockr.get('recommend') && this.ajaxcount == 0){
				this.ajaxcount += 1
					$http({
					method: 'get',
					url: $utill.api.url + 'api/query/username/'+Lockr.get('recommend'),
					headers: {
					'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token')
					}
				}).then(res => {
					this.utm_medium = res.data.data.username
				}).catch(res => {
				})
				}
			return Lockr.get('recommend')
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->