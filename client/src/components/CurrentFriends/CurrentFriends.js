import React, { useRef, useEffect } from 'react';
import "./CurrentFriends.css";
import { useShopprContext } from "../../utils/GlobalState";
import { SET_FRIENDS } from "../../utils/actions";
import API from "../../utils/API";
import user_avatar from "../../assets/user_avatar.png";

function CurrentFriends() {

    const [state, dispatch] = useShopprContext();

    useEffect(() => {
        console.log("In CurrentFriends, state.Friends:", state.Friends);
    });

    return (
        <div>
            {(state.Friends && state.Friends.length > 0) ? state.Friends.map((friend, index) => {
                return (
                        <div
                            className="friendCard"
                            key={index}
                        >
                            <img
                                src={friend.avatar ? friend.avatar : user_avatar}
                                className="avatar"
                            />
                            <h1 className="textWeight">{friend.username}</h1>
                            <p>{friend.email}</p>
                        </div>
                )
            }) : <div><h1>You have not added any friends yet.     </h1> </div>}
        </div>
    )

}

export default CurrentFriends