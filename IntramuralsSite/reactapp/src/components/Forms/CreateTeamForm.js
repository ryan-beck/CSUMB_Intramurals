import React, { Component } from 'react';
import axios from "axios"; 

import '../../style/modal.css';

class CreateTeamForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leagueId: props.leagueId,
            user: props.user,
            playerExists: props.playerExists,
            teamName: "",
            playerLimit: 0,
            checked: false,
            password: "",
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.checkBoxHandler = this.checkBoxHandler.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/getLeagueById/'+this.state.leagueId)
        .then(res => res.json())
        .then((res) => {
            this.setState({
                playerLimit: res.player_limit
            });
        });
    }

    onChangeHandler(event) {
        this.setState(
            {
                [event.target.name] : event.target.value,
            }
        )
    }

    checkBoxHandler() {
        this.setState({ checked: !this.state.checked });
    }


    submitHandler(event) {
        event.preventDefault();
        var isTeamPrivate = document.getElementById("isPrivate").checked;
        if(this.state.checked) {
            var teamPassword = document.CreateTeamForm.teamPassword.value
        } else {
            var teamPassword = ""
        }
        let teamData = {
            team_name: this.state.teamName,
            league: this.state.leagueId,
            players: [this.state.user.id],
            is_open: !isTeamPrivate,
            captain: this.state.user.id,
            password: teamPassword,
          }
        axios({
            method:'post', 
            url: 'http://localhost:8000/api/createTeam/', 
            data: teamData
        })
        .then(({data}) => {
            console.log(data)
            window.location.reload();
        });
    }

   
    render () {
        //const content = this.state.isPrivate ? <div> Content </div> : null;
        return (
            <div>
                {(() => {
                    if (this.state.playerExists) {
                        return (
                            <div> 
                                <label className="modalText">You are already on a team in this league.</label>
                            </div>
                        );
                    } else {
                        return(
                            <div>
                                <h2 className="modalText">Add a New Team</h2>
                                <form onSubmit={this.submitHandler}>
                                    <label className="modalText checkboxSpace">Team Name</label>
                                    <input type="text" maxLength="16" name="teamName" value={this.state.teamName} onChange={this.onChangeHandler} required/> <br/><br/>
                                    <label className="modalText checkboxSpace">Would you like this team to be invite only?</label>
                                    <label className="modalText checkboxSpace">Would you like this team to be invite only?</label>
                                    <input type="checkbox" id="isPrivate" checked={this.state.checked} onChange={this.checkBoxHandler}/> <br/><br/>
                                    {this.state.checked ? <div><label className="modalText">Password:</label><input type="text" name="teamPassword" defaultValue={this.state.password} onChange={this.onChangeHandler} required/> </div>  : null}
                                    <input className="submitHandler right" type="submit" value="Submit"/>
                                </form>
                            </div>
                        );
                    }
                })()}
            </div>
            
        )
    }
}

export default CreateTeamForm;