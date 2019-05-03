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
VALUES ('Pupil Support Assistant', '181 Newhaven Rd, Edinburgh EH6 4QA', -3.1856901, 55.9696245, './images/teaching.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Bus Driver', '38 Seafield Rd E, Edinburgh EH15 1ED', -3.1268338, 55.9611762, './images/transport.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Shop Manager', '17 Glasgow Rd, Edinburgh EH12 8HW', -3.29416754, 55.94211665, './images/shop.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Caterer', '123 Bruntsfield Pl, Edinburgh EH10 4EQ', -3.2073575, 55.9367217, './images/catering.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Nursery Teacher', '12 Claremont Park, Edinburgh EH6 7PJ', -3.1541969, 55.9699792, './images/teaching.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Fitness Instructor', '23 Elm Row, Edinburgh EH7 4AA', -3.1830162, 55.9589898, './images/sports.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Dental Nurse', '65 W Harbour Rd, Edinburgh EH5 1PW', -3.2257291, 55.9813535, './images/medical.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Taxi Driver', '69 Lauriston Farm Rd, Edinburgh EH4 5EX', -3.2745973, 55.9697753, './images/transport.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Receptionist', '5 Murrayburn Dr, Edinburgh EH14 2SU', -3.2903722, 55.9173930, './images/admin.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Doctor', '116 St Johns Rd, Edinburgh EH12 8AX', -3.2839081, 55.9430243, './images/medical.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Accountant', '41 Howden Hall Rd, Edinburgh EH16 6PG', -3.1649763, 55.9020533, './images/finance.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Shop Assistant', '57 Bath St, Edinburgh EH15 1HE', -3.1102985, 55.9547063, './images/shop.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Shop Manager', '119 Niddrie Mains Rd, Edinburgh EH16 4GB', -3.1213731, 55.9341176, './images/shop.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Bar Staff', '6 Craigleith Rd, Edinburgh EH4 2DP', -3.1213731, 55.9341176, './images/catering.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Nursery Teacher', '56 Hillhouse Rd, Edinburgh EH4 5EG', -3.2589707, 55.9609566, './images/teaching.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Fitness Instructor', '10 Bridge St, Musselburgh EH21 6AG', -3.0564999, 55.9431521, './images/sports.png');
INSERT INTO jobs (title, address, coords_x, coords_y, image_src)
VALUES ('Medical Researcher', '75 Craigmount Brae, Edinburgh EH12 8XF', -3.2993613, 55.9519481, './images/medical.png');
