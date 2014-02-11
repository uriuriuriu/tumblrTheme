$(function () {
var _cntPager = 2;
var _appendingFlg = false;
var _lastPostOffsetTop = 0;
var autoPageChecker = setInterval(function() {
	var scrollTop = $("html").scrollTop();
	$('#log').html(" -- " + scrollTop + " / " + Math.floor(_lastPostOffsetTop));
	var url = "/page/" + _cntPager;
	if(_appendingFlg){
		$('#logText').html("<a href='" + url + "'>" + url +"</a> is loaded.");
		return;
	}
	if(_lastPostOffsetTop < scrollTop){
		// 前回読み込んだpostの頭まで来たら次のページ読み込み
		_appendingFlg = true;
		_lastPostOffsetTop = $('.main').find('.post:last').offset().top;
		$('#logText').html("<a href='" + url + "'>" + url +"</a> watching.");
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function(data) {
				$('.main').append($(data).find('.post'));
				_cntPager++;
				_appendingFlg = false;
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				$("#errorLog").html("XMLHttpRequest:" + XMLHttpRequest.status + " / textStatus:" + textStatus + " / errorThrown:" + errorThrown.message);
				clearInterval(autoPageChecker);
			}
		});
	}
}, 500);

// jk move
$(document).bind('keydown', 'j', function(){
	$('.main').find('.post').each(function(){
		var nowHeight = Math.floor($("html").scrollTop());
		var valHeight = Math.floor($(this).offset().top);
		if(nowHeight < valHeight){
			console.log(nowHeight + " to " + valHeight);
			moveTo(valHeight);
			return false;
		};
	});
});
$(document).bind('keydown', 'k', function(){
	$($('.main').find('.post').get().reverse()).each(function(){
		var nowHeight = Math.floor($("html").scrollTop());
		var valHeight = Math.floor($(this).offset().top);
		if(valHeight < nowHeight){
			console.log(nowHeight + " to " + valHeight);
			moveTo(valHeight);
			return false;
		};
	});
});
var moveTo = function(valHeight, callback){
	$($.browser.webkit ? 'body' : 'html').animate({
		scrollTop: valHeight,
		easing: 'easeOutCubic'
	},140, callback);
}

});
