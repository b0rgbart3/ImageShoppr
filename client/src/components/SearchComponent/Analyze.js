import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { useShopprContext } from "../../utils/GlobalState";
import {
    ENTER_URL,
    ADD_SEARCH_DETAIL,
    STOP_LOADING,
    GET_PREVIOUS_SEARCHES,
    SEARCH_SAVED,
  } from "../../utils/actions";
  import { useToasts } from "react-toast-notifications";


  function Analyze() {
    const history = useHistory();
    const [state, dispatch] = useShopprContext();
    const { addToast } = useToasts();

    API.checkIfUrlWasAlreadyAnalyzed(state.CurrentSearch.image_url)
    .then( (existingSearches) => {

      console.log("Back from the API");
      console.log("Existing Searches: ", existingSearches);


      if (existingSearches && existingSearches.data.length > 0) {
        // We've already searched this url - so let's just grab the info from our own database
        // instead of hitting the Google Vision API again.

        console.log("We have this url stored as a search object in our database:", existingSearches);
        

        // So now we need to build our "fake" results object
        // Start by finding the items associated with this search id
        let existingSearch = existingSearches.data[0];  // lets just take the first one for now
        console.log("About to search for items with search ID of: ", existingSearch.id);



        let items = API.getItems(existingSearch.id)
          .then( (itemsReturned) => {

            console.log("Got These Items: ", itemsReturned);

            if (itemsReturned && itemsReturned.data && itemsReturned.data.length > 0) {

                let existingItemList = itemsReturned.data.map( (item) => item.name);
                console.log('Existing item list: ', existingItemList);
                let fakeSearchObj = {
                  image_url: state.CurrentSearch.image_url,
                  items: existingItemList,
                  basedOnExistingSearch: true
                };

    


                dispatch({ type: ADD_SEARCH_DETAIL, newSearch: fakeSearchObj });
                history.push("/result");
              
          }


          })

      

      } else {

                  API.extractUrl(state.CurrentSearch.image_url)
                            .then((res) => {
                              console.log("here is the image uploaded res", res);


                              // Let's just SAVE ALL THE SEARCHES that are fresh images
                              let thisUserId = 0;
                              if (state.User) {
                                thisUserId = state.User.id;
                              }
                              let payload = {
                                UserId: thisUserId,
                                image_url: state.CurrentSearch.image_url,
                                itemNames: res.data
                              }
                              console.log("payload to save search: ", payload);
                              API.saveSearch(payload)
                                .then((response) => {
                                    console.log("Search saved", response.data);
                                    dispatch({ type: SEARCH_SAVED, searchSaved: true })
                
                                }).catch(err => {
                                    console.log("Save not successfull");
                                })


                                
                              dispatch({ type: ADD_SEARCH_DETAIL, newSearch: res.data });
                            

                              if (res.data && res.data.items && res.data.items.length > 0) {
                                history.push("/result");
                              } else {
                                addToast(
                                  `No results found, please try uploading a clearer image`,
                                  {
                                    appearance: "warning",
                                    autoDismiss: true,
                                  }
                                );
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                              dispatch({ type: STOP_LOADING });
                            });

             }// end else
      }) // end API.checkif....
            
}

export default Analyze;