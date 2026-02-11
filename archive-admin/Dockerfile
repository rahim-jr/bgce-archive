# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with cache mount for faster builds
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile --production=false

# Copy source files
COPY . .

# Build with relative URLs for production (nginx will proxy)
ENV VITE_API_BASE_URL=/api/cortex/v1
ENV VITE_POSTAL_API_BASE_URL=/api/postal/v1
ENV VITE_APP_NAME="Archive Admin"
ENV VITE_APP_VERSION=1.0.0

# Build the application
RUN yarn build-only

# Production stage - use smaller nginx image
FROM nginx:alpine

# Copy nginx config template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy only built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set default backend URLs (override in K8s deployment)
ENV CORTEX_API_URL=http://cortex-service:8080
ENV POSTAL_API_URL=http://postal-service:8081

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
