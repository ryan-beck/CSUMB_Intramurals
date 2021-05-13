import React, { Component } from 'react';
import axios from "axios"; 

import '../../style/modal.css';

class JoinPasswordForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teamId: props.teamId,
            user: props.user,
            teamFull: props.teamFull,
            team: {},
            password: ""
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
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

    // addPlayer(account) {
    //     var newPlayers = this.state.team.players;

    //     if(newPlayers.includes(account.id)) {
    //         alert("This user is already on this team.");
    //         this.props.setModalVisible(false);
    //         return;
    //     }

    //     newPlayers.push(account.id)
    //     console.log(newPlayers)
    //     let teamData = {
    //         team_name: this.state.team.team_name,
    //         league: this.state.team.league,
    //         players: newPlayers,
    //         is_open: this.state.team.is_open,
    //         captain: this.state.team.captain
    //     } 

    //     axios({
    //         method:'put', 
    //         url: 'http://localhost:8000/api/editPlayers/'+this.state.teamId+'/', 
    //         data: teamData
    //     })
    //     .then(({data}) => {
    //         console.log(data)
    //         window.location.reload();
    //     });
    // }

    submitHandler(event) {
        event.preventDefault();
        var enteredPassword = document.JoinTeamPasswordForm.teamPassword.value;

        if(enteredPassword == this.state.team.password) {
            axios({
                method:'post',
                url: 'http://localhost:8000/api/joinTeam/',
                data: {
                  user_id: this.state.user.id,
                  team_id: this.state.teamId,
                }
            })
            .then(({data}) => {
                console.log(data);
                
                window.location.reload();

            });
        } else {
            alert("The password you entered is incorrect.");
        }

        // fetch('http://localhost:8000/api/getAccountByEmail/'+this.state.playerEmail)
        // .then(res => res.json())
        // .then((res) => {
        //     if(res.status == "DoesNotExist") {
        //         alert("The email you entered is not an account on CSUMB Intramurals.");
        //         this.props.setModalVisible(false);
        //         return
        //     } else {
        //         this.addPlayer(res);
        //     }
        // });
    }

    render () {
        return (
            <div>
                {(() => {
                    if (this.state.teamFull) {
                        return (
                            <div> 
                                <label className="modalText">This team is full.</label>
                            </div>
                        );
                    } else {
                        return(
                            <div>
                                <h2 className="modalText">Enter team password:</h2>
                                <form name="JoinTeamPasswordForm" onSubmit={this.submitHandler}>
                                    <input className="center" type="text" size="50" name="teamPassword" defaultValue={this.state.password} onChange={this.onChangeHandler} required/><br/>
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

export default JoinPasswordForm;