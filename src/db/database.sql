CREATE DATABASE IF NOT EXISTS proyecto_chunche;
USE proyecto_chunche;

CREATE TABLE users(
  id integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL
);

CREATE TABLE classrooms(
  id integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
  num integer NOT NULL
);

CREATE TABLE inuseclassrooms(
  id integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
  crId integer NOT NULL,
  userId integer NOT NULL,
  time VARCHAR(255) NOT NULL,
  FOREIGN KEY (crId) REFERENCES classrooms(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO users (null, 'admin', 'admin@uv.mx', 'UVadmin125',1);