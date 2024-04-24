FROM node:latest

WORKDIR /app

COPY . .

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json package-lock.json ./

# Install the dependencies
RUN npm install

# # Install concurrently globally
# RUN npm install -g concurrently


EXPOSE 3000

# # Start server using npm script
CMD [ "npm", "run", "start" ]