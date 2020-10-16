import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useShopprContext } from "../../utils/GlobalState";
import Styles from "../Login/Login.css";
import API from "../../utils/API";
import Banner from "../Login/images/loginBanner.png";
import { LOGIN_USER, SET_FRIENDS } from "../../utils/actions";
import Danny from "../Login/images/Danny.jpg";
import Bart from "../Login/images/bart.png";
import Shambhawi from "../Login/images/shambhawi.jpg";
import ShopprLogo from "../Login/images/logoshort.png";
import { useToasts } from 'react-toast-notifications';

function Login() {
  let history = useHistory();
  const { addToast } = useToasts();
  const [state, dispatch] = useShopprContext();

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  //   console.log("OUR SHOPPR CONTEXT: " +  JSON.stringify( useShopprContext() ) );

  function handleSubmitForm(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("In Handle form submit");

    // Only process the form data if there are actual values in there
    if (emailRef.current.value && passwordRef.current.value) {
      let User = {
        // username: userNameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
      };

      console.log("User : ", User);
      API.login(User)
        .then((newUser) => {
          console.log("Login credentials matched.");
          console.log(
            "Logged In a new user (",
            newUser,
            ") into the application!"
          );
          dispatch({
            type: LOGIN_USER,
            user: newUser.data
          });

             
          // Save the User Info in Local Storage

          let storedUser = { 
            id: newUser.data.id,
            name: newUser.data.name,
            email: newUser.data.email,
            avatar: newUser.data.avatar
          }
          localStorage.setItem( "loggedInUser",  JSON.stringify( storedUser ) );
       
          // Get the Friends

          console.log("Current State User: ", state.User);
            
          if (newUser.data  && newUser.data.id) {
              console.log("About to get Friends list.");
     
           API.getFriends(newUser.data.id).then((friends) => {
               console.log("Got friends back from the API:", friends.data);
              dispatch({type:SET_FRIENDS, friends:friends.data})
          })
          }

   // Clear out the form fields -- not sure if we really need to do this
          emailRef.current.value = "";
          passwordRef.current.value = "";

          // redirect the user to the welcome page

          history.push(state.currentPath);
        })
        .catch((err) => {
          //console.log(err);
          addToast('Invalid login credential. Please verify your email and passpord', {
            appearance: 'error',
            autoDismiss: true,
          })

        });
    } // end of If Statement
  }
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row">
            <div className=" col s12 l4">
              <h1 id="login">Login to Shoppr:</h1>
            </div>
            <div className="col s12 l6">
              <form className="signup" onSubmit={handleSubmitForm}>
                {/* <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" id="username-input" placeholder="Username" ref={userNameRef} />
                </div> */}
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email-input"
                    placeholder="Email"
                    ref={emailRef}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-input"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                </div>
                <div
                  style={{ display: "none" }}
                  id="alert"
                  className="alert alert-danger"
                  role="alert"
                >
                  <span
                    className="glyphicon glyphicon-exclamation-sign"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Error:</span>{" "}
                  <span className="msg"></span>
                </div>
                <button
                  type="submit"
                  className="btn #00b0ff light-blue accent-3"
                >
                  Log In
                </button>
              </form>
              <br></br>
              <p>
                Or Create an account here <Link to="/signup">here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="banner" className="center">
        <img id="logoBan" src={ShopprLogo} />
                
        <div className="container center valign-wrapper">
         
        </div>
        <div>
            <h1 id="thankYou">The Shoppr team thanks you!</h1>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
