module.exports = function(sequelize, DataTypes) {
  var Type = sequelize.define('Type', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
      },
    },
    codigo: {
      type: DataTypes.STRING,
      validate: {
        notNull: false,
      },
    }
  }, {
    classMethods: {
      associate: function(models) {
        Type.belongsTo(models.User)
      }
    }
  })
  return Type
}
