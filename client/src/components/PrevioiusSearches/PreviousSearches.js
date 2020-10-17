
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
import "./searchComponent.css";
import loader from "../../assets/loader.gif";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

function PreviousSearches() {
    const [state, dispatch] = useShopprContext();

return  (       
    <div>
     { state.PreviousSearches && state.PreviousSearches.length > 0 ? (
          <div className="newWrap">
            <div className="row">
              <div className="col s12 l6">
                <h3 className="Bold">Previous Searches</h3>
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
                              <div className="black-text Bold">
                                {search.items}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )} 
        </div>

);
}

export default PreviousSearches;
