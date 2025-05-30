// api/index.ts (Temporário para teste - SEM IMPORT DE NEXT.JS)

// Não precisa de: import { NextApiRequest, NextApiResponse } from 'next';
// Se você quisesse tipar como Express, seria algo como:
// import { Request, Response } from 'express';
// Mas para este teste simples com Vercel Serverless Function, 'any' é aceitável.

import sequelizeInstance from '../src/database'; // Seu arquivo de configuração do Sequelize

export default async function handler(req: any, res: any) { // Usar 'any' aqui simplifica para o teste
  try {
    // Tenta autenticar para forçar o carregamento do driver 'pg'
    await sequelizeInstance.authenticate();
    
    console.log('TESTE API: Conexão com Sequelize e PG bem-sucedida!');
    res.status(200).json({ message: 'Sequelize e PG OK!' });
  } catch (error: any) {
    console.error('TESTE API: Erro ao conectar ou carregar PG:', error);
    res.status(500).json({
      message: 'Erro no teste da API com Sequelize',
      error: error.message, // Mensagem do erro original
      stack: error.stack,   // Stack trace para mais detalhes
    });
  }
}