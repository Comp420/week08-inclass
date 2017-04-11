var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

//Dummy database. DON'T USE THIS IN REAL APPS!
var courses		   = require('./courses').academic.courses;

var port = 3000; 

app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 

//Shorten paths for front-end use
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(express.static(__dirname + '/public')); 

app.set('view engine', 'ejs');

// Set up routes
app.get('/', function(req, res) {
	res.render('pages/index', {
		courses: courses
	});
});

app.get('/api/courses', function(req,res) {
	console.log("Got a query!", req.query.courseNum);
	res.json(courses.filter(function(course) {
		return course.catalog_number === req.query.courseNum;
	}));
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port, function() {
	console.log('Magic happens on port ' + port);
});


// expose app           
exports = module.exports = app;