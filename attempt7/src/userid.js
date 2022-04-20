import {useState} from "react";
import {authentication} from "./firebase-config";
import {onAuthStateChanged} from "firebase/auth";
const CheckUser=()=>{
    const [userid,setuserid]=useState('');
    onAuthStateChanged(authentication, (User) => {
        if (User) {
             setuserid(User.uid);
            }
            else{
                setuserid('');
            }
    });
    console.log("userid is");
    console.log(userid);
    return userid;
};
export default CheckUser;
