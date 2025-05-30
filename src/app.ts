// src/app.ts
import express from 'express';
import router from './routes';
import sequelize from './database';

const app = express();
const PORT = process.env.PORT || 3000; // Define a porta

app.use(express.json());
app.use('/api', router);

sequelize.sync().then(() => {
  console.log('Banco conectado e sincronizado');
  app.listen(PORT, () => { // Inicia o servidor aqui para o dev local
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar/sincronizar banco:', err);
});

// export default app; // Pode ou não ser necessário dependendo da sua configuração com ts-node-dev