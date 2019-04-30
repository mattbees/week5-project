DROP TABLE users_job_skills;
DROP TABLE users;
DROP TABLE job_skills;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  home_coords_x DECIMAL,
  home_coords_y DECIMAL,
  job_coords_x DECIMAL,
  job_coords_y DECIMAL,
  image_src VARCHAR
);

INSERT INTO users (name, home_coords_x, home_coords_y, job_coords_x, job_coords_y, image_src)
VALUES ('Johnny Doe', -3.209975, 55.9588971, -3.212165, 55.921384, './images/English-teacher.png');
INSERT INTO users (name, home_coords_x, home_coords_y, job_coords_x, job_coords_y, image_src)
VALUES ('Jane Mitchell', -3.209504, 55.925257, -3.225022, 55.958493, './images/Teacher.png');


CREATE TABLE job_skills(
  id SERIAL PRIMARY KEY,
  skill VARCHAR(255)
);

INSERT INTO job_skills (skill) VALUES ('accounting');
INSERT INTO job_skills (skill) VALUES ('team working');
INSERT INTO job_skills (skill) VALUES ('communication');
INSERT INTO job_skills (skill) VALUES ('customer services');
INSERT INTO job_skills (skill) VALUES ('project management');
INSERT INTO job_skills (skill) VALUES ('line management');

CREATE TABLE users_job_skills(
  user_id INT REFERENCES users(id),
  job_skill_id INT REFERENCES job_skills(id)
);
