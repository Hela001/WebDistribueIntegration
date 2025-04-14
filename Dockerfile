
# Étape 1 : Build avec Node
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Étape 2 : Serve avec Nginx
FROM nginx:alpine

COPY --from=build /app/dist/msfrontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf 



