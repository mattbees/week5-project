const PubSub = require('../helpers/pub_sub');

class WelcomeOptionsView {
  constructor(element) {
    this.element = element;
    this.data = null;
  };

  bindEvents() {
    PubSub.subscribe('Users:users-data-loaded', (event) => {
      this.data = event.detail;
      const welcomeButtons = this.renderButtonsDiv();
      this.element.appendChild(welcomeButtons);
    });
  };

  renderButtonsDiv() {
    const buttonsDiv = document.createElement('div');
    const profile = this.createProfileButton();
    buttonsDiv.appendChild(profile);
    const view = this.createViewButton();
    buttonsDiv.appendChild(view);
    return buttonsDiv;
  };

  createProfileButton() {
    const createButton = document.createElement('button');
    createButton.textContent = 'Create a profile';
    createButton.addEventListener('click', (event) => {
      PubSub.publish('WelcomeOptionsView:create-profile-click');
    });
    return createButton;
  };

  createViewButton() {
    const createView = document.createElement('button');
    createView.textContent = 'View current jobs';
    createView.addEventListener('click', (event) => {
      PubSub.publish('WelcomeOptionsView:view-jobs-click', this.data);
      console.log('WelcomeOptionsView:view-jobs-click PUBLISHING');
    });
    return createView;
  };

};

module.exports = WelcomeOptionsView;
