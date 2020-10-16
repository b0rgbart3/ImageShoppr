import React, { useRef, useEffect, useState, useCallback  } from "react";
import API from "../../utils/API";
import { Redirect } from "react-router-dom";
import { useShopprContext } from "../../utils/GlobalState";
import "./Friends.css";
import { SET_CURRENT_PATH, ADD_FRIEND, SET_FRIENDS } from "../../utils/actions";
import user_avatar from "../../assets/user_avatar.png";
import CurrentFriends from "../../components/CurrentFriends/CurrentFriends";
import { useToasts } from 'react-toast-notifications';
import _ from 'lodash';
const { debounce } = _;

function Friends() {
  const friendsEmail = useRef();
  const { addToast } = useToasts()
  const [state, dispatch] = useShopprContext();
  const [friendAccounts, setfriendAccounts] = useState([]);

  const debounceLoadData = useCallback(debounce(fetchData, 500), []);

  function fetchData(){
    let searchTerm = friendsEmail.current.value;
    let existingFriends = state.Friends.map(friend => friend.id);
    API.searchForFriend(searchTerm)
      .then((results) => {
        //console.log("Friends.js got results: ", results.data, existingFriends);
        let users = results.data.filter((user)=> {
          return !existingFriends.includes(user.id);
        });
        //console.log("user that are not friend>",users);
        if(users.length <=0){
          addToast("No user found. Try a different mail id", {
            appearance: 'warning',
            autoDismiss: true,
          })
        }
        setfriendAccounts(users);
      })
      .catch((err) => {
        console.log(err);
        addToast("Oops.!! No user found. Try again", {
          appearance: 'error',
          autoDismiss: true,
        })
      });
  }

  function addFriend(index) {
    console.log(
      "values passed to addFriend API from UI: ",
      state.User,
      friendAccounts[index]
    );
    API.addFriend({ User: state.User, Friend: friendAccounts[index] })
      .then((results) => {
        //console.log("Added friend: ", results);
        dispatch({ type: ADD_FRIEND, newFriend: friendAccounts[index] });
        addToast(`You are friend with ${friendAccounts[index].username} now. Cheers to Shoppr buddies.`, {
          appearance: 'success',
          autoDismiss: true,
        })
      })
      .catch((err) => {
         console.log(err);
         addToast("Oops! Something went wrong.", {
          appearance: 'error',
          autoDismiss: true,
        })
      });
  }
  
  useEffect(() => {}, [friendAccounts]);

  useEffect(() => {
    dispatch({ type: SET_CURRENT_PATH, currentPath: "/friends" });
    if (state.User && state.User.id) {
      API.getFriends(state.User.id).then((friends) => {
        console.log("Got friends back from the API:", friends.data);
        dispatch({ type: SET_FRIENDS, friends: friends.data });
      });
    }
  }, []);

  let currentUser = null;
  if (state && state.User) {
    currentUser = state.User;
  }
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  function searchForFriend(e) {
    e.preventDefault();
    e.stopPropagation();

    debounceLoadData();
  }
  return (
    <div>
      <div className="friendsConnect ">
        <div className="container center">
          <div id="formCont" className="row">
            <div className="col s12 l6">
              <h1 id="connectWith">Connect with Friends:</h1>
            </div>

            <div className="container col s12 l6" id="forms">
              <nav className="searchFriends">
                <div className="nav-wrapper ">
                  <form className="searchFriends">
                    <div className="input-field searchFriends white" id="searchAnimate">
                      <input
                        id="search"
                        type="search"
                        className="searchFriends"
                        ref={friendsEmail}
                        onChange={searchForFriend}
                        placeholder='Search for friend here'
                        required
                      ></input>
                      <label className="label-icon" for="search">
                        <i className="material-icons black-text">search</i>
                      </label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container center">
        {friendAccounts.length>0?<h1 className="Bold" >Add a friend</h1>: <div></div>}
        

        <div>
          {friendAccounts.map((friend, index) => {
            return (
              <div
                className="friendCard"
                onClick={() => addFriend(index)}
                key={index}
              >
                <img
                  src={friend.avatar ? friend.avatar : user_avatar}
                  className="avatar"
                />
                <h1 className="textWeight">{friend.username}</h1>
                <p>{friend.email}</p>
              </div>
            );
          })}
        </div>

        <div className="">
          <h1 className="yourFriends">
            Your Friends On Shoppr<span className="yourFriendsShoppr">.</span>
          </h1>

          <CurrentFriends />
        </div>
      </div>
     
    </div>
  );
}

export default Friends;
