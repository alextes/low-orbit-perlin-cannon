FROM node:12-alpine AS build
WORKDIR /opt/low-orbit-perlin-cannon

COPY . .
RUN yarn install
RUN yarn build

FROM node:12-alpine AS run
WORKDIR /opt/low-orbit-perlin-cannon

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

COPY --from=build /opt/low-orbit-perlin-cannon/build build

EXPOSE 3000
CMD ["node", "build/index.js"]
