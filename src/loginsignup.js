import axios from 'axios';
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function LoginSignup() {
    const [currentState,setCurrentState] = React.useState('login');
    const login = () => {
        const username = document.getElementById("usernameinput").value;
        const password = document.getElementById("passwordinput").value;
        const data = {
            username: username,
            password: password,
            type: 'login'
        };
        console.log(data);
        axios.post('/login', data)
        .then((response) => {
            if (response.data.status === 'success') {
                window.location.href = '/';
            }
            else if (response.data.status === 'fail') {
                alert('Incorrect username or password.');
            }
        })
        .catch((error) => {
            console.log(error);
        })
        ;
    }

    const signup = () => {
        const username = document.getElementById("usernameinput").value;
        const password = document.getElementById("passwordinput").value;
        const confpassword = document.getElementById("confpasswordinput").value;
        if (password !== confpassword) {
            alert('Passwords do not match.');
            return;
        }
        if (!CheckPassword(password)) {
            alert('Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.');
            return;
        }
        const data = {
            username: username,
            password: password,
            type: 'signup'
        };
        console.log(data);
        axios.post('/login', data)
        .then((response) => {
            if (response.data.status === 'success') {
                window.location.href = '/';
            }
            else if (response.data.status === 'fail') {
                alert('Incorrect username or password.');
            }
            else if (response.data.status === 'exists') {
                alert('Username already exists.');
            }
            else{
                window.location.href = '/';
            }
        })
        .catch((error) => {
            console.log(error);
        })
        ;
    }

    function CheckPassword(inputtxt) 
    { 
        var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(inputtxt.match(decimal)) 
        { 
            return true;
        }
        else
        { 
            return false;
        }
    }

    function loginSet(){
        setCurrentState('login');
    }

    function signupSet(){
        setCurrentState('signup');
    }

    if (currentState === 'login') {
        return (
            <div className='container'>
                <div className="buttons">
                    <button onClick={loginSet} style={{backgroundColor:"#9AD0C2"}}>Login</button>
                    <button onClick={signupSet}>Sign-Up</button>
                </div>
                <div className="fields">
                    <div className="username">
                        <input placeholder="Username" id="usernameinput" />
                    </div>
                    <div className="password">
                        <input placeholder="Password" id="passwordinput" type='password' />
                    </div>
                </div>
                <div className="go">
                    <button onClick={login}>GO</button>
                </div>
            </div>
        )
    }
    else if (currentState === 'signup') {
        return (
            <div className='container'>
                <div className="buttons">
                    <button onClick={loginSet}>Login</button>
                    <button onClick={signupSet} style={{backgroundColor:"#9AD0C2"}}>Sign-Up</button>
                </div>
                <div className="fields">
                    <div className="username">
                        <input placeholder="Username" id="usernameinput" />
                    </div>
                    <div className="password">
                        <input placeholder="Password" id="passwordinput" type='password' />
                    </div>
                    <div className='password'>
                        <input placeholder="Confirm Password" id="confpasswordinput" type='password' />
                    </div>
                </div>
                <div className="go">
                    <button onClick={signup}>GO</button>
                </div>
            </div>
        )
    }
}

const domContainer = document.querySelector('#ls');
const root = ReactDOM.createRoot(domContainer);
root.render(<LoginSignup />);