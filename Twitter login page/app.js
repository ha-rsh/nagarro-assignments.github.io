require('dotenv').config()

const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');
const express = require('express')
var path = require('path');
var favicon = require('serve-favicon');

const app = express()

app.set('view engine','ejs')

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))
 

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/Images/favicon.ico'));
 
app.get('/', (req, res) => res.render('login'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))
 
app.get('/good', isLoggedIn, (req, res) =>{
    res.render("pages/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
 
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  (req, res) => {
    res.redirect('/good');
  }
);
 
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () =>{
    console.log("App is running on port 3000")
})