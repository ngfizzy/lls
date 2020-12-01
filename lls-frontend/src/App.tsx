import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MemberPortal from './MemberPortal';
import AdminPortal from './AdminPortal';
import Login from './Login';
import Signup from './Signup';
import { GeneralNavbar } from './shared';
import { Container } from 'react-bootstrap';

function App() {
  return (
      <Router>
          <Container>
        <div className="App">
            <GeneralNavbar />

              <Switch>
                <Route path="/" exact> <Redirect to="member" /> </Route>
                <Route path="/member" component={MemberPortal} />
                <Route path="/admin" component={AdminPortal} />
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="*" render={() => <h1>Page Not found</h1>} />
              </Switch>
          </div>
          </Container>
      </Router>
  );
}

export default App;
