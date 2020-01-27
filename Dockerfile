FROM node:12

# Install nodemon globally
RUN npm i nodemon -g

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]