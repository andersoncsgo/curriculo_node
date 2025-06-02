// src/app.ts
import express from 'express';
import cors from 'cors';
import pessoaRoutes from './routes/index'; // Seu router
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do .env local

const app = express();
const PORT = process.env.PORT || 3001; // Use uma porta diferente do default 3000 se quiser

app.use(cors());
app.use(express.json());

app.use('/api', pessoaRoutes);

// Handler para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

// Handler de erro global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Erro não tratado (local):", err.stack || err.message || err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando localmente na porta ${PORT}`);
  console.log(`Acesse a API em http://localhost:${PORT}/api/pessoas`);
});