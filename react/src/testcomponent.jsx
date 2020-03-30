import React, { Component } from 'react';


class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    handleSave() {
        this.setState({data:'My Message'});
        localStorage.setItem('data', this.state.data);
    }
    render() { 
        return (
            <div>
                <input type="button" value="Save Data" onClick={this.handleSave.bind(this)}/>
            </div>
        );
    }
}
 
export default MyComponent;