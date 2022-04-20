import './App.css';
import React,{useState, useEffect} from "react";
import Login from "./login";
import Hero from "./hero";
import {authentication} from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  //functions responsible for detecting whether the user is logged in or not
  const [user,setUser]=useState('');
  const authListener=()=>{
    onAuthStateChanged(authentication,(User) => {
      if(User){
        setUser(User);
      }
      else
      {
        setUser("");
      }
    });
  }
useEffect(()=>{
authListener();
});
return (
    <div >
      {user?(<Hero/>):(<Login />)}        
    </div>
  );
};

