import React, { Component } from 'react';
class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        }
    }
    handleChange(evt){
        console.log(evt.target.value);
        this.props.selectedValue(evt.target.value);
    }
    render() { 
       
        return (
            <div>
              {
                  <select className="form-control" value={this.props.data} style={{'width': '25%'}} onChange={this.handleChange.bind(this)}>
                 {
                     this.props.dataSource.map((d,i) => (
                         <option key={i} value={d}>{d}</option>
                     ))
                 }
                </select> 
            }
            </div>
         );
    }
}
 
export default SelectComponent;