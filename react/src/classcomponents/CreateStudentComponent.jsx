import React, { Component } from 'react'
import { Universities, Courses, Year } from '../models/constants';
import SelectComponent from './selectComponent';
import ValidationComponent from './ValidationComponent';

class CreateStudentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Username:'',
            StudentName: '',
            University:'Amravati',
            Course: 'IT',
            Year: 'First Year',
            Fees:0,
            disable: false,
            validName: true,
            validFees: true
         }
    }

    getSelectedUniversity(val) {
        console.log(`Value Received from SelectComponent ${val}`);
        this.setState({University: val});
    }
    getSelectedCourse(val) {
        console.log(`Value Received from SelectComponent ${val}`);
        this.setState({Course: val});
    }

    getSelectedYear(val) {
        console.log(`Value Received from SelectComponent ${val}`);
        this.setState({Year: val});
    }

    handleClear=(evt)=>{
        if(this.state.disable === false) {
        this.setState({'Username':''});
        }
        this.setState({'StudentName':''});
        this.setState({'University':'Amravati'});
        this.setState({'Course':'IT'});
        this.setState({'Year': 'First Year'});
        this.setState({'Fees':0});
    };

    handleSave(evt)    {
        if(this.state.validName === false || this.state.validFees === false)  {
            alert('Cannot save...');
            return;
        }
        let student = {
            Username: this.state.Username,
            StudentName: this.state.StudentName,
            University: this.state.University,
            Course: this.state.Course,
            Year: this.state.Year,
            Fees: this.state.Fees
        };
        if(this.state.disable === true) {
            this.setState({disable: false});
        }
        
        this.handleClear();
        this.props.saveData(student);
    }

    
    handleInputs=(evt)=> {
        this.setState({[evt.target.name]: evt.target.value});
    }

    validName=(value) => {
        if(this.state.validName !== value)  {
            this.setState({validName: value});
        }
    }
    validFees=(value) => {
        if(this.state.validFees !== value)  {
            this.setState({validFees: value});
        }
    }

    componentDidMount()    {   
            console.log(this.props.updateValues.Year);
        
            this.setState({disable: this.props.update})
            this.setState({'Username': this.props.updateValues.Username});
            this.setState({'StudentName':this.props.updateValues.StudentName});
            this.setState({'University': this.props.updateValues.University});
            this.setState({'Course': this.props.updateValues.Course});
            this.setState({'Year': this.props.updateValues.Year});
            this.setState({'Fees': this.props.updateValues.Fees});
    }

    render() { 
        return ( 
            <div className="container">
            <div className="form-group">
                  <label>Username</label>
                  <input type="text" value={this.state.Username} name="Username" 
                    onChange={this.handleInputs.bind(this)} 
                  className="form-control" style={{'width': '25%'}} disabled={this.state.disable}/>
               </div>
               <div className="form-group">
                  <label>Student Name</label>
                  <input type="text" value={this.state.StudentName} name="StudentName" 
                  onChange={this.handleInputs.bind(this)}
                  className="form-control" style={{'width': '25%'}}/>
                  <ValidationComponent name="StudentName" data={this.state.StudentName} Valid={this.validName.bind(this)}></ValidationComponent>
               </div>
               <div className="form-group">
                  <label>University</label>
                  <SelectComponent name="University" data={this.state.University} selectedValue={this.getSelectedUniversity.bind(this)}  dataSource={Universities}></SelectComponent>
               </div>
               <div className="form-group">
                 <label>Courses</label>
                 <SelectComponent name="Course" data={this.state.Course} selectedValue={this.getSelectedCourse.bind(this)} dataSource={Courses}></SelectComponent>
               </div>
               <div className="form-group">
                 <label>Year</label>
                 <SelectComponent name="Year" data={this.state.Year} selectedValue={this.getSelectedYear.bind(this)} dataSource={Year}></SelectComponent>
               </div>
               <div className="form-group">
                  <label>Fees</label>
                  <input type="text" value={this.state.Fees} name="Fees" 
                  onChange={this.handleInputs.bind(this)} className="form-control" style={{'width': '25%'}}/>
                  <ValidationComponent name="Fees" data={this.state.Fees} Valid={this.validFees.bind(this)}></ValidationComponent>
               </div>
               <div className="form-group">
                   <input type="button"  value="New" onClick={this.handleClear.bind(this)} className="btn btn-warning"/>
                   <input type="button" value="Save" onClick={this.handleSave.bind(this)} className="btn btn-success"/>
               </div>
               </div>
         );
    }
}
 
export default CreateStudentComponent;