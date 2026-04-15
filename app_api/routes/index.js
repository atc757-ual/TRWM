var express = require('express');
var router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');


/* GET home page. */
router.get('/locations', ctrlLocations.locationsReadAll);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.post('/locations', ctrlLocations.locationsCreate);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.patch('/locations/:locationid', ctrlLocations.locationsPatchOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);

router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.patch('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsPatchOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);


module.exports = router;


/*para compilar: npm run start:dev */