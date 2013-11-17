(function() {
    var handle, reqHandler, router, server;

    server = require("./server");

    router = require("./router");

    reqHandler = require("./requestHandler");

    handle = {
	"/": reqHandler.start,
	"/noah": reqHandler.noah,
	"/shadia": reqHandler.shadia,
	"/gen": reqHandler.gen
    };

    server.start(router.route, handle);

}).call(this);