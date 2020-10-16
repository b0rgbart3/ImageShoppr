const db = require("../models");
const passport = require("passport");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const vision = require("@google-cloud/vision");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const pluralize = require("pluralize");

const staticProducts = ["bed", "bicycle", "bicyclewheel", "chair", "couch", "desk", "lamp", "laptop", "lighting", "loveseat", "pictureframe", "table" ];

async function extractObjectFromImageURL(url) {
  // [START vision_localize_objects_gcs]
  // Imports the Google Cloud client libraries

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  const gcsUri = url.imageUrl;
  const [result] = await client.objectLocalization(gcsUri);
  console.log(result, result.localizedObjectAnnotations);
  const objects = result.localizedObjectAnnotations;
  objects.forEach((object) => {
    console.log(`Name: ${object.name}`);
    console.log(`Confidence: ${object.score}`);
    const veritices = object.boundingPoly.normalizedVertices;
    veritices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
  });
  // [END vision_localize_objects_gcs]
  const objectNames = objects.map((object) => object.name);
  return objectNames;
}

// Defining methods for the booksController
module.exports = {
  create: function (req, res) {
    console.log("In side the controller create: ", req.body);
    // res.end("In the create route in the controller.");
    db.User.create({
      email: req.body.email.toLowerCase(),
      username: req.body.email.toLowerCase(),
      password: req.body.password,
    })
      .then(function (newUser) {
        console.log("In the then method of the controller create: ", newUser);

        // res.redirect("/login");
        // Why does this redirect not work??
        res.json(newUser);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },

  findFriend: function (req, res) {
    console.log("In the controller - finding Friend: ", req.body.searchTerm);
    db.User.findAll({
      where: {
        email: {
          [Op.like]: "%" + req.body.searchTerm.toLowerCase() + "%",
        },
      },
    })
      .then(function (foundUser) {
        //console.log("In the then method of the findFriend method in the controller: ", foundUser);
        res.json(foundUser);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  },

  addFriend: function (req, res) {
    console.log("In the controller, about to add a friend: ", req.body);

    db.Friend_Connection.create({
      UserId: req.body.User,
      FriendId: req.body.Friend,
    }).then((response) => {
      res.json(response);
    });
  },

  getFriends: function (req, res) {
    // console.log("Inside controller getFriends>>>>>", req.params.id);
    if (req.params && req.params.id) {
      // Post.find({ where: { ...}, include: [User]})

      //db.User.findAll({where: { }})

      // db.Friend_Connection.findAll({
      //   // where: { user_id: req.params.id },
      //   include: [{
      //     model: db.User,
      //     as: 'Friends'
      //   }  ]})

      db.Friend_Connection.findAll({
        raw: true,
        where: { UserId: req.params.id },
      })

        .then((response) => {
          //  console.log("In Controller, getting friends:", response);
          let friendListId = [];
          for (let elem of response) {
            // console.log(elem);
            friendListId.push(elem.FriendId);
          }

          //friendListId = new Set([...friendListId]);
          //  console.log(friendListId);
          db.User.findAll({
            raw: true,
            where: {
              id: {
                [Op.in]: friendListId,
              },
            },
          }).then((friendResponse) => {
            //  console.log('Received response of friend detail from user table>>>>>>>>> ', friendResponse);
            res.json(friendResponse);
          });
        })
        .catch((err) => console.log(err));
    } else {
      res.end();
    }
  },

  getFriendsSearches: function (req, res) {
    let friendsSearches = [];

    let friendsIds = req.body.friendsIds;
    let item = req.body.item;

    // based on the user and the item, first get a list of their friends,
    // and then search through their friends searches to look for matching items
     console.log("In FriendsSearches in the controller: friendIds:", friendsIds,item);
            db.Product.findAll({

              raw:true,
              where: {
                [Op.and]: [
                  {UserId: {
                    [Op.in]: friendsIds,
                  }},
                  {itemName: item}
                ]
              }
              
            }).then((friendProducts) => {
              
              res.json(friendProducts);


            })
        .catch((err) => console.log(err));


  },

  saveSearch: function (req, res) {
    // data like : {UserId:'',image_url:'',itemNames: []}
    db.Search.create({
      image_url: req.body.data.image_url,
      UserId: req.body.data.UserId,
    }).then(function (newSearch) {
      // get searchId
      let searchId = newSearch.get({ plain: true }).id;
      let bulkCreateArr = [];
      for (let i = 0; i < req.body.data.itemNames.length; i++) {
        let itemObj = {
          SearchId: searchId,
          name: req.body.data.itemNames[i],
        };
        bulkCreateArr.push(itemObj);
      }
      db.Item.bulkCreate(bulkCreateArr, {
        returning: true,
      })
        .then(function (afterSave) {
          res.json(afterSave);
        })
        .catch((err) => {
          res.status(404).json({ err: err });
        });
    });
  },

  getSearchHistory: function (req, res) {
    let userId = req.params.userId;
    db.Search.findAll({
      raw: true,
      where: {
        UserId: userId,
      },
    })
      .then((searchRes) => {
        let responseJSON = [];
        let searchIdArr = searchRes.map((search) => search.id);
        db.Item.findAll({
          raw: true,
          where: {
            SearchId: {
              [Op.in]: searchIdArr,
            },
          },
        })
          .then((itemRes) => {
            for (let i of searchRes) {
              let searchObj = {
                image_url: "",
                items: [],
              };
              searchObj.image_url = i.image_url;
              let filterItems = itemRes.filter((item) => {
                return item.SearchId === i.id;
              });
              searchObj.items = filterItems.map((item) => item.name);
              responseJSON.push(searchObj);
            }
            //console.log("response after getting all search data", responseJSON);
            res.json(responseJSON);
          })
          .catch((err) => res.status(404).json({ err: err }));
      })
      .catch((err) => {
        res.status(404).json({ err: "No search history!" });
      });
  },

  getHello: function (req, res) {
    console.log("In the GetHello Route of the controller");
    res.end("Got to the GetHello route.");
  },

  // login: function (req, res) {

  //   console.log("In the controller, login route: ", req.body);

  //   passport.authenticate("local"), function (req, res) {
  //       console.log("After the passport authentication: ", req.body);
  //       res.json(req);
  //   };

  // router.post("/login", passport.authenticate("local"), function(req, res) {
  //     res.json(req.user);
  //   });

  // res.json(req.user);
  // db.User.findOne({ email: req.body.email })
  // },

  extractFromUrl: async function (req, res) {
    //console.log("Extract from Url in the controller: ", req.body);

    // tobe removed : faking data
    if (req.body.imageUrl == "bedroom") {
      //console.log(">>>>> here inside bedroom");
      // "https://cloud.google.com/vision/docs/images/bicycle_example.png",
      let bedroom = {
        image_url:
        "https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2018/03/Discover-the-Ultimate-Master-Bedroom-Styles-and-Inspirations-6_1.jpg",
         
        items: ["Bed", "Lamp", "Desk", "Picture frame"],
      };
      res.json(bedroom);
    } else if (req.body.imageUrl == "workspace") {
      let workspace = {
        image_url:
          "https://www.invaluable.com/blog/wp-content/uploads/2018/05/workspace-hero.jpg",
        items: ["Table", "Lamp", "Desk", "Laptop"],
      };
      res.json(workspace);
    } else {
      extractObjectFromImageURL(req.body)
        .then((gvResponse) => {
  
          let responseObj = {
            image_url: req.body.imageUrl,
            items: gvResponse,
          };
          res.json(responseObj);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ err: "Image not found!" });
        });

    }
  },
  getProducts: function (req, res) {
    if (!req.params.item) {
      res.end({error:"undefined search query"});
    }
    let item = req.params.item.toLowerCase();

    // take the spaces out and convert to a singluar version
    item = pluralize.singular(item.replace(/\s/g, ''));

 //   console.log("In Controller getProducts: item:", item);

    if (staticProducts.includes(item)) {
    //  console.log("About to load the static json file: ", item+".json");

      const staticFolder = path.resolve(__dirname, "../rainforest_sample_data");

     // console.log("staticFolder: ", staticFolder);
     // console.log("file: ", path.resolve(staticFolder, "static_" + item + ".json"));

      fs.readFile(path.resolve(staticFolder, "static_" + item + ".json"), "utf-8",
      (err, data) => { 

        if (err) { 
          console.log(err); 
          res.status(404).json({err: err});
      
      } else{
          console.log(data); 
          res.end(data);
        }
        
     }) 

      // fs.readFile(path.resolve(staticFolder, "static_" + item + ".json"))
      //   .then((results) => {
      //     res.json(results);
      //   })
      //   .catch((err) => console.log(err));
    } else {


      console.log(
        "Here we will actually call the rainforest API, to get " +
          item +
          " products"
      );

      let params = {
        api_key: process.env.RAINFOREST_API_KEY,
        type: "search",
        amazon_domain: "amazon.com",
        search_term: item,
        sort_by: "price_high_to_low"
      }
      
      // make the http GET request to Rainforest API
      axios.get('https://api.rainforestapi.com/request', { params })
        .then(response => {


      //  axios.get("/api/getRainForest/" + item)
      //  .then( (response) => {

   //    console.log("back from Rainforest...", response.data.search_results);
       res.json(response.data.search_results);
      }).catch(err =>console.log(err));
    }
  },

  saveProducts: function(req,res){
    let dataFromClient = req.body.data;
    db.Product.create(dataFromClient)
    .then((productRes)=>{
      console.log("Saved data in products table: ",productRes)
      res.json(productRes);
    })
    .catch(err =>{
      res.status(404).json({err:err});
    })
  }

  // extractObjectFromImage: async (req, res) => {
  //   try {
  //     console.log("In the Extract Object From Image method of the Controller.");
  //     console.log(Object.keys(req));
  //     console.log(req.body);

  //     if (req.file == undefined) {
  //     //if (req.file == undefined) {
  //       return res.send(`You must select a file.`);
  //     }

  //     //test
  //     fs.writeFileSync(
  //       "../"+__dirname + "/Assets/" + "abc",
  //             req.body
  //           );

  //   //   Image.create({
  //   //     type: req.file.mimetype,
  //   //     name: req.file.originalname,
  //   //     data: fs.readFileSync(
  //   //       __basedir + "/resources/static/assets/uploads/" + req.file.filename
  //   //     ),
  //   //   }).then((image) => {
  //   //     fs.writeFileSync(
  //   //       __basedir + "/resources/static/assets/tmp/" + image.name,
  //   //       image.data
  //   //     );

  //   //     return res.send(`File has been uploaded.`);
  //   //   });
  //   } catch (error) {
  //     console.log(error);
  //     return res.send(`Error when trying upload images: ${error}`);
  //   }

  // }
  //   findAll: function(req, res) {
  //     db.Book
  //       .find(req.query)
  //       .sort({ date: -1 })
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },

  // Right now we don't yet need a find by ID request

  //   findById: function(req, res) {
  //     db.Book
  //       .findById(req.params.id)
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },
  //   create: function(req, res) {
  //     db.Book
  //       .create(req.body)
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },

  // right now we don't need an update request

  //   update: function(req, res) {
  //     db.Book
  //       .findOneAndUpdate({ _id: req.params.id }, req.body)
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },
  //   remove: function(req, res) {
  //     db.Book
  //       .findById({ _id: req.params.id })
  //       .then(dbModel => dbModel.remove())
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   }
};
