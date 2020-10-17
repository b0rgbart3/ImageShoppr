import React, {useEffect} from "react";
import ShopprLogo from "../welcome/images/logoshort.png";
import WelcomeStyles from "../welcome/styles.css";
import Video from "../welcome/images/welcomeBan2.gif";
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
    <div className='welcomeBox'>
 
      <div className="row center" style={Styles.row}>
        <div style={Styles.mainDiv} className="col s12 l12 #000000 black">
          <div className='welcomeTo'>Welcome to </div>
      <div className='imageLogo'>ImageShoppr<span class='mainReg'>&reg;</span></div>
        </div>
      </div>
      <div className="container center">
        <h1 id="What">What is ImageShoppr<span class='bodyReg'>&reg;</span>?</h1>
              You know what you like when you see it.  ImageShoppr is your personal shopping assistant.
              Image Shoppr analyzes the image of your dream decor and then utilizes the power of Google AI Vision Technology, 
              to find all the items in that image, and then gives you options of where to purchase those items. 
      </div>
        <div className="row container" id="rowSecond">
          <div className="col s12 l4">
            <p className="my-title">Start with an Image</p>
            <p id="my-description">
              ImageShoppr makes shopping fun again. You've found the look you want for your new living room.  All you need to do is give ImageShopr the url of the image.  Then Image Shoppr analyzes that image using the Google Vision Artificial Intelligence Vision API, and breaks it down into a shopping list.
               
            </p>
          </div>
          <div className="col s12 l4">
            <p className="my-title">Get Purchase Options</p>
            <p id="my-description">
              Shoppr then takes that shopping list and goes shopping for you.  It will give you a list of options for similar items and store locations of where to purchase them.  You can choose weather you want to make the purchases online or in stores.  If you choose in stores, ImageShoppr will display a map showing the stores closest to you where you can purchase these items.
            </p>
          </div>
          <div className="col s12 l4">
            <p className="my-title">Connect with friends</p>
            <p id="my-description">
              Networking is essential for accumulating good information. When it comes to products, reviews, deals, 
              collaboration is a key role in finding out everything you need to know to make your best decisions. 
              ImageShoppr allows users to connect with eachother so they can see when their friends have purchased similar items.
              --Another way that ImageShoppr makes shopping FUN again.
            </p>
          </div>
   
      </div>
      <div className="container center">
        <h3 id="What">Join ImageShoppr<span class='bodyReg'>&reg;</span>!</h3>
        <a href="/search"><button
          id="getStarted"
          className="btn #00b0ff light-blue accent-3"
        >
          Get Started
        </button></a>
        <br></br>
        <p></p>
      </div>
     
    </div>
  );
}

export default Welcome;
