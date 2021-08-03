
const AppDAO = require('../models/dao')
const BlogsRepository = require('../models/blogs_repository')
const UsersRepository = require('../models/users_repository')
const CommentsRepository = require('../models/comments_repository')

class BlogsController {

    // [POST] /blogs/:slug
    postComment = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const blogRepo = new BlogsRepository(dao)
        const cmtRepo = new CommentsRepository(dao)
        
        blogRepo.getBySlug(req.params.slug)
            .then(blog => {
                cmtRepo.create(req.user.id, blog.id, req.body.content)
            })
            .catch(next)
        res.redirect(`/blogs/${req.params.slug}`)
    }

    // [GET] /blogs/:slug
    show = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const blogRepo = new BlogsRepository(dao)
        const userRepo = new UsersRepository(dao)
        const cmtRepo = new CommentsRepository(dao)
        const isLogin = req.isAuthenticated();
        
        blogRepo.getBySlug(req.params.slug)
            .then((blog) => {
                userRepo.getById(blog.userId)
                        .then((user) => {
                            blog.username = user.name
                        })
                        .catch(next)
                cmtRepo.getAllByBlog(blog.id)
                        .then((cmtList) => {
                            cmtList.map(cmt => {
                                userRepo.getById(cmt.idUser)
                                    .then(user => {
                                        cmt.username = user.name
                                    })
                                    .catch(next)
                            })
                            res.render('blogs/detail', { blog, cmtList, isLogin });
                        })
                        .catch(next)
            })
            .catch(next)

    }

    // [GET] /blogs
    index = (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const blogRepo = new BlogsRepository(dao)
        const userRepo = new UsersRepository(dao)
        
        blogRepo.getAll()
            .then((list) => {
                const blogsList = list.map((blog) => {
                    userRepo.getById(blog.userId)
                        .then((user) => {
                            blog.username = user.name
                        })
                        .catch(next)
                    return blog;
                })
                res.render('blogs/index', { list: blogsList });
            })
            .catch(next)
    }
}

module.exports = new BlogsController;