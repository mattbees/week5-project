const PubSub = require('../helpers/pub_sub');

class WelcomeOptionsView {
  constructor(element) {
    this.element = element;
  };

  bindEvents() {
    this.renderContent();
    PubSub.subscribe('CreateProfileView:job-submitted', (event) => {
      this.renderContent();
    });
  };

  renderContent() {
    this.clearText();
    const inputForm = this.renderInputForm();
    this.element.appendChild(inputForm);
  };

  clearText() {
    this.element.innerHTML = '';
  };

  createWrapperDiv() {
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('input-flex-container');
    return wrapperDiv;
  };

  renderInputForm() {
    const formDiv = document.createElement('div');
    formDiv.classList.add('ui-input');
    const form = document.createElement('form');
    form.classList.add('address-form');
    const input = this.createInput();
    const button = this.createButton();
    form.appendChild(input);
    form.appendChild(button);
    formDiv.appendChild(form);
    const wrapper = this.createWrapperDiv();
    wrapper.appendChild(formDiv);
    return wrapper;
  };

  createInput() {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('field')
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'address-input'
    input.placeholder = 'Your address here';
    inputDiv.appendChild(input);
    return inputDiv;
  };

  createButton() {
    const button = document.createElement('button');
    button.type = 'submit';
    button.id = 'address-button';
    button.textContent = 'Go!';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const address = event.target.form[0].value;
      PubSub.publish('WelcomeOptionsView:address-button-click', address);
    });
    return button;
  }


};

module.exports = WelcomeOptionsView;
