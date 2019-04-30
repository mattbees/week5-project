const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');
const { OpenStreetMapProvider } = require("leaflet-geosearch");

class Users {
  constructor() {
    this.data = null;
  };

  getData(load) {
    const url = `http://localhost:3000/job_swap`;
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {
        this.data = data;
        if (load == 'firstLoad') {
          PubSub.publish('Users:users-data-loaded', this.data);
        } else if (load == 'secondLoad') {
          PubSub.publish('Users:users-data-reloaded', this.data);
        }
    })
      .catch((message) => {
        console.error(message);
    });
  };

  // TODO: Still need to change coords into format needed for map
  // TODO: Error message for no entry to address field.
  postUser(profile) {
    const user = {};
    user.name = profile.name;
    // user.current_job = profile.current_job;
    const provider = new OpenStreetMapProvider();
    provider.search({ query: profile.home_location })
    .then( (results_home) => {
      user.home_coords_x = results_home[0].x;
      user.home_coords_y = results_home[0].y;
      // Nesting to retain scope
      provider.search({ query: profile.job_location })
      .then( (results_job) => {
        user.job_coords_x = results_job[0].x;
        user.job_coords_y = results_job[0].y;
        // POST request
        const url = `http://localhost:3000/job_swap`;
        const request = new RequestHelper(url);
        request.post(user)
        // GET request
        .then((users) => {
          this.getData('secondLoad');
        })
        .catch(console.error);
      }); // END .then
    }); // END .then
  };

};

module.exports = Users;
