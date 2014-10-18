var db = require('../models')

exports.findAll = function(req, res, next) {
  db.Log.findAll({ order: 'createdAt DESC', include: [ db.User ], limit: 100 }).success(function(entities) {
    res.json(entities)
  })
}
