const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const app = express();
const port = 3000;

const route = require('./routes')

//HTTP Logger
app.use(morgan('combined'));

//Set public
app.use(express.static(path.join(__dirname, 'public')));

//Template engine
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Middleware body-parser
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use(flash())
app.use(session({
  secret: 'timeeraseall',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


//Route init
route(app);

//404 - redirect home
app.use('*', (req, res) => {
  res.redirect('/');
});

app.listen(port);