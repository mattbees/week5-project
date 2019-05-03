const Jobs = require('../models/jobs.js');

describe('Jobs', () => {

  let jobs;

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

});

/*=== Test fails - output: ===*/

// ReferenceError: fetch is not defined
//
//        6 |
//        7 |   get() {
//     >  8 |     return fetch(this.url)
//          |     ^
//        9 |       .then(res => res.json())
//       10 |   }
//       11 |
//
//       at RequestHelper.get (src/helpers/request_helper.js:8:5)
