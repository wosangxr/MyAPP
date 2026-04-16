# Use an official Node.js runtime as a parent image (at least Node 18 based on engines in package.json)
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (Cloud Run defaults to 8080)
EXPOSE 8080

# Command to start the application
CMD [ "npm", "start" ]
