CREATE DATABASE student_management;

USE student_management;

-- Students Table
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    register_no VARCHAR(50) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance Table
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL,

    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

-- Marks Table
CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    marks INT NOT NULL,

    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

-- Fees Table
CREATE TABLE fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    total_fee DECIMAL(10,2) NOT NULL,
    paid_fee DECIMAL(10,2) DEFAULT 0,
    pending_fee DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (student_id)
    REFERENCES students(id)
    ON DELETE CASCADE
);

-- Sample Students
INSERT INTO students
(name, register_no, department, year, email)
VALUES
('Arun Kumar', 'REG001', 'B.Com CA', 2, 'arun@gmail.com'),
('Priya S', 'REG002', 'BCA', 2, 'priya@gmail.com'),
('Rahul M', 'REG003', 'B.Sc CS', 3, 'rahul@gmail.com');

-- Sample Marks
INSERT INTO marks
(student_id, subject, marks)
VALUES
(1, 'Computer Application', 85),
(1, 'Accounting', 78),
(2, 'Programming', 90);

-- Sample Fees
INSERT INTO fees
(student_id, total_fee, paid_fee, pending_fee)
VALUES
(1, 50000, 30000, 20000),
(2, 45000, 45000, 0),
(3, 40000, 25000, 15000);