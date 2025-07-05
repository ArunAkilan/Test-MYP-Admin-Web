# Stage 1: Build the frontend app
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx + HTTPS
FROM nginx:alpine

# Remove default config and HTML
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy SSL certificates (use volumes in production)
#COPY ./certs/fullchain.pem /etc/ssl/certs/fullchain.pem
#COPY ./certs/privkey.pem /etc/ssl/private/privkey.pem
/etc/letsencrypt/live/dev.myperambalurproperty.com/fullchain.pem
COPY /etc/letsencrypt/live/dev.myperambalurproperty.com/fullchain.pem /etc/ssl/certs/fullchain.pem
COPY /etc/letsencrypt/live/dev.myperambalurproperty.com/privkey.pem /etc/ssl/private/privkey.pem

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
