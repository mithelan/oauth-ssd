var express = require("express");
var app     = express();
var path    = require("path");
app.use(express.static(__dirname + '/public'));

const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const routes = require('./routes.js');
const config = require('./config')

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


passport.use(new LinkedInStrategy({
  clientID: config.linkedinAuth.clientID,
  clientSecret: config.linkedinAuth.clientSecret,
  callbackURL: config.linkedinAuth.callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile','w_member_social'],
  
}, function (token, tokenSecret, profile, done) {
  return done(null, profile);
}
));




app.get('/main',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});



app.use('/', routes);

const port = 3000;

app.listen(port, () => {
  console.log('App listening on port ' + port);
});




// console.log("Server running on 3000");