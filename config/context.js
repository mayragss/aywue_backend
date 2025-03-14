const sql = require("mssql");

// Configuração do banco de dados
const dbConfig = {
  user: "aywueapp",
  password: "msoulteam2k25##*",
  server: "msoulteam.database.windows.net",
  database: "AywueDEV",
  options: {
    encrypt: true, // Necessário para Azure SQL
    trustServerCertificate: true, // Use se estiver testando localmente
  },
};

// Criar pool de conexões
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Conectado ao SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Erro na conexão com o SQL Server", err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise,
};
