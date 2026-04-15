
const mongoose = require('mongoose');
const { locationInfo } = require('../../app_server/controllers/locations');
const Loc = mongoose.model('Location');

const reviewsReadOne= async (req, res) => {
    try {
        console.log('reviewsReadOne params:', req.params);
        const location = await Loc.findById(req.params.locationid).select("name reviews").exec();  
        if (!location) {
            console.log('Location not found for id:', req.params.locationid);
            return res.status(404).json({ message: 'Location not found' });
        }

        console.log('Location found:', location.name);
        console.log('Review ids in location:', location.reviews.map((review) => review._id.toString()));

        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
            console.log('Review not found for id:', req.params.reviewid);
            return res.status(404).json({ message: 'Review not found', location: location.name });
        }

        console.log('Review found:', review);
        res.status(200).json(review);
    }
    catch (err) {
        console.error('reviewsReadOne error:', err);
        res.status(500).json({ error: err.message });
    }
};

const reviewsCreate = async (req, res) => {
    try {
        console.log('reviewsCreate params:', req.params);
        console.log('reviewsCreate body:', req.body);
        const location = await Loc.findById(req.params.locationid).select("name reviews").exec();
        if (!location) {
            console.log('Location not found for review create:', req.params.locationid);
            return res.status(404).json({ message: 'Location not found' });
        }
        location.reviews.push(req.body);
        await location.save();
        console.log('Created review:', location.reviews[location.reviews.length - 1]);
        res.status(201).json(location.reviews[location.reviews.length - 1]);
    }
    catch (err) {
        console.error('reviewsCreate error:', err);
        res.status(500).json({ error: err.message });
    }
};


const reviewsUpdateOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).select("name reviews").exec();   
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.author = req.body.author;
        review.rating = req.body.rating;
        review.reviewText = req.body.reviewText;
        await location.save();
        res.status(200).json(review);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const reviewsPatchOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).select("name reviews").exec();   
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }   
        if (req.body.author !== undefined) {
            review.author = req.body.author;
        }
        if (req.body.rating !== undefined) {
            review.rating = req.body.rating;
        }
        if (req.body.reviewText !== undefined) {

            review.reviewText = req.body.reviewText;
        }
        await location.save();
        res.status(200).json(review);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const reviewsDeleteOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).select("name reviews").exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }   
        review.remove();
        await location.save();
        res.status(204).json();
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
  reviewsReadOne,
  reviewsCreate,
  reviewsUpdateOne,
  reviewsPatchOne,
  reviewsDeleteOne

}