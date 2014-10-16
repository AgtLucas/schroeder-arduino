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
  , sensor = require('./routes/sensor')

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

app.get('/arduino', naoAutenticadoPage, function(req, res, next){
  res.redirect('http://fabricioronchi.com');
});

app.get('/views/perfil/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/perfil/index.html', { user: req.user });
});

app.get('/views/sensor/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/sensor/index.html', { user: req.user });
});

app.get('/views/sensor/new/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/sensor/new/index.html', { user: req.user });
});

app.get('/views/home/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/home/index.html', { user: req.user });
});

app.get('/views/arduino/temporeal/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/arduino/temporeal/index.html', { user: req.user });
});

app.get('/views/arduino/sensores/:page', naoAutenticadoPage, function(req, res, next){
  res.sendfile('public/views/arduino/sensores/index.html', { user: req.user });
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

app.get('/schroeder/sensores', naoAutenticado, sensor.findAll)

app.get('/schroeder/configuracoes', sensor.getConfiguracoes)

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

app.put('/schroeder/sensor/:id', naoAutenticado, function(req, res, next){
  db.Sensor.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      db.Client.find({ where: { password: req.body.password } }).success(function(entityUser) {
        if (entityUser) {
          var _log;
          if(!entity.status){
            _log = { ClientId: entityUser.id, descricao: entity.on };
          }else{
            _log = { ClientId: entityUser.id, descricao: entity.off };
          }
          entity.status = !entity.status;
          entity.updateAttributes(entity).success(function(entity) {
            db.Log.create(_log).success(function(entityLog) {
              io.emit('new-log', entityLog, entityUser);
              res.json({ error: 0, message: "Salvo com sucesso!", entity: entity })
            });
          })
        } else {
          res.send({ error: 2, message: "Usuário não cadastrado!" })
        }
      });
    } else {
      res.send({ error: 2, message: "Sensor não cadastrado!" })
    }
  })
});

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
  db.Sensor.find({ where: { id: req.param('idSensor') } }).success(function(entity) {
    if (entity) {
      db.Client.find({ where: { password: req.param('password') } }).success(function(entityUser) {
        if (entityUser) {
          var _log;
          if(!entity.status){
            _log = { ClientId: entityUser.id, descricao: entity.on };
          }else{
            _log = { ClientId: entityUser.id, descricao: entity.off };
          }
          entity.status = !entity.status;
          entity.updateAttributes(entity).success(function(entity) {
            db.Log.create(_log).success(function(entityLog) {
              io.emit('new-log', entityLog, entityUser);
              db.Sensor.findAll().success(function(entities) {
                var retorno = "";
                for(var i = 0; i < entities.length; i++){
                  retorno = retorno + entities[i].id + "-" + entities[i].status + ";";
                }
                res.json('<' + retorno + '>')
              })
            });
          })
        } else {
          res.send({ error: 2, message: "Usuário não cadastrado!" })
        }
      });
    } else {
      res.send({ error: 2, message: "Sensor não cadastrado!" })
    }
  })
});

app.post('/schroeder/users', users.newUser)
app.post('/schroeder/clients', naoAutenticado, client.newClient)
app.post('/schroeder/sensor', naoAutenticado, sensor.newSensor)
app.get('/schroeder/arduinos/:id', naoAutenticado, arduinos.find)
app.post('/schroeder/arduinos', naoAutenticado, arduinos.create)
app.del('/schroeder/arduinos/:id', naoAutenticado, arduinos.destroy)
app.del('/schroeder/users/:id', naoAutenticado, users.destroy)
app.del('/schroeder/clients/:id', naoAutenticado, client.destroy)
app.del('/schroeder/sensor/:id', naoAutenticado, sensor.destroy)


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



