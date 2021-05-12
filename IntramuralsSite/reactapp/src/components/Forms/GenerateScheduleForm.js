import React, { Component } from 'react';
import axios from "axios"; 

import '../../style/modal.css';

class GenerateScheduleForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leagueId: props.leagueId,
            gameNum: "",
            gameDay: "",
            startTime: "",
            gameLength: "",
            teamGamesPerDay: ""
        }

        this.setGameDay = this.setGameDay.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    setGameDay(day) {
        this.setState(
            {
                gameDay: day
            }
        )
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
        let gameData = {
            leagueId: this.state.leagueId,
            gameNum: this.state.gameNum,
            gameDay: this.state.gameDay,
            startTime: this.state.startTime,
            gameLength: this.state.gameLength,
            teamGamesPerDay: this.state.teamGamesPerDay
          }
        axios({
            method:'post', 
            url: 'http://localhost:8000/api/generateGameSchedule/', 
            data: gameData
        })
        .then(({data}) => {
            console.log(data);
            localStorage.setItem('default', 1);
            window.location.reload();
        });
    }
    

    render () {
        return (
            <div className="sportForm">
                <h2 className="modalText">Generate Game Schedule</h2>
                <form onSubmit={this.submitHandler}>
                    <label className="modalText">How many total games will each team play?</label> <br/>
                    <input type="number" name="gameNum" value={this.state.gameNum} onChange={this.onChangeHandler}/> <br/>
                    
                    <label className="modalText">What day of the week will games be played?</label> <br/>
                    <label className="dayPicker modalText"><input name="gameDay" type="radio" value="0" onChange={this.onChangeHandler}/>Mon</label>
                    <label className="dayPicker modalText"><input name="gameDay" type="radio" value="1" onChange={this.onChangeHandler}/>Tue</label>
                    <label className="dayPicker modalText"><input name="gameDay" type="radio" value="2" onChange={this.onChangeHandler}/>Wed</label>
                    <label className="dayPicker modalText"><input name="gameDay" type="radio" value="3" onChange={this.onChangeHandler}/>Thu</label>
                    <label className="dayPicker modalText"><input name="gameDay" type="radio" value="4" onChange={this.onChangeHandler}/>Fri</label>
                    <label className="dayPicker modalText"><input name="gameDay" type="radio" value="5" onChange={this.onChangeHandler}/>Sat</label>
                    <label className="dayPicker modalText"><input name="gameDay" type="radio" value="6" onChange={this.onChangeHandler}/>Sun</label>
                    
                    <br/>
                    <label className="modalText">At what time will games begin?</label> <br/>
                    <input type="time" name="startTime" value={this.state.startTime} onChange={this.onChangeHandler}/> <br/>
                    
                    <label className="modalText">About how long will each game take? (in minutes)</label> <br/>
                    <input type="number" name="gameLength" value={this.state.gameLength} onChange={this.onChangeHandler}/> <br/>

                    <label className="modalText">How many games will each team play on gamedays?</label> <br/>
                    <input type="number" name="teamGamesPerDay" value={this.state.teamGamesPerDay} onChange={this.onChangeHandler}/>

                    <input className="submitHandler" type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default GenerateScheduleForm;