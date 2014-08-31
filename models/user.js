module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
      },
    },
    type: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: false,
      },
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Type)
      }
    }
  })

  return User
}
