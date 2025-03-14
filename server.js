const express = require("express");
const catalogRoutes = require("./routes/catalogRoutes");
const cors = require("cors");

const app = express();

app.use(express.json()); // Middleware para JSON
app.use(
    cors({
      origin: "*", // Substitua pelo URL do seu frontend
      credentials: true,
      methods: ['POST', 'GET', 'PATCH', 'DELETE']
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/catalog", catalogRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
