import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './Header';

function Login() {
    const initData={
        Username:"",
        Password:"",
    };
    const [loginForm,setLoginForm]=useState(initData);
    const[loginFormError,setLoginFormError]=useState(initData);
    const navigate=useNavigate();
    const ChangeHandler=(event)=>{
        setLoginForm({...loginForm,[event.target.name]:event.target.value,
        });
    };
    const loginClick=()=>{
        let hasError=false;
        let messages=initData;
        if(loginForm.Username.trim().length===0){
            hasError=true;
            messages={...messages,Username:"UserName Empty"};
        }
        if(loginForm.Password.trim().length===0){
            hasError=true;
            messages={...messages,Password:"Password Empty"};
        }
        if(hasError)setLoginFormError(messages);
        else{
            setLoginFormError(initData);
            axios.post("https://localhost:7121/User/Login",loginForm).then((d)=>{
                if(d.data){
                    localStorage.setItem("currentUser",d.data.token)
                    alert("User LogIn Successfully");
                    navigate("/employee");
                }else{
                    alert("Enter Valid Username/Password");
                    setLoginForm(initData);;
                }
            }).catch((e)=>{
                alert("Enter Valid Username/Password");
                setLoginForm(initData);
            })
        }
    }
  return (
    <div>
        {<Header/> } 
        <div className='row col-lg-6 mx-auto m-2 p-2'>
            <div className='card text-center'>
                <div className='card-header text-success'>Login</div>
                <div className='card-body'>
                    <div className='form-group row'>
                        <label className='col-lg-4' for='txtusername'>Username</label>
                        <div className='col-lg-8'>
                        <input type='text' id='txtusername' placeholder='Enter Username' name='Username' onChange={ChangeHandler} className='form-control'></input>
                        <p className='text-danger'>{loginFormError.Username}</p>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label className='col-lg-4' for='txtpassword'>Password</label>
                        <div className='col-lg-8'>
                        <input type='password' id='txtpassword' placeholder='Enter Password' name='Password' onChange={ChangeHandler} className='form-control'></input>
                        <p className='text-danger'>{loginFormError.Password}</p>
                        </div>
                    </div>
                </div>
                <div className='card-footer text-muted'>
                    <button onClick={loginClick} className='btn btn-info'>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Login