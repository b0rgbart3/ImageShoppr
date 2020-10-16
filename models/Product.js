
module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,      
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      purchase_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
   
    });
  
    Product.associate = function(models) {
  
      Product.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });

      };
  
  
  return Product;
  
  };
  
  