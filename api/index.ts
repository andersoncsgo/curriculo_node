// api/index.ts
import express from 'express';
import cors from 'cors'; // Boa prática adicionar CORS
import pessoaRoutes from '../src/routes/index'; // Importa seu router

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para todas as origens (ajuste se necessário)
app.use(express.json()); // Para parsear JSON no corpo das requisições

// Rotas da API
app.use('/api', pessoaRoutes); // Monta suas rotas de pessoas no caminho /api

// Handler para rotas não encontradas (opcional, mas bom para debug)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

// Handler de erro global (opcional, mas bom para capturar erros não tratados)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Erro não tratado:", err.stack || err.message || err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

export default app; // Exporta o app para o Vercel (o @vercel/node builder irá lidar com isso)