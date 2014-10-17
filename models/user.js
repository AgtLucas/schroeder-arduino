module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Type)
        User.hasMany(models.Log)
      }
    }
  })

  return User
}
