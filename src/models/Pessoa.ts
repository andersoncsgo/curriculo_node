import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

export class Pessoa extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public telefone!: string;
  public sobre!: string;
}

Pessoa.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  telefone: { type: DataTypes.STRING, allowNull: false },
  sobre: { type: DataTypes.TEXT, allowNull: false },
}, {
  sequelize,
  modelName: 'Pessoa',
});
