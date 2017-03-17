const express = require('express');
const router = express.Router();
const Place = require('./models/place');
const Restaurant = require('./models/restaurant');
const Activity = require('./models/activity');
const Hotel = require('./models/hotel');
const Promise = require('bluebird');

// app.get('/', function(req, res, next) {
// var outerScopeContainer = {};
//   Hotel.findAll()
//     .then(function (dbHotels) {
//       outerScopeContainer.dbHotels = dbHotels;
//       return Restaurant.findAll();
//     })
//   .then(function (dbRestaurants) {
//       outerScopeContainer.dbRestaurants = dbRestaurants;
//       return Activity.findAll();
//     })
//   .then(function (dbActivities) {
//     res.render('index', {
//       templateHotels: outerScopeContainer.dbHotels,
//       templateRestaurants: outerScopeContainer.dbRestaurants,
//       templateActivities: dbActivities
//     });
//   })
//   .catch(next);
// })

module.exports = router;