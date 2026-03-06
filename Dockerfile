# ---- Stage 1: Build the React app ----
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json ./
RUN npm install --production=false

# Copy source and build
COPY public/ ./public/
COPY src/ ./src/
RUN npm run build

# ---- Stage 2: Serve with nginx ----
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app
COPY --from=build /app/build /usr/share/nginx/html

# Cloud Run uses PORT 8080 by default — our nginx.conf listens on 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
