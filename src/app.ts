import express from 'express';
import router from './routes';
import sequelize from './database';

const app = express();
app.use(express.json());
app.use('/api', router);

sequelize.sync().then(() => {
  console.log('Banco conectado e sincronizado');
});

export default app;
