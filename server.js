/**
 * server.js -> Entry point for the People10 Employee App server
 */

/**
 * Get the modules
 */
var express =  require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    ejs = require('ejs'),
    path = require('path');

/**
 * Instantiate express
 */
var app = express();

/**
 * MongoDB Connection
 */
var mLabURI = 'mongodb://admin:password@ds151242.mlab.com:51242/people10';

mongoose.connect(mLabURI, function(err) {
    if(err) {
        console.log('Error: Unable to connect to database');
        return;
    }
});

/**
 * Configure body-parser
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Allow CORS 
 */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

/**
 * MongoDB Models
 */
var EmployeeModel = require('./app/dbmodels/employee');

/**
 * Routes for the app
 */
var employeeRouter = require('./app/routers/employeeRouter')(EmployeeModel);

/**
 * Register the api routers
 */
app.use('/api', employeeRouter);

/**
 * Configure express to serve static html pages inside of your public folder
 */

/**
 * Set up the view engine
 */
app.set('views', __dirname + '/public/views');
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.set('view options', { layout: false });

/**
 * Register the public directory
 */
app.use(express.static(path.join(__dirname, '/public')));

/**
 * Controllers for the app
 */
var routingController = require('./app/controllers/routing');

/**
 * Set the server routes
 */
app.get('/', routingController.indexPage);
app.get('/partials/:partialName', routingController.partialsPages);
app.get('*', routingController.indexPage);


/** 
 * Set up PORT 
 */
var port = process.env.PORT || 3040;

/**
 * GET request response for API
 */
app.get('/api', function(req, res) {
    res.json({ status: "People10 Employee App API is running at port: " + port});
});

/**
 * Start the server
 */
app.listen(port, function() {
    console.log('People10 Employee App Server is running at port: ' + port);
});