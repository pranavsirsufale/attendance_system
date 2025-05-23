/*

CREATE TABLE Teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE not null,
    phone int(15),
    pass text
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    email varchar(100) unique not null,
    phone int(15)
);

CREATE TABLE Subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL,
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id) ON DELETE SET NULL
);

CREATE TABLE Timetable (
    timetable_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_id INT,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id) ON DELETE CASCADE
);

CREATE TABLE Sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    timetable_id INT,
    date DATE NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    FOREIGN KEY (timetable_id) REFERENCES Timetable(timetable_id) ON DELETE CASCADE
);

CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    session_id INT,
    status ENUM('Present', 'Absent') DEFAULT 'Absent',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES Sessions(session_id) ON DELETE CASCADE
);

CREATE TABLE Student_Subject (
    student_id INT,
    subject_id INT,
    PRIMARY KEY (student_id, subject_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id) ON DELETE CASCADE
);


*/


create database attendance_system;

use attendance_system;

#*********************************************************************************************



CREATE TABLE Teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),  -- Allows international formats (e.g., "+91-1234567890")
    pass VARCHAR(255) NOT NULL  -- Enforce hashed passwords
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15)
);

CREATE TABLE Subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL,
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id) ON DELETE SET NULL
);

CREATE TABLE Timetable (
    timetable_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_id INT,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    semester_start_date DATE NOT NULL,  -- Mandatory for calendar clarity
    semester_end_date DATE NOT NULL,    -- Mandatory for calendar clarity
    UNIQUE (subject_id, day_of_week, start_time),  -- Prevent duplicate slots for the same subject
    CHECK (start_time < end_time),  -- Ensure valid time range
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id) ON DELETE CASCADE
);

CREATE TABLE Sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    timetable_id INT,
    date DATE NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    UNIQUE (timetable_id, date),  -- Prevent duplicate sessions for the same timetable entry
    FOREIGN KEY (timetable_id) REFERENCES Timetable(timetable_id) ON DELETE CASCADE
);

CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    session_id INT,
    status ENUM('Present', 'Absent', 'Late') DEFAULT 'Absent',  -- Added 'Late'
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    recorded_by INT,  -- Track who took attendance
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES Sessions(session_id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES Teachers(teacher_id) ON DELETE SET NULL
);

CREATE TABLE Student_Subject (
    student_id INT,
    subject_id INT,
    PRIMARY KEY (student_id, subject_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id) ON DELETE CASCADE
);

-- Optional: Table for holidays/exceptions
CREATE TABLE Calendar_Exceptions (
    exception_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    description VARCHAR(100),  -- e.g., "Public Holiday"
    UNIQUE (date)
);




#***************************************************************************************************

#***************************************************************************************************

CREATE TABLE Teachers (
    teacher_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    pass VARCHAR(255) NOT NULL
);

CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    roll_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15)
);

CREATE TABLE Subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL,
    teacher_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id) ON DELETE SET NULL
);

CREATE TABLE Timetable (
    timetable_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_id INT,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    semester_start_date DATE NOT NULL,
    semester_end_date DATE NOT NULL,
    UNIQUE (subject_id, day_of_week, start_time),
    CHECK (start_time < end_time),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id) ON DELETE CASCADE
);

CREATE TABLE Sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    timetable_id INT,
    date DATE NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    UNIQUE (timetable_id, date),
    FOREIGN KEY (timetable_id) REFERENCES Timetable(timetable_id) ON DELETE CASCADE
);

CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    session_id INT,
    status ENUM('Present', 'Absent', 'Late') DEFAULT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    recorded_by INT,
    UNIQUE (student_id, session_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES Sessions(session_id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES Teachers(teacher_id) ON DELETE SET NULL
);


CREATE TABLE Student_Subject (
    student_id INT,
    subject_id INT,
    PRIMARY KEY (student_id, subject_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id) ON DELETE CASCADE
);


-- Optional: Table for holidays/exceptions
CREATE TABLE Calendar_Exceptions (
    exception_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    description VARCHAR(100),
    UNIQUE (date)
);

#**************************************************************************************
###### INSERT SAMPLE DATA ************************************************************


INSERT INTO Teachers (first_name, last_name, email, phone, pass)
VALUES ('John', 'Doe', 'john.doe@example.com', '123-456-7890', 'hashed_password123'); -- In practice, hash this!

INSERT INTO Students (first_name, last_name, roll_number, email, phone)
VALUES 
    ('Alice', 'Smith', 'CS001', 'alice.smith@example.com', '987-654-3210'),
    ('Bob', 'Johnson', 'CS002', 'bob.johnson@example.com', '555-123-4567'),
    ('Charlie', 'Brown', 'CS003', 'charlie.brown@example.com', '444-987-6543');



INSERT INTO Subjects (subject_name, teacher_id)
VALUES ('Mathematics', 1);



INSERT INTO Timetable (subject_id, day_of_week, start_time, end_time, room, semester_start_date, semester_end_date)
VALUES (1, 'Monday', '09:00:00', '10:00:00', 'Room 101', '2025-03-01', '2025-06-30');



INSERT INTO Sessions (timetable_id, date, status)
VALUES 
    (1, '2025-03-03', 'Scheduled'),
    (1, '2025-03-10', 'Scheduled'),
    (1, '2025-03-17', 'Scheduled'),
    (1, '2025-03-24', 'Scheduled');
    
    
    
INSERT INTO Calendar_Exceptions (date, description)
VALUES ('2025-03-17', 'Spring Break');

UPDATE Sessions 
SET status = 'Cancelled'
WHERE date = '2025-03-17' AND timetable_id = 1;



INSERT INTO Attendance (student_id, session_id, status, recorded_by)
VALUES 
    (1, 1, 'Present', 1), -- Alice
    (2, 1, 'Absent', 1),  -- Bob
    (3, 1, 'Late', 1);    -- Charlie

UPDATE Sessions 
SET status = 'Completed'
WHERE session_id = 1;



INSERT INTO Attendance (student_id, session_id, status, recorded_by)
VALUES 
    (1, 2, 'Present', 1), -- Alice
    (2, 2, 'Present', 1), -- Bob
    (3, 2, 'Absent', 1);  -- Charlie

UPDATE Sessions 
SET status = 'Completed'
WHERE session_id = 2;


SELECT 
    s.student_id,
    s.first_name,
    s.last_name,
    s.roll_number,
    COUNT(CASE WHEN a.status = 'Present' THEN 1 END) AS present_count,
    COUNT(CASE WHEN a.status = 'Absent' THEN 1 END) AS absent_count,
    COUNT(CASE WHEN a.status = 'Late' THEN 1 END) AS late_count,
    (SELECT COUNT(*) 
     FROM Sessions ses 
     JOIN Timetable tt ON ses.timetable_id = tt.timetable_id
     WHERE ses.status = 'Completed' AND tt.subject_id = 1) AS total_conducted_sessions,
    (COUNT(CASE WHEN a.status = 'Present' THEN 1 END) * 100.0 / 
     (SELECT COUNT(*) 
      FROM Sessions ses 
      JOIN Timetable tt ON ses.timetable_id = tt.timetable_id
      WHERE ses.status = 'Completed' AND tt.subject_id = 1)) AS attendance_percentage
FROM Students s
JOIN Student_Subject ss ON s.student_id = ss.student_id
JOIN Subjects sub ON ss.subject_id = sub.subject_id
JOIN Timetable tt ON sub.subject_id = tt.subject_id
JOIN Sessions ses ON tt.timetable_id = ses.timetable_id
LEFT JOIN Attendance a ON s.student_id = a.student_id AND a.session_id = ses.session_id
WHERE sub.subject_id = 1 AND ses.status = 'Completed'
GROUP BY s.student_id, s.first_name, s.last_name, s.roll_number;
