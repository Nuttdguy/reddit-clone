const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
const router = express.Router();

// Set configuration
app.engine('handlebars', handlebars({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/', router);


// Routes
router.get('/', (req, res) => {
    res.render('home', {});
});


// Set application port
app.listen(3000, () => {
    console.log('Application is running on port 3000')
});

