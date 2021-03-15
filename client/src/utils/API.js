import axios from "axios";

export default {
    checkIfUrlWasAlreadyAnalyzed: function(imageUrl) {
        console.log('checking: ', imageUrl);
        return axios.get("/api/searches?url="+imageUrl);
    },
    createNewUser: function(User) {
        console.log("In the API: ", User);
        return axios.post("/api/signup", User);
    },
    login: function(User) {
        console.log("In the client side API, logging in user: ", User)
        return axios.post("/api/login/", User )
    },
    // extract: function(image){
    //     return axios.post("/api/extract",image);
    // },
    extractUrl: function(imageUrl) {
        console.log("extractUrl: ", imageUrl);
      

        return axios.post("/api/extractUrl", {imageUrl:imageUrl});
    },
    logout: function() {
        return axios.get("/api/logout");
    },
    searchStore: function(lattitude,longitude,kw){
        //find places nearby
    let radius = "radius=5000";
    let type = "type=store";
    let keyword = `keyword=${kw}`;
    let apiKey = `key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
        return axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lattitude},${longitude}&${radius}&${type}&${keyword}&${apiKey}`);
    },
    getFriends: function(UserId) {

        return axios.get("/api/getfriends/"+UserId);

    },
    searchForFriend: function(searchTerm) {
        console.log("About to post using axios to search for a friend, searchTerm: ", searchTerm);
        return axios.post("/api/searchforfriend", {searchTerm: searchTerm});
    },
    addFriend: function( {User, Friend}) {
        let connection = {User:User.id, Friend: Friend.id}
        console.log("Sending a post request to add a friend: ", connection);
        return axios.post("/api/addfriend", connection);
    },
    getItems: function(searchId) {
        console.log("Getting items for searchID: ", searchId);
        return axios.get("/api/itemsBySearchId?searchId="+searchId);
    },
    getFriendsSearches: function( { friendsIds, item }) {
        console.log( "{friendsIds:", friendsIds,", item:,",item,"}");
        return axios.post("/api/getfriendssearches", {friendsIds:friendsIds, item:item});
    },

    getSearchHistory: function(userId){
        return axios.get("/api/getSearchHistory/"+userId)
    },

    saveSearch: function(payload){
        return axios.post("/api/saveSearch",{data:payload});
    },
    getProducts: function( item ) {
        return axios.get("/api/getproducts/" + item);
    },
    saveProducts: function(payload) {
        return axios.post("/api/saveProducts",{data:payload});
    }
};
