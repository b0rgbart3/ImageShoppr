import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {
  ENTER_URL,
  ADD_SEARCH_DETAIL,
  LOADING,
  STOP_LOADING,
  GET_PREVIOUS_SEARCHES,
  SEARCH_SAVED,
} from "../../utils/actions";
import { useShopprContext } from "../../utils/GlobalState";
import "./searchComponent.css";
import loader from "../../assets/loader.gif";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function SearchComponent() {
  const [state, dispatch] = useShopprContext();
  const imageUrl = useRef();
  const history = useHistory();
  const [searchHistory, setSearchHistory] = useState();
  const { addToast } = useToasts();
  let enteredURL = "";

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
          enteredURL = imageUrl.current.value;
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
        API.extractUrl(state.CurrentSearch.image_url)
                  .then((res) => {
                    console.log("here is the image uploaded res", res);
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
