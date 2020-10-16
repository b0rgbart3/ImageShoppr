import React, {useEffect} from "react";
import ShopprLogo from "../welcome/images/logoshort.png";
import WelcomeStyles from "../welcome/styles.css";
import Video from "../welcome/images/welcomeBan.gif";
import { useHistory } from "react-router-dom";
import { useShopprContext } from "../../utils/GlobalState";
import { SET_CURRENT_PATH } from "../../utils/actions";



const Styles = {
  row: {
    
  },
  mainDiv: {
    height: "700px",
    backgroundImage: `url(${Video})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: 0
  },
  image: {
    width: "90%",
  },
  link: {
    fontWeight: 900,
    // marginBottom: "10px",
  },
  logo: {
    width: "20%",
  },
};
function Welcome() {
  let history = useHistory();
  const [state,dispatch] = useShopprContext();


  useEffect( ()=> {
    dispatch({type: SET_CURRENT_PATH, currentPath: "/welcome"})
  }, []
  )


  function handleOnClick() {
    history.push("/search");
    console.log("Working");
  }

  return (
    <div>
      {/* <div className="" style={Styles.row}>
        <nav className="z-depth-1">
          <div className="nav-wrapper white">
            <img className="logo left" src={ShopprLogo} alt="Shoppr logo" />

            <ul id="nav-mobile" className="right">
              <li>
                <a className="black-text list-item" href="sass.html">
                  Search
                </a>
              </li>
              <li>
                <a className="black-text" href="badges.html">
                  Team
                </a>
              </li>
              <li>
                <a className="black-text" href="collapsible.html">
                  About
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div> */}
      <div className="row center" style={Styles.row}>
        <div style={Styles.mainDiv} className="col s12 l12 #000000 black">
          <h1 id="Welcome">Welcome to </h1>
          <a href="">
            <img src={ShopprLogo} style={Styles.logo} alt="Shoppr logo" />
          </a>
        </div>
      </div>

      
      <div className="container center">
        <h1 id="What">What is shoppr?</h1>
        <div className="row">
          <div className="col l12">
            <p>
              Shoppr is a shopping application that allows our users search for
              items based of images users upload. By signing up or signing in,
              users will be able to utilize the full extent of Shoppr's
              functionality. Shoppr uses Google's vision API to allow the
              ability to search for products through images.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="row container" id="rowSecond">
          <div className="col s12 l4">
            <p id="my-title">Why choose Shoppr?</p>
            <p id="my-description">
              Shoppr is an app that utilizes APIs from companies that many users use
              on a daily basis and trust. In collaboration with Google's Vision API and
              Amazon's shopping API, the Shoppr team has architected, developed, and tested each 
              components to provide user's with a seemless experience.
               
            </p>
          </div>
          <div className="col s12 l4">
            <p id="my-title">Upload an image</p>
            <p id="my-description">
              Shoppr is an application that allows users to upload images to our sites database.
              Using images uploaded by you, the user, we are able to provide a response back
              that retrieves products found within the image utilizing Google's Vision API. Then, using
              Amazon's shopping API, the ability for the user to browse, save, and buy products. 
            </p>
          </div>
          <div className="col s12 l4">
            <p id="my-title">Connect with friends</p>
            <p id="my-description">
              Networking is essential for accumulating information. When it comes to products, reviews, deals, 
              collaboration is a key role in finding out the latest information. In comes, Shoppr Friends. Shoppr
              Friends is a social media platform programmed within the Shoppr site itself. It allows users to connect
              with each other, and see similar items purchased. This provides a plethora of user experiences to
              help Shopprs make their decision. 
            </p>
          </div>
        </div>
      </div>
      <div className="container center">
        <h3 id="What">Join Shoppr!</h3>
        <button
          onClick={() => handleOnClick()}
          id="getStarted"
          className="btn #00b0ff light-blue accent-3"
        >
          Get Started
        </button>
      </div>
     
    </div>
  );
}

export default Welcome;
