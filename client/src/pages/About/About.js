import React from 'react';
import Dropdown from 'react-dropdown';
import Danny from "../Login/images/Danny.jpg";
import Bart from "../Login/images/bart.png";
import Shambhawi from "../Login/images/shambhawi.jpg";
import ShopprLogo from "../Login/images/logoshort.png";
import './About.css';


function About(){
    
    return (
        <div>
             <div id="banner" className="center">
        <img id="logoBan" src={ShopprLogo} />
                
 
         
        </div>


         <div className="container center valign-wrapper">
          <div className="row">
          <div className="col s12 l12">
          <h1 id="thankYou" className="black-text">Meet the Shoppr Team:</h1>
          </div>
          </div>
          <div className="row spacing-top">
            <div className="col s12 l4">
              <img className="circle" id="bart" src={Bart} alt="Bart" />
           
              <h5 className="black-text">Bart Dority</h5>
              <p>Bart worked closely with Shambhawi to develop the backend including the database models, server side routes, database queries, and calls to the rainforest API to display Amazon product data.  He also impleted the Passport authentication, and developed the Global State object on the frontend which allows React to display the search items and friends to the page.</p>
              <p>Github link goes here.</p>
            </div>
          {/* </div>
          <div className="row"> */}
            <div className="col s12 l4">
              <img
                className="circle"
                id="Shambhawi"
                src={Shambhawi}
                alt="Shambhawi"
              />
              <h5 className="black-text">Shambhawi Kumari</h5>
              <p>Shambhawi worked closely with Bart to developed the backend including the database models, server side routes, database queries, and calls to the rainforest API to display Amazon product data.  She developed the api connection the Google Vision API, and Google Maps API.  She also developed the Global State object on the frontend which allows React to display the search items and friends to the page.</p>
              <p>Github link goes here.</p>
            </div>
          {/* </div>
          <div className="row"> */}
            <div className="col s12 l4 ">
              <img className="circle" id="Danny" src={Danny} alt="Daniel" />
              <h5 className="black-text">Daniel Jauregui</h5>
              <p>Daniel designed the UI and built the UI Components in React including handling all of the visual styling and CSS wrangling, using Materialize.</p>
              <p>Github link goes here.</p>
            </div>
          </div>
        </div>
        <div>
        </div>
        </div>
    );
}

export default About;