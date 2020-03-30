import React, { Component } from 'react';
import DataGridComponent from './DataGridComponent';
import SecureCallService from '../services/securecallservice';
import CreateStudentComponent from './CreateStudentComponent';
import {Link} from 'react-router-dom';


class StudentServiceComponent extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            student: {Username:'',StudentName: '',University: 'Amravati', Course: 'IT',Year: 'First Year', Fees: 0},
            students:[],
            option: 'University',
            search: '',
            checkUniversity: true,
            checkCourse: false,
            error: false,
            update: false
        };
        // define an instancve of HTTP Service
        this.serv = new SecureCallService();
        this.token = ''; 
    }
    
    

    handleSave=(student)=>{
        if(this.state.update === true)    {
            this.serv.putStudent(student, this.token)
            .then((response)=>{
                alert(`Data Updated ${response.data.data}`);
                this.loadData();
            }).catch((error)=>{
                console.log(`Error Occured ${error}`);
            });
            this.state.update = false;
            this.setState({student: {Username: '', StudentName: '', University: 'Amravati', Course: 'IT',Year: 'First Year', Fees: 0}});
        }
        else {
            console.log(student);
            
            this.serv.postStudent(student, this.token)
            .then((response)=>{
                if(response.data.data === "Cannot add more than 50")    {
                    alert('Cannot add students more than 50');
                }
                else{
                    alert(`Data Inserted`);
                    console.log(`Data Inserted ${JSON.parse(response.data.data)}`);
                    this.loadData();
                }
            }).catch((error)=>{
                alert('Error occured');
                console.log(`Error Occured ${error}`);
            });
        }
        this.props.history.push('/dashboard/displayStudents');
    }
    // the method that has calls to all heavy operations or external async calls
    componentDidMount=()=>{
        let tk = sessionStorage.getItem('token');
        if(tk !== null)    {
            this.token = tk;
            this.loadData();
        }
        else{
            this.props.history.push('/login');
        }
    }
    loadData=()=>{
        this.serv.getStudents(this.token)
        .then((response)=>{
            console.log(response.data.data);
            if(response.data.statusCode === 401)    {
                this.props.history.push('/login');
            }
            this.setState({'students': response.data.data});
        })
        .catch((error)=>{            
            console.log(`Error Occured ${error}`);
        });
    }

    updateRecord(s){       
        this.setState({student: s});
        this.state.update = true;
        this.props.history.push('/dashboard/createStudent');
    }


    deleteRecord(id)  {
        this.serv.deleteStudent(id, this.token)
            .then((response)=>{
                alert(`Data Deleted ${response.data.data}`);
                this.loadData();
            }).catch((error)=>{
                console.log(`Error Occured ${error}`);
            });
    }

    searchString(evt)  {
        this.setState({search: evt.target.value});
    }

    selectOption(evt)  {
        this.setState({option: evt.target.value});
        if(evt.target.value === "University")   {
            this.setState({checkUniversity: true});
            this.setState({checkCourse: false});
        }
        if(evt.target.value === "Course")   {
            this.setState({checkUniversity: false});
            this.setState({checkCourse: true});
        }

    }


    searchRecords() {
        this.serv.searchStudents(this.state.search, this.state.option, this.token)
        .then((response)=> {
            if(response.data.statusCode === 404)    {
                let student = [{
                    Username:'',
                    StudentName: '',
                    University: '',
                    Course: '',
                    Year: '',
                    Fees: ''
                }, response.data.statusCode];
                this.setState({students: student});
            }
            else{
            this.setState({students: response.data.data});
            }
        }).catch((error)=>{
            console.log(`Error Occured ${error}`);
        });
        
    }

    onEveryCharCheck(evt)    {
        if(evt.target.value === '') {
            this.loadData();
        }
    }

    logOut()    {
        sessionStorage.clear();
        this.props.history.push('/login');
    }

    render() {
         let styleSearch = {float: 'right', 'margin-right': 40};
         if(this.props.match.params.param === "createStudent") {
             
            return(
                <div className="container">
                
                <div style={{float: 'right', marginLeft: '60%'}}>
                <button className="btn btn-primary" onClick={this.logOut.bind(this)}>Log out</button>
                </div>
                <h2 style={{float: 'right'}}>School Administration</h2>
                <table className="table table-bordered table-dark ">
                  <thead>
                  <tr>
                        <td>
                            <Link to='/dashboard/displayStudents'>Display Students Record</Link>
                        </td>
                        <td>
                            <Link to="/dashboard/createStudent">Create Student</Link>
                        </td>
                     </tr>
                  </thead>
                </table>
                <CreateStudentComponent saveData={this.handleSave.bind(this)} updateValues={this.state.student} update={this.state.update}></CreateStudentComponent>
                </div>
            )
         }
        return (
            <div className="container">
                <div style={{float: 'right', marginLeft: '60%'}}>
                <button className="btn btn-primary" onClick={this.logOut.bind(this)}>Log out</button>
                </div>
                <center>
                <div>
               <h2 style={{float: 'right'}}>Administration</h2>
               </div>
               </center>
               <br/>
               <br/>
                <table className="table table-bordered table-striped">
                  <thead>
                  <tr>
                        <td>
                            <Link to='/dashboard/displayStudents'>Display Students Record</Link>
                        </td>
                        <td>
                            <Link to="/dashboard/createStudent">Create Student</Link>
                        </td>
                     </tr>
                  </thead>
                </table>
                
                <hr/>
                <div style={{marginBottom: '8%'}}>
                <div style={styleSearch} >
                    <button className="btn btn-primary" onClick={this.searchRecords.bind(this)}>Search</button>
                </div>
                <div style={styleSearch}>
                <span className="glyphicon glyphicon-search"></span>
                <input type="text" id="search" className="form-control form-control-md"  placeholder="Search" value={this.state.search} onChange={this.searchString.bind(this)} onKeyUp={this.onEveryCharCheck.bind(this)}/>
                </div>
                <div className="form-group" style={styleSearch} >
                <input type="radio" className="custom-control-input"   id="CourseOption" value="Course" onChange={this.selectOption.bind(this)}   name="selectOption" checked={this.state.checkCourse}/>
                <label className="custom-control-label" for="CourseOption">Course</label>
                </div>
                <div className="form-group" style={styleSearch} >
                <input type="radio" className="custom-control-input"  id="uniOption" value="University" onChange={this.selectOption.bind(this)}   name="selectOption" checked={this.state.checkUniversity}/>
                <label className="custom-control-label" for="uniOption">University</label>
                </div>
                </div>
                    <DataGridComponent dataSource={this.state.students} updateRow={this.updateRecord.bind(this)} deleteRow={this.deleteRecord.bind(this)}></DataGridComponent>
            </div>
        );
    }
}

export default StudentServiceComponent;