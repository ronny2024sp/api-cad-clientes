const { User } = require('../models');
const { enviarErro } = require('../utils');

// Criar novo usuário
const createUser = async (req, res) => {
  const { login_email, password_hash, role_id, name, celular, avatar } = req.body;

  try {
    const newUser = await User.create({ login_email, password_hash, role_id, name, celular, avatar });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    enviarErro(res, 500, 'Erro ao criar usuário.');
  }
};

// Listar todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    enviarErro(res, 500, 'Erro ao buscar usuários.');
  }
};

// Buscar usuário por ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return enviarErro(res, 404, 'Usuário não encontrado.');
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    enviarErro(res, 500, 'Erro ao buscar usuário.');
  }
};

// Atualizar usuário por ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { login_email, role_id, name, celular } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return enviarErro(res, 404, 'Usuário não encontrado.');
    }

    await user.update({ login_email, role_id, name, celular });
    res.status(200).json(user);
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    enviarErro(res, 500, 'Erro ao atualizar usuário.');
  }
};

// Excluir usuário por ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return enviarErro(res, 404, 'Usuário não encontrado.');
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    enviarErro(res, 500, 'Erro ao excluir usuário.');
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};