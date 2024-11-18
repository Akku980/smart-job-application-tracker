-- ============================================================
-- Smart Job Application Tracker - Database Schema
-- Author: Aakash
-- Created: 2025
-- Description: Tracks job applications, interviews, statuses
-- ============================================================

CREATE DATABASE IF NOT EXISTS job_tracker;
USE job_tracker;

-- ------------------------------------------------------------
-- Table: Companies
-- ------------------------------------------------------------
CREATE TABLE Companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    industry VARCHAR(60),
    location VARCHAR(80),
    company_size VARCHAR(30),   -- startup / mid-size / large
    website VARCHAR(120),
    created_at DATE DEFAULT (CURRENT_DATE)
);

-- ------------------------------------------------------------
-- Table: Job_Roles
-- ------------------------------------------------------------
CREATE TABLE Job_Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(100) NOT NULL,
    role_type VARCHAR(30),       -- internship / full-time / contract
    domain VARCHAR(60),          -- data analyst / backend / frontend etc.
    min_salary INT,
    max_salary INT
);

-- ------------------------------------------------------------
-- Table: Resume_Versions
-- ------------------------------------------------------------
CREATE TABLE Resume_Versions (
    resume_id INT AUTO_INCREMENT PRIMARY KEY,
    version_name VARCHAR(50) NOT NULL,   -- e.g. "v1_general", "v2_data"
    focus_area VARCHAR(80),
    last_updated DATE,
    notes TEXT
);

-- ------------------------------------------------------------
-- Table: Skills
-- ------------------------------------------------------------
CREATE TABLE Skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(60) NOT NULL,
    category VARCHAR(40)   -- technical / soft / tool
);

-- ------------------------------------------------------------
-- Table: Recruiters
-- ------------------------------------------------------------
CREATE TABLE Recruiters (
    recruiter_id INT AUTO_INCREMENT PRIMARY KEY,
    recruiter_name VARCHAR(80),
    company_id INT,
    email VARCHAR(100),
    linkedin_url VARCHAR(150),
    FOREIGN KEY (company_id) REFERENCES Companies(company_id)
);

-- ------------------------------------------------------------
-- Table: Application_Status  (lookup)
-- ------------------------------------------------------------
CREATE TABLE Application_Status (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(40) NOT NULL,   -- Applied / Shortlisted / Interview / Offer / Rejected / Ghosted
    description VARCHAR(100)
);

-- ------------------------------------------------------------
-- Table: Job_Applications  (main table)
-- ------------------------------------------------------------
CREATE TABLE Job_Applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    role_id INT NOT NULL,
    resume_id INT,
    recruiter_id INT,
    status_id INT NOT NULL,
    applied_date DATE NOT NULL,
    source VARCHAR(50),          -- LinkedIn / Naukri / Company Site / Referral
    job_url VARCHAR(200),
    location VARCHAR(80),
    is_remote TINYINT(1) DEFAULT 0,
    notes TEXT,
    FOREIGN KEY (company_id) REFERENCES Companies(company_id),
    FOREIGN KEY (role_id) REFERENCES Job_Roles(role_id),
    FOREIGN KEY (resume_id) REFERENCES Resume_Versions(resume_id),
    FOREIGN KEY (recruiter_id) REFERENCES Recruiters(recruiter_id),
    FOREIGN KEY (status_id) REFERENCES Application_Status(status_id)
);

-- ------------------------------------------------------------
-- Table: Interviews
-- ------------------------------------------------------------
CREATE TABLE Interviews (
    interview_id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    interview_round INT DEFAULT 1,
    interview_type VARCHAR(40),   -- HR / Technical / Assignment / Final
    interview_date DATE,
    interview_mode VARCHAR(30),   -- Online / In-person / Phone
    result VARCHAR(30),           -- Passed / Failed / Waiting / No-show
    feedback TEXT,
    FOREIGN KEY (application_id) REFERENCES Job_Applications(application_id)
);

-- ------------------------------------------------------------
-- Table: Follow_Up_Tracker
-- ------------------------------------------------------------
CREATE TABLE Follow_Up_Tracker (
    followup_id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    followup_date DATE,
    method VARCHAR(30),    -- Email / LinkedIn / Phone
    response_received TINYINT(1) DEFAULT 0,
    notes TEXT,
    FOREIGN KEY (application_id) REFERENCES Job_Applications(application_id)
);

-- ------------------------------------------------------------
-- Table: Application_Skills  (many-to-many: applications <-> skills)
-- ------------------------------------------------------------
CREATE TABLE Application_Skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    skill_id INT NOT NULL,
    is_matched TINYINT(1) DEFAULT 0,   -- 1 if candidate has this skill
    FOREIGN KEY (application_id) REFERENCES Job_Applications(application_id),
    FOREIGN KEY (skill_id) REFERENCES Skills(skill_id)
);
