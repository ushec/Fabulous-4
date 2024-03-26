#!/bin/sh

# Run npm install if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  npm install
fi

# Start the application with npm start build dev
npm run dev