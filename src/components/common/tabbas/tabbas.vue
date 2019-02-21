<style scoped>
 @import 'item.css'
</style>
<template>
	<div>
		<div class="tabbas flex_align" v-if="state!='none'">
			<div class="w_50 juc_colum_b ft20" @click="jump('index')">
				<template v-if="state=='index'">
					<img src="@/assets/image/ico_home_select.png" class="w46h46 mb10">
				</template>
				<template v-else>
					<img src="@/assets/image/ico_home_normal.png" class="w46h46 mb10">
				</template>
				<div class="color_b2" :class="{'tabact':state=='index'}">首页</div>
			</div>
			<div class="w_50 juc_colum_b ft20" @click="jump('my') ">
				<template v-if="state=='my'">
					<img src="@/assets/image/ico_my_select.png" class="w46h46 mb10">
				</template>
				<template v-else>
					<img src="@/assets/image/ico_my_normal.png" class="w46h46 mb10">
				</template>
				<div class="color_b2" :class="{'tabact':state=='my'}">我的</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'tabbas',
	data () {
		return {
			fullHeight: document.documentElement.clientHeight,
		}
	},
	props:{
		act:{
			type:String,
			value:'index'
		}
	},
	mounted(){
	},
	methods:{
			jump(path){
				this.$router.push({name:path})
			}
	},
	computed:{
		state(){
			return $store.state.tabbas
		}
	}


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

