const PubSub = require('../helpers/pub_sub');

class NumUsersView {
  constructor(element) {
    this.element = element;
    this.data = null;
  };

  bindEvents() {
    PubSub.subscribe('Users:users-data-loaded', (events) => {
      console.log('Users:users-data-loaded SUBSCRIBED');
      this.data = event.detail;
      const numUsers = this.createNumUsers();
      this.element.appendChild(numUsers);
    });
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
