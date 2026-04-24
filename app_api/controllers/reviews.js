
const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsReadOne= async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).select("name reviews").exec();  
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
            return res.status(404).json({ message: 'Review not found', location: location.name });
        }
        res.status(200).json(review);
    }
    catch (err) {
        console.error('reviewsReadOne error:', err);
        res.status(500).json({ error: err.message });
    }
};

const reviewsCreate = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).select("name reviews").exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        location.reviews.push(req.body);
        await location.save();
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
        review.deleteOne();
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