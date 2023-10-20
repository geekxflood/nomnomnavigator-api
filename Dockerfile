# Stage 1: Build the Node.js app
FROM node:20 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy the project files into the docker image
COPY . .

# Install the project dependencies
RUN npm install

# Stage 2: Run the app
FROM node:20-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy over the built app from the previous stage
COPY --from=builder /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
