import React from "react";
import "./CurrentSearchImage.css";
import { useShopprContext } from "../../utils/GlobalState";
// import { SET_FRIENDS } from "../../utils/actions";
// import API from "../../utils/API";

function CurrentSearchImage() {
  const [state ] = useShopprContext();

  return (
    <div className="currentSearchImageContainer card ">
      <h1 className="Bold">You searched for:</h1>
      <img
        src={state.CurrentSearch.image_url}
        className="currentSearchImage circle"
        alt={state.CurrentSearch.image_url}
      />
    </div>
  );
}

export default CurrentSearchImage;
