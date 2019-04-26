var express = require('express');
var router = express.Router();
const SqlRunner = require('../db/sql_runner');

/* GET users listing. */
router.get('/', function(req, res) {
  SqlRunner.run("SELECT * FROM users ORDER BY name ASC").then(result => {
    res.status(200).json(result.rows);
  });
});

// GET one user
router.get('/:id', function(req, res) {
  SqlRunner.run("SELECT * FROM users WHERE id = $1", [req.params.id]).then(
    result => {
      res.status(200).json(result.rows);
    }
  );
});

// POST to create a new user - UPDATE FOR REMAINING PROPERTIES
router.post('/', function(req, res) {
  SqlRunner.run("INSERT INTO users (name, current_job) VALUES ($1, $2)", [
    req.body.name,
    req.body.current_job,
  ]).then((result) => {
    res.status(201).json(result);
  });
});

// PUT to amend a new user with id of :id - UPDATE FOR REMAINING PROPERTIES
router.put('/:id', function(req, res) {
  SqlRunner.run("UPDATE users SET name=$1, current_job=$2 WHERE id=$3", [
  req.body.name,
  req.body.current_job,
  req.params.id])
    .then((result) => {
      res.status(200).json(result);
    });
  });

  // DELETE to delete a user
  router.delete('/:id', function(req, res) {
    SqlRunner.run("DELETE FROM users WHERE id = $1", [req.params.id]).then(
      result => {
        res.status(200).json(result);
      });
  });

module.exports = router;
