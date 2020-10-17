import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Video from "../../pages/welcome/images/skies-ani.gif";
import ShopprLogo from "../../pages/welcome/images/logoshort.png";
import { useShopprContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { LOGOUT, LOGIN_USER, SET_FRIENDS } from "../../utils/actions";
import user_avatar from "../../assets/user_avatar.png";
import Style from "../Nav/nav.css";
import M from "materialize-css";
// import Dropdown from "react-dropdown";

// import Animate from "../Nav/animate";

const Styles = {
  row: {
    margin: 0,
  },
  mainDiv: {
    height: "700px",
    backgroundImage: `url(${Video})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  image: {
    width: "90%",
  },
  link: {
    fontWeight: 900,
    marginBottom: "10px",
  },
  logo: {
    width: "20%",
  },
};

function Nav() {
  const [state, dispatch] = useShopprContext();
  const [localLoggedInUser, setLocalLoggedInUser] = useState();

  useEffect(() => {}, [localLoggedInUser]);

  useEffect(() => {
    var sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav, {});
  }, []);

  useEffect(() => {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      dispatch({ type: LOGIN_USER, user: loggedInUser });

      setLocalLoggedInUser(loggedInUser);

      API.getFriends(loggedInUser.id)
        .then((friends) => {
          dispatch({ type: SET_FRIENDS, friends: friends.data });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function logout() {
    API.logout().then((response) => {
      if (response.status === 200 && response.data === "Logged out") {
        console.log("Calling the dispatcher");
        dispatch({ type: LOGOUT });

        localStorage.removeItem("loggedInUser");

        window.location.reload(true);
        // history.push("/");
      }
      console.log(response);
    });
  }

  function PlaceHolder() {
    console.log("Connecting...");
  }

  return (
    <div className="" style={Styles.row}>
      <nav className="z-depth-1">
        <div className="nav-wrapper white">
          <Link to="/"><div className='navlogo'>ImageShoppr<span className='navReg'>&reg;</span></div></Link>

          <ul id="nav-mobile" className="right  hide-on-med-and-down navLinks">

            <li>
              {state.User ? (
                <div className="black-text loggedInUserLinks" id="userInfo">
                    <Link to="/friends">
                      <button className="pillButton">
                        Connect with Friends
                      </button>
                    </Link>
                 
                  {/* <Dropdown options={options} className="btn"/>  */}

                  <button
                    onClick={logout}
                    className="pillButton"
                  >
                    Log Out
                  </button>
                  <img
                    id="avatar"
                    src={
                      state.User.avatar && state.User.avatar !== ""
                        ? state.User.avatar
                        : user_avatar
                    }
                    className=" circle "
                  />
                </div>
              ) : (
                <div className="black-text right">
                  {" "}
                  <Link to="/login">
                    <button className="btn #00b0ff light-blue accent-3">
                      Log In
                    </button>
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link to="/about" className="black-text">
                About
              </Link>
            </li>
            <li>
              <Link to="/search" className="black-text">
                Search
              </Link>
            </li>



          </ul>

          <ul id="slide-out" className="sidenav center ">
            <li>
              {state.User ? (
                <div className="black-text " id="userInfo">
                  <img
                    id="avatarSideNav"
                    src={
                      state.User.avatar && state.User.avatar !== ""
                        ? state.User.avatar
                        : user_avatar
                    }
                    className=" circle "
                  />

                  {/* <Dropdown options={options} className="btn"/>  */}
                  <div>
                    <Link to="/search" className="black-text">
                      Search
                    </Link>
                  </div>
                  <div>
                    <Link to="/about" className="black-text">
                      About
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={logout}
                      className="btn #00b0ff light-blue accent-3 "
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="black-text center ">
                  {" "}
                  <Link to="/login">
                    <button className="btn #00b0ff light-blue accent-3">
                      Log In
                    </button>
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link to="/friends">
                <button
                  onClick={PlaceHolder}
                  className="btn  #00b0ff light-blue accent-3"
                >
                  Connect with Friends
                </button>
              </Link>
            </li>
          </ul>
          <a
            href="#"
            data-target="slide-out"
            id="burger"
            className="sidenav-trigger black-text show-on-medium-and-down right"
          >
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
