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
      this.addMarkers(event.detail);
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

  // Marker options:
  // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  // var popup = L.popup()
  // .setLatLng([51.5, -0.09])
  // .setContent("I am a standalone popup.")
  // .openOn(this.map);

  addMarkers(users) {
    users.forEach((user) => {
      let userIcon = null;
      if (user.image_src != null) {
        userIcon = L.icon( {
          iconUrl: user.image_src,
          iconSize: [40, 40]
        });
      } else {
        userIcon = L.icon( {
          iconUrl: './images/teacher-vector.png',
          iconSize: [40, 40]
        });
      };
      const home = L.marker([parseFloat(user.home_coords_y), parseFloat(user.home_coords_x)],
      {icon: userIcon}).addTo(this.map);
      home.bindPopup(`<b>${user.name}</b><br>lives here.`);
      const job = L.marker([parseFloat(user.job_coords_y), parseFloat(user.job_coords_x)],
      {icon: userIcon}).addTo(this.map);
      job.bindPopup(`<b>${user.name}</b><br>works here.`);
    });
  };

};


module.exports = MapView;
