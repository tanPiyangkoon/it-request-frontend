# frontend/Dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine

# ลบ default.conf เดิม
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy ไฟล์ของคุณไปแทน (ชื่อต้องเป็น default.conf)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy dist
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80