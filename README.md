![App screenshot](./public/app-thumbnail.webp)
# To-Do App

This is a simple and functional To-Do App developed using React, Next.js, Tailwind CSS, TypeScript, and MongoDB. The app allows users to manage their daily tasks efficiently by adding, editing, deleting, and marking tasks as completed in a clean and responsive interface.

## 🚀 Project Overview

The To-Do App demonstrates full-stack development skills, combining a responsive frontend with a connected backend using MongoDB. It highlights my ability to create user-friendly interfaces, manage application state, and persist data using modern tools and frameworks.

## ✅ Features

Task Management: Add, edit, delete, and mark tasks as completed.

Data Persistence: All tasks are stored and retrieved from a MongoDB database using a full RESTful API.

Responsive Design: Works seamlessly on mobile, tablet, and desktop devices.

State Management: Managed with React hooks like useState and useEffect.

Dynamic Styling: Designed with Tailwind CSS for a clean and modern look.

Type Safety: TypeScript is used throughout the codebase for reliability.

API Routes (Next.js): Implemented using App Router and dynamic routes for handling CRUD operations.


## 🧩 Components

TaskApp

The main component of the application includes:

Input Form: For adding and editing tasks.

Task List: Displays all tasks dynamically from the database.

Actions: Edit, delete, and toggle completion status of each task.


## 🔧 Key Hooks & Methods

useState: For managing task input, task list, and edit mode.

useEffect: To fetch tasks on page load and refresh task list after actions.

fetch API: Used to communicate with Next.js API routes (GET, POST, PUT, DELETE).


## 🛠 Tech Stack

Frontend

React

Next.js (App Router)

Tailwind CSS

TypeScript


Backend

MongoDB Atlas

Mongoose

Next.js API Routes


Development Tools

VS Code

Git & GitHub

Postman (for API testing)


## ▶️ How to Run the Project

### 1. Clone the repository
git clone https://github.com/laranjeirapedro/portfolio_project--to-do-list.git

### 2. Navigate into the directory
cd portfolio_project--to-do-list

### 3. Install dependencies
npm install

### 4. Create a .env.local file and add your MongoDB URI
MONGODB_URI=your-mongodb-connection-string
MONGODB_DB=todoApp

### 5. Run the development server
npm run dev

Open http://localhost:3000 in your browser to view the app.

## 🌱 Future Enhancements

[ ] User Authentication
Secure user login to manage personal task lists.

[ ] Drag-and-Drop Reordering
Allow users to reorder tasks by priority.

[ ] Due Dates and Reminders
Let users assign due dates and receive notifications.

[ ] Task Categories or Tags
Organize tasks by category or custom tags.

[ ] Dark Mode
Add a theme toggle for better accessibility.

[ ] Progress Tracker
Show progress bars or stats for completed vs. pending tasks.


## ❓ Why This Project?

This project showcases my capabilities as a full-stack developer, highlighting:

Responsive design and UX using Tailwind CSS.

State and logic handling with React and TypeScript.

API development and integration with Next.js App Router.

Database integration and CRUD operations using MongoDB.


## 🙌 Feedback

If you have any ideas or suggestions to improve the app, feel free to open an issue or pull request!
