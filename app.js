var express        = require('express')
  , cors           = require('cors')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')

  , arduinos = require('./routes/arduino')
  , types = require('./routes/type')
  , users = require('./routes/user')
  , login = require('./routes/login')

var app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}

app.get('/home', function(req, res){
  res.sendfile('public/home.html');
});

app.get('/schroeder/arduinos', arduinos.findAll)
app.get('/schroeder/arduinos/:id', arduinos.find)
app.post('/schroeder/arduinos', arduinos.create)
app.get('/schroeder/create', arduinos.createGet)
app.put('/schroeder/arduinos/:id', arduinos.update)
app.del('/schroeder/arduinos/:id', arduinos.destroy)

app.get('/schroeder/users', users.findAll)
app.get('/schroeder/users/:id', users.find)
app.post('/schroeder/users', users.newUser)
app.put('/schroeder/users/:id', users.update)
app.del('/schroeder/users/:id', users.destroy)

app.post('/schroeder/login', login.logar)
app.post('/schroeder/isLogin', login.isLogin)

db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
