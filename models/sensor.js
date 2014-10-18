module.exports = function(sequelize, DataTypes) {
  var Sensor = sequelize.define('Sensor', {
    nome: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    statusOn: {
      type: DataTypes.STRING
    },
    statusOff: {
      type: DataTypes.STRING
    },
    on: {
      type: DataTypes.STRING
    },
    off: {
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      associate: function(models) {
        Sensor.belongsTo(models.User, { as: "usuario"});
      }
    }
  })

  return Sensor
}
