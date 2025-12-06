# RevJobs Backend - Spring Boot Application

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Database Setup

1. **Create MySQL Database**:
```sql
CREATE DATABASE revjobs_db;
```

2. **Database Configuration**:
The application is configured to use:
- Database: `revjobs_db`
- Username: `root`
- Password: `ROOT`
- Port: `3306`

Configuration is in `src/main/resources/application.properties`

## Project Structure

```
backend/
├── src/main/java/com/revjobs/
│   ├── RevJobsApplication.java          # Main application class
│   ├── model/                           # Entity classes (10 classes)
│   │   ├── User.java
│   │   ├── Job.java
│   │   ├── Application.java
│   │   ├── Message.java
│   │   ├── Notification.java
│   │   ├── Company.java
│   │   └── Enums (UserRole, JobStatus, etc.)
│   ├── repository/                      # JPA Repositories (7 classes)
│   │   ├── UserRepository.java
│   │   ├── JobRepository.java
│   │   ├── ApplicationRepository.java
│   │   ├── MessageRepository.java
│   │   ├── NotificationRepository.java
│   │   └── CompanyRepository.java
│   ├── service/                         # Business Logic (7 classes)
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   ├── JobService.java
│   │   ├── ApplicationService.java
│   │   ├── MessageService.java
│   │   ├── NotificationService.java
│   │   └── CompanyService.java
│   ├── controller/                      # REST Controllers (7 classes)
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── JobController.java
│   │   ├── ApplicationController.java
│   │   ├── MessageController.java
│   │   ├── NotificationController.java
│   │   └── CompanyController.java
│   ├── dto/                            # Data Transfer Objects (8 classes)
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── AuthResponse.java
│   │   ├── UserDTO.java
│   │   ├── JobDTO.java
│   │   ├── ApplicationDTO.java
│   │   ├── MessageDTO.java
│   │   └── NotificationDTO.java
│   ├── config/                         # Configuration classes
│   │   └── SecurityConfig.java
│   ├── exception/                      # Exception handling
│   │   ├── ResourceNotFoundException.java
│   │   └── GlobalExceptionHandler.java
│   └── util/                           # Utility classes
│       └── JwtUtil.java
└── src/main/resources/
    └── application.properties          # Application configuration
```

## How to Run

### Option 1: Using Maven Command Line

1. **Navigate to backend directory**:
```bash
cd "c:\Users\srava\Downloads\revjob_p1 (2)\revjob_p1\backend"
```

2. **Clean and Install**:
```bash
mvn clean install
```

3. **Run the application**:
```bash
mvn spring-boot:run
```

### Option 2: Using IDE (IntelliJ IDEA / Eclipse)

1. Import the project as a Maven project
2. Wait for dependencies to download
3. Run `RevJobsApplication.java` as Java Application

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{id}` - Get job by ID
- `GET /api/jobs/search?keyword={keyword}` - Search jobs
- `PUT /api/jobs/{id}` - Update job
- `DELETE /api/jobs/{id}` - Delete job

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications/candidate` - Get candidate applications
- `GET /api/applications/job/{jobId}` - Get job applications
- `PUT /api/applications/{id}/status` - Update application status

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/conversation/{userId}` - Get conversation
- `PUT /api/messages/{id}/read` - Mark as read

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/{id}/read` - Mark as read

### Companies
- `POST /api/companies` - Create company
- `GET /api/companies` - Get all companies
- `GET /api/companies/{id}` - Get company by ID
- `PUT /api/companies/{id}` - Update company
- `DELETE /api/companies/{id}` - Delete company

## Application will run on
- **Backend**: http://localhost:8080
- **API Base URL**: http://localhost:8080/api

## Database Tables Created Automatically
The application uses Hibernate with `spring.jpa.hibernate.ddl-auto=update`, which will automatically create the following tables:
- users
- jobs
- job_requirements
- applications
- messages
- notifications
- companies

## Testing the API

You can test the API using:
1. **Postman** - Import the endpoints
2. **cURL** - Command line testing
3. **Frontend Application** - React app on port 3000

### Example Register Request:
```json
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "JOB_SEEKER"
}
```

### Example Login Request:
```json
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## Troubleshooting

1. **Port 8080 already in use**:
   - Change port in `application.properties`: `server.port=8081`

2. **Database connection error**:
   - Verify MySQL is running
   - Check username/password in `application.properties`
   - Ensure database `revjobs_db` exists

3. **Maven build fails**:
   - Check Java version: `java -version` (should be 17+)
   - Update Maven: `mvn -version`
   - Clean Maven cache: `mvn clean`

## Features
- ✅ User Authentication (Register/Login)
- ✅ JWT Token-based Security
- ✅ Job Management (CRUD)
- ✅ Application Management
- ✅ Messaging System
- ✅ Notifications
- ✅ Company Management
- ✅ Role-based Access (Job Seeker, Employer, Admin)
- ✅ MySQL Database Integration
- ✅ RESTful API
- ✅ Exception Handling
- ✅ CORS Configuration
