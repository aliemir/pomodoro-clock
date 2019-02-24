var sets = {
  breakLen: 5,
  pomoLen: 25,
  pomodoroColor: '#D32F2F',
  breakColor: '#388E3C'
};
var bar = new ProgressBar.Circle("#timer", {
  easing: 'linear',
  strokeWidth: 11,
  color: '#5bc0de',
  trailColor: '#757575',
  trailWidth: 1,
  text: {
    className: 'progress-text text-center',
    style: {
            color: '#fff',
            position: 'absolute',
            left: '31%',
            top: '40%'
    }
  },
  svgStyle: null,
  warnings:false
});
var designatedDate;
var timerType = "Break";

var round = function (number, precision) {
  var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }  
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
};
var toggleType = function(){
  if(timerType == 'Work'){
    timerType = 'Break';
  }else{
    timerType = 'Work';
  }
};
var showInfo = function(){
  var diff = Math.floor(((designatedDate - Date.now())/1000));
  var min = Math.floor(diff / 60);
  var sec = Math.floor(diff % 60);
  $(".progress-text").html("<h1 class='text-center'>" + timerType + "</h1><p class='text-center'>" + min + ":" + sec + "</p>");
};
var setFinishDate = function(){
  if(timerType == 'Work'){
    designatedDate = Date.now() + sets.pomoLen * 60 * 1000;
  } else {
    designatedDate = Date.now() + sets.breakLen * 60 * 1000;
  } 
};
var startSession = function() {
  $('#pom-start').attr("disabled", true);
  $('#pom-reset').attr("disabled", false);
  toggleType();
  setFinishDate();
  bar.setText('-');
  var len = 0;
  if(timerType == 'Work'){
      len = sets.pomoLen * 60 * 1000;
      bar.animate(1.0,{
        duration: len,
        color: '#D32F2F',
        step: function(){
          showInfo();
        }
      },function(){
        bar.set(0);
        startSession();
      });
  }else {
      len = sets.breakLen * 60 * 1000;
      bar.animate(1.0,{
        duration: len,
        text: {
          value: ' asdasd'
        },
        color: '#388E3C',
        step: function(){
          showInfo();
        }
      },function(){
        bar.set(0);
        startSession();
      });
  }
};
var resetSession = function() {
  $('#pom-start').attr("disabled", false);
  $('#pom-reset').attr("disabled", true);
  timerType = "Break";
  bar.stop();
  bar.set(0);
  $('.progress-text').empty();
};

$(document).ready(function(){
  $("#break-plus").on("click",function(){
    sets.breakLen++;
    if(sets.breakLen >= 60){
      sets.breakLen = 1;
    }
    $("#break-len").text(sets.breakLen);
  });
  $("#break-minus").on("click",function(){
    sets.breakLen--;
    if(sets.breakLen <= 0){
      sets.breakLen = 60;
    }
    $("#break-len").text(sets.breakLen);
  });
  $("#pom-plus").on("click",function(){
    sets.pomoLen++;
    if(sets.pomoLen >= 60){
      sets.pomoLen = 1;
    }
    $("#pom-len").text(sets.pomoLen);
  });
  $("#pom-minus").on("click",function(){
    sets.pomoLen--;
    if(sets.pomoLen <= 0){
      sets.pomoLen = 60;
    }
    $("#pom-len").text(sets.pomoLen);
  });
  $("#pom-start").on("click",function(){
    startSession();
  });
  $('#pom-reset').on("click",function(){
    resetSession();
  });
});