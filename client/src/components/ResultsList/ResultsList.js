import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./ResultsList.css";
import { useShopprContext } from "../../utils/GlobalState";
import { SEARCH_SAVED, LOADING, STOP_LOADING } from "../../utils/actions";
import loader from "../../assets/loader.gif";
import { useToasts } from "react-toast-notifications";

function ResultsList(props) {
  const { addToast } = useToasts();
  const [state, dispatch] = useShopprContext();
  const [itemList, setItemList] = useState();

  useEffect(() => {
    console.log("current search item: " + props.itemToSearch);
    // console.log("In ResultsList Component: item is: ", props.itemToSearch);

    if (props.itemToSearch) {
      dispatch({ type: LOADING });
      API.getProducts(props.itemToSearch)
        .then((results) => {
          setItemList(results.data);
          dispatch({ type: STOP_LOADING });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: STOP_LOADING });
        });
    }
  }, [props.itemToSearch]);

  //itemList = API.getProducts();

  function buyItem(itemDetail) {
    if (state.User && state.User.id) {
      console.log(itemDetail);
      console.log(state.User.id);
      console.log(state.searchSaved);
      let payload = {
        title: itemDetail.title,
        image_url: itemDetail.image,
        purchase_url: itemDetail.link,
        price: itemDetail.price ? itemDetail.price.raw : null,
        itemName: props.itemToSearch,
        UserId: state.User.id,
      };
      dispatch({ type: LOADING });
      if (state.searchSaved) {
        API.saveProducts(payload)
          .then((response) => {
            //console.log("Product saved: ", response);
            dispatch({ type: STOP_LOADING });
            addToast(`Product ${response.data.title} Saved`, {
              appearance: "success",
              autoDismiss: true,
            });
          })
          .catch((err) => {
            //console.log("Unable to save product")
            dispatch({ type: STOP_LOADING });
            addToast(` Unable to save Product`, {
              appearance: "error",
              autoDismiss: true,
            });
          });
      } else {
        let searchSavePayload = {
          UserId: state.User.id,
          image_url: state.CurrentSearch.image_url,
          itemNames: state.CurrentSearch.items,
        };
        console.log("payload to save search: ", searchSavePayload);
        API.saveSearch(searchSavePayload)
          .then((searchresponse) => {
            //console.log("Search saved", searchresponse.data);
            dispatch({ type: SEARCH_SAVED, searchSaved: true });
            addToast(`Search Saved`, {
              appearance: "success",
              autoDismiss: true,
            });
            API.saveProducts(payload)
              .then((response) => {
                //console.log("Product saved: ", response);
                addToast(`Product ${response.data.title} Saved`, {
                  appearance: "success",
                  autoDismiss: true,
                });
              })
              .catch((err) => {
                //console.log("Unable to save product")
                dispatch({ type: STOP_LOADING });
                addToast(` Unable to save Product`, {
                  appearance: "error",
                  autoDismiss: true,
                });
              });
          })
          .catch((err) => {
            console.log("Save not successfull");
            dispatch({ type: STOP_LOADING });
            addToast(` Unable to save your search`, {
              appearance: "error",
              autoDismiss: true,
            });
          });
      }
    }
  }

  return (
    <div>
      {state.loading ? (
        <img src={loader} />
      ) : (
        <div className="resultsList center">
          <div className="col s12  l11">
            <h1 className="Bold">
              Results List<span id="period">.</span>
            </h1>
            {itemList ? (
              itemList.map((result, index) => {
                return (
                  <div className="col s6 l4 center">
                    <div className="card small">
                      <div className="col s12">
                        <div className=" col s12 l12 " key={index}>
                          <div className="row center">
                            <div className="row center">
                              <div className="col s12">
                                <a href={result.link} target="_blank">
                                  <img
                                    id="imgSize"
                                    className=""
                                    src={result.image}
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="row">
                              <div className="productTitle col s12 ">
                                <a
                                  target="blank"
                                  className="black-text"
                                  href={result.link}
                                  id="resultTit"
                                >
                                  {result.title}
                                </a>
                              </div>
                            </div>
                            <div className="row" id="Buy">
                              <p className="price">
                              {result.price ? result.price.raw : ""}
                              </p>
                              <button
                                className="btn   #00b0ff light-blue accent-3"
                                onClick={() => buyItem(result)}
                                disabled={!state.User || !state.User.id}
                                id="buyBTN"
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsList;
