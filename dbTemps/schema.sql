DROP DATABASE IF EXISTS wiki_db;
CREATE DATABASE wiki_db;
USE wiki_db;

CREATE TABLE wikis (
id int NOT NULL AUTO_INCREMENT,
category VARCHAR (35),
title VARCHAR (100),
description VARCHAR (255),
userID INT (4),
FOREIGN KEY (userID) references users(id),
PRIMARY KEY(id)
);

CREATE TABLE users (
id int NOT NULL AUTO_INCREMENT,
name VARCHAR (20),
email VARCHAR (200),
password VARCHAR (20),
PRIMARY KEY(id)
);