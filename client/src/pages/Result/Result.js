import React from "react";
import MapContainer from "../../components/MapContainer/MapContainer";
import VisionItems from "../../components/VisionItems/VisionItems";
import ResultsList from "../../components/ResultsList/ResultsList";
import { useShopprContext } from "../../utils/GlobalState";
// import { SET_STORE_PREF, SET_CURRENT_PATH } from "../../utils/actions";
import FriendsSearches from "../../components/FriendsSearches/FriendsSearches";
// import API from "../../utils/API";
import CurrentSearchImage from "../../components/CurrentSearchImage/CurrentSearchImage";
import "../Result/result.css"
function Result() {
  // const [itemToSearch, setItemToSearch] = useState();
  const [state ] = useShopprContext();
  // const [friendsSearches, setFriendsSearches] = useState();

  // function findAssociatedFriend(userId) {
  //   let friend = state.Friends.filter((friend) => friend.id === userId);
  //   return friend[0];
  // }

  // useEffect(() => {
  //  // dispatch({ type: SET_STORE_PREF, isOnline: true });
  //   dispatch({ type: SET_CURRENT_PATH, currentPath: "/result" });

  //   let friendsIds = state.Friends.map((friend) => friend.id);
  //   console.log("List of friends' ids: ", friendsIds);
  //   if (state.User && state.User.id) {
  //     API.getFriendsSearches({
  //       friendsIds: friendsIds,
  //       item: state.CurrentSearch.items[state.current_search_item],
  //     })
  //       .then((results) => {
  //         console.log("In Result.js, friendsSearches:", results.data);

  //         results.data.forEach((product, index) => {
  //           console.log("looking for product.userId:", product.UserId);
  //           let friend = findAssociatedFriend(product.UserId);
  //           console.log("friend: ", friend);
  //           results.data[index].friend = friend;
  //         });

  //         console.log("Friends Searches: ", results.data);
  //         if (results.data && results.data.length > 0) {
  //         setFriendsSearches(results.data);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [state.CurrentSearch.items[state.current_search_item]]);

  return (
    <div className="resultsContainer">
      <div>
        <div className=" center ">
          <div className="VisionCurrent center">
            <div className="row">
              <div className="center container ">
                <div className="col s12 l6">
                  <VisionItems></VisionItems>
                </div>
                <div className="col s12 l6">
                  <CurrentSearchImage />
                </div>
              </div>
            </div>
          </div>
          <div className=" row center">
          <div className="col s12 l6 center">
    
              <FriendsSearches />

          </div>
          {state.CurrentSearch.basedOnExistingSearch ? ( <p>Based on an existing search</p> ) : (
            <p>Based on an fresh search</p> 
           ) }
          <div className="col s12 l6 center" id="resultL">
     
            {state.isOnline ? (
              <ResultsList
                itemToSearch={
                  state.CurrentSearch.items[state.current_search_item]
                }
              ></ResultsList>
            ) : (<div className="col s12"><p>Map:</p>
              <MapContainer
                itemToSearch={
                  state.CurrentSearch.items[state.current_search_item]
                }
              ></MapContainer></div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
