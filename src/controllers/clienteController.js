const { Cliente } = require('../models');
const { enviarErro, validarCampos } = require('../utils');

// Criar novo cliente
const createCliente = async (req, res) => {
  const {
    avatar, genero, tipo_cliente, cpf, cnpj, situacao_cad_cnpj, nome,
    nome_fantasia_cnpj, data_nasc, celular, telefone, email, cep, logradouro,
    numero, complemento, bairro, municipio, estado, observacao
  } = req.body;

  // Validação dos campos obrigatórios
  if (!validarCampos([tipo_cliente, nome, celular, email])) {
    return enviarErro(res, 400, 'Campos obrigatórios faltando: tipo_cliente, nome, celular e email são necessários.');
  }

  // Validação de formato de CPF (se for pessoa física)
  if (tipo_cliente === 'Físico' && (!cpf || cpf.length !== 14)) {
    return enviarErro(res, 400, 'CPF inválido. O CPF deve ter 14 caracteres.');
  }

  // Validação de formato de CNPJ (se for pessoa jurídica)
  if (tipo_cliente === 'Jurídico' && (!cnpj || cnpj.length !== 18)) {
    return enviarErro(res, 400, 'CNPJ inválido. O CNPJ deve ter 18 caracteres.');
  }

  // Validação de email
  if (!email.includes('@')) {
    return enviarErro(res, 400, 'Email inválido.');
  }

  try {
    const newCliente = await Cliente.create({
      avatar, genero, tipo_cliente, cpf, cnpj, situacao_cad_cnpj, nome,
      nome_fantasia_cnpj, data_nasc, celular, telefone, email, cep, logradouro,
      numero, complemento, bairro, municipio, estado, observacao
    });
    res.status(201).json(newCliente);
  } catch (err) {
    console.error('Erro ao criar cliente:', err);
    enviarErro(res, 500, 'Erro ao criar cliente.');
  }
};

// Listar todos os clientes
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    enviarErro(res, 500, 'Erro ao buscar clientes.');
  }
};

// Buscar cliente por ID
const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return enviarErro(res, 404, 'Cliente não encontrado.');
    }
    res.status(200).json(cliente);
  } catch (err) {
    console.error('Erro ao buscar cliente:', err);
    enviarErro(res, 500, 'Erro ao buscar cliente.');
  }
};

// Atualizar cliente por ID
const updateClienteById = async (req, res) => {
  const { id } = req.params;
  const {
    avatar, genero, tipo_cliente, cpf, cnpj, situacao_cad_cnpj, nome,
    nome_fantasia_cnpj, data_nasc, celular, telefone, email, cep, logradouro,
    numero, complemento, bairro, municipio, estado, observacao
  } = req.body;

  // Validação dos campos obrigatórios
  if (!validarCampos([tipo_cliente, nome, celular, email])) {
    return enviarErro(res, 400, 'Campos obrigatórios faltando: tipo_cliente, nome, celular e email são necessários.');
  }

  // Validação de formato de CPF (se for pessoa física)
  if (tipo_cliente === 'Físico' && (!cpf || cpf.length !== 14)) {
    return enviarErro(res, 400, 'CPF inválido. O CPF deve ter 14 caracteres.');
  }

  // Validação de formato de CNPJ (se for pessoa jurídica)
  if (tipo_cliente === 'Jurídico' && (!cnpj || cnpj.length !== 18)) {
    return enviarErro(res, 400, 'CNPJ inválido. O CNPJ deve ter 18 caracteres.');
  }

  // Validação de email
  if (!email.includes('@')) {
    return enviarErro(res, 400, 'Email inválido.');
  }

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return enviarErro(res, 404, 'Cliente não encontrado.');
    }

    await cliente.update({
      avatar, genero, tipo_cliente, cpf, cnpj, situacao_cad_cnpj, nome,
      nome_fantasia_cnpj, data_nasc, celular, telefone, email, cep, logradouro,
      numero, complemento, bairro, municipio, estado, observacao
    });
    res.status(200).json(cliente);
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    enviarErro(res, 500, 'Erro ao atualizar cliente.');
  }
};

// Excluir cliente por ID
const deleteClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return enviarErro(res, 404, 'Cliente não encontrado.');
    }

    await cliente.destroy();
    res.status(200).json({ message: 'Cliente excluído com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir cliente:', err);
    enviarErro(res, 500, 'Erro ao excluir cliente.');
  }
};

module.exports = {
  createCliente,
  getClientes,
  getClienteById,
  updateClienteById,
  deleteClienteById
};