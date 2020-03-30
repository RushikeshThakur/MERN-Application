import React,{Component} from 'react';
class ValidationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            setValidId: true,
            setValidName: true,
            setValidFees: true,
            setStrgPass: true
        }
    }

    validateForm(name, value)   {
        if(name === "StudentName")  {
            if(value.length > 20 || !value.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/) && value !== '')   {
                if(false !== this.state.setValidName)   {
                    this.setState({setValidName: false});
                    this.props.Valid(false);
                }
            } 
            else{
                if(true !== this.state.setValidName)    {
                    this.setState({setValidName: true});
                this.props.Valid(true);
                }
            }
        }
        
        if(name === 'Fees') {
            if(!value.toString().match("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$")) {
                if(false !== this.state.setValidFees)  {
                    this.setState({setValidFees: false})
                    this.props.Valid(false);
                }
            }
            else{
                if(true !== this.state.setValidFees)  {
                    this.setState({setValidFees: true})
                    this.props.Valid(true);
                }
            }
        }

        if(name === 'Password') {
            if(value.length < 4 && value.length >= 1) {
                if(this.state.setStrgPass !== false)    {
                    this.setState({setStrgPass: false});
                    this.props.Valid(false);
                }
            }
            else{
                if(this.state.setStrgPass !== true) {
                    this.setState({setStrgPass: true});
                    this.props.Valid(true);
                }
            }
        }
    }

    render()    {
        this.validateForm(this.props.name, this.props.data);
        if(this.props.name === 'StudentId') { 
            return (
                <div hidden={this.state.setValidId} className="alert alert-danger" style={{'width': '25%'}}>Student Id is not have length greater than 5 </div>
            );
        }
        if(this.props.name === 'StudentName') { 
            return (
                <div hidden={this.state.setValidName} className="alert alert-danger" style={{'width': '25%'}}>Student Name should contain only alphabets or length not greater than 20 </div>
            );
        }

        if(this.props.name === 'Fees')  {
            return (
                <div hidden={this.state.setValidFees} className="alert alert-danger" style={{'width': '25%'}}>Fees should only contain numbers</div>
            );
        }
        if(this.props.name === 'Username')  {
            return (
                <div hidden={this.props.data} style={{'width': '25%'}} className="alert alert-danger">Username already exist</div>
            );
        }
        if(this.props.name === 'LoginUsername')  {
            return (
                <div hidden={this.props.data} style={{'width': '25%'}} className="alert alert-danger">Username does not exist</div>
            );
        }
        if(this.props.name === 'Password')  {
            return (
                <div hidden={this.state.setStrgPass} style={{'width': '25%'}} className="alert alert-danger">Password - Minimum 4 character</div>
            );
        }

    }
}

export default ValidationComponent;