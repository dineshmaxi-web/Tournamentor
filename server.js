var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var registerrouter = require('./routers/registerrouter');
var loginrouter = require("./routers/loginrouter");
var mongoose = require('mongoose');
var path = require('path');
var application = require('./models/application.js');
var user = require('./models/user.js');
var chat = require('./models/chat.js');
var mailstore = require('./models/mailstore.js');
var nodemailer = require('nodemailer');
var socket = require('socket.io');
var app = express();
app.locals.moment = require('moment');

mongoose.connect('mongodb://admin:admin123@ds061751.mlab.com:61751/tournamentor');
app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");

app.use(session({secret:"secret",resave: true,saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(registerrouter);
app.use(loginrouter);

function verify(req,res,next){
  if(req.isAuthenticated())
  {
    return next();
  }
  else {
    {
      res.redirect('/my/login');
    }
  }
}

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/splashscreen/splashscreen.html'));
});

app.get('/my/login',function(req,res){
  res.sendFile(path.join(__dirname+'/public/login/login.html'));
});

app.get('/my/dashboard/posts',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/dashboardpost/dashboardpost.html'));
});

app.get('/my/livetournament',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/livetournament/livetournament.html'));
});

app.get('/my/application',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/application/application.html'));
});

app.get('/my/map',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/map/map.html'));
});

app.post('/application/information',verify,function(req,res){
  var newApplication = new application();
  newApplication.hostname = req.user.username;
  newApplication.groundimage = req.body.groundimage;
  newApplication.sportimage = req.body.sportimage;
  newApplication.hostemail = req.user.hostemail;
  newApplication.sportname = req.body.sportname.toLowerCase();
  newApplication.startdate = req.body.startdate;
  newApplication.enddate = req.body.enddate;
  newApplication.entryfee = req.body.entryfee;
  newApplication.pnumber = req.user.phonenumber;
  newApplication.description = req.body.description;
  newApplication.street = req.body.street;
  newApplication.city = req.body.city;
  newApplication.state = req.body.state;
  newApplication.pincode = req.body.pincode;
  newApplication.lat = req.body.lat;
  newApplication.lng = req.body.lng;
  newApplication.save(function(err,savedObject){
      if(savedObject)
      {
        res.redirect('/my/dashboard/posts')
      }
      else {
        res.send(err);
      }
    });
});

app.get('/my/application/detail/:id',verify,function(req,res){
  application.find({_id: req.params.id},function(err, application){
    console.log(application)
    res.render('details', {application : application , traderemail : req.user.email, username : req.user.username})
});
});

app.get('/get/applications',verify,function(req,res){
      application.find({},function(err, application){
        if(err)
          res.send(err);
        else
          res.send(application);
      });
});

app.post('/yesupdate/:id/:updatedquantity/mail/',verify,function(req,res){

  application.findOneAndUpdate({_id: req.params.id},{$set:{pquantity:req.params.updatedquantity}},{"returnNewDocument": true},function(err,updated){

  });

  mailstore.findOneAndDelete({applicationid: req.params.id},function(err, deleteditem){
    res.redirect('/my/dashboard/posts')
  });
});

app.post('/noupdate/:id/:updatedquantity/mail/',verify,function(req,res){
  mailstore.findOneAndDelete({applicationid: req.params.id},function(err, deleteditem){
    res.redirect('/my/dashboard/posts');
  });
});

app.get('/get/mail',verify,function(req,res){
  console.log(req.user.username);
  if(req.user.username)
    {
     mailstore.find({hostname: req.user.username},function(err, mailstore){
       res.send(mailstore);
      if(err)
        res.send("Nothing found.");
      });
    }
  else{
    res.send("You are not authenticated");
  }
});

app.post('/mail/send',function(req,res){
  var newMailStore = new mailstore();
  newMailStore.hostname = req.body.postername;
  newMailStore.applicationid = req.body.applicationid;
  newMailStore.howmuch = req.body.howmuch;
  newMailStore.pquantity = req.body.pquantity;
  newMailStore.pqmeasure = req.body.pqmeasure;
  newMailStore.mobilenumber = req.body.mobileno;
  newMailStore.clickername = req.user.username;

  newMailStore.save(function(err,savedObject){
      if(savedObject)
      {
        console.log(savedObject);
      }
      else {
        res.send(err);
      }
    });

  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dineshozian@gmail.com',
      pass: 'ozian111'
    }
  });

  mailOption = {
    from: 'Website support <dineshozian@gmail.com>',
    to: req.body.posteremail,
    subject: req.body.subject,
    html: '<p>Hello, <b>'+ req.body.postername+'</b>. How are you?. <b>'+req.user.username+'</b> would like to buy your <b>'+req.body.howmuch+' '+req.body.pqmeasure+' '+req.body.product+'</b>. Please, have a smooth relationship with him/her.</p>'+'<ul>'+'<li>Contact '+req.user.username+' to '+req.user.phonenumber+'</li></ul>'
  };
 transporter.sendMail(mailOption,function(info, err){
   if(info){
    console.log(info.message);
   }
 });

 transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
     user: 'dineshozian@gmail.com',
     pass: 'ozian111'
   }
 });

 mailOption = {
   from: 'Website support <dineshozian@gmail.com>',
   to: req.body.clickeremail,
   subject: req.body.subject,
   html: '<p>Hello, <b>'+ req.user.username+'</b>. How are you?. I hope you are interested in buying the <b>'+req.body.howmuch+' '+req.body.pqmeasure+' '+req.body.product+'</b> from <b>'+req.body.postername+'</b>. Please, have a smooth relationship with him/her.</p>'+'<ul>'+'<li>Contact '+req.body.postername+' to '+req.body.mobileno+'</li></ul>'
 };
transporter.sendMail(mailOption,function(info, err){
  if(info){
   console.log(info.message);
  }
});
});

app.get('/post/dashboard',verify,function(req,res){
  console.log(req.user.username)
  application.find({hostname: req.user.username},function(err, application){
    console.log(application) 
    res.send(application);
    if(err)
      res.send("application not found.");
});
});

app.get('/get/application/search/name/:name',verify,function(req,res){
  application.find({sportname: req.params.name.toLowerCase()},function(err, application){
     res.send(application);
    if(err)
      res.send("application not found.");
});
});

app.get('/get/application/search/location/:loc',verify,function(req,res){
  application.find({city: req.params.loc},function(err, application){
     res.send(application);
    if(err)
      res.send("application not found.");
});
});

app.get('/get/application/search/entryfee/:cond/:pri',verify,function(req,res){
  if(req.params.cond != null)
  {
    if(req.params.cond == "Greaterthan")
    {
     application.find({entryfee:{$gt:req.params.pri}},function(err, application){
     res.send(application);
    });
    }
    if(req.params.cond == "Lessthan")
    {
     application.find({entryfee:{$lte:req.params.pri}},function(err, application){
     res.send(application);
    });
    }
   }
});

app.post('/my/application/detail/:id/delete',verify,function(req,res){
  application.findOneAndDelete({_id: req.params.id},function(deleteditem){
    res.redirect('/my/dashboard/posts')
  });
});

app.get('/account/logout',verify,function(req,res){
  req.session.destroy();
  req.logout();
  res.redirect('/my/login');
});

var server = app.listen(4000,function(){
  console.log("server is listening on port 4000...");
});

var io = socket(server);
io.on('connection', (socket) => {
   socket.on('chat', function(data){
       var newChat = new chat();
       newChat.created_by = data.user;
       newChat.message = data.message;
       newChat.prodid = data.applicationid;
       newChat.save();
       io.sockets.emit('chat', data);
   });
});

app.get('/get/chat',verify, function(req,res){
  chat.find({},function(err, obj){
    res.send(obj);
  });
});
