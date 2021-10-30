FROM node:14
WORKDIR /usr/src/app
COPY ["package*.json", "yarn.lock", "./"]
RUN yarn install --production
COPY . .
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "./build/app.js"]
