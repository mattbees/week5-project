const PubSub = require('../helpers/pub_sub');
const Jobs = require('../models/jobs');

class CreateProfileFormView {
  constructor(element) {
    this.element = element;
  };

  bindEvents() {
    PubSub.subscribe('MapIntroView:add-job-click', (event) => {
      this.clearText();
      const profileForm = this.renderForm();
      this.element.appendChild(profileForm);
      const button = document.querySelector('#submitButton');
      button.addEventListener('click', (evt) => {
        evt.preventDefault();
        const profile = {};
        profile.title = evt.target.form['title'].value;
        profile.address = evt.target.form['address'].value;
        console.log(profile.address);
        console.log(evt.detail);
        console.log(evt.target.form['address'].value);
        const jobs = new Jobs();
        jobs.postJob(profile);
        PubSub.publish('CreateProfileView:job-submitted');
      });
    });
  };

  clearText() {
    this.element.innerHTML = '';
  };

  renderForm() {
    const formDiv = document.createElement('div');
    const form = document.createElement('form');
    form.classList.add('ui', 'form');
    const titleDiv = this.createTitleInput();
    titleDiv.classList.add('field');
    const addressDiv = this.createAddressInput();
    addressDiv.classList.add('field');
    const formSubmit = this.createSubmit();
    formSubmit.classList.add('ui', 'button');
    form.appendChild(titleDiv);
    form.appendChild(addressDiv);
    form.appendChild(formSubmit);
    formDiv.appendChild(form);
    return formDiv;
  };

  createTitleInput() {
    const titleDiv = document.createElement('div');
    const label1 = document.createElement('label');
    label1.for = 'title';
    label1.textContent = 'Job title: ';
    const input1 = document.createElement('input');
    input1.id = 'title';
    input1.classList.add('my-form-input');
    titleDiv.appendChild(label1);
    titleDiv.appendChild(input1);
    return titleDiv;
  };


  // createImgInput() {
  //   const imgDiv = document.createElement('div');
  //   const imgInput = document.createElement('select');
  //   imgInput.type = 'file';
  //   imgInput.id = 'img-input';
  //   imgInput.accept = 'image/*';
  //   const label = document.createElement('label');
  //   label.for = 'img-input';
  //   label.textContent = 'Upload a photo';
  //   imgDiv.appendChild(label);
  //   imgDiv.appendChild(imgInput);
  //   return imgDiv;
  // };

  createAddressInput() {
    const addressDiv = document.createElement('div');
    const label2 = document.createElement('label');
    label2.for = 'address';
    label2.textContent = 'Job location: ';
    const input2 = document.createElement('input');
    input2.id = 'address';
    input2.classList.add('my-form-input');
    addressDiv.appendChild(label2);
    addressDiv.appendChild(input2);
    return addressDiv;
  };

  createSubmit() {
    const button = document.createElement('button');
    button.type = 'submit';
    button.id = 'submitButton';
    button.textContent = 'Submit form';
    button.addEventListener('click', (event) => {

    });
    return button;
  };

};

module.exports = CreateProfileFormView;
