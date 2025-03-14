const CatalogModel = require("../repository/catalogRepository");

class CatalogController {
  static async getAll(req, res) {
    try {
      const items = await CatalogModel.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar catálogo" });
    }
  }

  static async getById(req, res) {
    try {
      const item = await CatalogModel.getById(req.params.id);
      if (!item) return res.status(404).json({ error: "Item não encontrado" });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar item" });
    }
  }

  static async create(req, res) {
    try {
      const newItem = await CatalogModel.create(req, res);
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar item" });
    }
  }

  static async update(req, res) {
    try {
      const updated = await CatalogModel.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: "Item não encontrado" });
      res.json({ message: "Item atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar item" });
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await CatalogModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Item não encontrado" });
      res.json({ message: "Item deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar item" });
    }
  }
}

module.exports = CatalogController;
