import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useShopprContext } from "../../utils/GlobalState";
import Styles from "../Signup/signup.css";
import API from "../../utils/API";
import Atey from "../Signup/images/logoshort.png";
import { useToasts } from 'react-toast-notifications'

function Signup() {
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
    if (
      userNameRef.current.value &&
      emailRef.current.value &&
      passwordRef.current.value
    ) {
      let User = {
        username: userNameRef.current.value.trim(),
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
      };

      console.log("User : ", User);
      API.createNewUser(User)
        .then((newUser) => {
          console.log("Entered a new user (", newUser, ") into the database!");

          // Clear out the form fields -- not sure if we really need to do this
          userNameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";

          // redirect the user to the login page
          history.push("/login");
        })
        .catch((err) => {
          //console.log(err);
          addToast('Enter a valid email', {
            appearance: 'error',
            autoDismiss: true,
          })
        });
    } // end of If Statement
  }
  return (
    <div className="">
      <div className="row container">
        <div className="col s12 l4 ">
          <h1 id="signup">Sign up With Shoppr:</h1>
        </div>
        <div className="col s12 l4">
          <form className="signup" onSubmit={handleSubmitForm}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                id="username-input"
                placeholder="Username"
                ref={userNameRef}
              />
            </div>
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
            <button type="submit" className="btn  #00b0ff light-blue accent-3">
              Sign Up
            </button>
          </form>
          <br></br>
          <p>
            Or log in <Link to="/login">here</Link>
          </p>
        </div>
      </div>
      <div id="signupbanner" className="center">
        <div className="row center">
          <div className="col s12 l12">
            <h1 id="thankYou">Thank you for joining us here at Shoppr!</h1>
            <img src={Atey}/>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Signup;
