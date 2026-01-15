FROM node:20-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]