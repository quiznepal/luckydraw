$(function () {
	var $time = $('.time');
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
		$('.winner').show().text(msg);
	})

});
