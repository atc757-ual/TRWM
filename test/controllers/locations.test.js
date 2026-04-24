jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

const axios = require('axios');
const locations = require('../../app_server/controllers/locations');

describe('Locations controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: { locationid: '123', reviewid: '456' }, body: {} };
    res = { render: jest.fn() };
    jest.clearAllMocks();
  });

  test('homeList renders locations-list with expected data', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    await locations.homeList(req, res);

    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.render).toHaveBeenCalledWith('locations-list', expect.objectContaining({
      title: expect.any(String),
      locations: expect.any(Array),
      pageHeader: expect.objectContaining({ title: expect.any(String) })
    }));
  });

  test('locationInfo renders location-info', async () => {
    axios.get.mockResolvedValueOnce({ data: { name: 'Test', reviews: [] } });

    await locations.locationInfo(req, res);

    expect(res.render).toHaveBeenCalledWith('location-info', expect.objectContaining({
      title: 'Location Info',
      location: expect.objectContaining({ name: 'Test' })
    }));
  });

  test('addReviewForm renders location-review-form', () => {
    locations.addReviewForm(req, res);
    expect(res.render).toHaveBeenCalledWith('location-review-form', {
      title: 'Add Review',
      locationid: '123'
    });
  });
});
