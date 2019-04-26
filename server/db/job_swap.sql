DROP TABLE users_job_skills;
DROP TABLE users;
DROP TABLE job_skills;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  current_job VARCHAR(255),
  home_location VARCHAR,
  job_location VARCHAR
);

INSERT INTO users (name, current_job) VALUES ('Johnny Doe', 'Shop Assistant');
INSERT INTO users (name, current_job) VALUES ('Jane Mitchell', 'Administrator');
INSERT INTO users (name, current_job) VALUES ('Daniel Armstrong', 'Assistant Manager');
INSERT INTO users (name, current_job) VALUES ('Sarah McKay', 'Hair Dresser');

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
