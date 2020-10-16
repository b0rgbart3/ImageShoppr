const axios = require('axios');

//  api_key: process.env.RAINFOREST_API_KEY,
// set up the request parameters
let params = {
  api_key: "8AEA97E594DD4BCBBD393DB606E24152",
  type: "search",
  amazon_domain: "amazon.com",
  search_term: "loveseat",
  sort_by: "price_high_to_low"
}

// make the http GET request to Rainforest API
axios.get('https://api.rainforestapi.com/request', { params })
  .then(response => {

    // print the JSON response from Rainforest API
    console.log( "In RainforestSearch: ", JSON.stringify(response.data, 0, 2));

    console.log(JSON.stringify(response.data["search_results"]));

   return (response.data);

  }).catch(error => {
    // catch and print the error
    console.log(error);
  })


