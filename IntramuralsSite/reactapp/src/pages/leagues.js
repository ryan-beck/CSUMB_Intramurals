import React from "react";
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import { StyleSheet } from "react-native";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



import axios from "axios";

import "../sports.css"


class LeaguePage extends Component {
	constructor(props) {
    super(props);


    this.state = {
	  user: props.user,
      sportsArray: [] ,
	  displayArray: [],
	  searchtTextInput: " ",
	  leagueArray: [],
	  teamsArray: [],
	  playerArray: [],
    };

	this.handleJoinTeam = this.handleJoinTeam.bind(this)
	this.checkTeam = this.checkTeam.bind(this)
	this.handleLeaveTeam = this.handleLeaveTeam.bind(this)

  }

	handleJoinTeam(event) {
		//console.log(event.target.value)
		var index;
		var a = this.state.teamsArray;
		for (index = 0; index < a.length; ++index) {
			if(a[index].id == event.target.value) {
				console.log(a[index].id)
				console.log(this.state.user.id)
				axios({
					method:'post',
					url: 'http://localhost:8000/api/joinTeam/',
					data: {
					  user_id: this.state.user.id,
					  team_id: event.target.value,
					}
				})
				.then(({data}) => {
					console.log(data);
					window.location.reload();
				});
			}
			
		}
	}

	handleLeaveTeam(event) {
		var index;
		var a = this.state.teamsArray;
		for (index = 0; index < a.length; ++index) {
			if(a[index].id == event.target.value) {
				console.log(a[index].id)
				console.log(this.state.user.id)
				axios({
					method:'post',
					url: 'http://localhost:8000/api/leaveTeam/',
					data: {
					  user_id: this.state.user.id,
					  team_id: event.target.value,
					}
				})
				.then(({data}) => {
					console.log(data);
					window.location.reload();
				});
			}
			
		}
	}

	checkTeam(teamID) {
		var index;
		var y;
		var a = this.state.teamsArray
		for (index = 0; index < a.length; ++index) {
			if(a[index].id == teamID) {
				var b = a[index].players
				for (y = 0; y < b.length; ++y) {
					if(b[y] === this.state.user.id) {
						return true;
					}
				}
			}	
		}
		return false
	}





	componentDidMount() {
		//console.log(this.props.props.match.params)
		fetch("http://localhost:8000/api/getSports/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				sportsArray: result,
				displayArray: result,
			  });
			  console.log(this.state.sportsArray)
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )

		fetch("http://localhost:8000/api/getLeagues/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				leagueArray: result,
			  });
			  console.log(this.state.leagueArray)
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )

		  fetch("http://localhost:8000/api/getTeamsByLeague/" + this.props.props.match.params.sport + '/' + this.props.props.match.params.league)
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				teamsArray: result,
			  });
			  console.log(this.state.teamsArray)
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )

		  fetch("http://localhost:8000/api/getAccounts/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  console.log(result)
			  this.setState({
					playerArray: result,
			  })
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )
	}






	render() {
		return (
			<Box>
				<h1 className="title">{this.props.props.match.params.sport}: {this.props.props.match.params.league}</h1>
				<div>
					<h4 className="teamlabel">Teams: </h4>
					<Box className="teamBox"> 
						{this.state.teamsArray.map((team, index) => (
							  <div key={index}>
								<div className="buttonDisplay">
									<h4><a href={'/team/'+ team.team_name +'/'+ team.id }><u>{team.team_name}</u></a></h4>
									{(() => {
										if (this.checkTeam(team.id)) {
											return (
											<div className="closedTag">  <Button className="joinButton" size="sm" onClick={this.handleLeaveTeam} value={team.id} > Leave? </Button>   </div>
											)
										} else if(!team.is_open) {
											return(
											<div className="closedTag"> <i> Closed </i> </div>
											)
										} else  {
											return (
											<Button className="joinButton" size="sm" onClick={this.handleJoinTeam} value={team.id} > Join </Button>
											)
										}
										})()} 
								</div>
								{team.players.map((player,index)=> (
									<div key={index}>
										{this.state.playerArray.map((playerObj,index) => (
											<div key={index}>
												{(() => {
													if (player == playerObj.id) {
														return (
														<div>{playerObj.display_name}</div>
														)
													} else {
														return (
														<div><h1> </h1></div>
														)
													}
													})()}
											</div>
										))}
									</div>
								))}
							  </div>
							))}
					</Box>
				</div>
			</Box>
		)
	}
}



export default LeaguePage;