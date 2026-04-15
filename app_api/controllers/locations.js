
const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsReadAll = async (req, res) => {
    try {
        const locations = await Loc.find();
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const locationsReadOne = async (req, res) => {
    try {
        const location = await Loc.findById(req.params.locationid).exec(); 
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }   
};

const locationsCreate = async (req, res) => {
    try {
        const location = await Loc.create(req.body);
        res.status(201).
        json(location);
    }
    catch (err) {
        res.status(500).
        json({ error: err.message });
    }
};

const locationsUpdateOne = async (req, res) => {
    try {
        const location = await Loc.findByIdAndUpdate(
            req.params.locationid, 
            req.body, 
            { new: true, runValidators: true } //Si no pongo new a true, me devuelve el documento original
        ).exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location);
    }
    catch (err) {
        console.error(err.message)
        if(err.name === 'castError' || err.name === 'ValidationError') {
            return res.status(400).json({ message:"Bad Request" });
        }
        res.status(500).json({ message:"Unknown Error" });
    }
};

const locationsPatchOne = async (req, res) => {
    try {
        const location = await Loc.findByIdAndUpdate(
            req.params.locationid,
            {
                $set: req.body
            },
            { new: true, runValidators: true }
        ).exec();
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });

        }
        res.status(200).json(location);
    }
    catch (err) {
        console.error(err.message)
        if(err.name === 'castError' || err.name === 'ValidationError') {
            return res.status(400).json({ message:"Bad Request" });
        }
        res.status(500).json({ message:"Unknown Error" });
    }
};

const locationsDeleteOne = async (req, res) => {
    try {
        const location = await Loc.findByIdAndDelete(req.params.locationid).exec(); 
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(204).json();
    }
    catch (err) {
        console.error(err.message)
        if(err.name === 'castError') {
            return res.status(400).json({ message:"Bad Request" });
        }
        res.status(500).json({ message:"Unknown Error" });
    }
};


module.exports = {
  locationsReadAll,
  locationsReadOne,
  locationsCreate,
  locationsUpdateOne,
  locationsDeleteOne,
  locationsPatchOne
}