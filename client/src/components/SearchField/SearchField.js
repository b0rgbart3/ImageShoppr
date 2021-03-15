import React, { useRef} from "react";
//import { useShopprContext } from "../../utils/GlobalState";
import "./searchstyle.css";

function SearchField() {
  // const [state, dispatch] = useShopprContext();
  const imageUrl = useRef();

  function handleFormSubmit(e) {
      console.log("In handle method.");
      e.preventdefault();
      e.stopPropagation();
      console.log("searching for: ", e.target.value);

  }


  return (

        <div className="container center wrapper search">
          <div className="row  ">
            <form onSubmit={handleFormSubmit} id="searchForItem">
              <div id="urlInput">
                <input id="searchField" type="search" ref={imageUrl} placeholder="Search by image URL"
                  required className="mainSearchInput" />
                <div className="material-icons black-text" id="searchIcon">search</div>
                <div className="material-icons" id="closeIcon">close</div>
              </div>
            </form>
            <h1 className="description">Enter an image url.</h1>
          </div>
        </div>


  );
}

export default SearchField;
