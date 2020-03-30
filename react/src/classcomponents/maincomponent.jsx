import React, { Component } from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import LoginComponent from './login';
import RegisterComponent from './signup';
import StudentServiceComponent from './studentservicecomponent';



class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (           
              
            <Switch>
                <Route exact path="/login" component={LoginComponent}></Route>
                <Route exact path="/register" component={RegisterComponent}></Route>
                <Route exact path="/dashboard/:param" component={StudentServiceComponent}></Route>
                <Redirect to="/login"/>
            </Switch>
          );
    }
}
 
export default MainComponent;