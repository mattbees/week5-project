class WelcomeView {
  constructor(element) {
      this.element = element;
  };

  bindEvents() {
    this.clearText();
    this.renderWelcome();
  };

  clearText() {
    this.element.innerHTML = '';
  };

  renderWelcome() {
    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Geo Job Search';
    const tagLine = document.createElement('h2');
    tagLine.textContent = 'Ditch the commute! Enter your address to find jobs near you.';
    const welcomeText = document.createElement('p');
    this.element.appendChild(pageTitle);
    this.element.appendChild(tagLine);
  };

};

module.exports = WelcomeView;
