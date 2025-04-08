const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Role } = require('../models');
const { enviarErro, validarCampos } = require('../utils');

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta-teste';

const login = async (req, res) => {
  const { login_email, password } = req.body;

  if (!validarCampos([login_email, password])) {
    return enviarErro(res, 400, 'E-mail e senha são obrigatórios.');
  }

  try {
    const user = await User.findOne({
      where: { login_email },
      include: { model: Role, attributes: ['role_name'] },
    });

    if (!user) {
      return enviarErro(res, 401, 'Credenciais inválidas.');
    }

    const senhaValida = await bcrypt.compare(password, user.password_hash);
    if (!senhaValida) {
      return enviarErro(res, 401, 'Credenciais inválidas.');
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.Role.role_name,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login realizado com sucesso.',
      userLogin: {
        id: user.id,
        name: user.name,
        email: user.login_email,
        role: user.Role.role_name,
      },
    });
  } catch (err) {
    console.error('Erro no login:', err);
    enviarErro(res, 500, 'Erro interno no servidor.');
  }
};

module.exports = { login };