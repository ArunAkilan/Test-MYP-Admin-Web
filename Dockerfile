FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
#RUN npm run build

EXPOSE 80

#CMD ["npm", "run", "dev"]
# Start Vite dev server (use npx if vite is not global)
CMD ["npx", "vite", "--port", "80", "--host"]
