FROM node:18
WORKDIR /app
COPY package*.json .
COPY prisma ./prisma
COPY .env.prod .
RUN mv .env.prod .env
COPY tsconfig.json .
RUN npm install
ADD . /app/
RUN npm run build
RUN npx prisma migrate dev
RUN npx prisma generate
RUN npm run generate-admin

ENV PORT=8080
EXPOSE 8080
CMD npm start