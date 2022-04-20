import { getDatabase, ref, set } from "firebase/database";
// function to store random profile in the database associating with current user uid
const  WriteUserData=(userId, name,description,likes,dislikes,imgurl)=> {
    const db = getDatabase();
    set(ref(db, 'Users/' + userId), {
    UserName: name,
    Status:description,
    Likes:likes,
    Dislikes:dislikes,
    Img:imgurl
      });
    }
export default WriteUserData;