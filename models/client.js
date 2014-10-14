module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    nome: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Client.hasMany(models.Log)
      }
    }
  })

  return Client
}
