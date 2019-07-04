// Libraries
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Components
import Dash from './components/dash/Dash';
import NotFound from './components/notFound/NotFound';
import LoginRoute from './components/routes/LoginRoute';
import AuthRoute from './components/routes/AuthRoute';

// Config
import packageJson from '../package.json';

function App() {

  console.log("App Version: ",packageJson.version);
  console.log("React Version: ",React.version);

  const browserHistory = createBrowserHistory();

  browserHistory.listen((location, action) => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="app">
      <Router history={browserHistory}>
        <Switch>              
          <Route exact path={"/"} render={() => {return(<Redirect to="/dash" />)}} />
          <Route exact path={"/index.html"} component={() => {return(<Redirect to={"/dash"} />)}} />
          <LoginRoute exact path={"/login"} />
          <AuthRoute exact path={"/dash"} component={(props) => <Dash props={props} /> } />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
