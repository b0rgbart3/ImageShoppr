
module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    image_url: {
      type: DataTypes.STRING   
    },
    image_blob: {
      type: DataTypes.BLOB("long") 
    }
  });


    Search.associate = function(models) {

        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Search.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });

        Search.hasMany(models.Item, {
            onDelete: "cascade"
        })
      
    };


return Search;

};

