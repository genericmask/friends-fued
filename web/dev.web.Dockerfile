FROM --platform=$BUILDPLATFORM node:lts-alpine AS development

WORKDIR /web

COPY . .

RUN npm i

EXPOSE 5173

CMD ["npm", "run", "dev"]