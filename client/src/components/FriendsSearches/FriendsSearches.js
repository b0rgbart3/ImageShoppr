import React, { useRef, useEffect, useState } from "react";
import "./FriendsSearches.css";
import { useShopprContext } from "../../utils/GlobalState";
import { SET_FRIENDS } from "../../utils/actions";

function FriendsSearches(props) {
  const [state, dispatch] = useShopprContext();

  return (
    <div className="container">
      <h1 className="Bold" id="SimilarTitle">
        Your friends purchased similar items<span id="period">!</span>
      </h1>
      {props.friendsSearches ? (
        props.friendsSearches.map((searchItem) => {
          return (
            <div className="card center  row ">
              <div className="col s6 l4">
                <img
                  className="friendAvatar  circle "
                  src={searchItem.friend.avatar}
                  alt="User image"
                />
                <p className="Bold">{searchItem.friend.username}</p>
              </div>
             
              <div className="col s6 l4">
                <img
                  id="friendsItem"
                  src={searchItem.image_url}
                  className="fSItemImage circle"
                />
              </div>
              <div className="col l4">
                <p className="">Item: {searchItem.title} </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="Bold">No matching friend searches found.</div>
      )}
    </div>
  );
}

export default FriendsSearches;
