# Use lightweight Nginx image
FROM nginx:alpine

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Vite build output
COPY dist/ /usr/share/nginx/html/admin/

# Expose web port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]