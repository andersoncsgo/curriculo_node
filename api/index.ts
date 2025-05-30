// api/index.ts
import express from 'express';
// import serverless from 'serverless-http'; // serverless-http não é estritamente necessário com @vercel/node
import router from '../src/routes';       // Presumindo que estes são .ts e serão resolvidos
import sequelize from '../src/database'; // pelo @vercel/node

const app = express();

app.use(express.json());
app.use('/api', router);

sequelize.sync().then(() => {
  console.log('✅ Banco conectado e sincronizado');
}).catch(err => {
  console.error('❌ Erro ao conectar/sincronizar banco:', err);
});

module.exports = app; // Correto para @vercel/node