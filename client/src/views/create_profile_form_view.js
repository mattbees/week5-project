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
        profile.home_location = event.target.form['home-loc'].value;
        profile.job_location = event.target.form['job-loc'].value;
        const filename = document.getElementById('img-input').files[0];
        profile.image_src = filename;
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
    const imgDiv = this.createImgInput();
    const formSubmit = this.createSubmit();
    form.appendChild(nameDiv);
    form.appendChild(homeLocDiv);
    form.appendChild(jobLocDiv);
    form.appendChild(imgDiv);
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


  createImgInput() {
    const imgDiv = document.createElement('div');
    const imgInput = document.createElement('input');
    imgInput.type = 'file';
    imgInput.id = 'img-input';
    imgInput.accept = 'image/*';
    const label = document.createElement('label');
    label.for = 'img-input';
    label.textContent = 'Upload a photo';
    imgDiv.appendChild(label);
    imgDiv.appendChild(imgInput);
    return imgDiv;
  };

  createHomeLocInput() {
    const homeLocDiv = document.createElement('div');
    const label3 = document.createElement('label');
    label3.for = 'home-loc';
    label3.textContent = 'Home address: ';
    const input3 = document.createElement('input');
    input3.id = 'home-loc';
    homeLocDiv.appendChild(label3);
    homeLocDiv.appendChild(input3);
    return homeLocDiv;
  };


  createJobLocInput() {
    const jobLocDiv = document.createElement('div');
    const label4 = document.createElement('label');
    label4.for = 'job-loc';
    label4.textContent = 'Work address: ';
    const input4 = document.createElement('input');
    input4.id = 'job-loc';
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
