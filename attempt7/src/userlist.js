import React,{useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import { collection, getDocs,onSnapshot,doc } from "firebase/firestore";
import { List, Avatar, Space,Button } from 'antd';
import { DislikeTwoTone , LikeTwoTone ,EditFilled,StarFilled} from '@ant-design/icons';
import {authentication, db} from "./firebase-config";
import { getDatabase, ref, onValue, update} from "firebase/database";
const Datatable = () => {
  const db=getDatabase();
  const userId=authentication.currentUser.uid;
  const listData=[];
  let key='';
  onValue(ref(db, '/Users'), (snapshot) => {
  const data=snapshot.toJSON();
  for (key in data){
      listData.push({id:key,...data[key]})
  }
  const updates={}
  updates['/Users/']=data
  update(ref(db),updates);
});
const finaldata=listData.sort( (a, b)=> b.Likes - a.Likes)
const IconText = ({ icon, text }) => (
  <Space size="middle">
    {React.createElement(icon)}
    {text}
  </Space>
);
const handlestatus=()=>{

}
const handleLike=()=>{
  

}
const handleDislike=()=>{
}
return (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    
    dataSource={finaldata}
    renderItem={item => (
      <List.Item
        key={item.UserName}
        actions={[
          <IconText  icon={LikeTwoTone } size="large" text={item.Likes} key="list-vertical-like-o" onClick={listData["Likes"]+=1 && onValue}/>,
          <IconText icon={DislikeTwoTone} size="large" text={item.Dislikes} key="list-vertical-dislike"onClick={listData["Dislikes"]+=1 && onValue} />,
        ]}
        extra={
          <img
            width={200}
            alt="logo"
            src={item.Img}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar  size="default" src='https://joeschmoe.io/api/v1/random' />}
          title={<h4>{item.UserName}</h4>}
          description={<h3 >
            {item.Status+"  "}
            {
              userId===item.id
              ?<Space onClick={handlestatus} size="small">
              <EditFilled />
              </Space>
              :<Space size="small">  <StarFilled/> </Space>

            }
            
            </h3>}
        />
        
      </List.Item>
    )}
  />
);
      }
export default Datatable;