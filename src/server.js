const express = require('express');
const sequelize = require('./config/db.config');
const cors = require('cors');

const cookieParser = require('cookie-parser');

// Carregar variáveis de ambiente
const dotenv = require('dotenv');
dotenv.config(); 

// Importa todas as rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
//const userRoutes = require('./routes/userRoutes');
//const profileRoutes = require('./routes/profileRoutes'); // Rotas de perfil

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions)); // CORS configurado

// Middlewares
app.use(express.json()); // Leitura de JSON no corpo da requisição
app.use(cookieParser()); // Leitura de cookies


// Registro das rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes); // Rotas protegidas para CRUD de User
app.use('/clientes', clienteRoutes); // Rotas protegidas para CRUD de Cliente


//app.use('/api/users', userRoutes); // Rotas relacionadas ao usuário
//app.use('/api/profile', profileRoutes); // Rotas relacionadas ao perfil

// Middleware para erros globais
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({ message: 'Erro do Servidor Interno' });
});

// Difinir a porta que vai rodar o servidor
const PORT = process.env.PORT || 3333

// Inicializa o servidor
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error);
  }
});