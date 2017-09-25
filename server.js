const express = require('express'),
    handlebars = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    postController = require('./controllers/posts.controller');


const mainapp = express();
const router = express.Router();


const portNumber = process.env.CRUD_PORT_NR || 3000;


// Set configuration
mainapp.engine('handlebars', handlebars({ defaultLayout: 'main'}));
mainapp.set('view engine', 'handlebars');
mainapp.use(bodyParser.urlencoded( { extended: true }));
mainapp.use(methodOverride('_method'));
mainapp.use(express.static('./public'));


mongoose.connect('mongodb://localhost/reddit-clone');


mainapp.use('/', router);


// Post routes
router.get('/', postController.getHome);

router.get('/posts/', postController.createPost);
router.post('/posts/', postController.postNew);

router.get('/posts/:id', postController.getPostById);


// Set application port
mainapp.listen(portNumber, () => {
    console.log('Application is running on port == ' + portNumber);
});

