
class CommentsRepository {  
    constructor(dao) {
      this.dao = dao
    }

    create(idUser, idBlog, content) {
        return this.dao.runquery(`INSERT INTO comments (idUser, idBlog, content) VALUES (?, ?, ?)`, [idUser, idBlog, content]);
    }

    getAllByBlog(idBlog) {
        return this.dao.all(`SELECT * FROM comments WHERE idBlog = ?`, [idBlog]);
    }

}

module.exports = CommentsRepository