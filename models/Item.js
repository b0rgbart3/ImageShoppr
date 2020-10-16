
module.exports = function (sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    // image_url: {
    //   type: DataTypes.STRING
    // },
    // purchase_url: {
    //   type: DataTypes.STRING
    // },
    // price: {
    //   type: DataTypes.FLOAT
    // }

  });

  Item.associate = function (models) {

    Item.belongsTo(models.Search, {
      foreignKey: {
        allowNull: false
      }
    });

  };


  return Item;

};

