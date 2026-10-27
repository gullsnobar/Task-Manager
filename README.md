Here is the final, professional `README.md` code. You can copy and paste this entire block directly into your `README.md` file.

```markdown
# Task Manager

A full-stack MERN (MongoDB, Express, React, Node.js) application designed for efficient task management. The application is fully containerized using Docker, featuring an Nginx reverse proxy for the frontend and connecting to a MongoDB Atlas cloud database.

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- ESLint

**Backend**
- Node.js
- Express
- MongoDB Atlas (Cloud Database)
- JSON Web Tokens (JWT)

**DevOps & Infrastructure**
- Docker & Docker Compose
- Nginx

## Prerequisites

Ensure the following tools are installed on your machine:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

## Quick Start (Docker)

The recommended way to run this application is via Docker Compose. This method builds the React frontend, configures Nginx, and starts the Node.js backend server simultaneously.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gullsnobar/Task-Manager.git
   cd Task-Manager
   ```

2. **Configure Environment Variables:**
   Create a `.env` file inside the `backend/` directory and add the following configuration:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Build and Run:**
   ```bash
   docker compose up --build -d
   ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost`.

## Local Development (Without Docker)

To run the frontend and backend separately for development purposes:

**Backend Server:**
```bash
cd backend
npm install
npm run dev
```

**Frontend Application:**
```bash
# Run from the project root directory
npm install
npm run dev
```
The frontend development server will be available at `http://localhost:5173`.

## Project Structure

```text
Task-Manager/
├── backend/          # Express server, API routes, and controllers
├── src/              # React frontend source code
├── Dockerfile        # Multi-stage Docker build configuration
├── compose.yaml      # Docker Compose orchestration file
├── nginx.conf        # Nginx configuration for serving frontend and proxying API
└── README.md         # Project documentation
```

## Available Commands

| Command | Description |
| :--- | :--- |
| `docker compose up --build -d` | Build and start the application in detached mode |
| `docker compose down` | Stop and remove the application containers |
| `docker logs task-manager-app-1` | View the live application logs |
| `npm run build` | Generate a production build of the frontend |
```
