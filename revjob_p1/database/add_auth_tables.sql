-- Add Authentication Tables to existing revjob database
-- Run this script to add login/register functionality without affecting existing data

USE revjob;

-- Add new columns to existing user table for authentication
ALTER TABLE user 
ADD COLUMN last_login TIMESTAMP NULL,
ADD COLUMN failed_login_attempts INT DEFAULT 0,
ADD COLUMN account_locked BOOLEAN DEFAULT FALSE,
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN verification_token VARCHAR(255) NULL,
ADD COLUMN reset_password_token VARCHAR(255) NULL,
ADD COLUMN reset_password_expires TIMESTAMP NULL;

-- Create login_sessions table for session management
CREATE TABLE login_session (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Create password_reset table for forgot password functionality
CREATE TABLE password_reset (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Insert demo users with proper authentication data
INSERT INTO user (email, password, first_name, last_name, role, phone, email_verified) VALUES
('john.seeker@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'John', 'Seeker', 'JOB_SEEKER', '+1234567894', TRUE),
('jane.employer@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye', 'Jane', 'Employer', 'EMPLOYER', '+1234567895', TRUE)
ON DUPLICATE KEY UPDATE email = email;

-- Update existing users to have verified emails
UPDATE user SET email_verified = TRUE WHERE email IN ('john.doe@example.com', 'employer@company.com', 'admin@revjobs.com');

-- Create indexes for performance
CREATE INDEX idx_user_email_verified ON user(email_verified);
CREATE INDEX idx_user_verification_token ON user(verification_token);
CREATE INDEX idx_user_reset_token ON user(reset_password_token);
CREATE INDEX idx_login_session_token ON login_session(session_token);
CREATE INDEX idx_login_session_user ON login_session(user_id);
CREATE INDEX idx_login_session_active ON login_session(is_active);
CREATE INDEX idx_password_reset_token ON password_reset(token);
CREATE INDEX idx_password_reset_user ON password_reset(user_id);