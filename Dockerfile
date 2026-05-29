# Use the official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Install dependencies
RUN corepack enable
RUN yarn install

# Run the RedwoodJS build step
RUN yarn rw build

# Expose the RedwoodJS API and web ports (default: 8910, 8911)
EXPOSE 8910 8911

# Start RedwoodJS using the 'serve' command
CMD ["yarn", "rw", "serve"]
