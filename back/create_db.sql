CREATE TABLE `image` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `url` TEXT NOT NULL,
    `alt` TEXT NOT NULL,
    `section` varchar(255) NOT NULL,
    PRIMARY KEY(id)
);



CREATE TABLE `mail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` text NOT NULL,
  `description` text NOT NULL,
  `mail_destinataire` text NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `category` text NOT NULL,
  `mail_id` int(11) NOT NULL,
  PRIMARY KEY(id)
) ;

CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` text NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY(id)
);



CREATE TABLE `solution` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `section` text NOT NULL,
  `description` text NOT NULL,
  `language` text NOT NULL,
  `image_id` int  NULL,
  PRIMARY KEY(id)
);



CREATE TABLE `demonstration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `section` text NOT NULL,
  `description` text NOT NULL,
  `model_url` text NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `homepage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `section` text NOT NULL,
  `description` text NOT NULL,
  `language` text NOT NULL,
  `image_id` int NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `reference` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `section` text NOT NULL,
  `description` text NOT NULL,
  `image_id` int NULL,
  PRIMARY KEY(id)
);

