# Real-Time Collaborative Code Editor

A browser-based collaborative coding platform where multiple users can
write and edit code together in real time.

------------------------------------------------------------------------

# Tech Stack

## Frontend

-   React
-   Vite
-   TailwindCSS
-   Monaco Editor
-   Socket.IO Client
-   React Router

## Backend

-   Node.js
-   Express.js
-   Socket.IO
-   MongoDB
-   JWT Authentication

## Code Execution

-   Judge0 API

Docker is intentionally skipped.

------------------------------------------------------------------------

# Core Features

## Authentication

-   User Signup
-   User Login
-   JWT Authentication
-   Protected routes
-   Logout

------------------------------------------------------------------------

# Room System

Users collaborate inside rooms.

Features:

-   Create room
-   Join room
-   Join using shareable link
-   Active users list

Example:

/editor/abc123

------------------------------------------------------------------------

# Real-Time Code Editor

-   Monaco editor
-   Syntax highlighting
-   Multi-language support
-   Real-time code synchronization

Supported languages:

-   JavaScript
-   Python
-   C++
-   Java

------------------------------------------------------------------------

# Real-Time Collaboration

## Code Sync

User types → socket event → server broadcasts → other users receive
update.

------------------------------------------------------------------------

## Cursor Presence

Show:

-   Cursor position
-   User name
-   Colored cursor indicator

Example:

Tapu → line 15\
Rahul → line 9

------------------------------------------------------------------------

## User Presence

Room shows:

-   Online users list
-   User joined notification
-   User left notification

------------------------------------------------------------------------

# Chat System

Features:

-   Send message
-   Receive message
-   Real-time chat
-   Show sender name

Layout example:

Editor \| Chat panel

------------------------------------------------------------------------

# Code Execution

Workflow:

Write code → click Run → backend sends code to Judge0 → output returned
→ console displays output.

------------------------------------------------------------------------

# Editor Layout

    -------------------------------------
    Room Header
    -------------------------------------

    Users | Editor | Chat

    -------------------------------------
    Output Console
    -------------------------------------

------------------------------------------------------------------------

# Socket Events

join-room\
code-change\
cursor-move\
send-message\
receive-message\
user-joined\
user-left\
sync-code

------------------------------------------------------------------------

# Database Schema

## User

-   id
-   name
-   email
-   password
-   createdAt

## Room

-   roomId
-   createdBy
-   createdAt

## Message

-   roomId
-   sender
-   text
-   createdAt

------------------------------------------------------------------------

# Development Order

1.  Project setup
2.  Authentication
3.  Room system
4.  Socket.IO setup
5.  Monaco editor integration
6.  Real-time code sync
7.  User presence
8.  Cursor presence
9.  Chat system
10. Code execution
11. UI polish

------------------------------------------------------------------------

# Final Scope

Included:

-   Authentication
-   Room creation
-   Join via link
-   Real-time code editing
-   Monaco editor
-   Cursor presence
-   Online users
-   Chat system
-   Code execution
-   Output console

