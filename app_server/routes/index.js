var express = require('express');
var router = express.Router();

/*const ctrlMain = require('../controllers/main');*/
const ctrlLocations = require('../../app_server/controllers/locations');
const ctrlAbout = require('../../app_server/controllers/others');


/* GET home page. */
router.get('/', ctrlLocations.homeList);
router.get('/location/new', ctrlLocations.addLocationForm);
router.post('/location/new', ctrlLocations.addLocation);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/:locationid/edit', ctrlLocations.editLocationForm);
router.post('/location/:locationid/edit', ctrlLocations.editLocation);
router.get('/location/:locationid/review/new', ctrlLocations.addReviewForm);
router.post('/location/:locationid/review/new', ctrlLocations.addReview);
router.get('/location/:locationid/review/:reviewid/edit', ctrlLocations.editReviewForm);
router.post('/location/:locationid/review/:reviewid/edit', ctrlLocations.editReview);
router.get('/location/:locationid/review/:reviewid/delete', ctrlLocations.deleteReview);
router.post('/location/:locationid/review/:reviewid/delete', ctrlLocations.deleteReview);
router.get('/location/:locationid/delete', ctrlLocations.deleteLocation);
router.post('/location/:locationid/delete', ctrlLocations.deleteLocation);
/*Others*/

router.get('/about', ctrlAbout.about);

module.exports = router;


/*para compilar: npm run start:dev */