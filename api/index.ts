import express from 'express';
import serverless from 'serverless-http';
import router from '../src/routes';
import sequelize from '../src/database';

const app = express();

app.use(express.json());
app.use('/api', router);

sequelize.sync().then(() => {
  console.log('✅ Banco conectado e sincronizado');
});

// Para rodar local com `vercel dev`:
module.exports = app;

// Para deploy na Vercel (serverless):
// module.exports = serverless(app);
