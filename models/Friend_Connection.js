module.exports = function(sequelize, DataTypes) {
    var Friend_Connection = sequelize.define("Friend_Connection", {
 
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,      
      // },
      // friend_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // }
    });

    Friend_Connection.associate = function(models) {

      Friend_Connection.belongsTo(models.User, { as: 'User', onDelete: 'CASCADE' });
      
      Friend_Connection.belongsTo(models.User, { as: 'Friend', onDelete: 'CASCADE' });
      
    };

  //   Friend_Connection.belongsTo(
  //     models.User, { onDelete: "CASCADE" });
  // };

  return Friend_Connection;
};
