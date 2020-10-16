const express = require("express");
require('dotenv').config();
const routes = require("./routes");
// for integrating app with google AI Vision localized Object
const vision = require('@google-cloud/vision');
const fs = require('fs');
const bodyParser = require('body-parser')

const axios = require('axios');
const rainforestSearch = require("./scripts/rainforest_search");

global.__basedir = __dirname;

// For saving session data as cookies
var session = require("express-session");
// Requiring passport as we've configured it
// This is authentication middlewear
var passport = require("./config/passport");
var db = require("./models");

const PORT = process.env.PORT || 3001;

// This is our Express App creation
const app = express();
//app.use(bodyParser({limit: '50mb'}));


// Define middleware here
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({
//   json: {limit: '50mb', extended: true},
//   urlencoded: {limit: '50mb', extended: true}
// }));

app.use(express.json());


// bodyParser = {
//   json: {limit: '50mb', extended: true},
//   urlencoded: {limit: '50mb', extended: true}
// };


// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

// Configure Passport-- for authentication (only required on certain components)
// Initializing our passport middlewear
app.use(passport.initialize());
// using passport to create a session
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get("/api/getRainForest/lamp", function(req,res) {
  let params = {
    api_key: process.env.RAINFOREST_API_KEY,
    type: "search",
    amazon_domain: "amazon.com",
    search_term: "lamp",
    sort_by: "price_high_to_low"
  }
  
  // make the http GET request to Rainforest API
  axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {
  
      // print the JSON response from Rainforest API
      //console.log( "In RainforestSearch: ", JSON.stringify(response.data, 0, 2));
      console.log( "In RainforestSearch: ", response.data);
     // console.log(JSON.stringify(response.data["search_results"]));
  
     res.json(response.data);
  
    }).catch(error => {
      // catch and print the error
      console.log(error);
    })
  
});

// Here are our Routes
app.use(routes);

//Logic to connect to Google AI
async function extractObjectFromImageBlob() {
  // pass image path here
  const client = new vision.ImageAnnotatorClient();
  const gcsUri = `./Assets/test.jpg`;

  //const gcsUri = `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSbh3pPT5LZ--CNMCgz0vMJp4_d-yernWmHRA&usqp=CAU`;

  const [result] = await client.objectLocalization(gcsUri);
  const objects = result.localizedObjectAnnotations;
  objects.forEach(object => {
    console.log(`Name: ${object.name}`);
    console.log(`Confidence: ${object.score}`);
    const veritices = object.boundingPoly.normalizedVertices;
    veritices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
  });
}



// For test
//extractObjectFromImageURL();

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ logging: false}).then(() => {
 console.log("Sequelize Database Logging has been turned off.");
});

// Start our Node APP 
app.listen(PORT, () => {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});




