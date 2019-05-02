const PubSub = require('../helpers/pub_sub');

class MapIntroView {
  constructor(element) {
    this.element = element;
    this.data = null;
  };

  bindEvents() {
    PubSub.subscribe('MapView:markers-added', (event) => {
      this.data = Math.ceil((event.detail/1000));
      this.clearText();
      this.renderText();
      console.dir(event.detail);
    });
  };

  clearText() {
    this.element.innerHTML = '';
  }

  renderText() {
    const text = document.createElement('h2');
    text.textContent = `These jobs are within ${this.data} km of where you live.`
    this.element.appendChild(text);
  };

};

module.exports = MapIntroView;
