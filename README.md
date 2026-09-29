# 🚀 TaskFlow

### Project & Task Management System

> **TaskFlow** is a full-stack project and task management web application built with **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

The system provides authentication, role-based authorization, project collaboration, task assignment, user management, profile management, file upload, and a dynamic dashboard.

---

# ✨ Overview

TaskFlow was built as a practical backend-focused project to understand how a real-world web application can be structured using **MVC architecture, RESTful APIs, JWT authentication, middleware, database relationships, validation, and server-side rendering**.

The application separates responsibilities between:

- 🔐 Authentication & Authorization
- 👥 User Management
- 📁 Project Management
- ✅ Task Management
- 👤 User Profiles
- 📊 Dashboard & Statistics
- 🤝 Team Management
- 📦 Customer Management
- 📁 File Upload
- 🛡️ Error Handling
- 📡 REST API

---

# 🎯 Key Features

## 🔐 Authentication & Authorization

- User registration
- User login
- JWT-based authentication
- HTTP-only cookie for JWT storage
- Authentication middleware
- Role-based authorization
- `USER` and `ADMIN` roles
- Protected routes
- Secure logout
- Token verification

---

## 👥 User Management

> **Admin only**

- Create users
- View users
- Update users
- Delete users
- Manage user accounts
- Role-based access control

---

## 📁 Project Management

- Create projects
- View project list
- View project details
- Add project members
- Remove project members
- Project owner permissions
- Project member management
- Soft delete projects

### Project Permission Model

The creator of a project becomes the **Project Owner**.

| Action         | Project Owner | Member |
| -------------- | :-----------: | :----: |
| View project   |      ✅       |   ✅   |
| Update project |      ✅       |   ❌   |
| Add member     |      ✅       |   ❌   |
| Remove member  |      ✅       |   ❌   |
| Delete project |      ✅       |   ❌   |
| Create task    |      ✅       |   ❌   |

---

## ✅ Task Management

- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Assign tasks to users
- Update task status
- View personal tasks
- Permission-based task management
- Project-based task organization

Each task can be assigned to a single user.

### Task Permission Model

| Action      | Project Owner | Assigned User | Other User |
| ----------- | :-----------: | :-----------: | :--------: |
| View task   |      ✅       |      ✅       |     ❌     |
| Update task |      ✅       |      ✅       |     ❌     |
| Delete task |      ✅       |      ❌       |     ❌     |
| Assign task |      ✅       |      ❌       |     ❌     |

This permission model controls task operations based on the user's relationship with the project and task.

---

## 👤 Profile Management

- View personal profile
- Edit profile
- Update name
- Update city
- Upload avatar
- Display avatar throughout the application
- Avatar fallback using user's initials

---

## 📊 Dashboard

The dashboard displays dynamic application statistics such as:

| Statistic            | Description                           |
| -------------------- | ------------------------------------- |
| 👥 Total Users       | Number of registered users            |
| 📁 Total Projects    | Number of existing projects           |
| 🔄 Tasks In Progress | Number of tasks currently in progress |
| 📈 Completion Rate   | Percentage of completed tasks         |

The statistics are calculated from the current database data when the dashboard is loaded.

---

## 🤝 Team Management

Users can view members related to their projects.

The Team page provides:

- Team member information
- Project relationships
- User information
- Project-based team organization
- Duplicate member handling across projects

---

## 📦 Customer Management

The backend also provides customer management APIs.

Features include:

- Create customer
- Create multiple customers
- View customers
- Update customer
- Delete customer
- Delete multiple customers
- Joi validation

---

## ❓ Help Center

A dedicated Help page provides guidance for:

- Getting Started
- Projects
- Tasks
- Account management

---

# 🔐 Authentication Architecture

TaskFlow uses **JWT authentication** with an HTTP-only cookie for the web application.

```text
┌──────────────┐
│  User Login  │
└──────┬───────┘
       ↓
┌──────────────────────┐
│ Validate Credentials │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│     Generate JWT     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   HTTP-only Cookie   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Authentication       │
│ Middleware           │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│     Verify JWT       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│       req.user       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   Protected Route    │
└──────────────────────┘
```

## Authentication vs Authorization

TaskFlow separates **authentication** from **authorization**.

### Authentication

Determines whether the user is authenticated.

```text
JWT
 ↓
authMiddleware
 ↓
Verify Token
 ↓
req.user
```

### Authorization

Determines whether the authenticated user has permission to perform a specific action.

```text
USER
 └── Normal application access

ADMIN
 └── User management
```

---

# 🛡️ Role-Based Authorization

TaskFlow currently supports two roles:

| Role    | Description                 |
| ------- | --------------------------- |
| `USER`  | Normal application user     |
| `ADMIN` | User management permissions |

Admin-only routes are protected using:

```text
authMiddleware
       ↓
roleMiddleware("ADMIN")
       ↓
Controller
```

---

# 🏗️ Architecture

TaskFlow follows a modular backend structure inspired by the **MVC architecture**.

```text
Client
  │
  ▼
┌──────────────────────┐
│       Routes         │
│    Web / REST API    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Middleware      │
│ Auth / Role / Valid. │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Controllers      │
│   Request Handling   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Services       │
│    Business Logic    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Models         │
│   Mongoose / MongoDB │
└──────────────────────┘
```

---

# 📂 Project Structure

```text
src/
│
├── config/
│   ├── database.js
│   └── viewEngine.js
│
├── controllers/
│   ├── apiController.js
│   ├── authController.js
│   ├── customerController.js
│   ├── projectController.js
│   ├── taskController.js
│   └── ...
│
├── models/
│   ├── user.js
│   ├── project.js
│   ├── task.js
│   └── ...
│
├── routes/
│   ├── api.js
│   └── web.js
│
├── services/
│   ├── projectService.js
│   ├── taskService.js
│   ├── teamService.js
│   └── ...
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validationMiddleware.js
│   └── errorHandler.js
│
├── validations/
│   ├── customer.validation.js
│   ├── project.validation.js
│   └── task.validation.js
│
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── profile.ejs
│   ├── team.ejs
│   ├── help.ejs
│   └── ...
│
├── public/
│   ├── css/
│   └── images/
│
└── server.js
```

---

# 🧰 Tech Stack

## Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

- Node.js
- Express.js
- EJS
- REST API
- CommonJS

---

## Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

- MongoDB Atlas
- Mongoose
- MongoDB document relationships
- Mongoose Populate
- Soft deletion with `mongoose-delete`

---

## Authentication & Security

- JSON Web Token (JWT)
- bcryptjs
- HTTP-only Cookies
- Role-Based Authorization
- Authentication Middleware
- Protected Routes

---

## Validation & Middleware

- Joi
- Custom Authentication Middleware
- Custom Role Middleware
- Custom Validation Middleware
- Centralized Error Handler
- Custom `AppError`

---

## File Upload

- express-fileupload
- Single file upload
- Multiple file upload
- Avatar upload
- Static file serving

---

# 📡 REST API

The REST API is available under:

```text
/v1/api
```

## 🔐 Authentication

```http
POST /v1/api/register
POST /v1/api/login
GET  /v1/api/profile
```

`/profile` requires authentication.

---

## 👥 Users

User management endpoints require the `ADMIN` role.

```http
GET    /v1/api/users
POST   /v1/api/users
PUT    /v1/api/users
DELETE /v1/api/users
```

---

## 📦 Customers

All customer endpoints require authentication.

```http
GET    /v1/api/customers
POST   /v1/api/customers
PUT    /v1/api/customers
DELETE /v1/api/customers

POST   /v1/api/customers-many
DELETE /v1/api/customers-many
```

---

## 📁 Projects

All project endpoints require authentication.

```http
GET    /v1/api/projects
POST   /v1/api/projects
PUT    /v1/api/projects
DELETE /v1/api/projects

POST   /v1/api/projects/users
```

---

## ✅ Tasks

All task endpoints require authentication.

```http
GET    /v1/api/tasks
POST   /v1/api/tasks
PUT    /v1/api/tasks
DELETE /v1/api/tasks

GET    /v1/api/tasks/my-tasks
```

---

## 📁 File Upload

Single file upload:

```http
POST /v1/api/file
```

Multiple file upload:

```http
POST /v1/api/files
```

Both endpoints require authentication.

---

## 🔎 Query Parameters

Query parameters can be used without defining them directly in the route.

Example:

```http
GET /v1/api/users?name=Duy
```

Access them using:

```js
req.query;
```

---

## 🔗 Route Parameters

Route parameters are defined directly inside the route.

Example:

```http
GET /v1/api/users/Duy/HCM
```

Access them using:

```js
req.params;
```

---

# 🗄️ Database

TaskFlow uses **MongoDB Atlas** with **Mongoose** as the ODM.

## Main Collections

```text
users
projects
tasks
customers
```

## Database Relationships

```text
             ┌──────────────┐
             │     User     │
             └──────┬───────┘
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
    ┌───────────┐       ┌───────────┐
    │  Project  │       │   Task    │
    └─────┬─────┘       └─────┬─────┘
          │                   │
          │                   │
          ▼                   ▼
       Members             Assignee
```

Mongoose is used for:

- Schema definition
- Data validation
- Database queries
- Document relationships
- Population of referenced documents
- Soft deletion

---

# 🖼️ File Upload

User avatars are uploaded using `express-fileupload`.

Uploaded files are stored under:

```text
src/public/images/upload/
```

Files are served through Express static middleware.

Example URL:

```text
/images/upload/<filename>
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
DB_NAME=<database_name>

JWT_SECRET=<your_jwt_secret>
```

## `.env.example`

For GitHub, create a `.env.example` file containing placeholder values only:

```env
PORT=3000

DB_HOST=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
DB_NAME=<database_name>

JWT_SECRET=<your_jwt_secret>
```

> ⚠️ **Never commit `.env` or real credentials to GitHub.**

The project `.gitignore` includes:

```gitignore
node_modules/
.env
```

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/duynguyen1312004/backend0.git
```

## 2. Enter the project directory

```bash
cd backend0
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create a `.env` file and configure:

- MongoDB connection
- Database name
- JWT secret
- Application port

## 5. Start development server

```bash
npm run dev
```

## 6. Or start production server

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🌱 Future Improvements

Possible future improvements:

- [ ] Pagination
- [ ] Search & filtering
- [ ] Project status management
- [ ] Task priority
- [ ] Task comments
- [ ] Notifications
- [ ] More advanced dashboard analytics
- [ ] Improved API documentation
- [ ] Production deployment
- [ ] Automated testing

---

# 🎓 Project Purpose

TaskFlow was created as a **learning and portfolio project** to gain practical experience in backend and full-stack web development.

Through this project, I practiced:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST API Design
- Middleware Architecture
- Role-Based Authorization
- EJS Server-Side Rendering
- Joi Validation
- File Upload
- Database Relationships
- Soft Delete
- Project & Task Management
- Backend Error Handling

The main goal was not only to build a working application, but also to understand how different backend components work together in a real-world system.

---

# 👨‍💻 Author

### Duy Nguyen

GitHub:

https://github.com/duynguyen1312004

---

<div align="center">

### ⭐ TaskFlow

**Organize your work. Manage your projects. Get things done.**

</div>
