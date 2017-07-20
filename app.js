var seq = [];
var corr = [];
var guesses = [];
maxNumbers = 5;
strictGame = false;

function strictMode () {
  ($('#onOff').is('.off')) ? off() :
    (
      strictGame=!strictGame,
      (strictGame)
      ? (
      runner('STRICT MODE: ACTIVE'),
      $('#strictLight').css('fill','red')
      )
      : (
        $('#strictLight').css('fill','black'),
        runner('EASY MODE: ACTIVE')
      )
    )
}

function wonGame() {
  runner('YOU WIN');
  sequencer([1,3,4,2]);
  setTimeout(function () {
    reset();
  },3710)
}

function reset() {
  ($('#onOff').is('.off')) ? off() :
  (
    guesses=[],
    seq=[],
    corr = [],
    testRunner(false)
  )
}
function increaseMax() {
    ($('#onOff').is('.off')) ? off() :
    (  maxNumbers+=5,
      setTimeout(function() {
        runner('WIN AT '+maxNumbers+' GOES');
      },100)
    )
}

function newGame () {
  ($('#onOff').is('.off')) ? off() :
(  reset(),
  setTimeout(function() {
    start();
  },200)
)

}

function turnOn() {
  $( "#onOff" ).toggleClass('on off');
  var time = new Date();
  var text = "READY TO PLAY SIMON? ";
  sequencer([1,3,4,2]);
  ($('#onOff').is('.on')) ? runner(text) : off()
}

function off() {
  for (var j=(window.ttime-window.ttime);j<(window.ttime+1);j++) {
    window.clearTimeout(j);
  }
  $('.running-text').html('')

}


function runner (data) {
  $('.running-text').html(' ')
  var count=0;
  var text = data;
  for (var i = 0; i < text.length; i++) {
    window.ttime = setTimeout(function() {
      var num = text[i];
      return ()=> {
        count++;
        (count===text.length) ? testRunner(false) : testRunner(true)
        $('.running-text').append(num);
        if($('.running-text').html().length===9){
          var rt = $('.running-text').html();
          $('.running-text').html(rt.substring(1, rt.length));
        }
      };
    }(i), 150*i);
  }
}

function testRunner(data) {
  (data) ? $('.dissed').css('z-index',1) : $('.dissed').css('z-index',-1)
  setTimeout(function () {
    (data) ? $('.dissed').css('z-index',1) : $('.dissed').css('z-index',-1)
  },800)
}

function start() {
  runner("NEW GAME    ")
  setTimeout(function() {
      runner('WATCH');
    setTimeout(function() {
      runner('START');
    },1500);
    numbers();
  },2500);
}

function generateNum() {
  min = Math.ceil(1);
  max = Math.floor(4);
  return Math.floor(Math.random() * (max - min+1)) + min;
}

function numbers() {
  seq.push(generateNum());
  sequencer();
}

function sequencer (data) {
  if(data) {
    seq=data;
  }
  var count=0;
  for (var i = 0; i < seq.length; i++) {
    setTimeout(function() {
      var num = seq[i];
      var guess = document.getElementById('guess '+num);
      return function() {
        count++;
        (count===seq.length) ? testRunner(false) : testRunner(true)
        guess.classList.add('flash');
        setTimeout(function (){
          guess.classList.remove('flash');
        },900)
      };
    }(i), 1000*i);
  }
}

function tester(data) {
  ($('#onOff').is('.on')) ? test(data) : off()
}

function test(data) {
  guesses.push(data);
  var comments = {
    one:"OK.TRY ",
    three:"NEXT : ",
    five:"KEEP IT UP ",
    ten:"EXCELLENT ",
    win:"YOU WON!",
    more:"AWESOME "
  }
  if (guesses[guesses.length-1]===seq[guesses.length-1] && seq[0]!==undefined) {
    corr.push(data);
    if (corr.length===seq.length) {
      var sq = seq.length;
      (sq===maxNumbers) ? wonGame() :
      (sq<3) ? runner(comments.one+(sq+1)) :
      (sq>=3) ? runner(comments.three+(sq+1)) :
      (sq>=5) ? runner(comments.five+(sq+1)) :
      (sq>=10) ? runner(comments.ten+(sq+1)) :
      runner(comments.more+(sq+1))
      ;
      (sq<maxNumbers)
      ?(
        guesses=[],
        corr=[],
        setTimeout(function() {
          numbers();
        },2000)
      )
      : null
}
  } else if(seq[0]!==undefined && strictGame==false) {
    runner("WRONG.....TRY AGAIN");
    guesses=[];
    corr = [];
    setTimeout(function() {
      sequencer();
    },3500)
  } else if(seq[0]!==undefined && strictGame==true) {

    runner('WRONG.. YOU LOST')
    setTimeout(function() {
      reset();
    },1000)
  }
}
