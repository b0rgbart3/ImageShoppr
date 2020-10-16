import React, {useEffect} from 'react';
import SearchContainer from "../../components/SearchContainer/SearchContainer";
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
        <div>
            
           
      <div id="SearchBanner" className="center">
        <div className="row center">
          <div className="col s12 l12" >
          <SearchContainer/>
  
          </div>
        </div>
      </div>    
            
        </div>
    );
}

export default Search;