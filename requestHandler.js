var jsonbody = "";
var stack = [];
(function() {
    var formidable, fs, qs, send, start, receive;
    //var stack = [];
    //var jsonbody = "";

    qs = require("querystring");

    fs = require("fs");

    formidable = require("formidable");

    start = function(response) {
	var body;
	console.log("Request handler 'start' was called");
	body = "<!doctype html>\n<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html\" charset=UTF-8 />\n</head>\n<body>\n<form action=\"/noah\" enctype=\"multipart/form-data\" method=\"post\">\n<input type=\"file\" name=\"noah\">\n<input type=\"submit\" value=\"Noah\" />\n</form>\n</body>\n</html>";
	response.writeHead(200, {
		"Content-Type": "text/html"
		    });
	response.write(body);
	return response.end();
    };

    noah = function(response, request) {
	var form;
	console.log("Request handler 'send' was called");
	
	//var body = "";
	request.on('data', function (chunk) {
		jsonbody += chunk;
	    });
	request.on('end', function () {
		console.log('POSTed: ' + jsonbody);
		response.writeHead(200);
		//response.end(postHTML);
		response.writeHead(200, {
			"Content-Type": 'text/html'
			    });
		response.write("received text: <br/> <a href='/shadia'>The file you sent me</a> <br/>");
		response.write("the json I will send: <br/> <a href='/gen'>The json I will send</a>");
		//console.log(JSON.parse(jsonbody));
		gen()
	    });
	response.end(
		     //shadia()
		     
		     );

	return response.end();
	
    };

    shadia = function(response) {
	
	console.log("Request handler 'shadia' was called.");
	console.log("shadia's shit");
	
	var close = within1000feet();
	
    };
    
    gen = function(response){
	console.log("Request handler for 'gen' was called.");
	var msg = JSON.parse(jsonbody);
	var index = 0;
	var lowestID = 0;
	while (lowestID == 0){
	    lowestID = lowestJobID(stack, index);
	    index++;
	    
	}
	
	msg.JobID = lowestID;
	msg.TimeStamp = Number(new Date());

	//console.log("gen shit");
	console.log(msg);
	if (1){
	    console.log("josh is so unimpressive so noah probs hates him qq");
	}
	/*response.writeHead(200, {
		"Content-Type": 'text/plain'
		    });
		    response.write(str, "binary");*/
	//response.end();
	//return response.end();
	//console.log("infinite cries");
    }

    exports.start = start;

    exports.shadia = shadia;

    exports.noah = noah;

    exports.gen = gen;

}).call(this);

function within1000ft(current, list){
    var closeby = [];
    var R = 6371;
    for (var i = 0; i list.length; i++){
	if(Number(new Date()) - list[i].TimeStamp >= 10) {
	    list.splice(i, 1);
	    i--;
	    continue;
	} 
	var xdist = (Number(current.Longitude) - Number(list[i].Longitude)).toRad();
	var ydist = (Number(current.Latitude) - Number(list[i].Latitude)).toRad();
	var lat2 = Number(current.Latitutde);
	var lat1 = Number(list[i].Latitude);
	var sinstuff = var a = Math.sin(ydist/2) * Math.sin(ydist/2) + Math.sin(xdist/2) * Math.sin(xdist/2) * Math.cos(lat1) * Math.cos(lat2); 
	var arctanstuff = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var dist = R*c * 3280;
	if (dist < 1000){
	    closeby.push(list[i]);
	}
    }
    return closeby;
}

function lowestJobID(stack, index){

    if (index > stack.length) {
	return 1;
    }

    var ind = 0;
    var jobId = stack[ind];
    while(jobId != index){
	ind++;
	if(ind > stack.length){
	    return 1;
	}
	jobId = stack[ind];
    }

    return 0;

}
