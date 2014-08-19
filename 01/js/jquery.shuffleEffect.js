$(function(){
  // shaffle text
  var _runingShuffleEffects = "";               // for dat.gui
  var _ele = $('.content');
  var _strDefault = _ele.text(); // for dat.gui
  var _shuffleEffectQueue = [];
  var _initDuration = 3;

  jQuery.fn.extend({
  shuffleEffect: function(duration) {
    if(duration == null) duration = 50;
    var $this = jQuery(this);
    var strDefault = $this.text();
    var nLength = strDefault.length - 1;
    var i = 0;
    var strText = "";
    var tid = setInterval(function(){
      _runingShuffleEffects = tid;
      if(i < nLength+1){
        var slicedText = strDefault.slice(i+1,nLength);
//        var textYet = strDefault.slice(i,nLength);
        var textYet = "";
        // [" ", ".", "、", "。", "　"]で分割し、1つ目をget
        var term = slicedText.match(/[^ \.、。　]+/g);
        var termRand = "";
        var strShuffle = "";
        if(term != null){
          termRand = term[0].split("").sort(function() {
            return Math.random() - 0.5;
          });
          strShuffle = termRand.join("");
        }
        strText += strDefault.charAt(i);
        $this.css({opacity:1}).html("<span class='shown_text'>" +strText + "</span><span class='rand_text'>" + strShuffle + "</span><span class='yet_text'>" + textYet + "</span>");
          i++;
      } else {
        _runingShuffleEffects = "";
        if(0 < _shuffleEffectQueue.length){
          _shuffleEffectQueue.shift().shuffleEffect(duration);
        }
        clearInterval(tid);
      }
    }, duration);
  }});
})
