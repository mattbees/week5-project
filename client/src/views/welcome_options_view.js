const PubSub = require('../helpers/pub_sub');

class WelcomeOptionsView {
  constructor(element) {
    this.element = element;
    this.data = null;
  };

  bindEvents() {
    PubSub.subscribe('Users:users-data-loaded', (event) => {
      this.data = event.detail; // UNNECESSARY?
      const inputForm = this.renderInputForm();
      this.element.appendChild(inputForm);
    });
  };

  renderInputForm() {
    const form = document.createElement('form');
    form.classList.add('address-form');
    const label = this.createLabel();
    const input = this.createInput();
    const button = this.createButton();
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    return form;
  };

  createInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'address-input'
    input.placeholder = 'Your address here';
    // input.classList.add('address-input');
    return input;
  };

  // label click does not highlight input
  createLabel() {
    const label = document.createElement('label');
    label.for = 'address-input';
    label.textContent = 'Enter your address: ';
    return label;
  };

  createButton() {
    const button = document.createElement('button');
    button.type = 'submit';
    button.id = 'address-button';
    button.textContent = 'Go!';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const address = event.target.form[0].value;
      console.dir(address);
      PubSub.publish('WelcomeOptionsView:address-button-click', address);
    });
    return button;
  }









// OLD CODE:
  // renderButtonsDiv() {
  //   const buttonsDiv = document.createElement('div');
  //   const profile = this.createProfileButton();
  //   buttonsDiv.appendChild(profile);
  //   const view = this.createViewButton();
  //   buttonsDiv.appendChild(view);
  //   return buttonsDiv;
  // };
  //
  // createProfileButton() {
  //   const createButton = document.createElement('button');
  //   createButton.textContent = 'Create a profile';
  //   createButton.addEventListener('click', (event) => {
  //     PubSub.publish('WelcomeOptionsView:create-profile-click');
  //   });
  //   return createButton;
  // };
  //
  // createViewButton() {
  //   const createView = document.createElement('button');
  //   createView.textContent = 'View current jobs';
  //   createView.addEventListener('click', (event) => {
  //     PubSub.publish('WelcomeOptionsView:view-jobs-click', this.data);
  //   });
  //   return createView;
  // };

};

module.exports = WelcomeOptionsView;
