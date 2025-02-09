# Use official Node.js image as base
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
