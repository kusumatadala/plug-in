
import React,{useState,useEffect} from "react";
import { signOut,onAuthStateChanged} from "firebase/auth";
import { Space} from 'antd';
import CreateData from './createdata';
import Datatable from "./userlist";
import {db,authentication,storage} from "./firebase-config";
import {LogoutOutlined} from '@ant-design/icons';
import { doc, getDoc } from "firebase/firestore";
import {signin} from "./login";
const Hero=()=>{
  var login=true;
    const handleLogOut=()=>{
        signOut(authentication)
        .then(() => {
          alert("logged out succesful");
        })
        .catch((error) => {
          alert("Try again");
        });
      }
    let userData =authentication.currentUser;
      if(userData.metadata.creationTime === userData.metadata.lastSignInTime){
      console.log("user for the first time")
      login=false;
      }else{
        console.log("user already present")
        login=true;
      }
    return(
        <section className="hero">
            <nav>
                <h2>
                    PLUGIN
                </h2>
                <Space onClick={handleLogOut} size="large">
                <LogoutOutlined />
                </Space>
            </nav>
            <div id="container" style={{padding: 24}}>
            {(login===true || signin==2)?(<Datatable/>):(<CreateData/>)}
          </div>
        </section>
    );
};
export default Hero;