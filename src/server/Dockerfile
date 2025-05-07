
FROM node:16-alpine

WORKDIR /app

# Copiar package.json e instalar dependências do servidor
COPY package*.json ./
RUN npm install

# Copiar o código do servidor
COPY . .

# Porta do servidor
EXPOSE 8080

# Iniciar o servidor
CMD ["node", "index.js"]
