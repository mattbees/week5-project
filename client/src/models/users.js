const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');

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

  postUser(profile) {
    // TODO: convert locations to latlong and POST profile
    console.log('users.postUser', profile);
  };

};

module.exports = Users;
