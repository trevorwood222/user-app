import React,{useState,useEffect} from 'react';
import './Login.scss';

import useUserState from '../../store/user';

import {withRouter} from 'react-router-dom';
import {request} from '../../services/apiService';

const Login = (props) => {
  const [user,setUser] = useUserState();
  const [name,setName] = useState("realuser@gmail.com");
  const [password,setPassword] = useState("realpass");
  const [valid,setValid] = useState(false);

  useEffect(() => {
    setValid(name !== "" && password !== "")
  },[name,password])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === "realuser@gmail.com" & password === "realpass"){
      setUser(name)
    }else{

    }

    // Here you would handle login, if we had a real api set up.
    // requestLogin()
  }

  const requestLogin = () => {
    
    const data = {
      "username": name,
      "password": password,
    }
  
    const observer = {
      next: function(next) {
        // check if username pass was right
        // if so, go to next screen
        // else, say why it failed
      },
      error: function(error) {
        // say why it failed
      },
      complete: function() {
        // remove loading animation
      }
    }

    // start loading animation
    request("/api-mock-up/login/login.json","userLogin", data, observer);
  } 

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" defaultValue={name} onChange={(e) => {setName(e.target.value)}}/>
        <input type="password" placeholder="Password" defaultValue={password} onChange={(e) => {setPassword(e.target.value)}}/>
        <input disabled={!valid} type="submit" />
      </form>

    </div>
  );
};

export default withRouter(Login);