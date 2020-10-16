 var faker = require('faker');
 var db = require("../models");

 const numberOfFakeAccounts = 40;

 // Force: True - tells Sequelize to go ahead and drop the table and create
 // a new one.

 db.sequelize.sync({force:true}).then(() => {
 
        // Create an array of fake account data
        let UserObjects = [];
        for (var i =0; i < numberOfFakeAccounts; i++) {

            let UserObject = {
                email: faker.internet.email().toLowerCase(),
                username: faker.name.findName(),
                password: faker.internet.password(),
                avatar: faker.image.avatar()
            }
            UserObjects.push(UserObject);
        }

        // create accounts for the authors of the app
        UserObjects.push({email:"b0rgBart3@gmail.com",username:"Bart", password: "testingthis", avatar:"https://avatars2.githubusercontent.com/u/11444811?s=460&u=5f7281a980df5bf0fa4c63b299e413c319272fb1&v=4"});
        UserObjects.push({email:"shambhawi.kumari1393@gmail.com",username:"Shambhawi", password: "testingthis", avatar:"https://avatars0.githubusercontent.com/u/39311730?s=460&u=bc9057d7e5d80d6aae4cd60a39895e6441fc9d1f&v=4"});
        UserObjects.push({email:"djvdjv209@gmail.com",username:"Daniel", password: "testingthis", avatar:"https://avatars1.githubusercontent.com/u/58536143?s=460&u=3581c3e9c1eb4b1118bd5a1b41d787c3fde31e48&v=4"});

        // Enter the Fake Accounts into the Sql Database
        UserObjects.forEach( user => {

            db.User.create({
                email: user.email.toLowerCase(),
                username: user.username,
                password: user.password,
                avatar: user.avatar,
            })
                .then(function (newUser) {
                console.log("created: ", newUser);
                })
                .catch(function (err) {
                console.log(err);
                });
    
            
        })

       return;
    
  });


