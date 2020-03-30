import React, { Component } from 'react'
import HeaderComponent from './headercomponent';
import SecureCallService from '../services/securecallservice';
import ValidationComponent from './ValidationComponent';


class RegisterComponent extends Component   {
    constructor(props)   {
        super(props);
        this.state = {
            username: '',
            password: '',
            uniqueUsername: true,
            strgpass: false
         };
         this.serv = new SecureCallService();
    }

    clearInputs=() => {
        this.setState({username: ''});
        this.setState({password: ''});

    }

    RegisterUser=()=>{
        if(this.state.username === '' || this.state.password === '')    {
            alert('All input fields are required');
            return;
        }
        if(this.state.uniqueUsername === false || this.state.strgpass === false)  {
            alert('Cannot submit the data');
            return;
        }
        const user = {
            Username: this.state.username,
            Password: this.state.password
        };
        this.serv.register(user)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
            console.log(JSON.stringify(response.data));
            alert('Added the record successfully');
            }
            else{
                alert('Something went wrong');
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });
        this.clearInputs();
        this.props.history.push('/login');
    }

    handleInput=(evt) => {
        this.setState({[evt.target.id]: evt.target.value})
    }


    getSelectedUniversity(val) {
        console.log(`Vaule Received from SelectComponent ${val}`);
        this.setState({university: val})
    }
    getSelectedCourse(val) {
        console.log(`Vaule Received from SelectComponent ${val}`);
        this.setState({course: val})
    }

    checkForUniqueID(evt)  {

        let username = {
            Username: evt.target.value
        }
        this.serv.checkForUniqueId(username)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
            console.log(JSON.stringify(response.data));
            this.setState({uniqueUsername: false});
            }
            else{
                this.setState({uniqueUsername: true});
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });
    }

    checkPwd(value)  {
        if(this.state.strgpass !== value)   {
            this.setState({strgpass: value});
        }
    }

    render()    {
        return (
        <div>
        <HeaderComponent ></HeaderComponent>
        <center>
        <div className="container">
        <h3 style={{'font-weight': 'bold'}}>Registration Page</h3>
        <br/>
        <br/>
           <div className="form-group">
              <input type="text" placeholder="Username" className="form-control" style={{'width': '25%'}} value={this.state.username} onChange={this.handleInput.bind(this)} onBlur={this.checkForUniqueID.bind(this)} id="username"  required/>
              <ValidationComponent name="Username" data={this.state.uniqueUsername}></ValidationComponent>
           </div>
           <div className="form-group">
              <input type="password" placeholder="Password" className="form-control" style={{'width': '25%'}} value={this.state.password} onChange={this.handleInput.bind(this)} id="password"  required/>
              <ValidationComponent name="Password" data={this.state.password} Valid={this.checkPwd.bind(this)}></ValidationComponent>
           </div>
           <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-success" onClick={this.RegisterUser} name="submit" />
           </div> 
        </div>
        </center>
        </div>
        );
    }
}

export default RegisterComponent;