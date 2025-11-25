# admin Docker file
# Stage 1: Build the React application
FROM public.ecr.aws/docker/library/node:22-alpine AS builder

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
FROM public.ecr.aws/nginx/nginx:alpine

# Copy the builder files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

 
