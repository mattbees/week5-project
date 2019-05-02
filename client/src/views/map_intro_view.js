const PubSub = require('../helpers/pub_sub');

class MapIntroView {
  constructor(element) {
    this.element = element;
    this.data = null;
  };

  bindEvents() {
    PubSub.subscribe('MapView:markers-added', (event) => {
      console.log("WORKING");
    });
  };

};

module.exports = MapIntroView;
