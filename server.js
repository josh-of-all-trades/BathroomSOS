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
	    /*http.get("http://localhost:8888/", function(response){
		    var data = '';

		    response.on('data', function (chunk){
			    data += chunk;
			});

		    response.on('end',function(){
			    //var obj = JSON.parse(data);
			    //console.log(data);
			})

			});*/
	    //res.end();
	    //fetchJSON();
	    return route(handle, pathname, res, req);
	};
	http.createServer(onRequest).listen(8888);
      	return console.log("Server started at http://127.0.0.1:8888");
    };


    function fetchJSON(){
	http.get("http://localhost:8888/", function(response){
		var data = '';
		response.on('data', function (chunk){
			data += chunk;
		    });
		
		response.on('end',function(){
			var obj = JSON.parse(data);
			console.log(obj);
			//setTimeout(fetchJSON, 1000);
		    })
		    });
    }

    exports.start = start;

}).call(this);

