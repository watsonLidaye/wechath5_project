import Vue from 'vue'
export default (function() {
	// 数字装字符串
	Vue.filter('numToString', function(value) {
		const string = value.toString()
		return string
	})
})()