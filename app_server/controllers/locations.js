const homeList = (req,res) => {
    res.render('locations-list', {title: 'Loc8r - find a place to work with wifi',
        pageHeader: {title: 'Loc8r', strapline: 'Find places to work with wifi near you!'},
        locations:[{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS', 
            rating: 3, 
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'},]
    });
};
const locationInfo = (req,res) => {
    res.render('location-info', {title: 'Location Info'})
};
const addReview=(req,res) => {
    res.render('location-review-form', {title: 'Add Review'})
};

module.exports = {
  homeList,
  locationInfo,
  addReview
}