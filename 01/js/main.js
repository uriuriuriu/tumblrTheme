$(function () {
var _cntPager = 2;
var _txtPager = "//";
var _appendingFlg = false;
var _lastPostOffsetTop = 0;
var _endFlg = false;
var _shuffleEffectDuration = 40;
var autoPageChecker = setInterval(function() {
	if(_endFlg)return;
	var scrollTop = $(document).scrollTop();
//  $('#log').html(" -- " + scrollTop + " / " + Math.floor(_lastPostOffsetTop));
  if(" -- "+ scrollTop != $('#logPosNow').text()){
    $('#logPosNow').text(" -- " + scrollTop).shuffleEffect(_shuffleEffectDuration);
  }
  if(_lastPostOffsetTop != $('#logPosTotal').text()){
    $('#logPosTotal').text(_lastPostOffsetTop).shuffleEffect(_shuffleEffectDuration);
  }
	var url = "/page/" + _cntPager;
	if(_appendingFlg){
		$('#logText').html("<a href='" + url + "'>" + url +"</a><span id='logTextSpan'> is loaded.</span>");
    $("#logTextSpan").shuffleEffect(_shuffleEffectDuration);
    $("#log_other").text(_txtPager).shuffleEffect(_shuffleEffectDuration);
		return;
	}
	if(_lastPostOffsetTop < scrollTop){
		// 前回読み込んだpostの頭まで来たら次のページ読み込み
		_appendingFlg = true;
		_lastPostOffsetTop = Math.floor($('.main').find('.post:last').offset().top);
		$('#logText').html("<a href='" + url + "'>" + url +"</a> watching.");
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function(data) {
				$('.main').append($(data).find('.post'));
				_cntPager++;
        _txtPager += "/";
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
var MOVE_OFFSET = 20;
function moveNext(){
  var nowHeight = Math.floor($(document).scrollTop());
  $('.selectPost').removeClass("selectPost");
  $(".jkbtn_click").removeClass("jkbtn_click");
  $('.main').find('.post').each(function(){
    var valHeight = Math.floor($(this).offset().top) - MOVE_OFFSET;
    if(nowHeight < valHeight){
      console.log(nowHeight + " to " + valHeight);
      $(this).addClass("selectPost");
      $(".j_btn").addClass("jkbtn_click");
      moveTo(valHeight);
      return false;
    };
  });
}
function movePrevious(){
  var nowHeight = Math.floor($(document).scrollTop());
  $('.selectPost').removeClass("selectPost");
  $(".jkbtn_click").removeClass("jkbtn_click");
  $($('.main').find('.post').get().reverse()).each(function(){
    var valHeight = Math.floor($(this).offset().top) - MOVE_OFFSET;
    if(valHeight < nowHeight - 100){ // scale分100程度-しとく
      console.log(nowHeight + " to " + valHeight);
      $(this).addClass("selectPost");
      $(".k_btn").addClass("jkbtn_click");
      moveTo(valHeight);
      return false;
    };
  });
}
$(document).bind('keydown', 'j', moveNext);
$(document).bind('keydown', 'k', movePrevious);
$(".j_btn").bind('click', moveNext);
$(".k_btn").bind('click', movePrevious);

var _ua = (function(){
 return {
  ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
  ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
  ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
  ltIE9:document.uniqueID && typeof window.matchMedia == "undefined",
  gtIE10:document.uniqueID && window.matchMedia,
  Trident:document.uniqueID,
  Gecko:'MozAppearance' in document.documentElement.style,
  Presto:window.opera,
  Blink:window.chrome,
  Webkit:typeof window.chrome == "undefined" && 'WebkitAppearance' in document.documentElement.style,
  Touch:typeof document.ontouchstart != "undefined",
  Mobile:typeof window.orientation != "undefined",
  ltAd4_4:typeof window.orientation != "undefined" && typeof(EventSource) == "undefined",
  Pointer:window.navigator.pointerEnabled,
  MSPoniter:window.navigator.msPointerEnabled
 }
})();


var moveTo = function(valHeight, callback){
//	$($.browser.webkit ? 'body' : 'html').animate({
	$(_ua.Blink ? 'body' : 'html').animate({
		scrollTop: valHeight,
		easing: 'easeOutCubic'
	},140, callback);
}


$(document).bind('keydown', 'u', function(){
	// autoPageCheckerの停止
	_endFlg = !_endFlg;
});

});
