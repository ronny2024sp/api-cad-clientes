const validarCampos = (campos) => campos.every((campo) => campo && campo.trim() !== '');

const enviarErro = (res, status, mensagem) => res.status(status).json({ error: mensagem });

module.exports = { validarCampos, enviarErro };
