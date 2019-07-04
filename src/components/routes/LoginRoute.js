import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from '../login/Login';
import useUserState from '../../store/user';

function LoginRoute ({...rest}){
  const [user] = useUserState();
  const authed = (user !== null && user !== undefined);
  console.log("LoginRoute close");
  return(
    <Route 
      {...rest}
      render={(props) => authed === true
        ? <Redirect to="/" />
        : <Login />
      }
    />
  )
}

export default LoginRoute;