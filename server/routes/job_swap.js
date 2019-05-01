var express = require('express');
var router = express.Router();
const SqlRunner = require('../db/sql_runner');

/* GET users listing. */
router.get('/', function(req, res) {
  SqlRunner.run("SELECT * FROM jobs ORDER BY title ASC").then(result => {
    res.status(200).json(result.rows);
  });
});

// GET one user
router.get('/:id', function(req, res) {
  SqlRunner.run("SELECT * FROM jobs WHERE id = $1", [req.params.id]).then(
    result => {
      res.status(200).json(result.rows);
    }
  );
});

// POST to create a new user
router.post('/', function(req, res) {
  SqlRunner.run("INSERT INTO jobs (title, address, coords_x, coords_y, image_src) VALUES ($1, $2, $3, $4, $5)", [
    req.body.title,
    req.body.address,
    req.body.coords_x,
    req.body.coords_y,
    req.body.image_src
  ]).then((result) => {
    res.status(201).json(result);
  });
});

// PUT to amend a new user with id of :id - UPDATE FOR REMAINING PROPERTIES
router.put('/:id', function(req, res) {
  SqlRunner.run("UPDATE jobs SET title=$1, address=$2, coords_x=$3, coords_y=$4, image_src=$5 WHERE id=$6", [
    req.body.title,
    req.body.address,
    req.body.coords_x,
    req.body.coords_y,
    req.body.image_src,
    req.params.id
  ]).then((result) => {
      res.status(200).json(result);
    });
  });

  // DELETE to delete a user
  router.delete('/:id', function(req, res) {
    SqlRunner.run("DELETE FROM jobs WHERE id = $1", [req.params.id]).then(
      result => {
        res.status(200).json(result);
      });
  });

// OLD VERSIONS:
/* GET users listing. */
// router.get('/', function(req, res) {
//   SqlRunner.run("SELECT * FROM users ORDER BY name ASC").then(result => {
//     res.status(200).json(result.rows);
//   });
// });
//
// // GET one user
// router.get('/:id', function(req, res) {
//   SqlRunner.run("SELECT * FROM users WHERE id = $1", [req.params.id]).then(
//     result => {
//       res.status(200).json(result.rows);
//     }
//   );
// });
//
// // POST to create a new user - UPDATE FOR REMAINING PROPERTIES
// router.post('/', function(req, res) {
//   SqlRunner.run("INSERT INTO users (name, home_coords_x, home_coords_y, job_coords_x, job_coords_y, image_src) VALUES ($1, $2, $3, $4, $5, $6)", [
//     req.body.name,
//     req.body.home_coords_x,
//     req.body.home_coords_y,
//     req.body.job_coords_x,
//     req.body.job_coords_y,
//     req.body.image_src
//   ]).then((result) => {
//     res.status(201).json(result);
//   });
// });
//
// // PUT to amend a new user with id of :id - UPDATE FOR REMAINING PROPERTIES
// router.put('/:id', function(req, res) {
//   SqlRunner.run("UPDATE users SET name=$1, current_job=$2 WHERE id=$3", [
//   req.body.name,
//   req.body.current_job,
//   req.params.id])
//     .then((result) => {
//       res.status(200).json(result);
//     });
//   });
//
//   // DELETE to delete a user
//   router.delete('/:id', function(req, res) {
//     SqlRunner.run("DELETE FROM users WHERE id = $1", [req.params.id]).then(
//       result => {
//         res.status(200).json(result);
//       });
//   });



module.exports = router;
