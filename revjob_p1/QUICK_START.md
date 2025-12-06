# 🚀 RevJobs - Quick Start Guide

## Complete Full-Stack Job Portal Application

### 📋 Prerequisites

1. **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
2. **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
3. **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
4. **Node.js 16+** - [Download](https://nodejs.org/)
5. **npm or yarn** - Comes with Node.js

---

## 🗄️ Step 1: Database Setup

### Start MySQL and create database:

```sql
CREATE DATABASE revjobs_db;
```

**Database Credentials (configured in backend):**
- Database: `revjobs_db`
- Username: `root`
- Password: `ROOT`
- Port: `3306`

---

## 🔧 Step 2: Backend Setup (Spring Boot)

### Open Command Prompt/Terminal:

```bash
# Navigate to backend directory
cd "c:\Users\srava\Downloads\revjob_p1 (2)\revjob_p1\backend"

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

**Backend will start on:** `http://localhost:8080/api`

### Verify Backend is Running:
Open browser and go to: `http://localhost:8080/api/users`

---

## 💻 Step 3: Frontend Setup (React)

### Open NEW Command Prompt/Terminal:

```bash
# Navigate to frontend directory
cd "c:\Users\srava\Downloads\revjob_p1 (2)\revjob_p1\frontend"

# Install dependencies (if not already done)
npm install --legacy-peer-deps

# Start the application
npm start
```

**Frontend will start on:** `http://localhost:3000`

---

## 🎯 Step 4: Test the Application

### 1. Register a New User

1. Go to `http://localhost:3000`
2. Click **"Register"** button in header
3. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: password123
   - Role: Job Seeker
4. Click **"Create Account"**

### 2. Login

1. Click **"Login"** button
2. Enter credentials:
   - Email: john@example.com
   - Password: password123
3. Click **"Sign In"**

### 3. Explore Features

- **Browse Jobs** - View available job listings
- **Apply for Jobs** - Submit applications
- **View Dashboard** - See your statistics
- **Messages** - Chat with recruiters
- **Notifications** - Get real-time updates
- **Profile** - Update your information

---

## 👥 Demo Accounts

### Job Seeker
- Email: `john.doe@example.com`
- Password: `password123`

### Employer
- Email: `employer@company.com`
- Password: `password123`

### Admin
- Email: `admin@revjobs.com`
- Password: `password123`

---

## 📁 Project Structure

```
revjob_p1/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/revjobs/
│   │   ├── model/             # 11 Entity classes
│   │   ├── repository/        # 7 Repository interfaces
│   │   ├── service/           # 9 Service classes
│   │   ├── controller/        # 8 REST Controllers
│   │   ├── dto/               # 10 DTO classes
│   │   ├── config/            # 3 Configuration classes
│   │   ├── exception/         # 4 Exception classes
│   │   └── util/              # 5 Utility classes
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application.yml
│   └── pom.xml
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/        # React components
    │   ├── pages/            # 17+ pages
    │   ├── contexts/         # Context providers
    │   ├── services/         # API services
    │   └── theme/            # Material-UI theme
    └── package.json
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:8080/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/jobs` | Get all jobs |
| POST | `/jobs` | Create job (Employer) |
| GET | `/jobs/{id}` | Get job details |
| POST | `/applications` | Apply for job |
| GET | `/applications/candidate` | Get my applications |
| GET | `/messages/conversation/{userId}` | Get messages |
| POST | `/messages` | Send message |
| GET | `/notifications` | Get notifications |
| GET | `/dashboard/admin` | Admin dashboard |
| GET | `/dashboard/employer` | Employer dashboard |
| GET | `/dashboard/jobseeker` | Job seeker dashboard |

---

## 🎨 Features

### ✅ Frontend (React + Material-UI)
- 17+ responsive pages
- User authentication (Register/Login/Forgot Password)
- Job listings and search
- Job application system
- Real-time messaging
- Notifications system
- Role-based dashboards (Admin, Employer, Job Seeker)
- Company profiles
- Blog and career pages
- Responsive design with glass effects

### ✅ Backend (Spring Boot + MySQL)
- RESTful API architecture
- JWT authentication
- Role-based access control
- MySQL database integration
- JPA/Hibernate ORM
- Transaction management
- Global exception handling
- CORS configuration
- Input validation
- Email service (logging)

---

## 🛠️ Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```properties
# Change in application.properties
server.port=8081
```

**Database connection error:**
1. Verify MySQL is running
2. Check credentials in `application.properties`
3. Ensure database `revjobs_db` exists

**Maven build fails:**
```bash
# Clean and rebuild
mvn clean install -U
```

### Frontend Issues

**Port 3000 already in use:**
- Choose different port when prompted (e.g., 3001)

**npm install fails:**
```bash
# Use legacy peer deps
npm install --legacy-peer-deps --force
```

**White screen:**
1. Check browser console for errors
2. Verify backend is running
3. Clear browser cache

---

## 📊 Database Tables (Auto-created)

When you run the backend, these tables are automatically created:

1. **users** - User accounts and profiles
2. **jobs** - Job postings
3. **job_requirements** - Job requirements list
4. **applications** - Job applications
5. **messages** - User messages
6. **notifications** - User notifications
7. **companies** - Company information

---

## 🔐 Security

- Passwords encrypted with BCrypt
- JWT tokens for authentication
- Token expiration: 24 hours
- CORS enabled for localhost
- Input validation on all endpoints
- SQL injection prevention via JPA

---

## 📞 Support

For issues or questions:
1. Check `README.md` in backend folder
2. Check `PROJECT_STRUCTURE.md` for detailed structure
3. Review API endpoints documentation
4. Check application logs in console

---

## 🎉 Success!

If both servers are running:
- ✅ Backend: http://localhost:8080/api
- ✅ Frontend: http://localhost:3000
- ✅ Database: MySQL on port 3306

**You're ready to use RevJobs!** 🚀

Register a new account and start exploring the complete job portal application with real database integration!
