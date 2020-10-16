const axios = require('axios');

function rainforestSearch( term ) {


// set up the request parameters
let params = {
  api_key: process.env.RAINFOREST_API_KEY,
  type: "search",
  amazon_domain: "amazon.com",
  search_term: term,
  sort_by: "price_high_to_low"
}

// make the http GET request to Rainforest API
axios.get('https://api.rainforestapi.com/request', { params })
  .then(response => {

    // print the JSON response from Rainforest API
    //console.log( "In RainforestSearch: ", JSON.stringify(response.data, 0, 2));
    console.log( "In RainforestSearch: ", response.data);
   // console.log(JSON.stringify(response.data["search_results"]));

   return (response.data);

  }).catch(error => {
    // catch and print the error
    console.log(error);
  })

}

module.exports = rainforestSearch;