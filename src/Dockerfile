# Use the official Node.js image with Alpine as the base image
FROM node:alpine as nodejs

# Set environment variables
ENV NODE_ENV=production
ENV MY_ENV=development

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json package-lock.json ./

# Install the dependencies
RUN npm install

# Install concurrently globally
RUN npm install -g concurrently

# Add line to Dockerfile
RUN apk --no-cache add docker-compose

# Create the destination directory
RUN mkdir -p src/public

COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000
EXPOSE 80
EXPOSE 443
# Command to run the application
CMD [ "npm", "start", "build", "dev"]
