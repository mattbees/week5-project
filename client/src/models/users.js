const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');
const { OpenStreetMapProvider } = require("leaflet-geosearch");

class Users {
  constructor() {
    this.data = null;
  };

  getData() {
    const url = `http://localhost:3000/job_swap`;
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {
        this.data = data;
        PubSub.publish('Users:users-data-loaded', this.data);
    })
      .catch((message) => {
        console.error(message);
    });
  };

  // This doesn't work because of async issue:
  // postUser(profile) {
  //   console.log(profile);
  //   const coords = this.getLatLong(profile.home_location);
  //   profile.home_location = coords;
  //   console.log(profile.home_location);
  // };
  //
  // getLatLong(address) {
  //   async function latLong(address) {
  //     const provider = new OpenStreetMapProvider();
  //     const results = await provider.search({ query: address });
  //     const coordinates = [];
  //     coordinates.push(results[0].x);
  //     coordinates.push(results[0].y);
  //     console.log(coordinates);
  //     return coordinates;
  //   };
  //   latLong(address);
  // };



  // Attempting to code this longhand...:
  postUser(profile) {
    console.dir(this);
    async function latLong(object) {
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: object.home_location });
      console.dir(this);
      this.pushCoordinates(object.home_location, results);

      // let coordinates = [];
      // coordinates.push(results[0].x);
      // coordinates.push(results[0].y);
      // object.home_location = coordinates;
      console.log(object);

      // I don't like this because I am not abstracting this out as separate function
      const results2 = await provider.search({ query: object.job_location });
      coordinates = [];
      coordinates.push(results2[0].x);
      coordinates.push(results2[0].y);
      object.job_location = coordinates;
      console.log(object);
    };
    latLong(profile);
    // Then need to POST this to db. DOES THIS ALOS NEED TO BE WITHIN ASYNC FUNCTION?
  };

  pushCoordinates(property, asyncRes) {
    let coordinates = [];
    coordinates.push(asyncRes[0].x);
    coordinates.push(asyncRes[0].y);
    property = coordinates;
  };






};

module.exports = Users;
