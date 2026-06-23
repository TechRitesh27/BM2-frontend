# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (layer cache)
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .

# Build args passed at build time
ARG VITE_API_URL
ARG VITE_RAZORPAY_KEY
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_RAZORPAY_KEY=$VITE_RAZORPAY_KEY

RUN npm run build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
