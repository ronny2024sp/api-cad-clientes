const { User } = require('./User');
const { Role } = require('./Role');
const { Cliente } = require('./Cliente');

// Relação entre User e Role
User.belongsTo(Role, { foreignKey: 'role_id' });  // Um User pertence a um Role
Role.hasMany(User, { foreignKey: 'role_id' });  // Um Role pode ter muitos Users

/*
// Relação entre Cliente e User (caso exista)
Cliente.belongsTo(User, { foreignKey: 'user_id' });  // Um Cliente pertence a um User
User.hasMany(Cliente, { foreignKey: 'user_id' });  // Um User pode ter muitos Clientes
*/

module.exports = { User, Role, Cliente };