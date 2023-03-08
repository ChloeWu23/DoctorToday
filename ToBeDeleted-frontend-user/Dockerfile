# Choose the Image which has Node installed already
FROM node:current-slim

# make the 'frontend' folder the current working directory
WORKDIR /frontend

# copy both 'package.json' and 'package-lock.json' (if available)
COPY ./package.json /frontend/package.json

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'frontend' folder)
COPY . /frontend/

# build app for production with minification
RUN npm run build

CMD [ "npm", "start" ]
