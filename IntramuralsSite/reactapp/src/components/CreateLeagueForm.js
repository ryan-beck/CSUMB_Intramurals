import React, { Component } from 'react';
import axios from "axios"; 

class CreateSportForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // TODO: pass id of selected sport as prop
            sportId: 1,
            leagueName: "",
            startDate: "",
            endDate: "",
            startRegDate: "",
            endRegDate: "",
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }


    onChangeHandler(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    submitHandler(event) {
        event.preventDefault();
        // TODO: implement form validation
        axios({
            method:'post', 
            url: 'http://localhost:8000/api/createLeague/', 
            data: {
              sport: this.state.sportId,
              league_name: this.state.leagueName,
              start_date: this.state.startDate,
              end_date: this.state.endDate,
              reg_start_date: this.state.startRegDate,
              reg_end_date: this.state.endRegDate
            }})
            .then(({data}) => {
                console.log(data);
            });
    }
    

    render () {
        return (
            <div>
                <h2>Create a League</h2>
                <form onSubmit={this.submitHandler}>
                    <label>League Name</label> <br/>
                    <input type="text" placeholder="ex: 'Fall 2021: 3v3'" name="leagueName" value={this.state.leagueName} onChange={this.onChangeHandler}/> <br/>
                    <label>League Start Date </label> <br/>
                    <input type="date" name="startDate" value={this.state.startDate} onChange={this.onChangeHandler}/> <br/>
                    <label>League End Date </label> <br/>
                    <input type="date" name="endDate" value={this.state.endDate} onChange={this.onChangeHandler}/> <br/>
                    <label>Registration Start Date </label> <br/>
                    <input type="date" name="startRegDate" value={this.state.startRegDate} onChange={this.onChangeHandler}/> <br/>
                    <label>Registration End Date </label> <br/>
                    <input type="date" name="endRegDate" value={this.state.endRegDate} onChange={this.onChangeHandler}/> <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default CreateSportForm;