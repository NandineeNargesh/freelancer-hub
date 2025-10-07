Live link : https://freelancer-hub-rust.vercel.app/


Freelancer Hub : = 
A full-stack web application designed to connect clients with talented freelancers. This platform serves as a central hub for freelancers to manage their projects, clients, and invoices, while providing a seamless experience for clients to discover and hire professionals.

✨ Core Features
Protected Freelancer Dashboard: A private workspace secured with JWT Authentication.

Full CRUD for Data Models: Complete functionality (Create, Read, Update, Delete) for:

Clients (CRM): Manage client details, contact info, and leads.

Projects: Track project status, deadlines, and progress.

Invoices: Basic system for tracking payment amounts and statuses.

Dynamic Portfolios: Public-facing portfolio pages where freelancers can showcase their bio, skills, and work, with content fetched dynamically from the database.

Data Visualization: Interactive Charts and Graphs on the dashboard overview to quickly visualize earnings and project statuses.

Dynamic Header: Header links (Sign Up/Login vs. Dashboard/Logout) change based on the user's authentication status.

🛠️ Technology Stack
This is a complete MERN Stack application built on a monorepo structure.

Layer	Technologies
Frontend	React.js, React Router, Axios, Chart.js
Backend	Node.js, Express.js, Mongoose
Database	MongoDB (hosted on Atlas)
Authentication	JSON Web Tokens (JWT), Bcryptjs
Deployment	Vercel (Frontend), Render (Backend)

Export to Sheets
⚙️ Getting Started
Follow these steps to set up and run the application locally.

Prerequisites
Node.js (LTS recommended)

npm

A MongoDB Atlas account for your database cluster.

Installation & Setup
Clone the Repository:

Bash

git clone https://github.com/NandineeNargesh/freelancer-hub.git
cd freelancer-hub
Configure Backend (Server):

Navigate to the server directory: cd server

Install dependencies: npm install

Create a file named .env and add your connection secrets (get the MONGO_URI from MongoDB Atlas):

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
Configure Frontend (Client):

Navigate to the client directory: cd ../client

Install dependencies: npm install

Running Locally
From the root directory of your project (/freelancer-hub), run the following script to start both the server and the client simultaneously using concurrently:

Bash

npm run dev
The application will be accessible at http://localhost:5173.

🚀 Deployment
The project is structured for live deployment using a modern CI/CD pipeline.

Service	Component	Root Directory
Vercel	Frontend (React)	client/
Render	Backend (Express)	server/

Export to Sheets
