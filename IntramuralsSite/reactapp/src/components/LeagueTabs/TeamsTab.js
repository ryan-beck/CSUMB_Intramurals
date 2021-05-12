import React from "react";
import { Component, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Button from 'react-bootstrap/Button';


import axios from "axios";

import "../../style/teamstab.css"


class TeamsTab extends Component {
	constructor(props) {
    super(props);


    this.state = {
    	leagueId: props.leagueId,
		user: props.user,
		sportsArray: [] ,
		displayArray: [],
		searchtTextInput: " ",
		league: {},
		teamsArray: props.teamsArray,
		playerArray: [],
		modalShow: false,
		sportIsActive: props.sportIsActive
    };

	this.handleJoinTeam = this.handleJoinTeam.bind(this);
	this.checkTeam = this.checkTeam.bind(this);
	this.handleLeaveTeam = this.handleLeaveTeam.bind(this);
	this.hasLeagueBegun = this.hasLeagueBegun.bind(this);
	this.deleteHandler = this.deleteHandler.bind(this);
	this.handleJoinWithPassword = this.handleJoinWithPassword(this);

  }

	handleJoinTeam(event) {
		var index;
		var a = this.state.teamsArray;
		for (index = 0; index < a.length; ++index) {
			if(a[index].id == event.target.value) {
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
					if(data.status == "FullTeam") {
						alert("This team is full.")
						return
					} else if(data.status == "PlayerExists") {
						alert("You are already on a team in this league.")
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

	handleJoinWithPassword(event) {
		
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

		fetch("http://localhost:8000/api/getLeagueById/" + this.state.leagueId)
		  .then(res => res.json())
		  .then(
			(res) => {
			  this.setState({
				league: res,
			  });
			}
		  )

		  fetch("http://localhost:8000/api/getAccounts/")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
					playerArray: result,
			  })
			},
			(error) => {
			  console.log("Error in database call")
			}
		  )
	}

	hasLeagueBegun() {
		var parts =String(this.state.league.start_date).split('-');
		var today = new Date();
		var mydate = new Date(parts[0], parts[1] - 1, parts[2]);

		return mydate < today;
	}

	deleteHandler(teamId) {
	    axios({
	        method:'delete', 
	        url: 'http://localhost:8000/api/deleteTeam/'+teamId,
	    })
	    .then(({data}) => {
	        window.location.reload(); 
	    });
	}

	render() {
		return (
			<Box> 
				{(() => {
					if (this.state.teamsArray.length == 0) {
						return (
							<div className="no-team"> 
								<label>
									There are no teams to display.
								</label>
							</div>
						);
					}
				})()}
				<div className="league-grid-container">
				
				{this.state.teamsArray.map((team, index) => (
					  <div key={index}>
					  <div className="league-grid-item">
						<div>
							{(() => {
								if (this.props.isAdminView) {
									return (
									<Fragment>
										<span className="admin-view-delete">
											<input name="deleteButton" className="deleteTeam" type="button" value="Delete This Team" onClick={() => this.deleteHandler(team.id)}/>
										</span>
										</Fragment>
									)
								}
							})()}
							<h4 className="league-title"><a href={'/team/'+ team.team_name +'/'+ team.id+'/'+ team.captain+'/'}><u>{team.team_name}</u></a></h4>
							
							{(() => {
								if(this.state.sportIsActive && !this.hasLeagueBegun()) {
									if (this.checkTeam(team.id)) {
										return (
										<div className="closedTag">  <Button className="joinButton" size="sm" onClick={this.handleLeaveTeam} value={team.id}> Leave?</Button>   </div>
										)
									} else if(!team.is_open) {
										return(
										<div className="closedTag"> <Button  size="sm" onClick={this.handleJoinWithPassword} value={team.id} > Join With Password </Button></div>
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