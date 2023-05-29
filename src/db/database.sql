CREATE DATABASE IF NOT EXISTS proyecto_chunche;
USE proyecto_chunche;

CREATE TABLE Users(
  id integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL
);

CREATE TABLE Classrooms(
  id integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
  num integer NOT NULL
);

CREATE TABLE Inuseclassrooms(
  id integer PRIMARY KEY AUTO_INCREMENT NOT NULL,
  crId integer NOT NULL,
  userId integer NOT NULL,
  time VARCHAR(255) NOT NULL,
  FOREIGN KEY (crId) REFERENCES Classrooms(id),
  FOREIGN KEY (userId) REFERENCES Users(id)
);