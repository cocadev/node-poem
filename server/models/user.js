'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });


  User.beforeCreate((user, options) => {
    console.log("--> User.beforeCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });

  User.afterCreate((user, options) => {
    console.log("--> User.afterCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });

  return User;
};
