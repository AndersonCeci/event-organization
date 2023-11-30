# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /server
WORKDIR /server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server code into the container
COPY . .

# Expose port 4000 to the outside world
EXPOSE 4000

# Command to run your application
CMD ["npm", "start"]
