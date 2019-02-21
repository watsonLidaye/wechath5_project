//2.13
(function ($) {
  //  $.fn._fn = function () {
    	       
	 	var actv_home=function(){
	 		location.href="config.html?actv=home_pt";
	 	}
	 	//已参团信息
	 	var group_item_fn=function(list){
	 		if(list.length<=0){
	 			$(".group-items").parent().remove();
	 			return false;
	 		}
	 		var timeObj = {};
	 		var count=0;
	 		$.each(list,function(i,obj){
	 			console.log(i)
	 			var group_diff_num=this.GroupNumber-this.GroupDifference;
//	 			console.log(group_diff_num);
	 			if(group_diff_num>0){		
	 			var view='<li class="box box-center">'+
					'<div class="text-overflow flex-1" style="padding-left:10px"><img class="vm" src="'+this.HeadImgUrl+'" style="height:42px;border-radius: 100%;border: 1px solid #e0e0e0;margin-right:8px"></i>'+this.NickName+'</div>'+
					'<div style="margin-right:12px">还差'+group_diff_num+'人成团<br><p class="f12 dgray">剩余：<i tid="h'+i+'"></i>:<i tid="m'+i+'"></i>:<i tid="s'+i+'"></i></p></div>'+
					'<div class="g-group-btn white flex-center blue-btn" style="height:100%;width:80px" num="'+this.GroupNumber+'" diff="'+group_diff_num+'" ctime="'+this.CreateTime+'" batno="'+this.BatchNo+'">去参团</div>'+
				'</li>' ;
				
				var total=(new Date().getTime()-new Date(this.CreateTime.replace(/-/g,"/")).getTime())/1000
				total=24*60*60-total //24小时
				if (total <= 0) {
                      
         } else {
//              	console.log(total)
                	count<2&&$(".group-items").append(view);
                	count>=2&&$(".group-items-hidden ul").append(view)
                	timeObj["timeCount" + i] = new msTimeCount();
                    var h = parseInt(total / 3600),
                        min = parseInt(total / 60 % 60),
                        s = parseInt(total % 60);        
                    timeObj["timeCount" + i].init([h, min, s], ["h" + i, "m" + i, "s" + i]); 
                    timeObj["timeCount" + i].callback = function () {
                    	var $obj=$("[tid='h"+i+"']").parent();
				        			$obj.parent().next().removeClass("g-group-btn").addClass("gray-btn");
				        			$obj.html("已结束");
				    					}
                    count++
                }
        }
	 		});
	 		count==0&&$(".g-groups").remove();
	 		count>0&&count<=2&&$(".groups-more").css("pointer-events","none").find(".see-more-btn").remove()
	 		//参团
		    $(".g-group-btn").on("click",function(){
		    	var batno=$(this).attr("batno");
		    	var group_info={group_num:$(this).attr("num"),diff_num:$(this).attr("diff"),ctime:$(this).attr("ctime").replace(/-/g,"/")};
		    	sessionStorage.group_info=JSON.stringify(group_info);
		    	location.href="config.html?actv=group_pt&pid="+km.GetQueryString("pid")+"&batno="+batno;
		    })
	 	}
	 	var lazyLoadPic = function ($imgs, _winScrollTop) {
	        $.each($imgs, function () {
	            var $self = $(this);
	            if ($self.attr('data-src')) {
	                var _offsetTop = $self.offset().top;
	                if ((_offsetTop - 0) > ($(window).height() + _winScrollTop)) {
	                    return false;
	                }
	                console.log(_offsetTop)
	                if ((_offsetTop - 0) <= ($(window).height() + _winScrollTop)) {
	
	                    $self.attr('src', $self.attr('data-src'));
	
	                    $self.removeAttr('data-src')//.removeClass("img_loading");
	                }
	            }
	        })
	    }
	 	var init_banner_img = function () {
	        var bullets = $('#position li');
	        var slider = $('#divSlider').Swipe({
	            startSlide: 0,
	            auto: 3000,
	            continuous: true,
	           
	            callback: function (pos) {
	                var i = bullets.length;
	                pos = pos % i;
	                while (i--) {
	                    bullets[i].className = '';
	                }
	
	                bullets[pos].className = 'on';
	            }
	        });
	    }
	 	var data_load_fn=function(data){
	 		var tmpl_top=
				'<div class="hea_ctn pr" style="padding:10px" limit="' + data.LimitCount + '">' +
				'	<p >'+data.ItemName+'</p>'+
				'	<div style="margin-top:6px"><em class="red">￥<i class="f16">' + data.SkuList[0].GroupsPrice + '</i></em><del class="dgray f12" style="margin-left:10px">原价：￥'+data.Price+'</del></div>' + //
				'	<p style="margin-top:5px" class="f12 dgray">库存：' + data.Stock + '<i style="margin-left:20px" class="'+(data.LimitCount<=0?"hide":"")+'">限购：' + data.LimitCount + '</i></p>' +  //'<i style="margin-left:20px">销量：'+data.SaleVolume+'</i>
				'	<div class="custom-btn pa" style="bottom:10px;right:10px;padding:0 14px">'+data.GroupCount+'人成团</div>'+
				'</div>';
			$.each(data.ItemPic,function(){
				var tmpl_img='<li class="pr fl"><img data-src="'+this.Pic+'" src="../images/item_img_default.png" style="width:100%"></li>'
            	$("#position").append('<li></li>');
            	$(".banner_list").append(tmpl_img)
			})
			$("header").append(tmpl_top);
			$("#position li").length > 1 ? $("#position li").eq(0).addClass("on") : $("#position").hide();
	        init_banner_img();
			group_item_fn(data.GroupPartakeList)
			$(".g-details-desc").append(data.Content&&data.Content.trim()!=""?data.Content:"暂无内容");
			$(".g-bottom-bar [rsid='p1']").html(data.SkuList[0].Price)
			$(".g-bottom-bar [rsid='p2']").html(data.SkuList[0].GroupsPrice).parent().next().html(data.GroupCount)
			$("[sku-title]").html(data.ItemName);
			
			
	 	    //$(".g-details-desc").find('img').each(function () {
			//    var src = $(this).attr("src");
			//    $(this).attr("data-src", src).addClass("img_loading");
			//})
			lazyLoadPic($("img[src]"), 0);			
			$(".g-details-desc").find('img').addClass("img_loading")
			

			$(".g-details-desc img").unbind("click").bind("click", function () {
			    var obj = this;
			    WeixinApi.ready(function (Api) {
			        var srcList = [];
			        var curSrc = $(obj).attr("src");
			        $(".g-details-desc img").each(function () {
			            var src = $(this).attr("src");
			            srcList.push(src)
			        });
			        Api.imagePreview(curSrc, srcList)
			    })
			});
	 	}
	 	var post_goods_fn=function(){
    		var params = {
	            "CustId": sessionStorage.id,
	            GroupItemNo: km.GetQueryString("pid"),
                OpenId:sessionStorage.oi
        	},
            post_url = api_url + "api/Mall/GroupsInfo/GetGroupItemInfoDetail";
	        km.loading.post(post_url, params).done(function (datas) {
	        	console.log(datas);
	            if (datas.code == "0000") {
	                data_load_fn(datas.data);

	                var img = datas.data.ItemPic[0].Pic,
                        title = "发现好物【" + datas.data.ItemName + "】",
                        desc = datas.data.ItemName,
                        url = location.protocol + "//" + location.host + location.pathname + "?actv=goods_pt&pid=" + km.GetQueryString("pid") + "&id=" + sessionStorage.id;//location.href+"&id="+sessionStorage.id;
	                weixin_fx_fn(escape(url), img, title, desc);
	            }
	            else {         
	                km.msg.alert({text:datas.msg});
	            }
	        }).fail(function (datas) {           
	            km.msg.alert({text:"请求服务器超时!"});
	        })
    	}
    	post_goods_fn();
	 	var item_add_fn=function(ele){
    		var $ele = $(ele);
	 	    var max_count = parseFloat($ele.parent().attr("rs_count")), //库存
                limit_count = parseFloat($(".hea_ctn").attr("limit")); //限购
    		max_count = (limit_count == 0 || max_count < limit_count) ? max_count : limit_count;
	 		if($ele.attr("class").indexOf("disabled") == -1){
	 			var count = $ele.prev().val();
	 			count = parseFloat(count) + 1;
	 			if(count > 0){
	 				$ele.siblings(".qty-op-cut").removeClass("disabled");
	 			}
	 			if(count == max_count){
	 				$ele.addClass("disabled");
	 			}
	 			$ele.prev().val(count);
	 		}
    	}
    	var item_cut_fn=function(ele){
    		var $ele = $(ele);
    	    var max_count = $ele.parent().attr("rs_count"),
                limit_count = parseFloat($(".hea_ctn").attr("limit")); //限购
    	    max_count = (limit_count == 0 || max_count < limit_count) ? max_count : limit_count;
	 		if($ele.attr("class").indexOf("disabled") == -1){
	 			var count = $ele.next().val();
	 			count = parseFloat(count) - 1;
	 			if(count <= 1){
	 				$ele.addClass("disabled");
	 			}
	 			if(count < max_count){
	 				$ele.siblings(".qty-op-add").removeClass("disabled");
	 			}
	 			$ele.next().val(count);
 			}
    	}
    	var item_input_fn=function(ele){
	    			var $ele = $(ele);
	    	    var max_count = $ele.parent().attr("rs_count"),
	                limit_count = parseFloat($(".hea_ctn").attr("limit")); //限购
	    	    max_count = (limit_count == 0 || max_count < limit_count) ? max_count : limit_count;
		 			var count = $(ele).val();
		 			if(count <= 1){
		 				$(".qty-op-cut").addClass("disabled");
		 			}else{

		 				$(".qty-op-cut").removeClass("disabled");
		 			}
		 			
		 			if(parseInt(count) > parseInt(max_count)){
		 				km.msg.tip("数量超出商品数量",500)
		 				$ele.siblings(".qty-op-add").addClass("disabled");
		 				$(ele).val(max_count)
		 				return false;
		 			}else{
		 				$ele.siblings(".qty-op-add").removeClass("disabled");
		 			}
		 			$(ele).val(count);
    	}
    	var item_blur_fn=function(ele){
    		var count = $(ele).val();
	    	if(!/^\+?[1-9][0-9]*$/.test(num)&&num!=""){
					km.msg.tip("数量不能小数",500)
					$(ele).val("1")
					return false;
			 	}
    		if(count==""||count=="undefined"){
		 				km.msg.tip("数量不能为空",500)
		 				$(ele).val(1)
		 				return false;
		 			}
		 			if(count<=0){
		 				km.msg.tip("数量不能为0",500)
		 				$(ele).val(1)
		 				return false;
		 			}
		 			var count = $(ele).val();
    	}
    	var confirm_fn=function(){
    		var params_skuCode = "";
	    	$(".sku-spec-value.on").each(function(){
	        	params_skuCode = params_skuCode + $(this).attr("rs_val")+"_";
	    	})
	        var ItemDetail= [{
	            "ItemNo": km.GetQueryString("pid"),
	            "SkuCode": params_skuCode,
//	            "Qty": $(".qty-op-val").html()
	            "Qty": $(".qty-op-val").val()
	        }] 	    
	        sessionStorage.ItemDetail = JSON.stringify(ItemDetail);
	        sessionStorage.tp = tp;
    		location.href="config.html?actv=confirm_pt"; //tp:1,单独;2,拼团
    	}
    	var tp=1;
    	var item_select_datas_init_fn = function (datas) {
    		var $skuObj=$(".g-sku-main");
    		$skuObj.find(".item-img").attr("src",datas.data.ImgUrl);
    		var skuPri=(tp==1?datas.data.Price:datas.data.GroupsPrice);
    		$skuObj.find("[sku-pri]").html(skuPri);
    		
    		if (datas.data.Stock <= 0) {
	            $skuObj.find("[sku-stock]").html("库存不足");
	            $skuObj.find(".qty-op-val").val(0).next().addClass("disabled")
	        } else {
	            $skuObj.find("[sku-stock]").html("库存：" + datas.data.Stock);
	            $skuObj.find(".qty-op-val").val(1).next().removeClass("disabled")
	        }
	        $skuObj.find(".sku-qty-op").attr("rs_count",datas.data.Stock);
	        $skuObj.find(".g-sku-list").empty();
	        $.each(datas.extInfo,function(){
	    		item_max = ""
	    		var item_max_item = '<div class="sku-specs" style="padding:10px 0;border-bottom:1px solid #eaeaea">'+
	    							'	<span class="sku-specs-key">'+this.AttributeName+'</span>'+
									'	<div class="sku-spec-value-list" style="margin-top:6px">';
				$.each(this.value,function(){
					if(this.Status == 1){
		        		item_max += '<i rs_val="'+this.ValueId+'" class="sku-spec-value on">'+this.ValueStr+'</i>';
		        	}
		        	else{
		        		item_max += '<i rs_val="'+this.ValueId+'" class="sku-spec-value">'+this.ValueStr+'</i>';
		        	}
				})
				item_max_item += item_max;
				item_max_item += '</div></div> ';
				$skuObj.find(".g-sku-list").append(item_max_item);
	        })
	        var limit_count = parseFloat($(".hea_ctn").attr("limit"));
	        limit_count != "0" && $skuObj.find("[limit]").html('限购：' + limit_count)
	        if (limit_count == 1) {
	            $(".qty-op-add").addClass("disabled");
	        }
    	}
    	var post_sku_fn=function(code){
    		var params = {
	            "CustId": sessionStorage.id,
	            GroupItemNo:km.GetQueryString("pid"),
	            SkuCode:code||""
        	},
            post_url = api_url + "api/Mall/GroupsInfo/GetSkuCodeForItemDetail";
            
	        km.loading.post_min(post_url, params).done(function (datas) {
	        	console.log(datas);
	            if (datas.code == "0000") {
	                item_select_datas_init_fn(datas)
	                $(".g-sku-mask").show();
	                $(".g-sku-main").addClass("page-sliderTop")
	            }
	            else {         
	                km.msg.alert({text:datas.msg});
	            }
	        }).fail(function (datas) {           
	            km.msg.alert({text:"请求服务器超时!"});
	        })
    	}
    	var get_user_info_fn=function(){
    		var params = {
	            "CustId": sessionStorage.id,
	            "OpenId":sessionStorage.oi
        	},
            post_url = api_url + "api/Mall/GroupsOrder/CheckOpenIdQRcode";
            
	        km.loading.post_min(post_url, params).done(function (datas) {
	        	console.log(datas);
	            if (datas.code == "0000") {
	                confirm_fn();
	            }
	            else { 
	            	if (datas.code == "0402") {
                        console.log("1");
                        var img_url = "data:image/jpg;base64," + datas.extInfo;
                        $("[attenion]").find(".code-img").attr("src",img_url);
                        $("[attenion]").removeClass("hide")
            		}
            		else if (datas.code == "0403") {
                		window.location.href = datas.extInfo;
               		}else{
	                	km.msg.alert({text:datas.msg});
	                }
	            }
	        }).fail(function (datas) {           
	            km.msg.alert({text:"请求服务器超时!"});
	        })
    	}

    	$(".banner_list").off("click","img").on("click","img", function () {
    	    var obj = this;
    	    WeixinApi.ready(function (Api) {
    	        var src = $(obj).attr("src");
    	        var srcList = [src];
    	        var curSrc = src;
    	        Api.imagePreview(curSrc, srcList)
    	    })
    	});
		
		//选规格
		$(".g-sku-list").off("click",".sku-spec-value").on("click",".sku-spec-value",function(){
			if(!$(this).hasClass("on")){
				$(this).addClass("on").siblings().removeClass("on")
				var skuCode="";
				$(".sku-spec-value-list").each(function(){					
					skuCode+=$(this).find(".on").attr("rs_val")+"_"
				});		
				post_sku_fn(skuCode)
				
			}
		})
		$(".qty-op-add").off("click").on("click",function(){
			item_add_fn(this)
		})
		$(".qty-op-cut").off("click").on("click",function(){
			item_cut_fn(this)
		})
		$(".qty-op-val").on("input",function(){
			item_input_fn(this)
		})
		$(".qty-op-val").on("blur",function(){
			item_blur_fn(this)
		})
		$(".g-sku-buttom").off("click").on("click",function(){
			if(parseFloat($(".qty-op-val").val())<1){
				km.msg.tip("库存不足,不能购买",800);
				return false
			}
			$("[attenion]").find(".code-img").attr("src")==""?get_user_info_fn():$("[attenion]").removeClass("hide");
		})
		$("[attenion]").on("click",function(){
			$("[attenion]").addClass("hide");
		})
	    $(".g-bottom-bar [tp]").on("click",function(){
	    	var actv=$(this).attr("tp")
	    	if(actv=="g-home"){
	    		actv_home();
	    		return false;
	    	}
	    	if(actv=="g-direct"){
	    		tp=1;
	    	}else if(actv="g-group"){
	    		tp=2;   					
	    	}
	    	post_sku_fn();	
	    	//$(".g-sku-mask").show();
			//$(".g-sku-main").addClass("page-sliderTop")
	    })
	    
	    $(".g-sku-mask,.close-wrap").on("click", function () {
			$(".g-sku-mask").hide();
			$(".g-sku-main").removeClass("page-sliderTop")
			
		})	
		
		$(".groups-more").off("click").on("click",function(){
			$(".group-items-hidden").removeClass("hide");
		})
		$(".group-items-hidden").on("click",function(){
			$(this).addClass("hide")
		})
   // }
})(jQuery);

