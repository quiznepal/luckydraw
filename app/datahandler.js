const request = require('request')
     ,url = 'https://raw.githubusercontent.com/quiznepal/rawcollection/master/otakuluckydraw.json'

     var dataRequest = function (callback) {
     	request(url, function (error, response, body) {
     		if (!error && response.statusCode === 200) {
     			const list = JSON.parse(body)
     			console.log("Got a response: ", list.correctAns)
     			callback(list.correctAns);
     		} else {
     			console.log("Got an error: ", error, ", status code: ", response.statusCode)
     		}
     	})
     }
 

module.exports = dataRequest;