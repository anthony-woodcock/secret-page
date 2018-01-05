var express = require("express")
var mongoose = require("mongoose")
var passport = require("passport")
var bodyParser = require("body-parser")
var User = require("./models/user")
var LocalStrategy = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost/auth_demo_app")



var app = express()
app.set('view engine', 'ejs')

app.use(require("express-session")({
    secret: "Hello World",
    resave: false,
    saveUninitialized: false
}))
//Setting up passport
app.use(passport.initialize())
app.use(passport.session())

//Takes data from session that is encoded and uncodes it
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//ROUTES

app.get('/', function(req, res){
    res.render("home")
})

app.get('/secret', function(req, res){
    res.render("secret")
})

// Auth Routes
//Show sign up form
app.get("/register", function(req, res){
    res.render("register")
})
//handling user sign up
app.post("/register", function(req, res){
    res.send("REGISTER POST ROUTE")
})

app.listen(3000, function(){
    console.log('Listening on localhost 3000')
})