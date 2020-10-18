import React from "react";
import "./Footer.css";
import { useShopprContext } from "../../utils/GlobalState";
// import { SET_FRIENDS } from "../../utils/actions";

function Footer(props) {
  //  const [state, dispatch] = useShopprContext();
  
  
  
    return (

<footer className="page-footer #37474f blue-grey darken-3">
<div className="container">
  <div className="row">
    <div className="col l6 s12">
      <h5 className="white-text">ImageShoppr<span className='footerReg'>&reg;</span></h5>
      <p className="grey-text text-lighten-4">
        The latest shopping search engine.
      </p>
    </div>
    <div className="col l4 offset-l2 s12">
    <a href="/about">
      <h5 className="white-text">The Team</h5></a>
      <ul>
        <li>
          <a
            className="grey-text text-lighten-3"
            href="/about"
          >
            Shambhawi
          </a>
        </li>
        <li>
          <a
            className="grey-text text-lighten-3"
            href="/about"
          >
            Bart
          </a>
        </li>
        <li>
          <a
            className="grey-text text-lighten-3"
            href="/about"
          >
            Daniel
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
<div className="footer-copyright">
  
  <div className="container">
    © 2020 ImageShoppr
    </div>
</div>
</footer>
    )
}

export default Footer;
