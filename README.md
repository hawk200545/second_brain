# Second Brain Application

## Overview

This is a full-stack application designed to function as a personal "second brain" or knowledge management system. It allows users to efficiently store, organize, and retrieve various pieces of information, acting as a centralized hub for their thoughts, notes, and resources.

## Features

*   **User Authentication:** Secure login and registration for users.
*   **Note Creation & Management:** Create, edit, and delete notes or content entries.
*   **Tagging System:** Organize content with tags for easy categorization and search.
*   **Content Sharing:** (Implied) Functionality to share content with others.
*   **Intuitive User Interface:** A responsive and user-friendly interface built with modern web technologies.

## Tech Stack

### Frontend

The frontend is a React application built with Vite.

*   **Framework:** React.js
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Routing:** React Router DOM
*   **Form Validation:** Zod
*   **API Communication:** Axios
*   **Notifications:** React Hot Toast
*   **Icons:** React Icons
*   **Loading Spinners:** React Spinners

### Backend

The backend is a Node.js application built with Express.js.

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Language:** TypeScript
*   **Database:** MongoDB (via Mongoose ODM)
*   **Environment Variables:** Dotenv
*   **Authentication:** Bcryptjs (for password hashing), JSON Web Token (JWT)
*   **CORS:** Cross-Origin Resource Sharing
*   **Validation:** Zod

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (LTS recommended)
*   npm (Node Package Manager) or Yarn
*   MongoDB (running locally or accessible via a cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd second_brain
    ```

2.  **Backend Setup:**

    Navigate to the `server` directory:

    ```bash
    cd server
    ```

    Install backend dependencies:

    ```bash
    npm install
    ```

    Create a `.env` file in the `server` directory and add your environment variables. Replace the placeholder values with your actual credentials:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

    Build the TypeScript code:

    ```bash
    npm run build
    ```

    Start the backend server:

    ```bash
    npm start
    # Or for development with hot-reloading:
    # npm run dev
    ```

3.  **Frontend Setup:**

    Open a new terminal, navigate back to the project root, and then into the `app` directory:

    ```bash
    cd ../app
    ```

    Install frontend dependencies:

    ```bash
    npm install
    ```

    Start the frontend development server:

    ```bash
    npm run dev
    ```

### Accessing the Application

*   **Frontend:** Once the frontend server starts, it will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use).
*   **Backend API:** The backend API will be running at `http://localhost:5000` (or the port you specified in your `.env` file).

## Folder Structure

*   `app/`: Contains the frontend React application.
    *   `src/`: React components, pages, hooks, context, and assets.
*   `server/`: Contains the backend Node.js/Express application.
    *   `src/`: API routes, controllers, database connection, and middleware.
    *   `config/`: Configuration files.
    *   `database/`: Database connection setup.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.
