$(function () {

	var socket = io();
	socket.on('time',function (msg) {
		/*$('.time').html(
"<span>"+msg.day+" day </span>"+
"<span>"+msg.hrs+" hrs </span>"+
"<span>"+msg.min+" min </span>"+
"<span>"+msg.sec+" sec </span>");
	*/
	if (msg.day !== 0) {
		$('.time .day').text(msg.day+" day(s)");
	}

	if (msg.hrs !== 0) {
		$('.time .hours').text(("0"+msg.hrs).slice(-2));
		$('.time .hours_blink.blink_me').show();
	} else {
		$('.time .hours_blink.blink_me').hide();
	}

	$('.time .minute').text(("0"+msg.min).slice(-2));
	$('.time .second').text(("0"+msg.sec).slice(-2));
	})
});
