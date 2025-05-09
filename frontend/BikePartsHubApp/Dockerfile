FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g @angular/cli

# Install serve for production static file serving
RUN npm install -g serve


# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .


EXPOSE 4200

# Start the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
