
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var assignmentList = require('./routes/assignmentList');
var calendarView = require('./routes/calendarView');
var createAssignment = require('./routes/createAssignment');
var help = require('./routes/help');
var listview = require('./routes/listview');
var signOut = require('./routes/signOut');
var maincalendar = require('./routes/maincalendar');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/assignmentlist', assignmentList.view);
app.get('/calendarview', calendarView.view);
app.get('/createAssignment', createAssignment.view);
app.get('/help', help.view);
app.get('/listview', listview.view);
app.get('/signout', signOut.view);
app.get('/maincalendar', maincalendar.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
