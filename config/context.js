const sql = require("mysql2/promise");

// Configuração do banco de dados
const dbConfig = {
  host: 'localhost', 
  user: 'root',
  password: '',
  database: 'AYWUEDEV',
};

// Criar pool de conexões
const poolPromise = new sql.createPool(dbConfig)

module.exports = {
  poolPromise,
};
