module.exports = function(sequelize, DataTypes) {
  var Arduino = sequelize.define('Arduino', {
    temperature: {
      type: DataTypes.FLOAT,
      validate: {
        notNull: false,
      },
    },
    humidity: {
      type: DataTypes.FLOAT,
      validate: {
        notNull: false,
      },
    },
  })
  return Arduino
}
