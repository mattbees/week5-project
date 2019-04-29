const PubSub = require('../helpers/pub_sub');

class NumUsersView {
  constructor(element) {
    this.element = element;
    this.data = null;
  };

  bindEvents() {
    PubSub.subscribe('Users:users-data-loaded', (events) => {
      this.data = event.detail;
      const numUsers = this.createNumUsers();
      this.element.appendChild(numUsers);
      PubSub.subscribe('Users:users-data-reloaded', (events) => {
        this.clearText();
        this.data = event.detail;
        const numUsers = this.createNumUsers();
        this.element.appendChild(numUsers);
      });
    });
  };

  clearText() {
    this.element.innerHTML = '';
  };

  createNumUsers() {
    const numUsersText = document.createElement('h3');
    const num = this.checkNumUsers();
    numUsersText.textContent = `Number of current users: ${num}`;
    return numUsersText;
  };

  checkNumUsers() {
    return this.data.length;
  };


};

module.exports = NumUsersView;
