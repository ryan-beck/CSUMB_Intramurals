import React from "react";
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Button from 'react-bootstrap/Button';


import axios from "axios";

import "../../style/teamstab.css"


class TeamsTab extends Component {
	constructor(props) {
    super(props);


    this.state = {
	  user: props.user,
      sportsArray: [] ,
	  displayArray: [],
	  searchtTextInput: " ",
	  leagueArray: [],
	  teamsArray: props.teamsArray,
	  playerArray: [],
	  modalShow: false,
	  sportIsActive: props.sportIsActive
    };

	this.handleJoinTeam = this.handleJoinTeam.bind(this)
	this.checkTeam = this.checkTeam.bind(this)
	this.handleLeaveTeam = this.handleLeaveTeam.bind(this)

  }

	handleJoinTeam(event) {
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
					console.log(data.status);
					if(data.status == "PlayerExists") {
						alert("You are already on a team in this League")
						return
					}
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
				<div className="league-grid-container">
				{this.state.teamsArray.map((team, index) => (
					  <div key={index}>
					  <div className="league-grid-item">
						<div>
							<h4 className="league-title"><a href={'/team/'+ team.team_name +'/'+ team.id+'/'+ team.captain}><u>{team.team_name}</u></a></h4>
							{(() => {
								if(this.state.sportIsActive) {
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
										<div className="closedTag"><Button className="joinButton" size="sm" onClick={this.handleJoinTeam} value={team.id} > Join </Button></div>
										)
									}
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
												<div>
													<label className="playersDisplay">{playerObj.display_name}</label>
												</div>
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
					  </div>
					))}
				</div>
			</Box>
				
		)
	}
}



export default TeamsTab;