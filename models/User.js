var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 35],
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associate = function (models) {

    User.belongsToMany(models.User, { through: 'Friend_Connection', as: 'Users', foreignKey: 'UserId', otherKey: 'id' });
    User.belongsToMany(models.User, { through: 'Friend_Connection', as: 'Friends', foreignKey: 'FriendId', otherKey: 'id' });

    User.hasMany(models.Search, {
      onDelete: "cascade"
    })


    User.hasMany(models.Product, {
      onDelete: "cascade"
    });

  };


  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
