var db = require('../models')

exports.findAll = function(req, res, next) {
  db.Sensor.findAll().success(function(entities) {
    res.json(entities)
  })
}

exports.find = function(req, res, next) {
  db.Sensor.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.newSensor = function(req, res, next) {
  db.Sensor.find({ where: { nome: req.body.nome } }).success(function(entity) {
    if (entity) {
      res.send({ error: 2, message: "Usuário já cadastrado!" })
    } else {
      var sensor = req.body;
      sensor.status = false;
      db.Sensor.create(sensor).success(function(entity) {
        res.json({ error: 0, message: "Salvo com sucesso!" })
      }).error(function(error, e){
      });
    }
  })
}

exports.getConfiguracoes = function(req, res, next) {
  db.Sensor.findAll().success(function(entities) {
    var retorno = "";
    for(var i = 0; i < entities.length; i++){
      retorno = retorno + i + "-" + entities[i].status + ";";
    }
    res.json('<' + retorno + '>')
  })
}

exports.update = function(req, res, next) {
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
          console.log(_log);
          entity.updateAttributes(entity).success(function(entity) {
            db.Log.create(_log).success(function(entityLog) {
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
}

exports.destroy = function(req, res, next) {
  db.Sensor.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}
