var express = require('express');
var router = express.Router();

/*const ctrlMain = require('../controllers/main');*/
const ctrlLocations = require('../../app_server/controllers/locations');
const ctrlAbout = require('../../app_server/controllers/others');


/* GET home page. */
router.get('/', ctrlLocations.homeList);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/:locationid/review/new', ctrlLocations.addReviewForm);
router.post('/location/:locationid/review/new', ctrlLocations.addReview);
/*Others*/

router.get('/about', ctrlAbout.about);

module.exports = router;


/*para compilar: npm run start:dev */