const express = require('express');
const router = express.Router();
const passport = require('passport')

const siteController = require('../app/controllers/SiteController')

router.get('/contact', siteController.contact);
router.get('/faqs', siteController.faqs);
router.get('/login', checkNotAuthenticated, siteController.login);
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true
}));
router.get('/register', checkNotAuthenticated, siteController.register);
router.post('/register', checkNotAuthenticated, siteController.registerr);
router.get('/', siteController.index);

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin')
    }
    next()
}

module.exports = router;