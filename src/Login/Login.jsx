import React,{ useState, useEffect } from 'react';
import {  useHistory, NavLink } from 'react-router-dom';
import axios from 'axios';
import './../assets/login.css';
import { toast } from 'react-toast-notification';
/*import 'https://use.fontawesome.com/releases/v5.3.1/css/all.css';*/
const Login = () => {
    let history = useHistory(); 
    const [userdata,setUserData] = useState({username:'',password:'',usernameErr:'',passwordErr:""});
    const updateUserData = (event) => {
        if(event.target.name == "username"){
            let uname = event.target.value;
            setUserData ((userinfo) => { return {...userinfo,username:uname}; })
        } 
        if(event.target.name == "password"){
            let pw = event.target.value;
            setUserData ((userinfo) => { return {...userinfo,password:pw}; })
        }
    }

    const CheckLogin = () => {
        var tmp = 0;
        if(userdata.username == "" ){
            setUserData ((userinfo) => { return { ...userinfo, usernameErr:"Please enter username."}; })
            tmp = 1;
        }else{
            setUserData ((userinfo) => { return { ...userinfo, usernameErr:""}; })
        } 

        if(userdata.password == "" ){
            setUserData ((userinfo) => { return { ...userinfo, passwordErr:"Please enter password."}; })
            tmp = 1;
        }else{
            setUserData ((userinfo) => { return { ...userinfo, passwordErr:""}; })
        }

        if(tmp == 0){
            // Make a request for a user with a given ID
            axios.post('http://localhost:5000/api/login',{
                email: userdata.username,
                password: userdata.password
              }).then(function(response){
                  console.log(response);
                  console.log(typeof response.status != 'undefined' && response.status == 200);
                if(typeof response.status != 'undefined' && response.status == 200 && response.data.length > 0){ 
                    localStorage.setItem("userInfo",JSON.stringify(response.data[0]));
                    console.log("Result",response.data[0]);
                    history.push('/admin/dashboard');
                }else{ 
                    toast('Invalid username & password !', {
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
        <div className="container loginPage signin-page">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Email" name="username" value={userdata.username} onChange={updateUserData} />
                            </div>
                            <div className="text-danger form-group">{userdata.usernameErr}</div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>  
                                <input type="password" className="form-control" placeholder="Password" name="password" onChange={updateUserData} value={userdata.password} />
                            </div>
                            <div className="text-danger form-group">{userdata.passwordErr}</div>
                            <div className="row align-items-center remember">
                                <input type="checkbox" />Remember Me
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn float-right login_btn" onClick={CheckLogin}>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer"> 
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<NavLink to='register'>Sign Up</NavLink>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;