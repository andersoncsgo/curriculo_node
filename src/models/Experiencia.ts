import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import { Pessoa } from './Pessoa';

export class Experiencia extends Model {
  public id!: number;
  public empresa!: string;
  public cargo!: string;
  public descricao!: string;
  public inicio!: string;
  public fim!: string;
  public pessoaId!: number;
}

Experiencia.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  empresa: DataTypes.STRING,
  cargo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  inicio: DataTypes.STRING,
  fim: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Experiencia',
});

Pessoa.hasMany(Experiencia, { foreignKey: 'pessoaId' });
Experiencia.belongsTo(Pessoa, { foreignKey: 'pessoaId' });
