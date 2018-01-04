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

app.get('/', function(req, res){
    res.render("home")
})

app.get('/secret', function(req, res){
    res.render("secret")
})

app.listen(3000, function(){
    console.log('Listening on localhost 3000')
})