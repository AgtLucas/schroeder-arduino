var db = require('../models')

exports.findAll = function(req, res) {
  db.User.findAll().success(function(entities) {
    res.json(entities)
  })
}

exports.find = function(req, res) {
  db.User.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.newUser = function(req, res) {
  db.User.find({ where: { email: req.body.email } }).success(function(entity) {
    if (entity) {
      res.json({ error: "Usuário já cadastrado!"})
    } else {
      var usuario = req.body;
      usuario.type = "1";
      db.User.create(usuario).success(function(entity) {
        res.statusCode = 201
        res.json(entity)
      })
    }
  })
}

exports.update = function(req, res) {
  db.User.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.updateAttributes(req.body).success(function(entity) {
        res.json(entity)
      })
    } else {
      res.send(404)
    }
  })
}

exports.destroy = function(req, res) {
  db.User.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}
