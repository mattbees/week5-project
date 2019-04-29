class RequestHelper {

  constructor(url) {
    this.url = url;
  }

  get() {
    return fetch(this.url)
      .then(res => res.json())
      console.log('fetch returned');
  }

  post(payload) {
    return fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json());
  }


}

module.exports = RequestHelper;
