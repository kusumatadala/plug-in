import { getDatabase, ref, onValue } from "firebase/database";
const listData=[];
const db = getDatabase();
let key='';
 onValue(ref(db, '/Users'), (snapshot) => {
  const data=snapshot.toJSON();
  for (key in data){
      listData.push({id:key,...data[key]})
  }
});
export {listData};
export default onValue;