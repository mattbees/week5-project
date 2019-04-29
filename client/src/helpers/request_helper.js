class RequestHelper {

  constructor(url) {
    this.url = url;
  }

  get() {
    return fetch(this.url)
      .then(res => res.json())
      console.log('fetch returned');
  }

}

module.exports = RequestHelper;
