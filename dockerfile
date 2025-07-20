FROM node:18

WORKDIR /app

COPY  package* .

RUN npm install 

COPY . .

RUN POSTGRES_URL=$POSTGRES_URL npx prisma generate

EXPOSE   3000

CMD ["npm", "run", "start"] 
