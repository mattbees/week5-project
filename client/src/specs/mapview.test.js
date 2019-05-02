const MapView = require('./views/map_view');

describe('MapView', () => {

  let mapVIew;

  beforeEach(() => {
    mapView = new MapView();
    job1 = {
      id: 10,
      title: "Shop Manager",
      address: "17 Glasgow Rd, Edinburgh EH12 8HW",
      coords_x: "-3.29416754",
      coords_y: "55.94211665",
      image_src: "./images/shop.png"
    }
    job2 = {
      id: 6,
      title: "Staff Nurse",
      address: "4 Nether Liberton Ln, Edinburgh EH16 5TY",
      coords_x: "-3.1664743",
      coords_y: "55.9244266",
      image_src: "./images/medical.png"
    }
    job3 = {
      id: 7,
      title: "Swimming Instructor",
      address: "22 Gracemount Dr, Edinburgh EH16 6RN",
      coords_x: "-3.157924",
      coords_y: "55.9063027",
      image_src: "./images/sports.png"
    }
    job4 = {
      id: 15,
      title: "Taxi Driver",
      address: "69 Lauriston Farm Rd, Edinburgh EH4 5EX",
      coords_x: "-3.2745973",
      coords_y: "55.9697753",
      image_src: "./images/transport.png"
    }
    job5 = {
      id: 31,
      title: "Zoo Keeper",
      address: "134 Corstorphine Rd, Edinburgh EH12 6TS",
      coords_x: "-3.26958857649507",
      coords_y: "55.94547255",
      image_src: "./images/general.png"
    }
    jobs = [ job1, job2, job3, job4, job5 ];




  test('Should be able to sort an array of jobs by distance from map centre', () => {
    // Cannot run this test in jest as it requires a map object as a reference
  });

  test('Should be able to set map zoom level based on distance property of displayed jobs',
    () => {
      // Cannot run this test in jest as it requires a map object as a reference
    });

});
