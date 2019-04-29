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
  postUser(profile) {
    const user = {};
    user.name = profile.name;
    user.current_job = profile.current_job;
    const provider = new OpenStreetMapProvider();
    provider.search({ query: user.home_location })
    .then( (results1) => {
      user.home_coords = this.pushCoordinates(user.home_location, results1)
      // Nesting to retain scope
      provider.search({ query: user.job_location })
      .then( (results2) => {
        user.job_coords = this.pushCoordinates(user.job_location, results2)
        console.log(user);
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

  pushCoordinates(property, asyncRes) {
    let coordinates = [];
    coordinates.push(asyncRes[0].x);
    coordinates.push(asyncRes[0].y);
    property = coordinates;
    return property;
  };

};

module.exports = Users;
