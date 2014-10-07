var express        = require('express')
  , app            = express()
  , cors           = require('cors')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http').Server(app)
  , path           = require('path')
  , db             = require('./models')
  , passport = require('passport')
  , flash = require('connect-flash')
  , LocalStrategy = require('passport-local').Strategy
  , arduinos = require('./routes/arduino')
  , types = require('./routes/type')
  , users = require('./routes/user')
  , login = require('./routes/login')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/public/views')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.configure(function() {
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
});

function findById(id, fn) {
  db.User.find({ where: { id: id } }).success(function(entity) {
    if (entity) {
      fn(null, entity);
    } else {
      fn(new Error(id));
    }
  });
}

function findByUsername(username, fn) {
  db.User.find({ where: { email: username } }).success(function(entity) {
    if (entity) {
      return fn(null, entity);
    } else {
      return fn(null, null);
    }
  });
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      findByUsername(username, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user == null) {
          return done(null, null);
        }
        return done(null, user);
      })
    });
  }
));

app.get('/', function(req, res, next){
  res.sendfile('public/index.html', { user: req.user, message: req.flash('error') });
});

app.get('/home', ensureAuthenticated, function(req, res){
  res.sendfile('public/views/home.html', { user: req.user });
});

app.get('/schroeder/users/info',ensureAuthenticated, function(req, res){
  var retorno = {
    nome: req.user.nome
  };
  res.json(retorno);
});

app.get('/sensores', ensureAuthenticated, function(req, res){
  res.sendfile('public/views/arduino/arduinos.html', { user: req.user });
});

app.get('/schroeder/medicoes', arduinos.findAll);

app.post('/schroeder/login',
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.json({ success: 1})
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

if ('development' === app.get('env')) {
  app.use(errorHandler())
}

app.get('/schroeder/create', function(req, res){
  arduinos.createGet(req, res);
  io.emit('new-medicao', {
    temperature: req.param('temperatura'),
    humidity: req.param('humidade'),
    createdAt: new Date(),
    updateAt: new Date(),
  });
});

app.get('/schroeder/arduinos/:id', arduinos.find)
app.post('/schroeder/arduinos', arduinos.create)
app.put('/schroeder/arduinos/:id', arduinos.update)
app.del('/schroeder/arduinos/:id', arduinos.destroy)
app.get('/schroeder/users', users.findAll)
app.get('/schroeder/users/:id', users.find)
app.post('/schroeder/users', users.newUser)
app.put('/schroeder/users/:id', users.update)
app.del('/schroeder/users/:id', users.destroy)

var io;

db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err
  } else {
    http.listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
      io = require('socket.io')(http, {log:false, origins:'*:*'});
    });
  }
})
