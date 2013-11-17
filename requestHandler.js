(function() {
    var formidable, fs, qs, send, start, receive;

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
	form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		return fs.rename(files.noah.path, "./test.txt", function(err) {
			if (err) {
			    fs.unlink("./test.txt");
			    return fs.rename(files.noah.path, "./test.txt");
			}
		    });
	    });
	
	response.writeHead(200, {
		"Content-Type": 'text/html'
		    });
	response.write("received text: <br/> <a href='/shadia'>The file you sent me</a> <br/>");
	response.write("the json I will send: <br/> <a href='/gen'>The json I will send</a>");

	return response.end();
	
    };

    shadia = function(response) {
	console.log("Request handler 'shadia' was called.");
	return fs.readFile("./test.txt", "binary", function(error, file) {	
		if (error) {
		    response.writeHead(500, {
			    "Content-Type": 'text/plain'
				});
		    response.write("WTF" + error + " \n");
		    return response.end();
		} else {
		    response.writeHead(200, {
			    "Content-Type": 'text/plain'
				});
		    response.write(file, "binary");
		    /*		    response.writeHead(200, {
			    "Content-Type": 'text/html'
				});
		    response.write("the json I will send: <br/> <a href='/gen'>The json I will send</a>");
		    */return response.end();
		}
		});
	
    };
    
    gen = function(response){
	console.log("Request handler for 'gen' was called.");
	return fs.readFile("./test.txt", "binary", function(error, file) {
		if (error) {
		    response.writeHead(500, {
			    "Content-Type": 'text/plain'
			});
		    response.write("infinite tears " + error + " \n");
		    return response.end();
		} else {
		    response.writeHead(200, {
			    "Content-Type": 'text/plain'
				});
		    response.write(file, "binary");
		    return response.end();
		}
	    });
    }

    exports.start = start;

    exports.shadia = shadia;

    exports.noah = noah;

    exports.gen = gen;

}).call(this);