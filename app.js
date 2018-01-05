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
app.use(bodyParser.urlencoded({extended: true}))
app.use(require("express-session")({
    secret: "Hello World",
    resave: false,
    saveUninitialized: false
}))
//Setting up passport
app.use(passport.initialize())
app.use(passport.session())

//Takes data from session that is encoded and uncodes it
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//ROUTES

app.get('/', function(req, res){
    res.render("home")
})

app.get('/secret',isLoggedIn, function(req, res){
    res.render("secret")
})

// Auth Routes
//Show sign up form
app.get("/register", function(req, res){
    res.render("register")
})
//handling user sign up
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    //Make a new USer object. only pass in username, don't save the password to database
    //returns a user
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render()
        }
        //if no err, will log user in. Redirect to secret page
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret")
        })
    })
})

// LOGIN ROUTES
//render login form
app.get("/login", function(req, res){
    res.render("login")
})
//login logic
//middleware
app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login" 
}) ,function(req, res){
})

//logout route
app.get("/logout", function(req, res){
    //logout using passport
    req.logout()
    res.redirect("/")
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

app.listen(3000, function(){
    console.log('Listening on localhost 3000')
})