
class BlogsRepository {  
    constructor(dao) {
      this.dao = dao
    }
  
    create(title, slug, userId, time, imageUrl, content, quote, tags) {
        return this.dao.runquery(`INSERT INTO blogs (title, slug, userId, time, imageUrl, content, quote, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [title, slug, userId, time, imageUrl, content, quote, tags]);
    }

    update(product) {
        const { id, name, category, price, prePrice, imageUrl, isSale } = product;
        return this.dao.runquery(`UPDATE blogs SET name = ?, categoryId = ?, price = ?, prePrice = ?, imageUrl = ?, isSale = ? WHERE id = ?`, [name, category, price, prePrice, imageUrl, isSale, id]);
    }

    delete(id) {
        return this.dao.runquery(`DELETE FROM blogs WHERE id = ?`, [id]);
    }

    getAll() {
        return this.dao.all('SELECT * from blogs');
    }

    getBySlug(slug) {
        return this.dao.get(`SELECT * FROM blogs WHERE slug = ?`, [slug]);
    }

    getBlogs(userId) {
        return this.dao.all(`SELECT * from blogs WHERE userId = ?`, [userId]);
    }
}

module.exports = BlogsRepository