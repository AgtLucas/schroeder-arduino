var db = require('../models')

exports.findAll = function(req, res) {
  db.Balduino.findAll().success(function(entities) {
    res.json(entities)
  })
}

exports.find = function(req, res) {
  db.Balduino.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.create = function(req, res) {
  db.Balduino.create(req.body).success(function(entity) {
    res.statusCode = 201
    res.json(entity)
  })
}

exports.createGet = function(req, res) {
  var medida = {
    id: "",
    temperature: req.param('temperatura'),
    humidity: req.param('humidade'),
    createdAt: new Date(),
    updateAt: new Date(),
  };
  db.Balduino.create(medida).success(function(entity) {
    res.statusCode = 201
    res.json(entity)
  })
}

exports.update = function(req, res) {
  db.Balduino.find({ where: { id: req.param('id') } }).success(function(entity) {
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
  db.Balduino.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}
