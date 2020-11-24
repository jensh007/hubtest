FROM docker.wdf.sap.corp:51505/securityapprovedbaseimages/node:12.18.3 as build
WORKDIR /app

COPY package.json yarn.lock tsconfig.json tsconfig.prod.json tslint.json ./
RUN yarn install --frozen-lockfile

COPY public/ public/
COPY src/ src/
RUN yarn run build

FROM docker.wdf.sap.corp:51505/securityapprovedbaseimages/nginx:1.18.0-alpine
WORKDIR /app
# Serve the frontend
COPY --from=build /app/build ./