(function() {
    var http, start, url;

    http = require('http');

    url = require('url');

    start = function(route, handle) {
	var onRequest;
	onRequest = function(req, res) {
	    var pathname, postData;
	    postData = "";
	    pathname = url.parse(req.url).pathname;
	    console.log("Request for " + pathname + " received.");
	    return route(handle, pathname, res, req);
	};
	http.createServer(onRequest).listen(8888);
	return console.log("Server started at http://127.0.0.1:8888");
    };

    exports.start = start;

}).call(this);