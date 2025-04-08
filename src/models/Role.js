const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Pode ser usado sem modificações no PostgreSQL
  },
  role_name: { // Nome do papel
    type: DataTypes.STRING(50), // Exemplo: admin, user, etc.
    allowNull: false,
    unique: true, // Garantir que cada papel seja único
  },
  description: { // Descrição do papel
    type: DataTypes.STRING(255), // Detalhes sobre o que o papel permite
    allowNull: true, // Opcional
  },
}, {
  timestamps: false, // Sem createdAt e updatedAt para simplificar
});

module.exports = { Role };