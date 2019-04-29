class WelcomeView {
  constructor(element) {
      this.element = element;
  };

  bindEvents() {
    this.clearText();
    const welcome = this.renderWelcome();
    this.element.appendChild(welcome);
  };

  clearText() {
    this.element.innerHTML = '';
  };

  renderWelcome() {
    const welcomeText = document.createElement('p');
    welcomeText.textContent = 'Why commute to work when there are similar jobs closer to home? The Job Swap Shop connects you with people you could swap jobs with.';
    return welcomeText;
  };

};

module.exports = WelcomeView;
