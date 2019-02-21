function cloneJson(obj) {
	return JSON.parse(JSON.stringify(obj))
}

function BrowserType() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
	var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器 
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
	var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器 
	var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器 
	var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器 
	var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器 

	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion == 7) {
			return "IE7";
		} else if (fIEVersion == 8) {
			return "IE8";
		} else if (fIEVersion == 9) {
			return "IE9";
		} else if (fIEVersion == 10) {
			return "IE10";
		} else if (fIEVersion == 11) {
			return "IE11";
		} else {
			return "0"
		} //IE版本过低 
	} //isIE end 

	if (isFF) {
		return "FF";
	}
	if (isOpera) {
		return "Opera";
	}
	if (isSafari) {
		return "Safari";
	}
	if (isChrome) {
		return "Chrome";
	}
	if (isEdge) {
		return "Edge";
	}
}

//判断是否是IE浏览器

function isIE() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
	if (isIE) {
		return "1";
	} else {
		return "-1";
	}
}


//判断是否是IE浏览器，包括Edge浏览器 
function IEVersion() {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
	var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器 
	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion == 7) {
			return "IE7";
		} else if (fIEVersion == 8) {
			return "IE8";
		} else if (fIEVersion == 9) {
			return "IE9";
		} else if (fIEVersion == 10) {
			return "IE10";
		} else if (fIEVersion == 11) {
			return "IE11";
		} else {
			return "0"
		} //IE版本过低 
	} else if (isEdge) {
		return "Edge";
	} else {
		return "-1"; //非IE 
	}
}

//公共提示
/******
//** author lipeifeng@e2862.com
//** param string 提示文字
******/
function alertOp(info) {
	return new Promise((resolve, reject) => {
		bus.$confirm(info, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
			center: true
		}).then(() => {
			resolve()
		}).catch(() => {
			reject()
		})
	})
}


//通用token过期以及刷新tonken的方法
/*
	使用es6 .then方法请求ajax
*/

function checktoken() {
	return new Promise((resolve, reject) => {
		let curentTime = Date.parse(new Date())
		if (Lockr.get('time') && Lockr.get('time').tokenrecode) {
			if (curentTime - Lockr.get('time').tokenrecode <= Lockr.get('time').expires_in * 1000) {
				resolve()
				return false
			}
			let data = {}
			data.access_token = Lockr.get('token')
			$http.post($utill.api.url + $utill.api.api.refreshtoken, data, {
				headers: {
					'Authorization': Lockr.get('token_type') + ' ' + Lockr.get('token')
				}
			}).then((res) => {
				if (res.data.code == 1) {
					Lockr.set('token', res.data.data.access_token)
					Lockr.set('token_type', res.data.data.token_type)
					let time = {}
					time.expires_in = res.data.data.expires_in
					time.tokenrecode = Date.parse(new Date())
					Lockr.set('time', time)
					resolve()
				} else {
					reject(res)
				}
			}).catch((res) => {
				reject(res)
			})
		}


	})
}

function shareMethods() {
	console.log(bus.wxconfig)
}

export default {
	cloneJson,
	IEVersion,
	alertOp,
	checktoken,
	shareMethods
}