const { sql, poolPromise } = require("../config/context");
const upload = require('../services/multerConfig'); // Importa a configuração do Multer

class CatalogModel {
  static async getAll() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Catalog");
    return result.recordset;
  }

  static async getById(id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Catalog WHERE id = @id");
    return result.recordset[0];
  }

  static async create(req, res) {
    try {
      // Obtém os dados da requisição
      const body = req.body;
      const { name, description, price, stock, category } = body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      // Valida campos obrigatórios
      if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({
          success: false,
          message: "❌ Missing required fields",
        });
      }

      // Conecta ao banco de dados
      const pool = await poolPromise;
      const request = pool.request();

      // Criação dinâmica de inputs
      const data = { name, description, price, stock, category, imageUrl };
      const columns = [];
      const values = [];

      for (const key in data) {
        if (data[key] !== undefined) {
          request.input(key, data[key]);
          columns.push(key);
          values.push(`@${key}`);
        }
      }

      if (!columns.length) throw new Error("No valid fields to insert.");

      // Query dinâmica para inserir no banco de dados
      const query = `
        INSERT INTO Catalog (${columns.join(", ")}, createdAt)
        OUTPUT INSERTED.*
        VALUES (${values.join(", ")}, GETDATE())`;

      const result = await request.query(query);

      return {
        success: true,
        message: "✅ Item added to catalog",
        data: result.recordset[0],
      };

    } catch (error) {
      console.error("❌ Error inserting catalog item:", error);
      return {
        success: false,
        message: "❌ Insertion failed",
        error: error.message,
      };
    }
  }
  

  static async update(id, data) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, data.name)
      .input("description", sql.Text, data.description)
      .query(
        "UPDATE Catalog SET name = @name, description = @description WHERE id = @id"
      );
    return result.rowsAffected[0] > 0;
  }

  static async delete(id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Catalog WHERE id = @id");
    return result.rowsAffected[0] > 0;
  }
}

module.exports = CatalogModel;
