const axios = require('axios');
const apiOptions = {
    server: 'http://localhost:3000'
};      

const homeList = async (req, res, next) => {
    try {
        const path='/api/locations';
        const locations = await axios.get(`${apiOptions.server}${path}`);
        renderHomePage(req, res, locations.data);
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
        res.render('location-info', {
            title: 'Location Info', 
            location: location.data});
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

module.exports = {
  homeList,
  locationInfo,
    addReviewForm,
  addReview,
}