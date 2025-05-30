import { Router } from 'express';
import { Pessoa } from '../models/Pessoa';
import { Formacao } from '../models/Formacao';
import { Experiencia } from '../models/Experiencia';
import { Habilidade } from '../models/Habilidade';

const router = Router();

// Buscar todas as pessoas com currículo completo
router.get('/pessoas', async (req, res) => {
  const pessoas = await Pessoa.findAll({
    include: [Formacao, Experiencia, Habilidade],
  });
  res.json(pessoas);
});

// Cadastrar nova pessoa
router.post('/pessoas', async (req, res) => {
  const { nome, email, telefone, sobre } = req.body;
  const pessoa = await Pessoa.create({ nome, email, telefone, sobre });
  res.json(pessoa);
});
// Buscar pessoa por ID com currículo completo
router.get('/pessoas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pessoa = await Pessoa.findByPk(id, {
      include: [Formacao, Experiencia, Habilidade],
    });

    if (pessoa) {
      res.json(pessoa);
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pessoa', error });
  }
});
export default router;
