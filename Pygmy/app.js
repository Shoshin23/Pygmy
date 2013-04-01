
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , partials = require('express-partials') //initially part of 2.x now using this middleware one can use partials in 3.x also. 
  , app = express();

global.io = require('socket.io').listen(app.listen(3000));

io.configure(function () {
	//the preffered transport methods are websockets and xhr-polling
	io.set('transports', ['websocket', 'xhr-polling']);
	//the detail to which the server should o/p to logger - just give me the errors in this case.
	io.set('log level', 0);
	io.set('force new connection', true);
});
//when connection event is triggered.
io.sockets.on('connection', function(socket)
		{
			
			socket.on('setMaxThreads', function(data) { });
		});


app.configure(function(){
 //uncomment if you're going to push to Heroku.
	// app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs'); //default is jade, i'm using ejs here.
  //
  app.set('view options', {layout:true, pretty:true}); //pretty priny my shit yo! 
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(partials()); //using partials through the express-partials middleware.
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public'))); 
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./routes')(app); 

