var db = require('../models')

exports.logar = function(req, res) {
  db.User.find({ where: { email: req.body.email, password: req.body.password } }).success(function(entity) {
    if (entity) {
      res.json({ success: 1})
    } else {
      res.json({ error: "Usuário inválido!"})
    }
  })
}

exports.isLogin = function(req, res) {
  res.json({ success: 1})
}