import React, { Component } from 'react';
import axios from "axios"; 

class CreateSportForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sportName: ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    onChangeHandler(event) {
        this.setState(
            {
                sportName: event.target.value
            }
        )
    }

    submitHandler(event) {
        event.preventDefault();
        axios({
            method:'post', 
            url: 'http://localhost:8000/api/createSport/', 
            data: {
              sport_name: this.state.sportName,
              is_active: true
            }})
            .then(({data}) => {
                console.log(data);
            });
    }
    

    render () {
        return (
            <div>
                <h2>Create a new sport {this.state.sportName}</h2>
                <form onSubmit={this.submitHandler}>
                    <label>Sport Name</label> <br/>
                    <input type="text" value={this.state.sportName} onChange={this.onChangeHandler}/> <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default CreateSportForm;