-- MySQL dump 10.13  Distrib 8.0.19, for osx10.14 (x86_64)

CREATE DATABASE IF NOT EXISTS `student` DEFAULT CHARACTER SET utf8mb4;

USE `student`;

CREATE TABLE programmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    credits INT NOT NULL
);

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    programme_id INT,
    FOREIGN KEY (programme_id) REFERENCES programmes(id)
);

CREATE TABLE student_modules (
    student_id INT,
    module_id INT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (module_id) REFERENCES modules(id),
    PRIMARY KEY (student_id, module_id)
);

-- Inserting sample data into the programmes table
INSERT INTO programmes (name) VALUES
    ('Bachelor of Science'),
    ('Bachelor of Arts');

-- Inserting sample data into the modules table
INSERT INTO modules (name, credits) VALUES
    ('Mathematics', 5),
    ('Physics', 4),
    ('Computer Science', 6);

-- Inserting sample data into the students table
INSERT INTO students (name, programme_id) VALUES
    ('John Doe', 1),
    ('Jane Smith', 2);

-- Inserting sample data into the student_modules table
INSERT INTO student_modules (student_id, module_id) VALUES
    (1, 1), -- John Doe enrolled in Mathematics
    (1, 2), -- John Doe enrolled in Physics
    (2, 1), -- Jane Smith enrolled in Mathematics
    (2, 3); -- Jane Smith enrolled in Computer Science