import React, {useRef} from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import Search from "../../components/SearchContainer/SearchContainer";
import API from '../../utils/API';
import { useShopprContext } from "../../utils/GlobalState";
import { LOGOUT } from "../../utils/actions";
import { useHistory } from "react-router-dom";


const Styles= {
    banner: {
        
    }
}


function Home(){

  const [state, dispatch] = useShopprContext();

  const history = useHistory();

    function logout() {
      API.logout().then( response => {
        if (response.status=== 200 && response.data==="Logged out")
        {
          console.log("Calling the dispatcher");
          dispatch( { type: LOGOUT });

          window.location.reload(true);
         // history.push("/");
        }
        console.log(response);
      });
    }
    function handleFormSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        //console.log(uploadImage.current.value);
      

     //   let file = uploadImage.current.value;
      //  console.log(file);

      //  API.extract(file).then.

        // API.extract(event.target.files[0]).then((res)=>{
        //     console.log("here is the image uploaded res",res);
        // })
      //   API.extract(file).then((res)=>{
      //     console.log("here is the image uploaded res",res);
      // })
    }

    return (
        <div>
 {state.User ? <div>You are logged in as: {state.User.email}<br />
   <button onClick={logout}>Log Out</button>
</div> : <div>You are not logged in.</div> }

            <h1>I am in Home Component</h1>
            <Link to="/friends">
            <button className="largeButton">Connect with Friends</button>
            </Link>
<hr></hr>


             {/* If the state.user object exists, then the user has
             already logged in, so we don't need to show the login
             and create account buttons -- otherwise, show the Login and Create account Buttons. */}

            {!state.User ?
            <div><Link to="/signup">
            <button className="largeButton">Create an Account</button>
            </Link>
            <Link to="/login">
            <button className="largeButton">Log In</button>
            </Link></div> : <p></p>}
      
            
            <Search/>
  
            {/* <form
            className="mt-4"
            method="POST"
            encType="multipart/form-data"
            onSubmit={ handleFormSubmit }
           
          >
         
            <div className="form-group">
              <input
                type="file"
                name="file"
                id="input-files"
                className="form-control-file border"
                ref={uploadImage}
      
              /> */}

       
           
      
            
        </div>
    );
}

export default Home;