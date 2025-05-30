import express from 'express';
import dotenv from 'dotenv';
import sequelize from './database';
import router from './routes';

import { Pessoa } from './models/Pessoa';
import { Formacao } from './models/Formacao';
import { Experiencia } from './models/Experiencia';
import { Habilidade } from './models/Habilidade';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', router);

sequelize.sync({ force: true }).then(async () => {
  console.log('✅ Banco sincronizado.');

  // Inserir 2 currículos

  const pessoa1 = await Pessoa.create({
    nome: 'Anderson Lucas',
    email: 'anderson@example.com',
    telefone: '81999999999',
    sobre: 'Estudante de Sistemas para Internet na UNICAP',
  });

  await Formacao.create({
    instituicao: 'UNICAP',
    curso: 'Sistemas para Internet',
    inicio: '2022',
    fim: '2026',
    pessoaId: pessoa1.id,
  });

  await Experiencia.create({
    empresa: 'Porto Digital',
    cargo: 'Estagiário',
    descricao: 'Desenvolvimento backend e APIs',
    inicio: '2023',
    fim: '2024',
    pessoaId: pessoa1.id,
  });

  await Habilidade.bulkCreate([
    { titulo: 'JavaScript', pessoaId: pessoa1.id },
    { titulo: 'Python', pessoaId: pessoa1.id },
  ]);

  const pessoa2 = await Pessoa.create({
    nome: 'Maria Silva',
    email: 'maria@example.com',
    telefone: '81988888888',
    sobre: 'Desenvolvedora Fullstack apaixonada por tecnologia',
  });

  await Formacao.create({
    instituicao: 'UFPE',
    curso: 'Ciência da Computação',
    inicio: '2019',
    fim: '2023',
    pessoaId: pessoa2.id,
  });

  await Experiencia.create({
    empresa: 'Level Group',
    cargo: 'Dev Fullstack',
    descricao: 'Desenvolvimento de aplicações web e mobile',
    inicio: '2022',
    fim: '2024',
    pessoaId: pessoa2.id,
  });

  await Habilidade.bulkCreate([
    { titulo: 'React', pessoaId: pessoa2.id },
    { titulo: 'Node.js', pessoaId: pessoa2.id },
  ]);
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});
