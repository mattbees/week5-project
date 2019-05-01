const PubSub = require('../helpers/pub_sub');
const RequestHelper = require('../helpers/request_helper');
const { OpenStreetMapProvider } = require("leaflet-geosearch");

class Addresses {
  constructor() {
    this.data = null;
  };

  bindEvents() {
    PubSub.subscribe('WelcomeOptionsView:address-button-click', (event) => {
      this.data = event.detail;
      const coords = {};
      const provider = new OpenStreetMapProvider();
      provider.search({ query: this.data })
      .then( (results) => {
        coords.x = results[0].x;
        coords.y = results[0].y;
        PubSub.publish('Addresses:coords-ready', coords);
      });
    });
  };

};

module.exports = Addresses;
