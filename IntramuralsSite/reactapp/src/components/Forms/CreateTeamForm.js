import React, { Component } from 'react';
import axios from "axios"; 

import '../../style/modal.css';

class CreateTeamForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leagueId: props.leagueId,
            teamName: "",
            isPrivate: false,
            playerLimit: 0
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
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
                [event.target.name] : event.target.value
            }
        )
    }

    submitHandler(event) {
        event.preventDefault();

        console.log(this.state.isPrivate);
        let teamData = {
            league: this.state.teamName,
            players: this.state.logoUrl,
            is_open: true,
            captain: this.state.user
          }
        // axios({
        //     method:'post', 
        //     url: 'http://localhost:8000/api/createSport/', 
        //     data: sportData
        // })
        // .then(({data}) => {
        //     this.props.handleFormSubmit(sportData);
        // });
    }

    render () {
        return (
            <div>
                <h2 className="modalText">Add a New Team</h2>
                <form onSubmit={this.submitHandler}>
                    <label className="modalText checkboxSpace">Team Name</label>
                    <input type="text" name="teamName" value={this.state.teamName} onChange={this.onChangeHandler}/> <br/><br/>
                    <label className="modalText checkboxSpace">Would you like this team to be invite only?</label>
                    <input type="checkbox" name="isPrivate" value={this.state.isPrivate} onChange={this.onChangeHandler}/> <br/><br/>
                    <input className="submitHandler right" type="submit" value="Submit"/>
                </form>
            </div>
            
        )
    }
}

export default CreateTeamForm;