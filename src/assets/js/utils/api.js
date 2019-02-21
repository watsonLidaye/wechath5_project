//  接口服务
// var store = require('@/vuex/store').default.state
// var config = require('../config').default
import config from '../config'
import store from '@/vuex/store'
import common from '../common'

//  域名
var https = 'debug'
var url = (function() {
	let urls = ''
	if (https == 'master') {
		urls = ''
	} else {
		urls = 'http://api.ztsdjy.com/'
	}
	return urls
})()

var api = {
	//jssdk
	'jssdk': 'api/wechat/jssdk',
	//首页
	'index_baner': 'api/banner',
	'index_job': '/api/job',
	'index_jreward': 'api/job/reward',
	//登陆
	'authorizations': 'api/socials/weixin/authorizations',
	//刷新token
	'refreshtoken': 'api/authorizations/current/update'
}

export default {
	url,
	api
}