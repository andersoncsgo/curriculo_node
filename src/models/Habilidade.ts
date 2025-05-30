import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import { Pessoa } from './Pessoa';

export class Habilidade extends Model {
  public id!: number;
  public titulo!: string;
  public pessoaId!: number;
}

Habilidade.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Habilidade',
});

Pessoa.hasMany(Habilidade, { foreignKey: 'pessoaId' });
Habilidade.belongsTo(Pessoa, { foreignKey: 'pessoaId' });
