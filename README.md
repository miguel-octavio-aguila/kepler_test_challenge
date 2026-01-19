# Full Stack To-Do List Application

A modern, full-stack task management application built with **NestJS** (backend) and **Nuxt 4 + Vue 3** (frontend). This project features JWT authentication, a SQLite database with Prisma ORM, and a responsive UI with TailwindCSS.
---

## 🚀 Features

### Authentication

- **User Registration** with secure password hashing (bcrypt)
- **User Login** with JWT-based authentication
- **Protected Routes** using route guards and middleware
- **Persistent Sessions** via HTTP-only cookies

### Task Management

- **Create Tasks** with title, description, category, and due date
- **Edit Tasks** inline with form pre-population
- **Delete Tasks** with confirmation
- **Toggle Completion** status with visual feedback
- **Category Organization** (General, Work, Personal, Urgent)
- **Due Date Tracking** with date picker

### Filtering & Search

- **Search** tasks by title or description
- **Filter by Status** (All, Pending, Completed)
- **Filter by Category**
- **Filter by Due Date**
- **URL Query Persistence** for shareable filter states

### User Experience

- **Responsive Design** for mobile and desktop
- **Dark Mode** support
- **Smooth Animations** and transitions
- **Loading States** with skeleton placeholders
- **Error Handling** with user-friendly messages

---

## 🛠️ Tech Stack

### Backend

| Technology      | Purpose                                                 |
| --------------- | ------------------------------------------------------- |
| NestJS 11       | Node.js framework for scalable server-side applications |
| Prisma 7        | Next-generation ORM for database access                 |
| SQLite          | Lightweight relational database                         |
| JWT             | JSON Web Token for authentication                       |
| bcrypt          | Password hashing library                                |
| class-validator | Request validation                                      |

### Frontend

| Technology  | Purpose                                |
| ----------- | -------------------------------------- |
| Nuxt 4      | Vue.js meta-framework with SSR support |
| Vue 3       | Composition API for reactive UI        |
| Pinia       | State management                       |
| TailwindCSS | Utility-first CSS framework            |
| Axios       | HTTP client for API requests           |

---

## 📁 Project Structure

```
├── backend/
│   └── fullstack-kepler-challenge-backend/
│       ├── src/
│       │   ├── auth/          # Authentication module (login, register, JWT guard)
│       │   ├── users/         # User CRUD operations
│       │   ├── tasks/         # Task CRUD operations
│       │   └── prisma/        # Prisma service
│       ├── prisma/
│       │   └── schema.prisma  # Database schema
│       └── package.json
│
└── frontend/
    └── fullstack-kepler-challenge-frontend/
        └── app/
            ├── components/    # Reusable UI components
            ├── pages/         # Application routes
            ├── stores/        # Pinia state stores
            ├── middleware/    # Route guards
            └── plugins/       # Axios configuration
```

---

## 🔧 Installation & Setup

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend/fullstack-kepler-challenge-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secure-secret-key"
   PORT=3001
   ```

4. Generate Prisma client and run migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run start:dev
   ```

   You have to add a port in your .env file

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend/fullstack-kepler-challenge-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   API_BASE_URL=http://localhost:3001
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

---

## 📖 API Endpoints

### Authentication

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| POST   | `/auth/register` | Register a new user            |
| POST   | `/auth/login`    | Login and receive JWT token    |
| GET    | `/auth/profile`  | Get authenticated user profile |

### Tasks (Protected)

| Method | Endpoint              | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | `/tasks`              | Get all tasks for authenticated user |
| GET    | `/tasks/:id`          | Get a specific task                  |
| POST   | `/tasks`              | Create a new task                    |
| PATCH  | `/tasks/:id`          | Update a task                        |
| PATCH  | `/tasks/:id/complete` | Toggle task completion               |
| DELETE | `/tasks/:id`          | Delete a task                        |

---

## 💡 Technical Decisions

### Why NestJS?

NestJS provides a robust, opinionated structure with built-in support for dependency injection, modular architecture, and TypeScript. It's ideal for building scalable and maintainable APIs.

### Why Prisma with SQLite?

Prisma offers type-safe database queries and seamless migrations. SQLite was chosen for simplicity during development—no external database setup required. The driver adapter pattern allows easy migration to PostgreSQL or MySQL for production.

### Why JWT Authentication?

JWTs are stateless, scalable, and work well with SPAs. Tokens are stored in HTTP-only cookies for security against XSS attacks.

### Why Nuxt 4 with Pinia?

Nuxt 4 brings improved performance and Vue 3 Composition API support. Pinia provides a simple, TypeScript-friendly state management solution that integrates seamlessly with Vue's reactivity system.

### Why TailwindCSS?

TailwindCSS enables rapid UI development with utility classes, consistent design tokens, and built-in dark mode support without writing custom CSS.

---

## 📝 Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String   @unique
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean   @default(false)
  dueDate     DateTime?
  category    String?
  userId      Int
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
}
```

---

## 📄 License

This project was created as part of a technical challenge.
