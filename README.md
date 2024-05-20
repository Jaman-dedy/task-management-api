# Task Management API

This is a RESTful API for a simple task management system built with NestJS, MongoDB, and WebSocket.

## Features

- User Authentication: Users can register and log in using JWT (JSON Web Token) authentication.
- CRUD Operations: Users can create, read, update, and delete tasks.
- Real-time Updates: WebSocket is used to provide real-time updates for task creation, update, and deletion.
- API Documentation: Swagger is integrated to provide interactive API documentation.
- Error Handling: Proper error handling and validation are implemented using NestJS's exception filters and DTOs.
- Containerization: Docker and Docker Compose are used for easy setup and deployment.

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB
- Docker (optional)

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:Jaman-dedy/task-management-api.git
   ```

2. Install the dependencies:
   ```
   cd task-management-api
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```
     Replace `<your-mongodb-uri>` with your MongoDB connection URI and `<your-jwt-secret>` with a secret key for JWT.

4. Start the application:
   ```
   npm run start
   ```

   The API will be accessible at `http://localhost:3000`.

## Docker Usage

1. Make sure you have Docker and Docker Compose installed.

2. Build and start the containers:
   ```
   docker-compose up -d
   ```

   This will build the Docker image and start the containers.

3. Access the API at `http://localhost:3000`.

4. To stop the containers:
   ```
   docker-compose down
   ```

## API Documentation

The API documentation is generated using Swagger. To access the interactive documentation:

1. Start the application.

2. Open your web browser and visit `http://localhost:3000/api`.

3. Explore the available endpoints, request/response schemas, and test the API directly from the Swagger UI.

## WebSocket Usage

To test the WebSocket functionality and receive real-time updates:

1. Start the application.

2. Use a WebSocket client (e.g., `socket.io-client`) to connect to `http://localhost:3000`.

3. Listen for the following events:
   - `taskCreated`: Emitted when a new task is created.
   - `taskUpdated`: Emitted when a task is updated.
   - `taskDeleted`: Emitted when a task is deleted.

## Possible Future Improvements

- Add user roles and permissions for different levels of access control.
- Implement pagination and filtering for task retrieval.
- Add support for task assignment and collaboration between users.
- Integrate with a front-end framework for a complete task management application.
- Implement automated tests for better code quality and reliability.
- Use a more robust database solution for scalability (e.g., PostgreSQL).
- Implement rate limiting and request throttling for API security.
- Add support for file attachments and media uploads for tasks.
- Implement task reminders and notifications.
- Integrate with third-party services for additional functionality (e.g., email notifications, calendar integration).