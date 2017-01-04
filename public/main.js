$(function () {
	var $time = $('.time'),
		animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		$winner = $(".winner");

	var socket = io();
	socket.on('time',function (msg) {
		$time.show();
		if (msg.day !== 0) {
			$time.find('.day').text(msg.day+" day(s)");
		}

		if (msg.hrs !== 0) {
			$time.find('.hours').text(("0"+msg.hrs).slice(-2));
			$time.find('.hours_blink.blink_me').show();
		} else {
			$time.find('.hours_blink.blink_me').hide();
		}

		$time.find('.minute').text(("0"+msg.min).slice(-2));
		$time.find('.second').text(("0"+msg.sec).slice(-2));
	});

	socket.on('after time end', function (msg) {
		$time.hide();
		$('.winner h1').text(msg.name);
		$('.winner').show();
		$winner.find('h1').addClass('animated flip').one(animationend,function () {
		$winner.find('.congrats').css("visibility", "visible").addClass('animated bounceInUp').one(animationend,function () {
			$winner.find('.stars').css("visibility", "visible").addClass('animated infinite flash');
		})
	});
	

	});
	
	

});
