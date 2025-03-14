const multer = require('multer');
const path = require('path');

// Configuração do Multer para armazenar as imagens no diretório 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Define o diretório de destino para armazenar as imagens
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Gera um nome único para o arquivo
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
