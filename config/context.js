const sql = require("mysql2/promise");

// Configuração do banco de dados
const dbConfig = {
  host: '82.25.93.13', 
  user: 'root',
  password: 'aywWjo323=*',
  database: 'AYWUEDEV',
};

// Criar pool de conexões
const poolPromise = new sql.createPool(dbConfig)

module.exports = {
  poolPromise,
};
