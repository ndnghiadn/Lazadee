
class CategoriesRepository {
    constructor(dao) {
        this.dao = dao;
    }
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT)`;
        return this.dao.runquery(sql);
    }

    create(name) {
        return this.dao.runquery('INSERT INTO categories (name) VALUES (?)', [name]);
    }

    update(category) {
        const { id, name } = category;
        return this.dao.runquery(`UPDATE categories SET name = ? WHERE id = ?`, [name, id]);
    }

    delete(id) {
        return this.dao.runquery(`DELETE FROM categories WHERE id = ?`,[id]);
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM categories WHERE id = ?`, [id]);
    }

    getAll() {
        return this.dao.all(`SELECT * from categories`);
    }
}

module.exports = CategoriesRepository