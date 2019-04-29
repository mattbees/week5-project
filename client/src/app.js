
const { OpenStreetMapProvider } = require("leaflet-geosearch");


const Users = require('./models/users');
const WelcomeView = require('./views/welcome_view');
const WelcomeOptionsView = require('./views/welcome_options_view');
const NumUsersView = require('./views/num_users_view');
const CreateProfileIntroView = require('./views/create_profile_intro_view');
const CreateProfileFormView = require('./views/create_profile_form_view');

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('JavaScript loaded');

  // TEST CODE FOR LAT & LONG:
  // setup
  const provider = new OpenStreetMapProvider();
  const form = document.querySelector('form');
  const input = form.querySelector('input[type="text"]');
  form.addEventListener('submit', async (event) => {
      event.preventDefault();
      // search
      const results = await provider.search({ query: input.value });
      console.log(results); // » [{}, {}, {}, ...]
    });
  // END TEST CODE

  const div1 = document.querySelector('#div1');
  const div2 = document.querySelector('#div2');
  const div3 = document.querySelector('#div3');

  // Welcome page:
  const welcomeView = new WelcomeView(div1);
  welcomeView.bindEvents();
  const welcomeOptionsView = new WelcomeOptionsView(div2);
  welcomeOptionsView.bindEvents();
  const numUsersView = new NumUsersView(div3);
  numUsersView.bindEvents();

  // Create profile form page:
  const createProfileIntroView = new CreateProfileIntroView(div1);
  createProfileIntroView.bindEvents();
  const createProfileFormView = new CreateProfileFormView(div2);
  createProfileFormView.bindEvents();

  const users = new Users();
  users.getData('firstLoad');

});

// Notes: leaflet geoseqrch outputs x then y, ie lat then long. But Google wants
// format long then lat.
