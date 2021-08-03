
class ProductsRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    // createTable() {
    //   const sql = `
    //     CREATE TABLE IF NOT EXISTS products (
    //       id INTEGER PRIMARY KEY AUTOINCREMENT,
    //       name TEXT,
    //       description TEXT,
    //       categoryId INTEGER,
    //       CONSTRAINT products_fk_categoryId FOREIGN KEY (categoryId)
    //         REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    //   return this.dao.runquery(sql)
    // }

    create(name, category, price, prePrice, imageUrl, isSale, userId) {
        return this.dao.runquery(`INSERT INTO products (name, price, categoryId, imageUrl, prePrice, isSale, userId) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name, price, category, imageUrl, prePrice, isSale, userId]);
    }

    update(product) {
        const { id, name, category, price, prePrice, imageUrl, isSale } = product;
        return this.dao.runquery(`UPDATE products SET name = ?, categoryId = ?, price = ?, prePrice = ?, imageUrl = ?, isSale = ? WHERE id = ?`, [name, category, price, prePrice, imageUrl, isSale, id]);
    }

    delete(id) {
        return this.dao.runquery(`DELETE FROM products WHERE id = ?`, [id]);
    }

    getAll() {
        return this.dao.all('SELECT * from products');
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM products WHERE id = ?`, [id]);
    }

    getProducts(userId) {
        return this.dao.all(`SELECT * from products WHERE userId = ?`, [userId]);
    }
}

module.exports = ProductsRepository