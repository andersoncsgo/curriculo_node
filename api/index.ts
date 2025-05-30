import express from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
import sequelize  from '../src/database';
import router from '../src/routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', router);

// Conexão com o banco (preferencialmente remoto)
sequelize.sync().then(() => {
  console.log('✅ Banco sincronizado na Vercel');
});

export const handler = serverless(app);
