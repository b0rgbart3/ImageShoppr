import React, {useEffect} from 'react';
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { useShopprContext } from "../../utils/GlobalState";
import { SET_CURRENT_PATH } from "../../utils/actions";
// import DigitalBanner from "../Search/images/digital1.jpg"
import SearchStyle from "../Search/search.css"
function Search(){
    const [state,dispatch] = useShopprContext();


    useEffect( ()=> {
      dispatch({type: SET_CURRENT_PATH, currentPath: "/search"})
    }, []
    )
  
    return (
      <div id="SearchPage">
          <SearchComponent/>
      </div>     
    );
}

export default Search;