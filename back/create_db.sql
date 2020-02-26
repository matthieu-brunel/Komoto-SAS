CREATE TABLE `komoto`.`image` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `url` TEXT NOT NULL,
    `alt` TEXT NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE `komoto`.`mail` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `category` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `mail_destinataire` TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `komoto`.`file` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `category` TEXT NOT NULL,
    `mail_id` INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `komoto`.`admin` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    PRIMARY KEY(id)
);



CREATE TABLE `komoto`.`solution` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `category` TEXT NOT NULL,
    `type` TEXT NOT NULL,
    `section` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `language` TEXT NOT NULL,
    `image_id` INT NULL,
    PRIMARY KEY(id)
);



CREATE TABLE `komoto`.`demonstration` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `category` TEXT NOT NULL,
    `type` TEXT NOT NULL,
    `section` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `model_url` TEXT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `komoto`.`homepage` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `category` TEXT NOT NULL,
    `type` TEXT NOT NULL,
    `section` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `language` TEXT NOT NULL,
    `image_id` INT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `komoto`.`reference` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `category` TEXT NOT NULL,
    `type` TEXT NOT NULL,
    `section` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `image_id` INT NULL,
    PRIMARY KEY(id)
);

