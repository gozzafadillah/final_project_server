FROM node:17-alpine

# working directory
WORKDIR /app

# copy package.json to the working directory
COPY . .

# install dependencies
RUN npm install

# expose port 3000
EXPOSE 4000
# requiring node to run the app

# command menjalankan express
CMD ["node", "app.js"]
