# --- Stage 1: Build Frontend ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Final Runtime ---
FROM node:20-alpine
WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy backend code and install dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev
COPY backend/ ./backend/

# Copy frontend build output to nginx directory
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Configure nginx: serve frontend, proxy /api to backend
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://localhost:5000; \
    } \
}' > /etc/nginx/http.d/default.conf

# Start nginx and backend
CMD sh -c "nginx && cd /app/backend && node server.js"