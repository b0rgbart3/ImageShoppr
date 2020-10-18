import React, { useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
import API from "../../utils/API";
import {
  ENTER_URL,
  ADD_SEARCH_DETAIL,
  STOP_LOADING,
  GET_PREVIOUS_SEARCHES,
  SEARCH_SAVED,
} from "../../utils/actions";
import { useShopprContext } from "../../utils/GlobalState";
import "./searchComponent.css";
// import loader from "../../assets/loader.gif";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function SearchComponent() {
  const [state, dispatch] = useShopprContext();
  const imageUrl = useRef();
  const history = useHistory();
  // const [searchHistory, setSearchHistory] = useState();
  const { addToast } = useToasts();
 // let enteredURL = "";

  useEffect(() => {
    if (state.User && state.User.id) {
      API.getSearchHistory(state.User.id)
        .then((response) => {
          console.log(response.data);
          dispatch({
            type: GET_PREVIOUS_SEARCHES,
            previousSearches: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // useEffect(() => {}, [state.PreviousSearches]);

  function handleFormSubmit(event) {
    event.preventDefault();

    if (imageUrl.current.value && imageUrl.current.value != "") {
      console.log("Image url passed: ", imageUrl.current.value);

      let presets = ["bedroom", "workspace"];
      let validImage = false;

      if (presets.includes(imageUrl.current.value)) {
        validImage = true;
      } else {
      //  let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/;
        let regex = /(http(s?):)*\.(?:jpg|png)/;


        if (imageUrl.current.value.match(regex)) {
          validImage = true;
          console.log("Looks valid.");
         // enteredURL = imageUrl.current.value;
        }
      }

      if (validImage) {
         dispatch({ type: ENTER_URL, url: imageUrl.current.value });
         imageUrl.current.value = "";
        
      } else {
        addToast(`Please enter a url that ends in .jpg or .png`, {
          appearance: "info",
          autoDismiss: false,
        });
      }
    }
  }

  function analyze() {

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

  function showResult(searchObj) {
    dispatch({ type: ADD_SEARCH_DETAIL, newSearch: searchObj });
    dispatch({ type: SEARCH_SAVED, searchSaved: true });
    history.push("/result");
  }

  return (
    <div className="searchpage">

{ state.has_url ? (     <div><div className='usersImageContainer group'>
      <img src={state.CurrentSearch.image_url}/>
      
      </div>
      <div className='pillButton analyze' onClick={analyze}>
      Analyze this Image
      <div className="material-icons" id='analyzeIcon'>
                search
              </div>
      </div>
      </div>
 
      
      
      ) : (
        
        <div className="container center wrapper">
        <div className="row  ">
          <form onSubmit={handleFormSubmit} id="searchForItem">
            <div id="urlInput">
              <input
                id="searchField"
                type="search"
                ref={imageUrl}
                placeholder="Search by image URL"
                required
              ></input>

              <div className="material-icons black-text" id="searchIcon">
                search
              </div>
              <div className="material-icons" id="closeIcon">
                close
              </div>
            </div>

          </form>
          <h1 className="description">Enter an image url.</h1>
        </div>

      </div>
        
        
        )}



            {/* <PreviousSearches /> */}
    </div>
  );
}

export default SearchComponent;
