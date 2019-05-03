const PubSub = require('../helpers/pub_sub');

class MapIntroView {
  constructor(element) {
    this.element = element;
    this.distance = null;
    this.startValue = null; // element of array to start at on 'view more' click
  };

  bindEvents() {
    PubSub.subscribe('MapView:markers-added', (event) => {
      this.startValue = event.detail.tracker+1; // set element to start next loop at
      this.distance = Math.ceil((event.detail.distance));
      this.clearText();
      const text = this.renderText();
      this.element.appendChild(text);
    });
  };

  clearText() {
    this.element.innerHTML = '';
  }

  renderText() {
    const div = document.createElement('div');
    const text = document.createElement('h2');
    text.textContent = `Jobs within ${this.distance} km of where you live.`
    div.appendChild(text);
    const button1 = this.createButton1();
    div.appendChild(button1);
    const button2 = this.createButton2();
    div.appendChild(button2);
    return div;
  };

  createButton1() {
    const button1 = document.createElement('button');
    button1.textContent = 'See more jobs';
    button1.classList.add('ui', 'secondary', 'basic', 'button')
    button1.addEventListener('click', (event) => {
      PubSub.publish('MapIntroView:view-more-click', this.startValue);
    });
    return button1;
  };

  createButton2() {
    const button2 = document.createElement('button');
    button2.textContent = 'Add a job';
    button2.classList.add('ui', 'secondary', 'basic', 'button')
    button2.addEventListener('click', (event) => {
      PubSub.publish('MapIntroView:add-job-click');
    });
    return button2;
  };

};

module.exports = MapIntroView;
