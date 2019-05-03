const PubSub = require('../helpers/pub_sub');

class WelcomeView {
  constructor(element) {
      this.element = element;
  };

  bindEvents() {
    this.renderContent();
    PubSub.subscribe('CreateProfileView:job-submitted', () => {
      this.renderContent();
      this.confirmJobPost();
    });
    PubSub.subscribe('Jobs:job-deleted', () => {
      this.renderContent();
      this.confirmDelete();
    });

  };

  renderContent() {
    this.clearText();
    this.renderWelcome();
  };

  clearText() {
    this.element.innerHTML = '';
  };

  renderWelcome() {
    const pageTitle = document.createElement('h1');
    pageTitle.classList.add('ui', 'huge', 'header');
    pageTitle.textContent = 'Geo Job Search';
    const tagLine = document.createElement('h2');
    tagLine.textContent = 'Ditch the commute! Enter your address to find jobs near you.';
    const welcomeText = document.createElement('p');
    this.element.appendChild(pageTitle);
    this.element.appendChild(tagLine);
  };

  confirmJobPost() {
    const confirm = document.createElement('h1');
    confirm.textContent = 'Job posted - thank you!';
    this.element.appendChild(confirm);
  };

  confirmDelete() {
    const confirm = document.createElement('h1');
    confirm.textContent = 'The job has been deleted.';
    this.element.appendChild(confirm);
  };


};
module.exports = WelcomeView;
