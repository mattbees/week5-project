// TODO: Subscribe to Users:users-data-reloaded
// TODO:

const PubSub = require('../helpers/pub_sub');

class MapView {
  constructor(element) {
    this.element = element;
    this.map = null;
  };

  bindEvents() {
    PubSub.subscribe('Users:users-data-reloaded', (event) => {
      this.clearText();
      const mapDiv = this.createMap();
      this.element.appendChild(mapDiv);
      this.addMap();
      console.table(event.detail);
      this.addMarker(event.detail);
    });

  };

  clearText() {
    this.element.innerHTML = '';
  };

  createMap() {
    const div = document.createElement('div');
    div.id = 'map';
    return div;
  };

  addMap() {
    this.map = L.map('map').setView([55.953, -3.188], 12);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  };

  addMarker() {
    const marker = L.marker([55.95, -3.18]).addTo(this.map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    // var popup = L.popup()
    // .setLatLng([51.5, -0.09])
    // .setContent("I am a standalone popup.")
    // .openOn(this.map);
  };

};




module.exports = MapView;
