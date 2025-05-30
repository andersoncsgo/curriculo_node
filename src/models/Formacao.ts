import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import { Pessoa } from './Pessoa';

export class Formacao extends Model {
  public id!: number;
  public instituicao!: string;
  public curso!: string;
  public inicio!: string;
  public fim!: string;
  public pessoaId!: number;
}

Formacao.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  instituicao: DataTypes.STRING,
  curso: DataTypes.STRING,
  inicio: DataTypes.STRING,
  fim: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Formacao',
});

Pessoa.hasMany(Formacao, { foreignKey: 'pessoaId' });
Formacao.belongsTo(Pessoa, { foreignKey: 'pessoaId' });
