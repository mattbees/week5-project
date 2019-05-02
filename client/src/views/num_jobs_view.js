const PubSub = require('../helpers/pub_sub');

class NumJobsView {
  constructor(element) {
    this.element = element;
    this.data = null;
  };

  bindEvents() {
    PubSub.subscribe('Jobs:jobs-data-loaded', (events) => {
      this.data = event.detail;
      const numJobs = this.createNumJobs();
      this.element.appendChild(numJobs);
      // CODE THIS MESSAGE (PUBLISH)
      PubSub.subscribe('Jobs:jobs-data-reloaded', (events) => {
        this.clearText();
        this.data = event.detail;
        const numJobs = this.createNumJobs();
        this.element.appendChild(numJobs);
      });
    });
  };

  clearText() {
    this.element.innerHTML = '';
  };

  createNumJobs() {
    const numJobsText = document.createElement('h3');
    const num = this.checkNumJobs();
    numJobsText.textContent = `Number of current jobs posted: ${num}`;
    return numJobsText;
  };

  checkNumJobs() {
    return this.data.length;
  };


};

module.exports = NumJobsView;
