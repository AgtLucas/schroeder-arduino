var db = require('../models')

exports.findAll = function(req, res, next) {
  db.Log.findAll({ include: [ db.Client ], limit: 100 }).success(function(entities) {
    res.json(entities)
  })
}

exports.find = function(req, res, next) {
  db.Log.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.newLog = function(req, res, next) {
  db.Log.create(req.body).success(function(entity) {
    res.json(1)
  }).error(function(error, e){
    res.json(0)
  });
}

exports.update = function(req, res, next) {
  db.Log.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      db.Log.find({ where: { email: req.body.email } }).success(function(entity) {
        if (entity && entity.id != req.param('id')) {
          res.send({ error: 2, message: "Usuário já cadastrado!" })
        }else{
          entity.updateAttributes(req.body).success(function(entity) {
            res.json({ error: 0, message: "Salvo com sucesso!" })
          })
        }
      });
    } else {
      res.send(404)
    }
  })
}

exports.destroy = function(req, res, next) {
  db.Log.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}
