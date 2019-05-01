
const PubSub = require('../helpers/pub_sub');

class MapView {
  constructor(element) {
    this.element = element;
    this.map = null;
  };

  bindEvents() {
    PubSub.subscribe('Users:users-data-reloaded', (event) => {
      this.clearText();
      const sidebar = this.createSidebar(event.detail);
      this.element.appendChild(sidebar);
      const mapDiv = this.createMap();
      this.element.appendChild(mapDiv);
      this.addMap();
      this.addMarkers(event.detail);
      this.checkDistance(); // calling test function
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

  addMarkers(users) {
    users.forEach((user) => {
      let userIcon = null;
      if (user.image_src != null) {
        userIcon = L.icon( { iconUrl: user.image_src, iconSize: [40, 40] });
      } else {
        userIcon = L.icon( { iconUrl: './images/teacher-vector.png', iconSize: [40, 40] });
      };
      this.createHomeMarker(user, userIcon);
      this.createJobMarker(user, userIcon);
    });
  };

  // Test function:
  checkDistance() {
    const marker1 = L.marker([55.952, -3.193]).addTo(this.map);
    const marker2 = L.marker([55.949, -3.209]).addTo(this.map);
    const point1 = L.latLng(55.952, -3.193);
    const point2 = L.latLng(55.949, -3.209);
    console.dir(this.map.options.crs);
    const distance = this.map.options.crs.distance(point1, point2);
    console.log(distance);
  };

  createSidebar(users) {
    const div = document.createElement('div');
    div.id = 'sidebar';
    div.style.float = 'right';
    div.style.width = '20%';
    div.textContent = 'Test text';
    const list = this.listUsers(users);
    div.appendChild(list);
    return div;
  };

  listUsers(users) {
    // create ul. loop through the users and create an li for each one. append to sidebar.
    console.dir(users);
    const list = document.createElement('ul');
    users.forEach((user) => {
      const item = document.createElement('li');
      item.textContent = user.name;
      item.addEventListener('click', (event) => {
        PubSub.publish('MapView:list-item-click', user.id);
        console.dir(user.id);
      });
      list.appendChild(item);
    });
    return list;
  };

  createHomeMarker(user, userIcon) {
    const home = L.marker([parseFloat(user.home_coords_y), parseFloat(user.home_coords_x)],
    {icon: userIcon}).addTo(this.map);
    home.id = user.id;
    home.category = 'home';
    home.bindPopup(`<b>${user.name}</b><br>lives here.`);
  };

  createJobMarker(user, userIcon) {
    const job = L.marker([parseFloat(user.job_coords_y), parseFloat(user.job_coords_x)],
    {icon: userIcon}).addTo(this.map);
    job.id = user.id;
    job.category = 'job';
    job.bindPopup(`<b>${user.name}</b><br>works here.`);
  };


};


module.exports = MapView;
