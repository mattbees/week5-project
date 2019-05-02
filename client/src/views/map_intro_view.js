const PubSub = require('../helpers/pub_sub');

class MapIntroView {
  constructor(element) {
    this.element = element;
    this.distance = null;
    this.startValue = null; // element of array to start at on 'view more' click
  };

  bindEvents() {
    PubSub.subscribe('MapView:markers-added', (event) => {
      this.startValue = event.detail.tracker;
      this.distance = Math.ceil((event.detail.distance/1000));
      this.clearText();
      this.renderText();
    });
  };

  clearText() {
    this.element.innerHTML = '';
  }

  renderText() {
    const text = document.createElement('h2');
    text.textContent = `These jobs are within ${this.distance} km of where you live.`
    const button = document.createElement('button');
    button.textContent = 'See more jobs.';
    button.addEventListener('click', (event) => {
      PubSub.publish('MapIntroView:view-more-click', this.startValue);
    });
    this.element.appendChild(text);
    this.element.appendChild(button);
  };

};

module.exports = MapIntroView;
