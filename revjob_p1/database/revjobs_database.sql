-- RevJobs Database Schema
-- Username: root, Password: ROOT

CREATE DATABASE IF NOT EXISTS revjobs_db;
USE revjobs_db;

-- 1. Users Table (Base user information)
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('JOB_SEEKER', 'EMPLOYER', 'ADMIN') NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Companies Table
CREATE TABLE companies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    industry VARCHAR(100),
    company_size ENUM('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'),
    location VARCHAR(255),
    logo_url VARCHAR(500),
    employer_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 3. Job Postings Table
CREATE TABLE job_postings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    job_type ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'REMOTE') NOT NULL,
    experience_level ENUM('ENTRY', 'MID', 'SENIOR', 'EXECUTIVE') NOT NULL,
    location VARCHAR(255),
    is_remote BOOLEAN DEFAULT FALSE,
    status ENUM('ACTIVE', 'CLOSED', 'DRAFT') DEFAULT 'ACTIVE',
    company_id BIGINT NOT NULL,
    posted_by BIGINT NOT NULL,
    application_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Job Applications Table
CREATE TABLE job_applications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL,
    applicant_id BIGINT NOT NULL,
    status ENUM('PENDING', 'REVIEWED', 'SHORTLISTED', 'INTERVIEWED', 'REJECTED', 'HIRED') DEFAULT 'PENDING',
    cover_letter TEXT,
    resume_url VARCHAR(500),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES job_postings(id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (job_id, applicant_id)
);

-- 5. User Profiles Table
CREATE TABLE user_profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNIQUE NOT NULL,
    bio TEXT,
    skills TEXT,
    experience_years INT DEFAULT 0,
    education VARCHAR(500),
    current_position VARCHAR(255),
    current_company VARCHAR(255),
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    profile_picture_url VARCHAR(500),
    resume_url VARCHAR(500),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Messages Table
CREATE TABLE messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    subject VARCHAR(255),
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    message_type ENUM('APPLICATION', 'INTERVIEW', 'GENERAL', 'SYSTEM') DEFAULT 'GENERAL',
    related_job_id BIGINT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (related_job_id) REFERENCES job_postings(id) ON DELETE SET NULL
);

-- 7. Job Categories Table
CREATE TABLE job_categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Job Skills Table
CREATE TABLE job_skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    job_id BIGINT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (job_id) REFERENCES job_postings(id) ON DELETE CASCADE
);

-- 9. Saved Jobs Table
CREATE TABLE saved_jobs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    job_id BIGINT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES job_postings(id) ON DELETE CASCADE,
    UNIQUE KEY unique_saved_job (user_id, job_id)
);

-- Insert Sample Data
INSERT INTO users (email, password, first_name, last_name, role, phone) VALUES
('john.doe@example.com', '$2a$10$encrypted_password_hash', 'John', 'Doe', 'JOB_SEEKER', '+1234567890'),
('employer@company.com', '$2a$10$encrypted_password_hash', 'Jane', 'Smith', 'EMPLOYER', '+1234567891'),
('admin@revjobs.com', '$2a$10$encrypted_password_hash', 'Admin', 'User', 'ADMIN', '+1234567892');

INSERT INTO companies (name, description, website, industry, company_size, location, employer_id) VALUES
('TechCorp Inc', 'Leading technology solutions provider', 'https://techcorp.com', 'Technology', '201-500', 'San Francisco, CA', 2),
('StartupXYZ', 'Innovative startup in AI/ML space', 'https://startupxyz.com', 'Artificial Intelligence', '11-50', 'New York, NY', 2);

INSERT INTO job_categories (name, description, icon) VALUES
('Software Development', 'Programming and software engineering roles', 'code'),
('Design', 'UI/UX and graphic design positions', 'palette'),
('Marketing', 'Digital marketing and growth roles', 'trending-up');

INSERT INTO job_postings (title, description, requirements, salary_min, salary_max, job_type, experience_level, location, company_id, posted_by, application_deadline) VALUES
('Senior React Developer', 'We are looking for an experienced React developer to join our team...', 'React, TypeScript, Node.js, 5+ years experience', 120000, 150000, 'FULL_TIME', 'SENIOR', 'San Francisco, CA', 1, 2, '2024-12-31'),
('Product Manager', 'Lead product strategy and development for our AI platform...', 'Product management experience, AI/ML knowledge, MBA preferred', 130000, 160000, 'FULL_TIME', 'MID', 'New York, NY', 2, 2, '2024-12-25');

-- Create Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_postings_company ON job_postings(company_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);