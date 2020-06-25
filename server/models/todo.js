// const patientModel = require('./patient');
//const model = require('./index');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Todo.beforeCreate((todo, options) => {
    console.log("--> Todo.beforeCreate called");
    console.log("--> Fetching the Patient records from db");
/*
    // patientModel.findAll({})
    model.Patient.findAll({})
      .then(function(todos) {
        console.log("Patient records")
        console.dir(todos)
      })
      .catch(function(error) {
        console.log("Patient records -- Error")
        console.dir(error)
      });
*/
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });

  Todo.afterCreate((todo, options) => {
    console.log("--> Todo.afterCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });

  return Todo;
};
