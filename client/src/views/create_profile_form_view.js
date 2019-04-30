const PubSub = require('../helpers/pub_sub');
const Users = require('../models/users');

class CreateProfileFormView {
  constructor(element) {
    this.element = element;
  };

  bindEvents() {
    PubSub.subscribe('WelcomeOptionsView:create-profile-click', (event) => {
      this.clearText();
      const profileForm = this.renderForm();
      this.element.appendChild(profileForm);
      const button = document.querySelector('#submitButton');
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const profile = {};
        profile.name = event.target.form['name'].value;
        profile.home_location = event.target.form['homeLoc'].value;
        profile.job_location = event.target.form['jobLoc'].value;
        const users = new Users();
        users.postUser(profile);
      });
    });
  };

  clearText() {
    this.element.innerHTML = '';
  };

  renderForm() {
    const formDiv = document.createElement('div');
    const form = document.createElement('form');
    const nameDiv = this.createNameInput();
    const homeLocDiv = this.createHomeLocInput();
    const jobLocDiv = this.createJobLocInput();
    const formSubmit = this.createSubmit();
    form.appendChild(nameDiv);
    form.appendChild(homeLocDiv);
    form.appendChild(jobLocDiv);
    form.appendChild(formSubmit);
    formDiv.appendChild(form);
    return formDiv;
  };

  createNameInput() {
    const nameDiv = document.createElement('div');
    const label1 = document.createElement('label');
    label1.for = 'name';
    label1.textContent = 'Name: ';
    const input1 = document.createElement('input');
    input1.id = 'name';
    nameDiv.appendChild(label1);
    nameDiv.appendChild(input1);
    return nameDiv;
  };


  // createJobInput() {
  //   const jobDiv = document.createElement('div');
  //   const label2 = document.createElement('label');
  //   label2.for = 'job';
  //   label2.textContent = 'Job: ';
  //   const input2 = document.createElement('input');
  //   input2.id = 'job';
  //   jobDiv.appendChild(label2);
  //   jobDiv.appendChild(input2);
  //   return jobDiv;
  // };

  createHomeLocInput() {
    const homeLocDiv = document.createElement('div');
    const label3 = document.createElement('label');
    label3.for = 'homeLoc';
    label3.textContent = 'Home address: ';
    const input3 = document.createElement('input');
    input3.id = 'homeLoc';
    homeLocDiv.appendChild(label3);
    homeLocDiv.appendChild(input3);
    return homeLocDiv;
  };


  createJobLocInput() {
    const jobLocDiv = document.createElement('div');
    const label4 = document.createElement('label');
    label4.for = 'jobLoc';
    label4.textContent = 'Work address: ';
    const input4 = document.createElement('input');
    input4.id = 'jobLoc';
    jobLocDiv.appendChild(label4);
    jobLocDiv.appendChild(input4);
    return jobLocDiv;
  };

  createSubmit() {
    const button = document.createElement('button');
    button.type = 'submit';
    button.id = 'submitButton';
    button.textContent = 'Submit form';
    return button;
  };

};

module.exports = CreateProfileFormView;
