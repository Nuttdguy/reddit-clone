const express = require('express'),
    handlebars = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    postController = require('./controllers/posts.controller'),
    commentsController = require('./controllers/comments.controller'),
    signupController = require('./controllers/auth.controller');


const mainapp = express();
const exphbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        count: function(count) {
            return count.size();
        }
    },
    // can use external function
});

const router = express.Router();
const portNumber = process.env.CRUD_PORT_NR || 3000;


// Set configuration
mainapp.engine('.hbs', exphbs.engine);
mainapp.set('view engine', '.hbs');
mainapp.use(bodyParser.urlencoded( { extended: true }));
mainapp.use(methodOverride('_method'));
mainapp.use(express.static('./public'));
mainapp.use(cookieParser());

mongoose.connect('mongodb://localhost/reddit-clone');


mainapp.use('/', router);

// Post routes
router.get('/', postController.getHome);

router.get('/posts/', postController.createPost);
router.post('/posts/', postController.postNew);

router.get('/posts/:id', postController.getPostById);
router.get('/n/:subreddit', postController.getPostReddit);

router.get('/comments/:postId/comments', commentsController.newComment);
router.post('/comments/:postId/comments', commentsController.createComment);

router.get('/signup', signupController.getSignUp);
router.post('/signup', signupController.signUp);


// start application
mainapp.listen(portNumber, () => {
    console.log('Application is running on port == ' + portNumber);
});


// // Let's say it's like this in this example
//
// var express = require('express');
// var app = express();
//
// app.use(function (req, res, next) {
//     var user = User.findOne({ email: 'someValue' }, function (err, user) {
//         // Returning a document with the keys I'm interested in
//         req.user = { key1: value1, key2: value2... }; // add the user to the request object
//         next(); // tell express to execute the next middleware
//     });
// });
//
// // Here I include the route
// require('./routes/public.js')(app); // I would recommend passing in the app object

// module.export = function(app) {
//     app.get('/', function(req, res) {
//         // Serving Home Page (where I want to pass in the values)
//         router.get('/', function (req, res) {
//             // Passing in the values for Swig to render
//             var user = req.user; // this is the object you set in the earlier middleware (in app.js)
//             res.render('index.html', { pagename: user.key2, ... });
//         });
//     });
// });
