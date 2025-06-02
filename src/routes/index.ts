// src/routes/index.ts
import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

const router = Router();

interface CreatePessoaBody {
  nome: string;
  email: string;
  telefone: string; // Ajustado para ser obrigatório como no schema
  sobre: string;    // Ajustado para ser obrigatório como no schema
}

router.get('/pessoas', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todasAsPessoas = await prisma.pessoas.findMany({
      include: {
        Experiencia: true,
        Formacaos: true,
        Habilidades: true,
      },
    });
    res.json(todasAsPessoas);
  } catch (error) {
    console.error("Erro ao buscar todas as pessoas:", error);
    res.status(500).json({
      message: 'Erro interno ao buscar pessoas.',
      error: (error instanceof Error) ? error.message : 'Erro desconhecido',
    });
  }
});

router.get('/pessoas/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const pessoaId = parseInt(id, 10);

  if (isNaN(pessoaId)) {
    return res.status(400).json({ message: 'O ID fornecido é inválido.' });
  }

  try {
    const umaPessoa = await prisma.pessoas.findUnique({
      where: { id: pessoaId },
      include: {
        Experiencia: true,
        Formacaos: true,
        Habilidades: true,
      },
    });

    if (umaPessoa) {
      res.json(umaPessoa);
    } else {
      res.status(404).json({ message: `Pessoa com ID ${pessoaId} não encontrada.` });
    }
  } catch (error) {
    console.error(`Erro ao buscar pessoa com ID ${pessoaId}:`, error);
    res.status(500).json({
      message: 'Erro interno ao buscar a pessoa.',
      error: (error instanceof Error) ? error.message : 'Erro desconhecido',
    });
  }
});

router.post(
  '/pessoas',
  async (req: Request<{}, {}, CreatePessoaBody>, res: Response, next: NextFunction) => {
    try {
      const { nome, email, telefone, sobre } = req.body;

      if (!nome || !email || !telefone || !sobre) { // Validação para campos obrigatórios
        return res.status(400).json({ message: 'Todos os campos (nome, email, telefone, sobre) são obrigatórios.' });
      }
      if (!email.includes('@')) {
        return res.status(400).json({ message: 'Formato de email inválido.' });
      }

      const novaPessoa = await prisma.pessoas.create({
        data: {
          nome,
          email,
          telefone,
          sobre,
        },
      });
      res.status(201).json(novaPessoa);
    } catch (error: any) {
      console.error("Erro ao cadastrar nova pessoa:", error);
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(409).json({ message: 'Este email já está em uso.' });
      }
      res.status(500).json({
        message: 'Erro interno ao cadastrar nova pessoa.',
        error: (error instanceof Error) ? error.message : 'Erro desconhecido',
      });
    }
  }
);

export default router;