# Library Management System

Hi! I'm Shweta and this is my library management system project. 

The system has two main user types - admins who can manage the book catalog and regular users who can browse and borrow books. I tried to make it as user-friendly as possible.

## Quick Links
Demo Link :- https://drive.google.com/file/d/1AB5daZYVHNpO7erBbHDsTGpmefKaVLTm/view?usp=sharing
Live Link :- 

**Note:** I'm still working on getting this deployed online, so for now you'll need to run it locally to test it out.

## Getting Started

### Prerequisites

Before you start, make sure you have these installed:

- Node.js (I used version 18, but 16+ should work fine)
- MySQL (I'm using version 8.0)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd LMS_
   ```

2. **Database Setup**

   I went with MySQL because it's reliable and I'm familiar with it. Here's the database schema I created:

   ```sql
   CREATE DATABASE library_management_system;
   USE library_management_system;

   CREATE TABLE users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     role ENUM('Admin', 'User') DEFAULT 'User',
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE books (
     id INT PRIMARY KEY AUTO_INCREMENT,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL,
     genre VARCHAR(100) NOT NULL,
     totalCopies INT NOT NULL DEFAULT 1,
     borrowed INT DEFAULT 0,
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE borrows (
     id INT PRIMARY KEY AUTO_INCREMENT,
     userId INT NOT NULL,
     bookId INT NOT NULL,
     borrowDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     returnDate TIMESTAMP NULL,
     FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
     FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE
   );
   ```

3. **Backend Setup**

   Navigate to the server directory and install dependencies:

   ```bash
   cd LMS/server
   npm install
   ```

   Create a `.env` file in the server folder with your database configuration:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=library_management_system
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Frontend Setup**

   Move to the client directory and install dependencies:

   ```bash
   cd LMS/client
   npm install
   ```

5. **Running the Application**

   Start the backend server first:

   ```bash
   cd LMS/server
   npm run dev
   ```

   Then in a new terminal, start the frontend:

   ```bash
   cd LMS/client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Tech Stack

### Frontend Technologies

- **React 19.1.1** - I've been using React for a while now and it's become my go-to for building user interfaces
- **Vite 7.1.2** - Switched from Create React App to Vite and honestly, it's so much faster
- **React Router DOM 7.9.1** - Handles all the page navigation
- **Tailwind CSS 4.1.13** - I love how quickly I can style things with Tailwind
- **Radix UI** - Great accessible components that save me time
- **Axios 1.12.1** - For API calls to the backend
- **React Hot Toast 2.6.0** - User-friendly notifications
- **Lucide React 0.544.0** - Simple and clean icons

### Backend Technologies

- **Node.js** - Keeps everything in JavaScript which is convenient
- **Express.js 5.1.0** - Lightweight and does exactly what I need
- **MySQL2 3.14.5** - Database driver for MySQL
- **JWT (jsonwebtoken 9.0.2)** - Handles user authentication
- **bcryptjs 3.0.2** - Essential for password security
- **CORS 2.8.5** - Enables frontend-backend communication
- **dotenv 17.2.2** - Manages environment variables

### Why These Technologies?

I picked React because I'm comfortable with it and it's great for building interactive UIs. Vite was a game-changer for me - the hot reload is super fast. Tailwind CSS has made styling so much easier, and Radix UI components are accessible by default which is important to me. For the backend, Express is simple and does what I need without being overly complex, and MySQL is reliable for storing data.

## Database Design

I kept the database design simple with three main tables. I wanted to make sure it was easy to understand and maintain:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      USERS      │    │      BOOKS      │    │     BORROWS     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ name            │    │ title           │    │ userId (FK)     │
│ email (UNIQUE)  │    │ author          │    │ bookId (FK)     │
│ password        │    │ genre           │    │ borrowDate      │
│ role            │    │ totalCopies     │    │ returnDate      │
│ createdAt       │    │ borrowed        │    │                 │
│                 │    │ createdAt       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │                           │
                    │  One-to-Many              │
                    │  (User can borrow         │
                    │   multiple books)         │
                    │                           │
                    │  One-to-Many              │
                    │  (Book can be borrowed    │
                    │   by multiple users)      │
                    └───────────────────────────┘
```

### Table Descriptions

- **users** - Stores user information including name, email, password, and their role (admin or regular user)
- **books** - Contains the library catalog with book details and availability tracking
- **borrows** - Tracks borrowing history, linking users to the books they've borrowed

## API Documentation

I've created several API endpoints to handle different operations. Here's what each one does:

### Authentication (`/auth`)

| Method | Endpoint         | What it does      | Auth needed? |
| ------ | ---------------- | ----------------- | ------------ |
| POST   | `/auth/register` | Sign up new users | No           |
| POST   | `/auth/login`    | Log in users      | No           |

### Book Management (`/book`)

| Method | Endpoint    | What it does        | Auth needed? | Who can use it? |
| ------ | ----------- | ------------------- | ------------ | --------------- |
| GET    | `/book`     | Get all books       | Yes          | Everyone        |
| POST   | `/book`     | Add new book        | Yes          | Admins only     |
| PUT    | `/book/:id` | Update book details | Yes          | Admins only     |
| DELETE | `/book/:id` | Delete book         | Yes          | Admins only     |

### Borrowing (`/borrow`)

| Method | Endpoint             | What it does            | Auth needed? | Who can use it? |
| ------ | -------------------- | ----------------------- | ------------ | --------------- |
| POST   | `/borrow`            | Borrow a book           | Yes          | Everyone        |
| POST   | `/borrow/return`     | Return a book           | Yes          | Everyone        |
| GET    | `/borrow/my-borrows` | See your borrowed books | Yes          | Everyone        |

### Example requests

**Sign up:**

```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "User"
}
```

**Log in:**

```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Add a book (admin only):**

```json
POST /book
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "totalCopies": 5
}
```

**Borrow a book:**

```json
POST /borrow
{
  "bookId": 1
}
```

## Features

### User Authentication

- User registration and login system
- JWT-based authentication for secure sessions
- Role-based access control (admin vs regular user)
- Protected routes that require authentication

### Admin Capabilities

- Add new books to the library catalog
- Edit existing book information
- Remove books from the system
- View all books with availability status
- Monitor borrowing activity

### User Features

- Browse the complete book catalog
- Borrow available books
- View personal borrowing history
- Return borrowed books
- Real-time availability updates

### User Interface

- Responsive design that works on all devices
- Intuitive navigation with clear user flows
- Toast notifications for user feedback
- Separate dashboards for different user roles
- Clean and modern design

### Security Features

- Password hashing using bcrypt
- JWT token expiration
- Input validation and sanitization
- CORS protection
- SQL injection prevention

## Screenshots

I'm still working on getting this deployed, so I don't have live screenshots yet. But here's what the main pages include:

### Login Page

- Clean login form with email and password fields
- Error handling with user-friendly messages
- Password visibility toggle
- Registration link for new users

### Admin Dashboard

- Complete book catalog in a table format
- Action buttons for adding, editing, and deleting books
- Real-time availability counter
- User information display

### User Dashboard

- Book listing with availability indicators
- Personal borrowing history section
- Quick action buttons for borrowing/returning
- Mobile-responsive design
