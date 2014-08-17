module.exports = function(sequelize, DataTypes) {
  var Balduino = sequelize.define('Balduino', {
  
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

  return Balduino
}
