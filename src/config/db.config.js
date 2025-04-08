const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Verificar configurações obrigatórias e emitir avisos
if (!process.env.DB_DATABASE || !process.env.DB_USER || !process.env.DB_PASS) {
  throw new Error('Configuração de banco de dados está incompleta. Verifique as variáveis de ambiente.');
}

// Instanciar a conexão do Sequelize com PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Nome do banco
  process.env.DB_USER,     // Usuário
  process.env.DB_PASS,     // Senha
  {
    host: process.env.DB_HOST || 'localhost', // Host do banco
    dialect: 'postgres', // Alterado para PostgreSQL
    logging: false, // Isso desabilita os logs das consultas
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Dependendo da sua configuração de segurança, você pode alterar esse parâmetro
      },
    },
  }
);

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    process.exit(1); // Finaliza o processo em caso de falha crítica
  });

module.exports = sequelize; // Exporta a instância do Sequelize