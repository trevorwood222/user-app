import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useUserState from '../../store/user';

function AuthRoute ({component: Component, ...rest}) {
  const [user] = useUserState();
  const authed = (user !== null && user !== undefined);
  console.log("user",user)
  console.log("AuthRoute authed",authed)
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to='/login' />}
    />
  )
}

export default AuthRoute;