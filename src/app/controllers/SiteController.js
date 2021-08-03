
const bcrypt = require('bcryptjs')
const AppDAO = require('../models/dao')
const UsersRepository = require('../models/users_repository')

const passport = require('passport')
const initializePassport = require('./passport-config')
initializePassport(passport)

class SiteController {

    // [GET] /contact
    contact = (req, res) => {
        res.render('contact');
    }

    // [GET] //faqs
    faqs = (req, res) => {
        res.render('faq');
    }

    // [GET] /login
    login = (req, res) => {
        res.render('login', {layout: false, error: req.flash('error')});
    }

    // [GET] /register
    register = (req, res) => {
        res.render('register', {layout: false});
    }

    // [POST] /register
    registerr = async (req, res, next) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const usersRepo = new UsersRepository(dao)
        try {
            const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
            usersRepo.create(req.body.name, req.body.email, hashedPassword)
                .then()
                .catch(next)
            res.redirect('/login')
        } catch {
            res.redirect('/register')
        }
    }

    // [GET] /index
    index = (req, res) => {
        res.render('home');
    }
}

module.exports = new SiteController;