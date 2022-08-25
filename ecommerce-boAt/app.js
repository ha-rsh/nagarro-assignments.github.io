require("dotenv").config()

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/airdopes', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('airdopes', {user})
  }
})

app.get('/rockerz', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('rockerz', {user})
  }
})

app.get('/smartWatch', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('smartWatch', {user})
  }
})

app.get('/producthome1', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('productdetails/home1', {user})
  }
})
app.get('/producthome2', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('productdetails/home2', {user})
  }
})
app.get('/producthome3', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('productdetails/home3', {user})
  }
})
app.get('/producthome4', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('productdetails/home4', {user})
  }
})
app.get('/producthome5', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('productdetails/home5', {user})
  }
})
app.get('/producthome6', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('productdetails/home6', {user})
  }
})
app.get('/producthome7', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('productdetails/home7', {user})
  }
})
app.get('/producthome8', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('productdetails/home8', {user})
  }
})

app.get('/checkout', (req,res) => {
  let user = req.user
  if(user==null|| user.length<=0){
    res.redirect('/dashboard'); 
  }
  else{
    res.render('checkout')
  }
})


// PAYMENT


const stripe = require("stripe")(process.env.SECRET_KEY)

app.post('/charge', (req, res) => {
  const amount = 2500;
  
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Enter your card Details',
    currency: 'INR',
    customer: customer.id
  }))
  .then(charge => res.render('dashboard'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
