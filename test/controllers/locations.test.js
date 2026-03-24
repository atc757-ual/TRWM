const locations = require('../../app_server/controllers/locations');

describe('Locations controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = { render: jest.fn() };
  });

  test('homeList renders locations-list with expected data', () => {
    locations.homeList(req, res);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('locations-list', expect.objectContaining({
      title: expect.any(String),
      locations: expect.any(Array),
      pageHeader: expect.objectContaining({ title: expect.any(String) })
    }));
  });

  test('locationInfo renders location-info', () => {
    locations.locationInfo(req, res);
    expect(res.render).toHaveBeenCalledWith('location-info', {title: 'Location Info'});
  });

  test('addReview renders location-review-form', () => {
    locations.addReview(req, res);
    expect(res.render).toHaveBeenCalledWith('location-review-form', {title: 'Add Review'});
  });
});
