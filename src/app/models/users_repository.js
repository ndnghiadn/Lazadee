
class UsersRepository {  
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
    getAll() {
        return this.dao.all('SELECT * from users');
    }

    create(name, email, password) {
        return this.dao.runquery(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, password]);
    }

    getByEmail(email) {
        return this.dao.get(`SELECT * FROM users WHERE email = ?`, [email]);
    }

    getById(id) {
        return this.dao.get(`SELECT * FROM users WHERE id = ?`, [id]);
    }

}

module.exports = UsersRepository