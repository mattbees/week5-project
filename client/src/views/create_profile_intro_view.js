const PubSub = require('../helpers/pub_sub');

class CreateProfileIntroView {
  constructor(element) {
    this.element = element;
  };

  bindEvents() {
    PubSub.subscribe('WelcomeOptionsView:create-profile-click', (event) => {
      this.clearText();
      const formIntro = this.renderFormIntro();
      this.element.appendChild(formIntro);
    });
  };

  clearText() {
    this.element.innerHTML = '';
  };

  renderFormIntro() {
    const introText = document.createElement('p');
    introText.textContent = 'Create a profile to view users with similar jobs in your area.';
    return introText;
  };

};

module.exports = CreateProfileIntroView;
