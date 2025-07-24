FROM node:22.14.0-bullseye
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
# Make vite executable (optional, if it's local)
RUN chmod +x node_modules/.bin/vite
#RUN npm run build

EXPOSE 80



CMD ["npm", "run", "dev"]
