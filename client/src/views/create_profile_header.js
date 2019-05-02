const PubSub = require('../helpers/pub_sub');

class CreateProfileHeader {
  constructor(element) {
    this.element = element;
  };

  bindEvents() {
    PubSub.subscribe('MapIntroView:add-job-click', (event) => {
      this.clearText();
      this.renderText();
    });
  };

  clearText() {
    this.element.innerHTML = '';
  };

  renderText() {
    const text = document.createElement('h1');
    text.textContent = "Enter the job details";
    this.element.appendChild(text);
  };

};

module.exports = CreateProfileHeader;
