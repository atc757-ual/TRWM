var express = require('express');
var router = express.Router();


/*const ctrlMain = require('../controllers/main');*/
const ctrlLocations = require('../controllers/locations');
const ctrlAbout = require('../controllers/others');
/* GET home page. */
router.get('/', ctrlLocations.homeList);
router.get('/location/', ctrlLocations.locationInfo);
router.get('/location-review-form', ctrlLocations.addReview);

/*Others*/

router.get('/about', ctrlAbout.about);

module.exports = router;


/*para compilar: npm run start:dev */