const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  avatar: {
    type: DataTypes.TEXT, // TEXT já é suficiente para armazenar a string Base64 no PostgreSQL
    allowNull: true, // Opcional
  },
  genero: {
    type: DataTypes.STRING(10),
    allowNull: true, // Opcional
  },
  tipo_cliente: {
    type: DataTypes.STRING(10),
    allowNull: false, // Obrigatório
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: true, // Opcional, já que pode ser um cliente tipo CNPJ
    validate: {
      len: [14, 14], // Validação para garantir que tenha exatamente 14 caracteres
    },
  },
  cnpj: {
    type: DataTypes.STRING(18),
    allowNull: true, // Opcional, já que pode ser um cliente tipo CPF
    validate: {
      len: [18, 18], // Validação para garantir que tenha exatamente 18 caracteres
    },
  },
  situacao_cad_cnpj: {
    type: DataTypes.STRING(10),
    allowNull: true, // Opcional
  },
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false, // Obrigatório
  },
  nome_fantasia_cnpj: {
    type: DataTypes.STRING(60),
    allowNull: true, // Opcional, apenas para clientes do tipo Jurídico
  },
  data_nasc: {
    type: DataTypes.DATEONLY, // Tipo de dado para data
    allowNull: true, // Opcional
  },
  celular: {
    type: DataTypes.STRING(20),
    allowNull: false, // Obrigatório
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true, // Opcional
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false, // Obrigatório
    unique: true,
    validate: {
      isEmail: true, // Validação para garantir formato de e-mail válido
    },
  },
  cep: {
    type: DataTypes.STRING(10),
    allowNull: true, // Opcional
  },
  logradouro: {
    type: DataTypes.STRING(60),
    allowNull: true, // Opcional
  },
  numero: {
    type: DataTypes.STRING(10),
    allowNull: true, // Opcional
  },
  complemento: {
    type: DataTypes.STRING(15), 
    allowNull: true, // Opcional
  },
  bairro: {
    type: DataTypes.STRING(30),
    allowNull: true, // Opcional
  },
  municipio: {
    type: DataTypes.STRING(30),
    allowNull: true, // Opcional
  },
  estado: {
    type: DataTypes.STRING(2), // Sigla do estado
    allowNull: true, // Opcional
  },
  observacao: {
    type: DataTypes.STRING(360),
    allowNull: true, // Opcional
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true, // Inclui createdAt e updatedAt automaticamente
});

module.exports = { Cliente }