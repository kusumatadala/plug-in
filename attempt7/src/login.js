import React from "react";
import { Button} from 'antd';
import { signInWithPopup, GoogleAuthProvider,signInAnonymously} from "firebase/auth";
import {ob} from "./randomuser";
import {authentication} from "./firebase-config";
import WriteUserData from "./writedatabase"
import Datatables from "./readdatabase";
var signin;
const Login=()=>{

    // signInWithGoogle   
    const signInWithGoogle=()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
        .then((result) => {
          alert("Google login succesful");
          signin=1;
        })
        .catch((error) => {
          alert("Try again");
        });
      }
      //anonymous login
      const signInAnonymously1= async()=>{
      signInAnonymously(authentication)
      .then(() => {
        console.log("Anonymous login succesful");
        signin=2;
          //user exists
          let userData =authentication.currentUser;
        if(userData.metadata.creationTime === userData.metadata.lastSignInTime){
          //user logins for the first time
           console.log("enterd if loop");
          const id=userData.uid;
          console.log(id);
          const x=ob;
          console.log("x is");
          console.log(x);
          WriteUserData(id,ob.UserName,ob.Status,0,0,ob.Img);
          console.log("profile choosen");
        }
      })
      .catch((error) => {
       console.log(error);
        // ...
      });
}
    return(
    <section className="login">
    <div className="loginContainer" size="bold">
      WELCOME TO PLUGIN
      <Button type="primary"  onClick={signInWithGoogle}>
      Login with Google
      </Button>
      <Button type="primary"  onClick={signInAnonymously1} >
      Login Anonymously
      </Button>
      </div>
        </section>
    );
};
export {signin};
export  default Login;