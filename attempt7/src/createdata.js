import React, { useState,useEffect } from 'react';
import { Form,
   Input,
   Button,
   Upload
  } from 'antd';
import{UploadOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import WriteUserData from "./writedatabase";
//import { getDatabase, ref, set } from "firebase/database";
import {  doc, setDoc } from "firebase/firestore"; 
import {db,authentication,storage} from "./firebase-config";
import {onAuthStateChanged} from "firebase/auth";
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import {signin} from "./login";
import UserList from "./userlist";
//import { useNavigate } from "react-router-dom";
var submitted=false;
const FormLayoutDemo = () => {
    const [userid,setuserid]=useState('');
    const [data,setData]=useState({});
    const[file,setFile]=useState('');
    const [per, setPerc] = useState(null);
    //const navigate = useNavigate();

    useEffect(() => {
      const uploadFile = () => {
        const name = new Date().getTime() + file.name;
  
        console.log(name);
        const storageRef = ref(storage, file.name);
       
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPerc(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, img: downloadURL }));
              console.log("file name is");
              console.log(downloadURL);
            });
          }
        );
      };
      file && uploadFile();
    }, [file]);

    const authListener=()=>{
    onAuthStateChanged(authentication, (User) => {
        if (User) {
             setuserid(User.uid);
            }
            else{
                setuserid('');
            }
    });
}
useEffect(()=>{
    authListener();
},[]);
    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
      };
      
  const handleAdd = async(e) => {
    e.preventDefault();
       
    WriteUserData(userid,data.UserName,data.Status,0,0,data.img)
                //navigate(-1)
                alert("done");
                submitted=true;
               // window.open("./userlist");
}
    
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item
      name="UserName"
       label="UserName"
       rules={[
        {
          required: true,
          message: 'Please enter the usename!',
          type: 'text',
        },
      ]}
       >
        <Input id="UserName"  placeholder="Zuck" onChange={handleInput} />
      </Form.Item>
      <Form.Item 
      name="Status"
      label="Status"
      rules={[
        {
          required: true,
          message: 'Please enter the status!',
          type: 'text',
        },
      ]}
      >
        <Input id="Status" type="text" placeholder="Hey! I am using facebook"  onChange={handleInput}/>
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload"
        type="file"
        id="file"
        onChange={(e) => setFile(e.target.files[0])}
        rules={[
          {
            required: true,
            message: 'Please enter the image!',
          },
        ]}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>upload image</Button>
        </Upload>
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        {submitted?(<UserList/>):(
        <Button type="primary" onClick={handleAdd} disabled={per!==null &&per<100}  >Submit</Button>)}
      </Form.Item>
    </Form>
  );

};

export default () => <FormLayoutDemo />;