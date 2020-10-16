-- Drops the middleground if it exists currently --
DROP DATABASE IF EXISTS SHOPPR;
CREATE DATABASE SHOPPR;
-- survey_instances has one record to one participant, many questions, one chosen answer per question
CREATE TABLE Users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    avatar VARCHAR(100),
    PRIMARY KEY (id)
) -- participants has one record to one survey instance

CREATE TABLE Friend_Connection (
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
) 

CREATE TABLE Search (
    id INTEGER NOT NULL,
    image_url VARCHAR(200),
    image_blob VARBINARY(20000),
    UserId INTEGER,
     PRIMARY KEY (id)
) 

CREATE TABLE Item (
   id INTEGER NOT NULL,
   name VARCHAR(300) NOT NULL,
   image_url VARCHAR(200),
   purchase_url VARCHAR(200),
   price FLOAT,
   SearchId INTEGER,
   PRIMARY KEY (id)
}