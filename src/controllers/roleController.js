const { Role } = require('../models');
const { enviarErro } = require('../utils');

// Criar novo Role
const createRole = async (req, res) => {
  const { role_name, description } = req.body;

  try {
    const newRole = await Role.create({ role_name, description });
    res.status(201).json(newRole);
  } catch (err) {
    console.error('Erro ao criar role:', err);
    enviarErro(res, 500, 'Erro ao criar role.');
  }
};

// Listar todos os Roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (err) {
    console.error('Erro ao buscar roles:', err);
    enviarErro(res, 500, 'Erro ao buscar roles.');
  }
};

// Buscar Role por ID
const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return enviarErro(res, 404, 'Role não encontrado.');
    }
    res.status(200).json(role);
  } catch (err) {
    console.error('Erro ao buscar role:', err);
    enviarErro(res, 500, 'Erro ao buscar role.');
  }
};

// Atualizar Role por ID
const updateRoleById = async (req, res) => {
  const { id } = req.params;
  const { role_name, description } = req.body;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return enviarErro(res, 404, 'Role não encontrado.');
    }

    await role.update({ role_name, description });
    res.status(200).json(role);
  } catch (err) {
    console.error('Erro ao atualizar role:', err);
    enviarErro(res, 500, 'Erro ao atualizar role.');
  }
};

// Excluir Role por ID
const deleteRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return enviarErro(res, 404, 'Role não encontrado.');
    }

    await role.destroy();
    res.status(200).json({ message: 'Role excluído com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir role:', err);
    enviarErro(res, 500, 'Erro ao excluir role.');
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};