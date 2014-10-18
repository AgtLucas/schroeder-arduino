var db = require('../models')

exports.findAll = function(req, res, next) {
  db.Log.findAll({ include: [ db.User ], limit: 100 }).success(function(entities) {
    res.json(entities)
  })
}
