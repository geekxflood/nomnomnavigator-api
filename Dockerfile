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

# Install necessary utilities and Google Chrome
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable

# Environment variable to skip Puppeteer's Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Copy over the built app from the previous stage
COPY --from=builder /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
