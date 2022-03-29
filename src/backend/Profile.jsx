import React, { useState,useEffect } from "react";
import Cropper from "react-cropper";
import { toast } from 'react-toast-notification';
import axios from 'axios';
import "cropperjs/dist/cropper.css";
import "./../assets/slider.css";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import LockOpenIcon from '@material-ui/icons/LockOpen';


const Profile = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
            margin: theme.spacing(1),
            },
        }
    }));
    const classes = useStyles();
    const [userdata,setUserData] = useState({
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        name:JSON.parse(localStorage.getItem("userInfo")).name,
        email:JSON.parse(localStorage.getItem("userInfo")).email,
        phone:JSON.parse(localStorage.getItem("userInfo")).phone,
        password:JSON.parse(localStorage.getItem("userInfo")).password,
        profile:JSON.parse(localStorage.getItem("userInfo")).profile,
        nameErr:'',
        emailErr:'',
        phoneErr:'',
        passwordErr:"",
        profileErr:""
    });

    const [Image, setImage] = useState("");
    useEffect(()=>{
        console.log("UserInfo :",localStorage.getItem("userInfo"));
        console.log("userdata :",userdata);
    },[]);
    
    const updateUserData = (event) => {
        if(event.target.value.trim() != ""){
            if(event.target.name == "name"){
                let name = event.target.value;
                setUserData ((userinfo) => { return {...userinfo,name:name,nameErr:''}; })
            } 
            if(event.target.name == "email"){
                let uname = event.target.value;
                setUserData ((userinfo) => { return {...userinfo,email:uname,emailErr:''}; })
            } 
            if(event.target.name == "phone"){
                let phone = event.target.value;
                setUserData ((userinfo) => { return {...userinfo,phone:phone,phoneErr:''}; })
            } 
            if(event.target.name == "password"){
                let pw = event.target.value;
                setUserData ((userinfo) => { return {...userinfo,password:pw,passwordErr:''}; })
            }
        }
        if(event.target.name == "profile"){
            if(event.target.files.length){
                event.preventDefault();
                let files;
                if (event.dataTransfer) {
                files = event.dataTransfer.files;
                } else if (event.target) {
                files = event.target.files;
                }
                const reader = new FileReader();
                reader.onload = () => {
                    setUserData ((userinfo) => { return {...userinfo,profile:reader.result,profileErr:''}; })
                };
                reader.readAsDataURL(files[0]);
            }
        }
    }

    const onChange = (e) => { 
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
        files = e.dataTransfer.files;
        } else if (e.target) {
        files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
        setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    }; 

    // Submit Profile
    const SubmitProfile = () => {
        console.log("userdata",userdata);
        var tmp = 0;
        if(userdata.name == ""){
            setUserData ((userinfo) => { return { ...userinfo, nameErr:"Please enter name."}; })
            tmp = 1;
        }else{
            setUserData ((userinfo) => { return { ...userinfo, nameErr:""}; })
        }

        if(userdata.email == ""){
            setUserData ((userinfo) => { return { ...userinfo, emailErr:"Please enter email."}; })
            tmp = 1;
        }else{
            setUserData ((userinfo) => { return { ...userinfo, emailErr:""}; })
        }
        
        if(userdata.phone == ""){
            setUserData ((userinfo) => { return { ...userinfo, phoneErr:"Please enter phone."}; })
            tmp = 1;
        }else{
            setUserData ((userinfo) => { return { ...userinfo, phoneErr:""}; })
        }

        if(userdata.password == "" ){
            setUserData ((userinfo) => { return { ...userinfo, passwordErr:"Please enter password."}; })
            tmp = 1;
        }else{
            setUserData ((userinfo) => { return { ...userinfo, passwordErr:""}; })
        }

        if(userdata.profile == "" ){
            setUserData ((userinfo) => { return { ...userinfo, profileErr:"Please select profile image."}; })
            tmp = 1;
        }else{
            setUserData ((userinfo) => { return { ...userinfo, profileErr:""}; })
        }
 
        if(tmp == 0){
            // Make a request for a user with a given ID
            axios.post('http://localhost:5000/api/updateProfile',{ 
                name: userdata.name,
                email: userdata.email,
                phone: userdata.phone,
                password: userdata.password,
                profile:userdata.profile,
                id: userdata.id
            }).then(function(response){
                console.log(response);
                console.log(typeof response.status != 'undefined' && response.status == 200);
                if(typeof response.status != 'undefined' && response.status == 200){
                    localStorage.setItem("userInfo",JSON.stringify(response.data.data));
                    console.log("Updated",localStorage.getItem("userInfo"));

                    setUserData ((userinfo) => { return {
                            ...userinfo,
                            name:JSON.parse(localStorage.getItem("userInfo")).name,
                            email:JSON.parse(localStorage.getItem("userInfo")).email,
                            phone:JSON.parse(localStorage.getItem("userInfo")).phone,
                            profile:JSON.parse(localStorage.getItem("userInfo")).profile,
                            password:JSON.parse(localStorage.getItem("userInfo")).password,
                            id:JSON.parse(localStorage.getItem("userInfo")).id
                        }; 
                    })

                    toast('User profile updated successfully !', {
                        status: 'Success', 
                        type: 'success',
                        autoHide: true,
                        delay: '7000'
                    })
                    document.getElementById("signupForm").reset();
                }else{ 
                    toast('Something is wrong. Please try again !', {
                        status: 'Error', 
                        type: 'error',
                        autoHide: true,
                        delay: '7000'
                    })
                }
            }).catch(function(error){
                // handle error
                console.log(error);
            }).then(function(){
                // always executed
            });
        }
    }

    // Change Password
    const [passwordData,setPasswordData] = useState({
        oldPassword:"",
        newPassword:"",
        cPassword:"",
        oldPasswordErr:"",
        newPasswordErr:"",
        cPasswordErr:"",
    });

    const updatePasswordData = (event) => {
        if(event.target.value.trim() != ""){
            if(event.target.name == "oldPassword"){
                let name = event.target.value;
                setPasswordData ((pwinfo) => { return { ...pwinfo, oldPasswordErr:""}; })
            } 
            if(event.target.name == "newPassword"){
                let name = event.target.value;
                setPasswordData ((pwinfo) => { return { ...pwinfo, newPasswordErr:""}; })
            } 
            if(event.target.name == "cPassword"){
                let name = event.target.value;
                setPasswordData ((pwinfo) => { return { ...pwinfo, cPasswordErr:""}; })
            } 
        }
    }
    
    const changePassword = () =>{
        var tmp = 0;
        if(passwordData.oldPassword == ""){
            setPasswordData ((pwinfo) => { return { ...pwinfo, oldPasswordErr:"Please enter old password."}; })
            tmp = 1;
        }else{
            setPasswordData ((pwinfo) => { return { ...pwinfo, oldPasswordErr:""}; })
        }

        if(passwordData.newPassword == ""){
            setPasswordData ((pwinfo) => { return { ...pwinfo, newPasswordErr:"Please enter new password."}; })
            tmp = 1;
        }else{
            setPasswordData ((pwinfo) => { return { ...pwinfo, newPasswordErr:""}; })
        }
        
        if(passwordData.cPassword == ""){
            setPasswordData ((pwinfo) => { return { ...pwinfo, cPasswordErr:"Please enter Confirm password."}; })
            tmp = 1;
        }else if(passwordData.cPassword == passwordData.newPassword){
            setPasswordData ((pwinfo) => { return { ...pwinfo, cPasswordErr:"New Password and confirm password must be same"}; })
        }
        if(tmp == 0){

        }
    }


  return (
    <div>
      <div className="row">
        <div className="col-md-12 form-group">
            <div className="card">
                <div className="card-header"><h4><span><AccountBoxIcon/></span>&nbsp;Profile</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 form-group"><h5>Personal Information</h5></div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <div className="row">
                                <div className="col-md-1 form-group">
                                    <label className="control-label">Name:</label>
                                </div>
                                <div className="col-md-4 form-group">
                                    <input type="text" onChange={updateUserData} name="name" className="form-control" placeholder="Name" value={userdata.name} />
                                    <span className="text text-danger">{userdata.nameErr}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1 form-group">
                                    <label className="control-label">Email:</label>
                                </div>
                                <div className="col-md-4 form-group">
                                    <input type="text" onChange={updateUserData} name="email" className="form-control" placeholder="Email" value={userdata.email}  />
                                    <span className="text text-danger">{userdata.emailErr}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1 form-group">
                                    <label className="control-label">Phone:</label>
                                </div>
                                <div className="col-md-4 form-group">
                                    <input type="text" onChange={updateUserData} name="phone" className="form-control" placeholder="Phone" value={userdata.phone}  />
                                    <span className="text text-danger">{userdata.phoneErr}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-1 form-group">
                                    <label className="control-label">Profile:</label>
                                </div>
                                <div className="col-md-4 form-group">
                                    <div className={classes.root}>
                                        <input name="profile" onChange={updateUserData} accept="image/*" id="icon-button-file" type="file" style={{display:'none'}} />
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </div>
                                    <span className="text text-danger">{userdata.profileErr}</span>
                                </div>
                            </div> 
                        </div>
                    <div className="col-md-4">
                            <img src={"http://localhost:3000/images/profileImages/"+userdata.profile} height="200" width="200"  />
                    </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-12 form-group">
                        <button type="button" className="btn btn-primary" onClick={SubmitProfile}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="card">
                <div className="card-header"><h4><span><LockOpenIcon/></span>&nbsp;Change Password</h4></div>
                <div className="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div className="row">
                                <div className="col-md-1 form-group">
                                    <label className="control-label">Old Password:</label>
                                </div>
                                <div className="col-md-4 form-group">
                                    <input type="password" onChange={updatePasswordData} name="oldPassword" className="form-control" placeholder="Old Password" value={passwordData.name} />
                                    <span className="text text-danger">{passwordData.oldPasswordErr}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div className="row">
                                <div className="col-md-1 form-group">
                                    <label className="control-label">New Password:</label>
                                </div>
                                <div className="col-md-4 form-group">
                                    <input type="password" onChange={updatePasswordData} name="newPassword" className="form-control" placeholder="New Password" value={passwordData.newPassword} />
                                    <span className="text text-danger">{passwordData.newPasswordErr}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div className="row">
                                <div className="col-md-1 form-group">
                                    <label className="control-label">Confirm Password:</label>
                                </div>
                                <div className="col-md-4 form-group">
                                    <input type="password" onChange={updatePasswordData} name="cPassword" className="form-control" placeholder="Confirm Password" value={passwordData.cPassword} />
                                    <span className="text text-danger">{passwordData.cPasswordErr}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-12 form-group">
                        <button type="button" className="btn btn-primary" onClick={changePassword}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
      </div>
    </div>
  );
};
export default Profile;