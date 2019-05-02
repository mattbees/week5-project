
const PubSub = require('../helpers/pub_sub');

class MapView {
  constructor(element) {
    this.element = element;
    this.data = null;
    this.map = null;
    this.centre = [];
  };

  bindEvents() {
    PubSub.subscribe('Users:users-data-loaded', (event) => {
      this.data = event.detail;
    });
    // NEW CODE
    PubSub.subscribe('Addresses:coords-ready', (event) => {
      const coords = event.detail;
      this.centre = [coords.y, coords.x];
      // populate map with db data
      this.clearText();
      const sidebar = this.createSidebar(/*event.detail*/);
      this.element.appendChild(sidebar);
      const mapDiv = this.createMap();
      this.element.appendChild(mapDiv);
      this.addMap(coords);
      this.addCentreMarker(coords);
      const sortedJobs = this.sortByDistance();
      this.addJobMarkers(sortedJobs);
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

  addMap(coords) {
    const x = coords.x;
    console.dir(x);
    const y = coords.y;
    console.dir(y);
    this.map = L.map('map').setView([y, x], 12);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  };

  addCentreMarker(coords) {
    const centreMarker = L.marker([parseFloat(coords.y), parseFloat(coords.x)]).addTo(this.map);
    centreMarker.id = 'centre-marker';
    centreMarker.bindPopup(`<b>You live here.</b>`);
  }

  addJobMarkers(jobs) {
    let tracker = 0;
    for (let i=0; i<5; i++) {
      let icon = null;
      if (jobs[i].image_src != null) {
        icon = L.icon( { iconUrl: jobs[i].image_src, iconSize: [40, 40] });
      } else {
        icon = L.icon( { iconUrl: './images/general.png', iconSize: [40, 40] });
      };
      this.createJobMarker(jobs[i], icon);
      tracker = i;
    };
    PubSub.publish('MapView:markers-added', jobs[tracker].distance);
  };

  // addJobMarkers(jobs) {
  //   jobs.forEach((job) => {
  //     let icon = null;
  //     if (job.image_src != null) {
  //       icon = L.icon( { iconUrl: job.image_src, iconSize: [40, 40] });
  //     } else {
  //       icon = L.icon( { iconUrl: './images/general.png', iconSize: [40, 40] });
  //     };
  //     this.createJobMarker(job, icon);
  //   });
  // };

  createJobMarker(job, icon) {
    const marker = L.marker([parseFloat(job.coords_y), parseFloat(job.coords_x)],
    {icon: icon}).addTo(this.map);
    marker.id = job.id;
    const distance = ((this.checkDistance(job))/1000).toFixed(1);
    marker.bindPopup(`<b>${job.title} vacancy</b><br />${distance} km from where you live.`);
    PubSub.subscribe('MapView:list-item-click', (event) => {
      this.markerPopup(job, event);
    });
  };

  checkDistance(job) {
    const point1 = L.latLng(job.coords_y, job.coords_x);
    const point2 = L.latLng(this.centre[0], this.centre[1]);
    const distance = this.map.options.crs.distance(point1, point2);
    return distance;
  };

  sortByDistance(jobs) {
    const sortedJobs = [...this.data];
    sortedJobs.forEach((job) => {
      job.distance = this.checkDistance(job);
    });
    sortedJobs.sort(function(a, b) { return a.distance - b.distance} );
    return sortedJobs;
  };










// OLD:
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


  createSidebar(users) {
    const sideDiv = document.createElement('div');
    sideDiv.id = 'sidebar';
    // const list = this.displayUsers(users);
    // sideDiv.appendChild(list);
    return sideDiv;
  };

  displayUsers(users) {
    const cardsDiv = document.createElement('div');
    users.forEach((user) => {
      const card = document.createElement('div');
      card.classList.add('card');
      const name = document.createElement('h3');
      name.textContent = user.name;
      name.addEventListener('click', (event) => {
        if (card.childNodes.length < 3) {
          console.log('LOG');
          const categories = this.addCategories(user);
          card.innerHTML = "";
          card.appendChild(name);
          card.appendChild(distance);
          card.appendChild(categories);
        } else {
          console.log('ELSE LOG');
          card.innerHTML = "";
          card.appendChild(name);
          card.appendChild(distance);
        }
      });
      const distance = document.createElement('p');
      distance.textContent = `${user.name} works x km from your home.`
      card.appendChild(name);
      card.appendChild(distance);
      cardsDiv.appendChild(card);
    });
    return cardsDiv;
  };

  addCategories(user) {
    const categories = document.createElement('ul');
    const home = this.createHomeItem(user);
    const job = this.createJobItem(user);
    categories.appendChild(home);
    categories.appendChild(job);
    return categories;
  };

  createHomeItem(user) {
    const home = document.createElement('li');
    home.textContent = 'Home address';
    home.id = user.id;
    home.category = 'home';
    home.addEventListener('click', (event) => {
      PubSub.publish('MapView:list-item-click', home);
      console.dir(home);
    });
    return home;
  };

  createJobItem(user) {
    const job = document.createElement('li');
    job.textContent = 'Work address';
    job.id = user.id;
    job.category = 'work';
    job.addEventListener('click', (event) => {
      PubSub.publish('MapView:list-item-click', job);
      console.dir(job);
    });
    return job;
  };

  // createHomeMarker(user, userIcon) {
  //   const home = L.marker([parseFloat(user.home_coords_y), parseFloat(user.home_coords_x)],
  //   {icon: userIcon}).addTo(this.map);
  //   home.id = user.id;
  //   home.category = 'home';
  //   home.bindPopup(`<b>${user.name}</b><br>lives here.`);
  //   PubSub.subscribe('MapView:list-item-click', (event) => {
  //     this.markerPopup(home, event);
  //   });
  // };
  //
  // createJobMarker(user, userIcon) {
  //   const job = L.marker([parseFloat(user.job_coords_y), parseFloat(user.job_coords_x)],
  //   {icon: userIcon}).addTo(this.map);
  //   job.id = user.id;
  //   job.category = 'work';
  //   job.bindPopup(`<b>${user.name}</b><br>works here.`);
  //   PubSub.subscribe('MapView:list-item-click', (event) => {
  //     this.markerPopup(job, event);
  //   });
  // };

  markerPopup(marker, event) {
      if (marker.id == event.detail.id && marker.category === event.detail.category) {
        console.log('markerPopup call');
        marker.openPopup();
      };
  };

};

module.exports = MapView;
