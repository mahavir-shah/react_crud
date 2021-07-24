import React,{ useState, useEffect } from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import axios from 'axios';
import './../assets/login.css';
import { toast } from 'react-toast-notification';
const Register = () => {
    let history = useHistory(); 
    const [userdata,setUserData] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        profile:'',
        nameErr:'',
        emailErr:'',
        phoneErr:'',
        passwordErr:"",
        profileErr:""
    });
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
        }else{
            let name = event.target.name;
            let value = event.target.value;
            let error = name.toString() + "Err";
            setUserData ((userinfo) => { return {...userinfo,name:value,error:"Please enter "+name}; })
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

    const CheckLogin = () => {
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
            axios.post('http://localhost:5000/api/signup',{
                name: userdata.name,
                email: userdata.email,
                phone: userdata.phone,
                password: userdata.password,
                profile:userdata.profile
              }).then(function(response){
                  console.log(response);
                  console.log(typeof response.status != 'undefined' && response.status == 200);
                if(typeof response.status != 'undefined' && response.status == 200){ 
                    document.getElementById("signupForm").reset();
                    toast('User register successfully !', {
                        status: 'Success', 
                        type: 'success',
                        autoHide: true,
                        delay: '7000'
                    })
                }else{ 
                    toast(response.status, {
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

    return (
        <div className="container loginPage signup-page">
            <div className="d-flex justify-content-center h-100">
                <div className="card" style={{height:"575px"}}>
                    <div className="card-header">
                        <h3>Sign Up</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                        <form id="signupForm">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Name" name="name" value={userdata.name} onChange={updateUserData} />
                            </div>
                            <div className="text-danger form-group">{userdata.nameErr}</div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-email"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Email" name="email" value={userdata.email} onChange={updateUserData} />
                            </div>
                            <div className="text-danger form-group">{userdata.emailErr}</div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="number" className="form-control" placeholder="Phone" name="phone" value={userdata.phone} onChange={updateUserData} />
                            </div>
                            <div className="text-danger form-group">{userdata.phoneErr}</div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>  
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={updateUserData} value={userdata.password} />
                            </div>
                            <div className="text-danger form-group">{userdata.passwordErr}</div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>  
                                <input type="file" className="form-control" name="profile" onChange={updateUserData} />
                            </div>
                            <div className="text-danger form-group">{userdata.profileErr}</div>
                            <div className="form-group">
                                <button type="button" className="btn float-right login_btn" onClick={CheckLogin}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer"> 
                        <div className="d-flex justify-content-center links">If You have already account then <NavLink to="/login" style={{ textDecoration:"none", color:"gray" }}>Login</NavLink></div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default Register;