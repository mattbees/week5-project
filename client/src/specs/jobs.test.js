const Jobs = require('../models/jobs.js');

describe('Jobs', () => {

  let jobs;
  let map = L.

  beforeEach(() => {
    jobs = new Jobs();
    newJob = {
      title: "Sales Assistant",
      address: "48 Princes St, Edinburgh EH2 2YJ",
      coords_x: -3.1937887,
      coords_y: 55.9526596,
      image_src: "./images/shop.png"
    };
  });

  test('Should be able to post a new job to database', () => {
    const jobs1 = jobs.getData().length;
    console.log(jobs1);
    jobs.postJob(newJob);
    const jobs2 = jobs.getData().length;
    expect(jobs1).toBe(jobs2-1);
  });


  //
  //
  //
  // test('Should have a name', () => {
  //   expect(card1.name).toBe('Superman');
  // });
  //
  // test('Should have a level of intelligence', () => {
  //   expect(card1.intelligence).toBe(6);
  // });
  //
  // test('Should have a level of strength', () => {
  //   expect(card1.strength).toBe(9);
  // });
  //
  // test('Should have a level of agility', () => {
  //   expect(card1.agility).toBe(7);
  // });

});
