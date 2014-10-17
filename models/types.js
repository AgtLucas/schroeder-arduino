module.exports = function(sequelize, DataTypes) {
  var Type = sequelize.define('Type', {
    nome: {
      type: DataTypes.STRING
    },
    codigo: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Type.hasMany(models.User)
      }
    }
  })
  return Type
}
