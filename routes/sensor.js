var db = require('../models');
var sequelize = require('sequelize');

exports.findAll = function(req, res, next) {
  db.Sensor.findAll({ include: [ { model: db.User, as: "usuario" } ], where: { usuarioId: req.user.id } }).success(function(entities) {
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
      res.send({ error: 2, message: "Sensor já cadastrado!" })
    } else {
      var sensor = req.body;
      sensor.status = false;
      sensor.usuarioId = req.user.id;
      db.Sensor.create(sensor).success(function(entity) {
        res.json({ error: 0, message: "Salvo com sucesso!" })
      }).error(function(error, e){
      });
    }
  })
}

exports.getConfiguracoes = function(req, res, next) {
  db.Token.find({ where: { token: req.param('token') }}).success(function(entity) {
    if(entity){
      db.Sensor.findAll({ where: { usuarioId: req.user.id } }).success(function(entities) {
        var retorno = "";
        for(var i = 0; i < entities.length; i++){
          retorno = retorno + entities[i].id + "-" + entities[i].status + ";";
        }
        res.json('<' + retorno + '>')
      })
    }else{
      res.json("");
    }
  });
}

exports.destroy = function(req, res, next) {
  db.Acao.destroy({ where:
    sequelize.or( { "sensorOrigemId": req.param('id') },
    sequelize.or( { "sensorDestinoId": req.param('id') }))
  }).success(function(){
    db.Sensor.find({ where: { id: req.param('id') } }).success(function(entitySensor) {
      if (entitySensor) {
        entitySensor.destroy().success(function() {
          res.send(204)
        })
      } else {
        res.send(404)
      }
    })
  });
}