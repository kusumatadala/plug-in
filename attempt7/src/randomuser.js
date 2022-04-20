import $ from 'jquery';
import React, { useState,useEffect } from 'react';
import UserList from "./userlist";
import {userId} from "./userid";
import {db} from "./firebase-config";
import {  doc, setDoc } from "firebase/firestore";
var ob={};
function ajaxCall() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
        ob.UserName=data.results[0].name.first+data.results[0].name.last;
        
        ob.Status="Hello!I have signed in anonymously   ";
        ob.Img=data.results["0"].picture.thumbnail;
        },
        error: function(error){
        console.log(`Error ${error}`);
        }
        })
        }
ajaxCall();
export {ob};