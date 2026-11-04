FROM node:20-alpine

WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install dependencies (including production)
RUN npm install --production

# Copy game source
COPY . .

# Railway & Render dynamically bind $PORT
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "node server.js"]
