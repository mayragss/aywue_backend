const express = require("express");
const catalogRoutes = require("./routes/catalogRoutes");
const collectionFormRoutes = require('./routes/collectionRoutes');
const cors = require("cors");

const app = express();

app.use(express.json()); 
app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: ['POST', 'GET', 'PATCH', 'DELETE']
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/catalog", catalogRoutes);
app.use("/api/collection/form", collectionFormRoutes);


const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
