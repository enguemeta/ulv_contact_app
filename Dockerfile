FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json postcss.config.js tailwind.config.js tsconfig.json contact_us.sqlite ./

RUN npm install

COPY next.config.js ./next.config.js
COPY app ./app
COPY pages ./pages
COPY public ./public
COPY prisma ./prisma
RUN npx prisma generate

CMD ["npm", "run", "dev"]
