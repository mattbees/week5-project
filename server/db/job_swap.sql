DROP TABLE users_job_skills;
DROP TABLE users;
DROP TABLE job_skills;
DROP TABLE jobs;

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

CREATE TABLE jobs(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  address VARCHAR(255),
  coords_x DECIMAL,
  coords_y DECIMAL,
  image_src VARCHAR
);

INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Chef', '17 Corstorphine High St, Edinburgh EH12 7SU', -3.2834146, 55.9405591, './images/catering.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Office Manager', '23 Thistle St, Edinburgh EH2 1DF', -3.1969917, 55.9543969, './images/admin.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Branch Supervisor', '144 Princes Street Edinburgh EH2 4EQ', -3.2072321, 55.9503567, './images/finance.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Administrator', '4 East Market Street Edinburgh EH8 8BG', -3.1834447, 55.951519, './images/general.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Sales Assistant', '48 Princes St, Edinburgh EH2 2YJ', -3.1937887, 55.9526596, './images/shop.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Staff Nurse', '4 Nether Liberton Ln, Edinburgh EH16 5TY', -3.1664743, 55.9244266, './images/medical.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Swimming Instructor', '22 Gracemount Dr, Edinburgh EH16 6RN', -3.157924, 55.9063027, './images/sports.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Pupil Support Assistant', '181 Newhaven Rd, Edinburgh EH6 4QA', -3.1856901, 55.9696245, './images/sports.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Bus Driver', '38 Seafield Rd E, Edinburgh EH15 1ED', -3.1268338, 55.9611762, './images/transport.png');
