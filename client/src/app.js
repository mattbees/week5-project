
const { OpenStreetMapProvider } = require("leaflet-geosearch");


const Jobs = require('./models/jobs');
const Addresses = require('./models/addresses');
const WelcomeView = require('./views/welcome_view');
const WelcomeOptionsView = require('./views/welcome_options_view');
const NumJobsView = require('./views/num_jobs_view');
const CreateProfileFormView = require('./views/create_profile_form_view');
const MapView = require('./views/map_view');
const MapIntroView = require('./views/map_intro_view');
const CreateProfileHeader = require('./views/create_profile_header');


document.addEventListener('DOMContentLoaded', (event) => {
  console.log('JavaScript loaded');


  const div1 = document.querySelector('#div1');
  const div2 = document.querySelector('#div2');
  const div3 = document.querySelector('#div3');

  // Welcome page:
  const welcomeView = new WelcomeView(div1);
  welcomeView.bindEvents();
  const welcomeOptionsView = new WelcomeOptionsView(div2);
  welcomeOptionsView.bindEvents();
  const numJobsView = new NumJobsView(div3);
  numJobsView.bindEvents();

  // Create map view
  const mapView = new MapView(div2);
  mapView.bindEvents();
  const mapIntroView = new MapIntroView(div1);
  mapIntroView.bindEvents();

  // Create profile form page:
  const createProfileHeader = new CreateProfileHeader(div1);
  createProfileHeader.bindEvents();
  const createProfileFormView = new CreateProfileFormView(div2);
  createProfileFormView.bindEvents();


  const addresses = new Addresses();
  addresses.bindEvents();

  const jobs = new Jobs();
  jobs.getData();

});

// Notes: leaflet geoseqrch outputs x then y, ie lat then long. But Google wants
// format long then lat.
