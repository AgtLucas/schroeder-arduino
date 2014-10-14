var express        = require('express')
  , app            = express()
  , http           = require('http').Server(app)
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , path           = require('path')
  , db             = require('./models')
  , passport = require('passport')
  , flash = require('connect-flash')
  , LocalStrategy = require('passport-local').Strategy
  , arduinos = require('./routes/arduino')
  , types = require('./routes/type')
  , users = require('./routes/user')
  , login = require('./routes/login')
  , client = require('./routes/client')
  , log = require('./routes/log')

app.set('port', process.env.PORT || 3000)
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'public')))

app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'schroeder-arduino' }));
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

app.get('/home', naoAutenticadoHome, function(req, res, next){
  res.sendfile('public/home.html', { user: req.user });
});

app.get('/schroeder/users/info', naoAutenticado, function(req, res, next){
  var retorno = {
    id: req.user.id,
    nome: req.user.nome,
    email: req.user.email,
    password: req.user.password
  };
  res.json(retorno);
});

app.get('/views/perfil/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/perfil/index.html', { user: req.user });
});

app.get('/views/home/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/home/index.html', { user: req.user });
});

app.get('/views/arduino/temporeal/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/arduino/temporeal/index.html', { user: req.user });
});

app.get('/views/log/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/log/index.html', { user: req.user });
});

app.get('/views/client/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/client/index.html', { user: req.user });
});

app.get('/views/client/new/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/client/new/index.html', { user: req.user });
});

app.get('/schroeder/medicoes', function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  arduinos.findAll(req, res, next);
});

app.get('/schroeder/medicoes/last', naoAutenticado, arduinos.findLast)

app.get('/schroeder/clients', naoAutenticado, client.findAll)

app.get('/schroeder/logs/', naoAutenticado, log.findAll)

app.post('/schroeder/login',
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
  function(req, res, next) {
    res.json({ success: 1})
  });

app.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

function naoAutenticado(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send({ error: 1 });
}

function naoAutenticadoHome(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

function naoAutenticadoPage(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send({ error: 1 });
  //Caso volte a página principal
  //res.redirect('/');
}

if ('development' === app.get('env')) {
  app.use(errorHandler())
}

app.put('/schroeder/arduinos/:id', arduinos.update)
app.put('/schroeder/users/:id', naoAutenticado, users.update)
app.get('/schroeder/create', function(req, res, next){
  arduinos.createGet(req, res);
  io.emit('new-medicao', {
    temperature: req.param('temperatura'),
    humidity: req.param('humidade'),
    createdAt: new Date(),
    updateAt: new Date(),
  });
});

app.get('/schroeder/autenticar/:password', function(req, res, next){
  db.Client.find({ where: { password: req.param('password') } }).success(function(entityUser) {
    if (entityUser) {
      var _log = { ClientId: entityUser.id, descricao: req.param('acao') };
      db.Log.create(_log).success(function(entityLog) {
        io.emit('new-log', entityLog, entityUser);
        res.send('1');
      }).error(function(error, e){
        res.send('0');
      });
    } else {
      res.send('0');
    }
  });
});

app.post('/schroeder/users', users.newUser)
app.post('/schroeder/logs', log.newLog)
app.post('/schroeder/clients', client.newClient)
app.get('/schroeder/arduinos/:id', arduinos.find)
app.post('/schroeder/arduinos', arduinos.create)
app.del('/schroeder/arduinos/:id', arduinos.destroy)
app.del('/schroeder/users/:id', users.destroy)
app.del('/schroeder/clients/:id', client.destroy)

//app.get('/schroeder/users/', users.findAll)

var io = null;

db.sequelize.sync({ force: false }).complete(function(err) {
  if (err) {
    throw err
  } else {
    http.listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'))
    });
    io = require('socket.io')(http);
  }
})



