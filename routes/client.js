var db = require('../models')

exports.findAll = function(req, res, next) {
  db.Client.findAll().success(function(entities) {
    res.json(entities)
  })
}

exports.find = function(req, res, next) {
  db.Client.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.newClient = function(req, res, next) {
  db.Client.find({ where: { nome: req.body.nome } }).success(function(entity) {
    if (entity) {
      res.send({ error: 2, message: "Usuário já cadastrado!" })
    } else {
      var usuario = req.body;
      db.Client.create(usuario).success(function(entity) {
        res.json({ error: 0, message: "Salvo com sucesso!" })
      }).error(function(error, e){
      });
    }
  })
}

exports.update = function(req, res, next) {
  db.Client.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      db.Client.find({ where: { email: req.body.email } }).success(function(entity) {
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
  db.Client.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}
