# RevJobs Backend - Complete Project Structure

## 📁 Complete Directory Structure

```
backend/
├── pom.xml                                    # Maven configuration
├── README.md                                  # Project documentation
├── PROJECT_STRUCTURE.md                       # This file
├── .gitignore                                # Git ignore rules
│
└── src/
    ├── main/
    │   ├── java/com/revjobs/
    │   │   ├── RevJobsApplication.java       # Main Spring Boot application
    │   │   │
    │   │   ├── model/                        # Entity Models (11 classes)
    │   │   │   ├── User.java                 # User entity
    │   │   │   ├── Job.java                  # Job entity
    │   │   │   ├── Application.java          # Application entity
    │   │   │   ├── Message.java              # Message entity
    │   │   │   ├── Notification.java         # Notification entity
    │   │   │   ├── Company.java              # Company entity
    │   │   │   ├── UserRole.java             # User role enum
    │   │   │   ├── JobStatus.java            # Job status enum
    │   │   │   ├── ExperienceLevel.java      # Experience level enum
    │   │   │   ├── ApplicationStatus.java    # Application status enum
    │   │   │   └── NotificationType.java     # Notification type enum
    │   │   │
    │   │   ├── repository/                   # JPA Repositories (7 classes)
    │   │   │   ├── UserRepository.java
    │   │   │   ├── JobRepository.java
    │   │   │   ├── ApplicationRepository.java
    │   │   │   ├── MessageRepository.java
    │   │   │   ├── NotificationRepository.java
    │   │   │   └── CompanyRepository.java
    │   │   │
    │   │   ├── service/                      # Business Logic (9 classes)
    │   │   │   ├── AuthService.java
    │   │   │   ├── UserService.java
    │   │   │   ├── JobService.java
    │   │   │   ├── ApplicationService.java
    │   │   │   ├── MessageService.java
    │   │   │   ├── NotificationService.java
    │   │   │   ├── CompanyService.java
    │   │   │   ├── EmailService.java
    │   │   │   └── DashboardService.java
    │   │   │
    │   │   ├── controller/                   # REST Controllers (8 classes)
    │   │   │   ├── AuthController.java
    │   │   │   ├── UserController.java
    │   │   │   ├── JobController.java
    │   │   │   ├── ApplicationController.java
    │   │   │   ├── MessageController.java
    │   │   │   ├── NotificationController.java
    │   │   │   ├── CompanyController.java
    │   │   │   └── DashboardController.java
    │   │   │
    │   │   ├── dto/                          # Data Transfer Objects (10 classes)
    │   │   │   ├── LoginRequest.java
    │   │   │   ├── RegisterRequest.java
    │   │   │   ├── AuthResponse.java
    │   │   │   ├── UserDTO.java
    │   │   │   ├── JobDTO.java
    │   │   │   ├── ApplicationDTO.java
    │   │   │   ├── MessageDTO.java
    │   │   │   ├── NotificationDTO.java
    │   │   │   ├── CompanyDTO.java
    │   │   │   └── ErrorResponse.java
    │   │   │
    │   │   ├── config/                       # Configuration (3 classes)
    │   │   │   ├── SecurityConfig.java
    │   │   │   ├── WebConfig.java
    │   │   │   └── JpaConfig.java
    │   │   │
    │   │   ├── exception/                    # Exception Handling (4 classes)
    │   │   │   ├── ResourceNotFoundException.java
    │   │   │   ├── BadRequestException.java
    │   │   │   ├── UnauthorizedException.java
    │   │   │   └── GlobalExceptionHandler.java
    │   │   │
    │   │   └── util/                         # Utility Classes (5 classes)
    │   │       ├── JwtUtil.java
    │   │       ├── ResponseUtil.java
    │   │       ├── DateUtil.java
    │   │       ├── ValidationUtil.java
    │   │       └── (More utilities as needed)
    │   │
    │   └── resources/
    │       ├── application.properties        # Main configuration
    │       ├── application.yml              # Alternative YAML configuration
    │       └── (static/, templates/ if needed)
    │
    └── test/
        ├── java/                            # Test classes
        └── resources/                       # Test resources
```

## 📊 Package Summary

| Package | Classes | Purpose |
|---------|---------|---------|
| **model** | 11 | Entity classes and enums |
| **repository** | 7 | Data access layer |
| **service** | 9 | Business logic layer |
| **controller** | 8 | REST API endpoints |
| **dto** | 10 | Data transfer objects |
| **config** | 3 | Application configuration |
| **exception** | 4 | Exception handling |
| **util** | 5 | Utility functions |
| **TOTAL** | **57** | Complete backend |

## 🗄️ Database Tables (Auto-created)

1. **users** - User accounts
2. **jobs** - Job postings
3. **job_requirements** - Job requirements (ElementCollection)
4. **applications** - Job applications
5. **messages** - User messages
6. **notifications** - User notifications
7. **companies** - Company information

## 🔌 API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users` - Get all users
- GET `/api/users/{id}` - Get user by ID
- GET `/api/users/email/{email}` - Get user by email
- GET `/api/users/role/{role}` - Get users by role
- PUT `/api/users/{id}` - Update user
- DELETE `/api/users/{id}` - Delete user

### Jobs
- POST `/api/jobs` - Create job
- GET `/api/jobs` - Get all jobs
- GET `/api/jobs/{id}` - Get job by ID
- GET `/api/jobs/search?keyword={keyword}` - Search jobs
- PUT `/api/jobs/{id}` - Update job
- DELETE `/api/jobs/{id}` - Delete job

### Applications
- POST `/api/applications` - Apply for job
- GET `/api/applications/candidate` - Get candidate applications
- GET `/api/applications/job/{jobId}` - Get job applications
- PUT `/api/applications/{id}/status` - Update status

### Messages
- POST `/api/messages` - Send message
- GET `/api/messages/conversation/{userId}` - Get conversation
- PUT `/api/messages/{id}/read` - Mark as read

### Notifications
- GET `/api/notifications` - Get notifications
- PUT `/api/notifications/{id}/read` - Mark as read

### Companies
- POST `/api/companies` - Create company
- GET `/api/companies` - Get all companies
- GET `/api/companies/{id}` - Get company by ID
- GET `/api/companies/search?name={name}` - Search companies
- PUT `/api/companies/{id}` - Update company
- DELETE `/api/companies/{id}` - Delete company

### Dashboard
- GET `/api/dashboard/admin` - Admin statistics
- GET `/api/dashboard/employer` - Employer statistics
- GET `/api/dashboard/jobseeker` - Job seeker statistics

## 🔧 Technologies Used

- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Security**
- **MySQL 8.0**
- **JWT Authentication**
- **Lombok**
- **Maven**
- **Java 17**

## 🚀 How to Run

1. **Ensure MySQL is running**
2. **Create database**: `CREATE DATABASE revjobs_db;`
3. **Navigate to backend**: `cd backend`
4. **Build**: `mvn clean install`
5. **Run**: `mvn spring-boot:run`
6. **Access**: http://localhost:8080/api

## ✅ Features Implemented

- ✅ User Registration & Authentication
- ✅ JWT Token-based Security
- ✅ Role-based Access Control (Job Seeker, Employer, Admin)
- ✅ Job Management (CRUD)
- ✅ Application Management
- ✅ Messaging System
- ✅ Notifications
- ✅ Company Management
- ✅ Dashboard Statistics
- ✅ Email Service (Logging)
- ✅ Global Exception Handling
- ✅ CORS Configuration
- ✅ Input Validation
- ✅ Database Integration
- ✅ RESTful API Design

## 📝 Notes

- All tables are auto-created by Hibernate
- Password encryption using BCrypt
- JWT tokens expire after 24 hours
- CORS enabled for localhost:3000 and localhost:3001
- All endpoints support JSON format
- Comprehensive error handling
- Transaction management enabled
