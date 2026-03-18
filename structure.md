# Project Structure (Real-Time Collaborative Code Editor)

    project
    │
    ├── frontend
    │   ├── components
    │   ├── pages
    │   ├── hooks
    │   ├── socket
    │   ├── editor
    │   └── App.jsx
    │
    ├── backend
    │   ├── controllers
    │   ├── models
    │   ├── routes
    │   ├── sockets
    │   ├── middleware
    │   └── server.js
    │
    └── docs
        ├── README.md
        └── STRUCTURE.md

## Folder Explanation

### frontend

Contains the React application.

-   **components** → reusable UI components
-   **pages** → main pages like login, dashboard, editor
-   **hooks** → custom React hooks
-   **socket** → socket.io client configuration
-   **editor** → Monaco editor integration

------------------------------------------------------------------------

### backend

Contains the Node.js server.

-   **controllers** → request logic
-   **models** → MongoDB schemas
-   **routes** → API routes
-   **sockets** → socket.io event handlers
-   **middleware** → auth and error middleware
-   **server.js** → entry point of backend

------------------------------------------------------------------------

## Architecture Overview

Client (React + Monaco) │ Socket.IO │ Backend (Node + Express) │ MongoDB
