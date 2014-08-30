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


app.get('/schroeder/arduinos', arduinos.findAll)
app.get('/schroeder/arduinos/:id', arduinos.find)
app.post('/schroeder/arduinos', arduinos.create)
app.get('/schroeder/create', arduinos.createGet)
app.put('/schroeder/arduinos/:id', arduinos.update)
app.del('/schroeder/arduinos/:id', arduinos.destroy)


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
