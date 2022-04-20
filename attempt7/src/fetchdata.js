import {db} from "./firebase-config";
import { list } from 'firebase/storage';
import { collection, getDocs,onSnapshot,doc } from "firebase/firestore";
import React,{useState,useEffect} from 'react';
var fectchedData;
const DataFetch=()=>{
    const [data, setData] = useState([]);
        onSnapshot(
        collection(db, "users"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
        },
        (error) => {
          setData([]);
        }
      );
      console.log(data);
    }
export default DataFetch;