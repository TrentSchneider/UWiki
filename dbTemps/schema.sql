-- database creation (needs to be run even if not adding table data with sequelize)
DROP DATABASE IF EXISTS wiki_db;
CREATE DATABASE wiki_db;

-- needs to be run when using mysql so that mysql knows which database you are using for future queries
USE wiki_db;

-- table skeletons (do not run tables if running models as sequelize will automatically create the tables)
CREATE TABLE users (
id int NOT NULL AUTO_INCREMENT,
name VARCHAR (20),
email VARCHAR (200),
password VARCHAR (20),
PRIMARY KEY(id)
);

CREATE TABLE wikis (
id int NOT NULL AUTO_INCREMENT,
category VARCHAR (35),
title VARCHAR (100),
description VARCHAR (255),
userID INT (4),
FOREIGN KEY (userID) references users(id),
PRIMARY KEY(id)
);