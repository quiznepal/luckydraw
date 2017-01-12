var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var time, timeEnd = false, isLuckyDraw = false,
	luckyOne = 0,luckyTwo = 0;

var port     = process.env.PORT || 3030;

var datahandler = require("./app/datahandler")

var names = [];

app.use(express.static(__dirname +'/public'));

/*app.get('/updatetime/:hrs/:min',function (req,res) {

	var hrs = (typeof req.param.hrs === 'string' ? parseInt(req.params.hrs) : 0),
		min = (typeof req.param.min === 'string' ? parseInt(req.params.min) : 0);

	hrs = (hrs < 0 ? 0 : hrs);
	min = (min < 0 ? 0 : min);


	// console.log(req.params.param1);
	time = Math.floor((Date.now())/1000)+hrs*60*60+min*60;
	timeEnd = false;
	res.send("yo");

});*/

datahandler(function (data) {
	console.log("data for names");
	console.log(data);
	
	names = data;
	
})

http.listen(port,function () {
	console.log('listening ', port);
})
console.log(Date.now());

// time = Math.floor((Date.now()+35000)/1000);
time = toTimestamp('01/12/2017 11:59:30')

io.on('connection',function (socket) {
	console.log('who connected now?? ');
	(timeEnd ? afterTimeEnd() : init());

	sendNames ();

	socket.on('disconnect',function () {
		console.log('damm s/he(*) got disconnected');
	})
})

function updateNames() {
	datahandler(function (data) {
		console.log("data for names");
		console.log(data);

		if (data.length > names.length) {
			names = data;
			sendNames();
		}
		

	})
}




function init() {
	setTimeout(function () {
		var diffTime = time- Math.floor(Date.now()/1000);
		tmObj = timehs(diffTime);
		if (diffTime == 10 || (diffTime/100 == 0 && diffTime > 10)) {
			updateNames();
		}
		console.log(tmObj);
		io.emit("time", tmObj);

		if (diffTime > 0) {
			init();
		} else {
			timeEnd = true;
			afterTimeEnd();

		}
	},1000);
};

function sendNames() {
	setTimeout(function (argumen) {
		if (names.length > 0) {
			io.emit("list of correct ans",names);
		} else {
			sendNames();
		}
	},50)
	
}



function timehs(time) {
	var sec =0,min=0,hrs=0,day=0
	sec = time;
	if (sec > 59) {
		min = Math.floor(sec/60);
		sec = sec - min*60;
	}

	if (min > 59) {
		hrs = Math.floor(min/60);
		min = min - hrs*60;
		// sec = sec - min*60;	
	}

	if (hrs > 23) {
		day = Math.floor(hrs/24);
		hrs = hrs - day*24;
	}

	return {day : day,
		hrs : hrs,
		min : min,
		sec : sec
	}
};

luckyDraw = function () {
	
	if (isLuckyDraw) {
		return [luckyOne,luckyTwo];
	}

	var len = names.length;

	luckyOne = Math.floor((Math.random() * len));
	luckyTwo = Math.floor((Math.random() * len));

	isLuckyDraw = true;
	return [luckyOne,luckyTwo];
}

afterTimeEnd = function () {
	var lucky = luckyDraw();

	console.log(names);
	
	io.emit("after time end", {winner : [names[luckyOne],names[luckyTwo]]});
};


function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum/1000;
}