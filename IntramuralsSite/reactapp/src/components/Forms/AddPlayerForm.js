import React, { Component } from 'react';
import axios from "axios"; 

import '../../style/modal.css';

class AddPlayerForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leagueId: props.leagueId,
            teamId: props.teamId,
            user: props.user,
            playerEmail: "",
            teamFull: props.teamFull,
            team: {},
            account: null
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8000/api/getTeamById/'+this.state.teamId)
        .then(res => res.json())
        .then((res) => {
            this.setState({
                team: res
            });
        });
    }

    onChangeHandler(event) {
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    addPlayer(account) {
        var newPlayers = this.state.team.players;

        if(newPlayers.includes(account.id)) {
            alert("This user is already on this team.");
            this.props.setModalVisible(false);
            return;
        }

        newPlayers.push(account.id)
        console.log(newPlayers)
        let teamData = {
            team_name: this.state.team.team_name,
            league: this.state.team.league,
            players: newPlayers,
            is_open: this.state.team.is_open,
            captain: this.state.team.captain
        } 

        axios({
            method:'put', 
            url: 'http://localhost:8000/api/editPlayers/'+this.state.teamId+'/', 
            data: teamData
        })
        .then(({data}) => {
            console.log(data)
            window.location.reload();
        });
    }

    submitHandler(event) {
        event.preventDefault();

        fetch('http://localhost:8000/api/getAccountByEmail/'+this.state.playerEmail)
        .then(res => res.json())
        .then((res) => {
            if(res.status == "DoesNotExist") {
                alert("The email you entered is not an account on CSUMB Intramurals.");
                this.props.setModalVisible(false);
                return
            } else {
                this.addPlayer(res);
            }
        });
    }

    render () {
        return (
            <div>
                {(() => {
                    if (this.state.teamFull) {
                        return (
                            <div> 
                                <label className="modalText">Player cannot be added, this team is full.</label>
                            </div>
                        );
                    } else {
                        return(
                            <div>
                                <h2 className="modalText">Add a Player</h2>
                                <form onSubmit={this.submitHandler}>
                                    <label className="modalText center">Input Player CSUMB Email</label><br/>
                                    <label className="modalText center">Player must be a CSUMB Intramurals user.</label><br/>
                                    <input className="center" type="text" size="50" name="playerEmail" value={this.state.playerEmail} onChange={this.onChangeHandler} required/><br/>
                                    <input className="submitHandler center" type="submit" value="Submit"/>
                                </form>
                            </div>
                        );
                    }
                })()}
            </div>
            
        )
    }
}

export default AddPlayerForm;