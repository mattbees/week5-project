
const PubSub = require('../helpers/pub_sub');

class MapView {
  constructor(element) {
    this.element = element;
    this.data = null;
    this.coords = null;
    this.map = null;
    this.centre = [];
    this.zoom = 13; // This zoom level should work for most initial scenarios
  };

  bindEvents() {
    PubSub.subscribe('Jobs:jobs-data-loaded', (event) => {
      this.data = event.detail;
    });
    // NEW CODE
    PubSub.subscribe('Addresses:coords-ready', (event) => {
      this.coords = event.detail;
      this.centre = [this.coords.y, this.coords.x];
      this.clearText();
      const sidebar = this.createSidebar();
      this.element.appendChild(sidebar);
      const mapDiv = this.createMap();
      this.element.appendChild(mapDiv);
      this.addMap(this.coords);
      this.addCentreMarker(this.coords);
      const sortedJobs = this.sortByDistance();
      this.addJobMarkers(sortedJobs, 0);
    });

    PubSub.subscribe('MapIntroView:view-more-click', (event) => {
      const startValue = event.detail;
      const sortedJobs = this.sortByDistance();
      this.addJobMarkers(sortedJobs, startValue);
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
    const y = coords.y;
    this.map = L.map('map').setView([y, x], this.zoom);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  };

  addCentreMarker(coords) {
    const centreMarker = L.marker([parseFloat(coords.y), parseFloat(coords.x)]).addTo(this.map);
    centreMarker.id = 'centre-marker';
    centreMarker.bindPopup(`<b>You live here.</b>`);
  }

  addJobMarkers(jobs, startValue) {
    let tracker = startValue;
    let trackerPlus = tracker+5;
    for (let i=tracker; i<trackerPlus; i++) {
      let icon = null;
      if (jobs[i]) {
        if (jobs[i].image_src != null) {
          icon = L.icon( { iconUrl: jobs[i].image_src, iconSize: [40, 40] });
        } else {
          icon = L.icon( { iconUrl: './images/general.png', iconSize: [40, 40] });
        };
        this.createJobMarker(jobs[i], icon);
        // Also create a sidebar card for each job
        const card = this.displayJob(jobs[i]);
        const sidebar = document.querySelector('#sidebar');
        console.log('ABOUT TO APPEND CARD');
        sidebar.appendChild(card);
        tracker = i;
        jobs[i].tracker = i; // adding tracker property to pass this value to map-intro-view
        // find distance of last element to set map zoom:
        if ((i === (trackerPlus-1)) || (i === jobs.length-1)) {
            console.log(jobs[i]);
            this.setMapZoom(jobs[i].distance);
        };
      };
    };
    PubSub.publish('MapView:markers-added', jobs[tracker]);
  };

  setMapZoom(distance) {
    const kms = distance;
    console.log('DISTANCE', distance);
    if (kms < 3) {
      this.zoom = 13;
    } else if (kms >= 3 && kms < 6) {
      this.zoom = 12;
    } else if (kms >= 6 && kms < 10) {
      this.zoom = 11;
    };
    this.reloadMap(this.coords)
  };

  reloadMap(coords) {
    const x = coords.x;
    const y = coords.y;
    console.log('HERE');
    this.map.setView([y, x], this.zoom);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  };

  createJobMarker(job, icon) {
    const marker = L.marker([parseFloat(job.coords_y), parseFloat(job.coords_x)],
    {icon: icon}).addTo(this.map);
    marker.id = job.id;
    const distance = (this.checkDistance(job)).toFixed(1);
    marker.bindPopup(`<b>${job.title} vacancy</b><br />${distance} km from where you live.`);
    PubSub.subscribe('MapView:list-item-click', (event) => {
      console.log('SUBBING', event);
      this.markerPopup(marker, event);
    });
  };


  // KEEPING THIS CODE IN map_view.js AS THESE CALCS RELY ON HAVING A MAP OBJECT
  checkDistance(job) {
    const point1 = L.latLng(job.coords_y, job.coords_x);
    const point2 = L.latLng(this.centre[0], this.centre[1]);
    const distance = (this.map.options.crs.distance(point1, point2))/1000;
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

  createSidebar() {
    const sideDiv = document.createElement('div');
    sideDiv.id = 'sidebar';
    return sideDiv;
  };

  displayJob(job) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.id = job.id;
      const title = document.createElement('h3');
      title.textContent = job.title;
      title.addEventListener('click', (event) => {
        PubSub.publish('MapView:list-item-click', card.id);
        console.log('PUBLISHING', card.id);
        if (card.childNodes.length < 2) {
          const kms = document.createElement('p');
          const distance = (job.distance).toFixed(1);
          kms.textContent = `${distance} km from where you live.`
          card.innerHTML = "";
          card.appendChild(title);
          card.appendChild(kms);
        } else {
          card.innerHTML = "";
          card.appendChild(title);
        };
      });
      card.appendChild(title);
    return card;
  };



// OLD:

  // createHomeMarker(job, jobIcon) {
  //   const home = L.marker([parseFloat(job.home_coords_y), parseFloat(job.home_coords_x)],
  //   {icon: jobIcon}).addTo(this.map);
  //   home.id = job.id;
  //   home.category = 'home';
  //   home.bindPopup(`<b>${job.name}</b><br>lives here.`);
  // };
  //
  // createJobMarker(job, jobIcon) {
  //   const job = L.marker([parseFloat(job.job_coords_y), parseFloat(job.job_coords_x)],
  //   {icon: jobIcon}).addTo(this.map);
  //   job.id = job.id;
  //   job.category = 'work';
  //   job.bindPopup(`<b>${job.name}</b><br>works here.`);
  //   PubSub.subscribe('MapView:list-item-click', (event) => {
  //     this.markerPopup(job, event);
  //   });
  // };

  markerPopup(marker, event) {
    console.log('POPUP CALL - marker', marker.id);
    console.log('POPUP CALL - event', event.detail);
    if (marker.id == event.detail) {
      marker.openPopup();
    };
  };

};

module.exports = MapView;
