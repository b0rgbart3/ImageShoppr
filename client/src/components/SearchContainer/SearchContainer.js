import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {
  ADD_SEARCH_DETAIL,
  LOADING,
  STOP_LOADING,
  GET_PREVIOUS_SEARCHES,
  SEARCH_SAVED,
} from "../../utils/actions";
import { useShopprContext } from "../../utils/GlobalState";
import SearchContainerS from "../SearchContainer/searchContainer.css";
import loader from "../../assets/loader.gif";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function SearchContainer() {
  const [state, dispatch] = useShopprContext();
  const imageUrl = useRef();
  const history = useHistory();
  const [searchHistory, setSearchHistory] = useState();
  const { addToast } = useToasts();

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
  useEffect(() => {
  }, [state.PreviousSearches]);
  function handleFormSubmit(event) {
    event.preventDefault();

    if (imageUrl.current.value && imageUrl.current.value != "") {
      console.log("Image url passed: ", imageUrl.current.value);

      let presets = ["bedroom", "workspace"];
      let validImage = false;

      if (presets.includes(imageUrl.current.value)) {
        validImage = true;
      } else {
        let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/;

        if (imageUrl.current.value.match(regex)) {
          validImage = true;
        }
      }

      if (validImage) {
        dispatch({ type: LOADING });

        API.extractUrl(imageUrl.current.value)
          .then((res) => {
            console.log("here is the image uploaded res", res);
            dispatch({ type: ADD_SEARCH_DETAIL, newSearch: res.data });
            imageUrl.current.value = "";

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
      } else {
        addToast(`Please enter a url that ends in .jpg or .png`, {
          appearance: "info",
          autoDismiss: false,
        });
      }
    }
  }

  function showResult(searchObj) {
    dispatch({ type: ADD_SEARCH_DETAIL, newSearch: searchObj });
    dispatch({ type: SEARCH_SAVED, searchSaved: true });
    history.push("/result");
  }

  return (
    <div>
    <div className="container center wrapper">
      <div className="row  ">
        <div className="col s12 l6">
          {/* {state.loading ? <img src={loader}></img> :
            <form onSubmit={handleFormSubmit}>
              <label>Image Url:</label>
              <input className="white-text" ref={imageUrl} />
              <button type="submit" className="btn #00b0ff light-blue accent-3">
                Submit
              </button>
            </form>
          } */}
          <div id="searchForItem" class="searchCont">
            <nav id="searchForItem">
              <div class="nav-wrapper" id="searchForItem ">
                <form onSubmit={handleFormSubmit} id="searchForItem">
                  <div class="input-field " id="searchForItem ">
                    <input
                      id="searchForItem"
                      className="white"
                      type="search"
                      ref={imageUrl}
                      placeholder='Search by image URL'
                      required
                    ></input>
                    <label class="label-icon" for="search">
                      <i class="material-icons black-text">search</i>
                    </label>
                    <i class="material-icons">close</i>
                  </div>
                </form>
              </div>
            </nav>
          </div>
        </div>
        <div className="col s12 l6">
          <h1 className="description white-text">
            Search for an image by url<span id="period">.</span>
          </h1>
        </div>
      </div>
      {state.PreviousSearches && state.PreviousSearches.length> 0?
      <div className="newWrap">
        <div className="row">
          <div className="col s12 l6">
            <h3 className="text-white Bold">Previous Searches</h3>
          </div>
        </div>
        <div className="row search-display">
          <div className="col s12 l6">
            <div className="flex-diaplay">
              {state.PreviousSearches
                ? state.PreviousSearches.map((search, index) => {
                    return (
                      <div className="space">
                        <div key={index} onClick={() => showResult(search)}>
                          <div className="image-container">
                            <img
                              src={search.image_url}
                              style={{ width: 200 }}
                            ></img>
                          </div>
                          <div className="black-text Bold">{search.items}</div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div> 
      : <div></div>}
    </div>
     {/* test carousel */}
     {/* <div className='container'>
     <CarouselContainer data={state.PreviousSearches}></CarouselContainer>
     </div> */}
     </div>
  );
}

export default SearchContainer;
