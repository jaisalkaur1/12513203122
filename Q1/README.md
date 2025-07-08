# URL Shortener Application

A modern URL shortening application built with React and Vite, featuring a clean user interface and comprehensive statistics tracking.

## Features

- URL Shortening: Convert long URLs into concise, shareable links
- Statistics Dashboard: Track and analyze link usage metrics
- Responsive Design: Seamless experience across all devices
- Real-time Logging: Monitor application events and user interactions

## Tech Stack

- Frontend: React 18 with Vite for blazing fast development
- Routing: React Router DOM for seamless navigation
- Styling: Custom CSS with modern design principles
- Backend: Node.js server for logging functionality

## Getting Started

1. Install all dependencies:
   ```bash
   npm run install:all
   ```

2. Start the application:
   ```bash
   npm run start:all
   ```
   This will launch both the frontend and backend servers concurrently.

## Available Scripts

- `npm run start:frontend`: Starts the Vite development server
- `npm run start:backend`: Starts the logging backend server
- `npm run start:all`: Starts both frontend and backend servers
- `npm run build`: Creates a production build
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint to check code quality

## Project Structure

- `/src`
  - `/components`: Reusable React components
  - `/pages`: Main application pages
  - `/utils`: Utility functions and helpers
- `/logging-frontend`: Backend server for logging functionality
