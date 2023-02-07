# ==== CONFIGURE ====
From node:18-alpine AS builder
WORKDIR /app
COPY . .

# ==== BUILD ====
RUN npm ci
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

RUN mkdir react

WORKDIR /react

RUN mkdir ./build_file

#Copy built assets from `builder` image
COPY --from=builder /app/build ./build_file

# Add nginx.conf
COPY nginx.conf /etc/nginx/nginx/nginx.conf

# Add default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

