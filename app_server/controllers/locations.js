const axios = require('axios');
const apiOptions = {
    server: 'http://localhost:3000'
};      

const withComputedRating = (location) => {
    if (!location || !Array.isArray(location.reviews) || location.reviews.length === 0) {
        return location;
    }

    const total = location.reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0);
    const average = total / location.reviews.length;
    const computedRating = Math.max(0, Math.min(5, Math.round(average)));

    return {
        ...location,
        rating: computedRating
    };
};

const homeList = async (req, res, next) => {
    try {
        const path='/api/locations';
        const locations = await axios.get(`${apiOptions.server}${path}`);
        const locationsWithRating = locations.data.map((location) => withComputedRating(location));
        renderHomePage(req, res, locationsWithRating);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

const renderHomePage = (req,res,locations) => {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
            locations
    });
}
    
const locationInfo = async ( req,res, next) => {
    const path = `/api/locations/${req.params.locationid}`;
    try{
        const location = await axios.get(`${apiOptions.server}${path}`);
        const locationWithRating = withComputedRating(location.data);
        res.render('location-info', {
            title: 'Location Info', 
            location: locationWithRating});
    } catch (err) {
       console.error(err.message);
       next(err);
    }
};

const addLocationForm = async (req, res) => {
    res.render('location-form', {
        title: 'Add Location',
        formAction: '/location/new',
        submitLabel: 'Add Location'
    });
};

const addLocation = async (req, res, next) => {
    const postData = {
        name: req.body.name,
        address: req.body.address,
        distance: req.body.distance,
        facilities: req.body.facilities
            ? req.body.facilities.split(',').map((facility) => facility.trim()).filter(Boolean)
            : []
    };
    try {
        await axios.post(`${apiOptions.server}/api/locations`, postData);
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

const editLocationForm = async (req, res, next) => {
    const path = `/api/locations/${req.params.locationid}`;
    try {
        const location = await axios.get(`${apiOptions.server}${path}`);
        res.render('location-form', {
            title: 'Edit Location',
            formAction: `/location/${req.params.locationid}/edit`,
            submitLabel: 'Update Location',
            location: location.data
        });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

const editLocation = async (req, res, next) => {
    const path = `/api/locations/${req.params.locationid}`;
    const putData = {
        name: req.body.name,
        address: req.body.address,
        distance: req.body.distance,
        facilities: req.body.facilities
            ? req.body.facilities.split(',').map((facility) => facility.trim()).filter(Boolean)
            : []
    };
    try {
        await axios.put(`${apiOptions.server}${path}`, putData);
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};


const addReviewForm = async (req, res) => {
    res.render('location-review-form', {
        title: 'Add Review',
        locationid: req.params.locationid
    });
};


const addReview = async (req, res, next) => {
    const path = `/api/locations/${req.params.locationid}`;
    const postData = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    try {
        await axios.post(`${apiOptions.server}${path}/reviews`, postData);
        res.redirect(`/location/${req.params.locationid}`);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

const editReviewForm = async (req, res, next) => {
    const path = `/api/locations/${req.params.locationid}/reviews/${req.params.reviewid}`;
    try {
        const review = await axios.get(`${apiOptions.server}${path}`);
        res.render('location-review-edit-form', {
            title: 'Edit Review',
            locationid: req.params.locationid,
            reviewid: req.params.reviewid,
            review: review.data,
        });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

const editReview = async (req, res, next) => {
    const path = `/api/locations/${req.params.locationid}/reviews/${req.params.reviewid}`;
    const putData = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    try {
        await axios.put(`${apiOptions.server}${path}`, putData);
        res.redirect(`/location/${req.params.locationid}`);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

const deleteReview = async (req, res, next) => {
    const path = `/api/locations/${req.params.locationid}/reviews/${req.params.reviewid}`;
    try {
        await axios.delete(`${apiOptions.server}${path}`);
        res.redirect(`/location/${req.params.locationid}`);
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

const deleteLocation = async (req, res, next) => {
    const path = `/api/locations/${req.params.locationid}`;
    try {
        await axios.delete(`${apiOptions.server}${path}`);
        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};

module.exports = {
  homeList,
  locationInfo,
    addLocationForm,
    addLocation,
    editLocationForm,
    editLocation,
  addReviewForm,
  addReview,
  editReviewForm,
  editReview,
  deleteReview,
    deleteLocation,
}