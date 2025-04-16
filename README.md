![App screenshot](./src/app/public/to-do-list-thumbnail.webp)
# To-Do App

This is a simple and functional To-Do App developed using **React**, **Next.js**, **Tailwind CSS**, and **TypeScript**. The app allows users to manage their daily tasks efficiently by adding, deleting, and viewing tasks in a clean and responsive interface.

## Project Overview

The To-Do App demonstrates fundamental frontend and backend development concepts. It highlights my ability to create user-friendly interfaces, manage application state using modern tools and frameworks.

## Features

- **Task Management**: Add tasks, view the task list, and delete tasks as needed.
- **Responsive Design**: The application adapts seamlessly to different screen sizes, ensuring usability on both desktop and mobile devices.
- **Dynamic Styling**: Leveraged Tailwind CSS for a clean and modern design.
- **State Management**: Used React hooks (e.g., `useState`) for managing state in the app.
- **Type Safety**: Ensured code reliability and clarity by using TypeScript.

## Components

### 1. `TaskApp`
This is the main component of the application and includes:
- **Input Form**: Allows users to add new tasks.
- **Task List**: Displays tasks dynamically as they are added.
- **Delete Functionality**: Users can remove tasks from the list.

### Key Methods and Hooks Used
- **`useState`**:
  - To manage the input value for tasks.
  - To store and update the task list dynamically.
- **`onChange`**: Captures user input to update the `task` state.
- **`onSubmit`**: Handles form submissions to add tasks to the task list.
- **Dynamic Rendering**:
  - Used the `map` function to dynamically generate task items.

## Tech Stack

### Frontend
- **React**: For building the UI components and managing state.
- **Next.js**: For its performance and features like image optimization.
- **Tailwind CSS**: To design a responsive and visually appealing interface.
- **TypeScript**: For type safety and improved code quality.

### Development Tools
- **VS Code**: As the code editor.
- **Git & GitHub**: For version control and project hosting.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/laranjeirapedro/portfolio_project--to-do-list.git
   ```

2. Navigate to the project directory:

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```bash
   http://localhost:3000
   ```

## Future Enhancements

1. **Mark Tasks as Completed**:
   - Add a feature to toggle tasks between completed and pending states.
2. **Add Date to Tasks**:
   - Add a date when tasks are created, edited, or completed.
3. **Filter Tasks**:
   - Enable filtering tasks by status (e.g., All, Pending, Completed).
4. **Persistent Data**:
   - Store tasks using `localStorage` or a backend database to maintain data across sessions.
5. **Edit Tasks**:
   - Allow users to edit existing tasks.

## Why This Project?
This project showcases my skills as a junior developer, demonstrating:
- Proficiency in building responsive UIs using **Tailwind CSS**.
- Familiarity with state management using **React hooks**.
- Experience in creating scalable and type-safe code with **TypeScript**.
- Understanding of basic **Next.js** concepts.

## Feedback
If you have any suggestions or feedback, feel free to reach out or open an issue on GitHub!
