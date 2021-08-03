
const AppDAO = require('../models/dao')
const UsersRepository = require('../models/users_repository')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const usersRepo = new UsersRepository(dao)
        usersRepo.getByEmail(email)
            .then((user) => {
               if (user == null) {
                return done(null, false, { message: '* invalid user'} )
            }
            try {
                if (bcrypt.compareSync(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: '* invalid password'} )
                }
            } catch (e) {
                return done(e)
            }
         })
    }
    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id) )
    passport.deserializeUser((id, done) => {
        const dao = new AppDAO('./src/app/models/db.sqlite3')
        const usersRepo = new UsersRepository(dao)
        usersRepo.getById(id)
            .then(user => {
                return done(null, user)
            })
    })
}

module.exports = initialize