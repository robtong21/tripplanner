const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const nunjucks = require('nunjucks');

const db = require('./db').db;
const Place = require('./db/models/place');
const Restaurant = require('./db/models/restaurant');
const Activity = require('./db/models/activity');
const Hotel = require('./db/models/hotel');
const Promise = require('bluebird');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

nunjucks.configure('views', { noCache: true });
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use(express.static('public'));

// root path
app.get('/', function(req, res, next) {
  var outerScopeContainer = {};
  var findingHotels = Hotel.findAll();
  var findingRestaurants = Restaurant.findAll();
  var findingActivities = Activity.findAll();
  Promise.all([findingHotels,findingRestaurants,findingActivities])
    .then(function([hotels, restaurants, activities]) {
        outerScopeContainer.dbHotels = hotels;
        outerScopeContainer.dbRestaurants = restaurants;
        outerScopeContainer.dbActivities = activities;
        res.render('index', {
          templateHotels: outerScopeContainer.dbHotels,
          templateRestaurants: outerScopeContainer.dbRestaurants,
          templateActivities: outerScopeContainer.dbActivities
        });
    })
    .catch(next);
})
  

// error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
    .render('error', {message: err.message});
});

db.sync({})
  .then(() => {
    console.log(chalk.cyan('DB SYNCED!'));
    app.listen(1337, () => {
      console.log(chalk.green('Planning on port 1337'));
    });
  })
  .catch(err => {
    console.log(chalk.red('DB SYNC WENT WRONG...'));
  });










