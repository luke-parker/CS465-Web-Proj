-- Instructors(instructorId, firstname, lastname, email, password)
drop table if exists Instructors;
CREATE TABLE Instructors (
    instructorId SMALLINT UNSIGNED,
    firstname VARCHAR(60),
    lastname VARCHAR(60),
    email VARCHAR(60),
    password VARCHAR(41), -- weird bc https://mariadb.com/kb/en/password/
    PRIMARY KEY(instructorId)
);

-- Courses(courseId, courseTitle): 
drop table if exists Courses;
CREATE TABLE Courses (
    courseId VARCHAR(8),
    courseTitle VARCHAR(64),
    PRIMARY KEY (courseId)
);

-- Sections(sectionId, courseId, instructorId, semester, year)
drop table if Exists Sections;
CREATE TABLE Sections (
    sectionId SMALLINT UNSIGNED,
    courseId VARCHAR(8),
    instructorId SMALLINT UNSIGNED,
    semester VARCHAR(8),
    year VARCHAR(4),
    PRIMARY KEY (sectionId),
    FOREIGN KEY (courseId) REFERENCES Courses(courseId) ON DELETE CASCADE,
    FOREIGN KEY (instructorId) REFERENCES Instructors(instructorId) 
);

-- Outcomes(outcomeId, outcomeDescription, major)
drop table if exists Outcomes;
CREATE TABLE Outcomes (
    outcomeId SMALLINT UNSIGNED,
    outcomeDescription VARCHAR(512),
    major ENUM('CS','CpE', 'EE'),
    PRIMARY KEY (outcomeId, major)
);

-- OutcomeResults(sectionId, outcomeId, major, performanceLevel, numberOfStudents)
drop table if Exists OutcomeResults;
CREATE TABLE OutcomeResults (
    sectionId SMALLINT UNSIGNED,
    outcomeId SMALLINT UNSIGNED,
    major ENUM('CS','CpE', 'EE'),
    performanceLevel ENUM('1', '2', '3'),
    numberOfStudents SMALLINT UNSIGNED,
    PRIMARY KEY (sectionId, outcomeId, major, performanceLevel),
    FOREIGN KEY (sectionId) REFERENCES Sections(sectionId) ON DELETE CASCADE,
    FOREIGN KEY (outcomeId) REFERENCES Outcomes(outcomeId) ON DELETE CASCADE
);

-- Assessments(assessmentId, sectionId, assessmentDescription, weight, outcomeId, major):
drop table if exists Assessments;
CREATE TABLE Assessments (
    assessmentId SMALLINT UNSIGNED AUTO_INCREMENT,
    sectionId SMALLINT UNSIGNED,
    assessmentDescription VARCHAR(256),
    weight FLOAT UNSIGNED,
    outcomeId SMALLINT UNSIGNED,
    major ENUM('CS', 'CpE', 'EE'),
    PRIMARY KEY (assessmentId),
    FOREIGN KEY (sectionId) REFERENCES Sections(sectionId) ON DELETE CASCADE,
    FOREIGN KEY (outcomeId) REFERENCES Outcomes(outcomeId) ON DELETE CASCADE
);

-- Narratives(sectionId, major, outcomeId, strengths, weaknesses, actions)
drop table if exists Narratives;
CREATE TABLE Narratives (
    sectionId SMALLINT UNSIGNED,
    major ENUM('CS', 'CpE', 'EE'),
    outcomeId SMALLINT UNSIGNED,
    strengths VARCHAR(1024),
    weaknesses VARCHAR(1024),
    actions VARCHAR(1024),
    PRIMARY KEY (sectionId, major, outcomeId),
    FOREIGN KEY (sectionId) REFERENCES Sections(sectionId) ON DELETE CASCADE,
    FOREIGN KEY (outcomeId) REFERENCES Outcomes(outcomeId) ON DELETE CASCADE
);

-- PerformanceLevels(performanceLevel, description):
drop table if exists PerformanceLevels;
CREATE TABLE PerformanceLevels (
    performanceLevel ENUM('1', '2', '3'),
    description VARCHAR(256),
    PRIMARY KEY (performanceLevel)
);

-- CourseOutcomeMapping(courseId, outcomeId, major, semester, year):
drop table if exists CourseOutcomeMapping;
CREATE TABLE CourseOutcomeMapping (
    courseId VARCHAR(8),
    outcomeId SMALLINT UNSIGNED,
    major ENUM('CS', 'CpE', 'EE'),
    semester VARCHAR(8),
    year VARCHAR(4),
    FOREIGN KEY (courseId) REFERENCES Courses(courseId) ON DELETE CASCADE,
    FOREIGN KEY (outcomeId) REFERENCES Outcomes(outcomeId) ON DELETE CASCADE
);