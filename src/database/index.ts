// src/database/index.ts

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do .env para desenvolvimento local

let sequelize: Sequelize;

// PRODUÇÃO (Ex: Vercel)
if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
  console.log('Iniciando Sequelize em modo de PRODUÇÃO com DATABASE_URL');
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL de produção não definida!');
    throw new Error('DATABASE_URL de produção não definida!');
  }
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Comum para DBs na nuvem como Railway, Vercel Postgres, etc.
      },
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  // DESENVOLVIMENTO LOCAL (conectando ao DB do .env, que no seu caso é o Railway)
  console.log('Iniciando Sequelize em modo de DESENVOLVIMENTO');
  const dbName = process.env.DB_NAME;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbHost = process.env.DB_HOST;
  const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;

  if (!dbName || !dbUser || !dbPassword || !dbHost || !dbPort) {
    console.error(
      '❌ Variáveis de ambiente do banco de dados de desenvolvimento não configuradas completamente no arquivo .env (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT)'
    );
    throw new Error(
      'Configuração de banco de dados de desenvolvimento incompleta no .env.'
    );
  }

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: (sql) => {
      // Para não poluir o console com queries de metadados do Sequelize,
      // você pode filtrar ou apenas logar se uma variável de debug estiver ativa.
      // Exemplo simples:
      if (!sql.includes('SELECT current_schema()') && !sql.includes('SELECT version()')) {
         console.log(`[SEQUELIZE DEV SQL] ${sql}`);
      }
    },
    dialectOptions: {
      // SSL necessário aqui também, pois seu .env aponta para o Railway
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Conexão com o banco de dados (${sequelize.getDialect()}) estabelecida com sucesso.`);
  } catch (error) {
    console.error(`❌ Não foi possível conectar ao banco de dados (${sequelize.getDialect()}):`, error);
  }
};

testConnection();

export default sequelize;