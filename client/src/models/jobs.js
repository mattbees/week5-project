const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');
const { OpenStreetMapProvider } = require("leaflet-geosearch");

class Jobs {
  constructor() {
    this.data = null;
  };

  getData() {
    const url = `http://localhost:3000/job_swap`;
    const request = new RequestHelper(url);
    request.get()
      .then((data) => {
        this.data = data;
        PubSub.publish('Jobs:jobs-data-loaded', this.data);
      }).catch((message) => {
        console.error(message);
    });
  };

  postJob(profile) {
    const job = {};
    job.title = profile.title;
    job.address = profile.address;
    job.image_src = `./images/general.png`;
    const provider = new OpenStreetMapProvider();
    provider.search({ query: profile.address })
    .then( (results) => {
      job.coords_x = results[0].x;
      job.coords_y = results[0].y;
      // POST request
      const url = `http://localhost:3000/job_swap`;
      const request = new RequestHelper(url);
      request.post(job)
      // GET request
      .then((jobs) => {
        this.getData();
      })
      .catch(console.error);
    }); // END .then
  };

  deleteJob(id) {
    const url = `http://localhost:3000/job_swap/${id}`;
    const request = new RequestHelper(url);
    request.delete()
      .then((jobs) => {
        this.getData();
        PubSub.publish('Jobs:job-deleted');
      })
      .catch(console.error);
  };

};

module.exports = Jobs;

  // // DEMO EXAMPLE
  // postUser(profile) {
  //   const user = {};
  //   user.name = profile.name;
  //   console.log(profile.image_src.name);
  //   user.image_src = `./images/${profile.image_src.name}`;
  //   // user.current_job = profile.current_job;
  //   const provider = new OpenStreetMapProvider();
  //   provider.search({ query: profile.home_location })
  //   .then( (results_home) => {
  //     user.home_coords_x = results_home[0].x;
  //     user.home_coords_y = results_home[0].y;
  //     // Nesting to retain scope
  //     provider.search({ query: profile.job_location })
  //     .then( (results_job) => {
  //       user.job_coords_x = results_job[0].x;
  //       user.job_coords_y = results_job[0].y;
  //       // POST request
  //       const url = `http://localhost:3000/job_swap`;
  //       const request = new RequestHelper(url);
  //       request.post(user)
  //       // GET request
  //       .then((users) => {
  //         this.getData('secondLoad');
  //       })
  //       .catch(console.error);
  //     }); // END .then
  //   }); // END .then
  // };
