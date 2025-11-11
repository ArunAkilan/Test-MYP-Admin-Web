# admin Docker file
# Stage 1: Build the React application
FROM node:22.9.0 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React application using nginx
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

 