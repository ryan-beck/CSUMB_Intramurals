import React from "react";
import { Component, Fragment } from 'react';
import Box from '@material-ui/core/Box';
import { TextInput } from "react-native";
import { Card } from 'react-bootstrap';
import "../style/team.css"
import axios from "axios";

import AddPlayerFormModal from '../components/Forms/AddPlayerFormModal';


class TeamPage extends Component {
	constructor(props) {
    super(props);


    this.state = {
    	teamId: this.props.props.match.params.id,
    	captainId: this.props.props.match.params.captainId,
    	players: [],
    	user: props.user,
		sportName:"",
		leagueName: "",
		gamesArray: [],
		leagueId: null,
		sportId: null,
		team: {},
		playerCapacity: 0
    };

    this.sortPlayers = this.sortPlayers.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.deletePlayerHandler = this.deletePlayerHandler.bind(this);
  }

  componentDidMount() {
	fetch("http://localhost:8000/api/getPlayersByTeamId/"+this.state.teamId)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				players: res
			});
			this.sortPlayers();
		}
	);

	fetch("http://localhost:8000/api/getTeamById/"+this.state.teamId)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				team: res,
				leagueId: res.league
			})

			fetch("http://localhost:8000/api/getLeagueById/"+res.league)
				.then(res => res.json())
				.then((res) => {
					this.setState({
						leagueName: res.league_name,
						sportId: res.sport,
						playerCapacity: res.player_limit
					});
					
					fetch("http://localhost:8000/api/getSportById/"+res.sport)
						.then(res => res.json())
						.then((res) => {
							
							this.setState({
								sportName: res.sport_name
							});
						}
					);
				}
			);
		}
	);

	fetch("http://localhost:8000/api/getGamesByTeam/"+this.state.teamId)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				gamesArray: res
			});
		}
	);
  }

  sortPlayers() {
  	for(let i = 0; i < this.state.players.length; i++) {
  		if(this.state.players[i].id == this.state.captainId) {
  			var captain = this.state.players[i];
  			this.state.players.splice(i, 1);
  			this.state.players.unshift(captain)
  			break
  		}
  	}
  }

  deleteHandler(event) {
    axios({
        method:'delete', 
        url: 'http://localhost:8000/api/deleteTeam/'+this.state.teamId,
    })
    .then(({data}) => {
        window.location = ('/leagues/'+ this.state.sportName+'/'+this.state.leagueName+'/'+this.state.leagueId+'/'+this.state.sportId);
    });
	}

	deletePlayerHandler(playerId) {
		for(let i = 0; i < this.state.team.players.length; i++) {
			if(this.state.team.players[i] == playerId) {
				this.state.team.players.splice(i,1);
			}
		}

		let teamData = {
            team_name: this.state.team.team_name,
            league: this.state.team.league,
            players: this.state.team.players,
            is_open: this.state.team.is_open,
            captain: this.state.team.captain
        } 

        axios({
            method:'put', 
            url: 'http://localhost:8000/api/editPlayers/'+this.state.teamId+'/', 
            data: teamData
        })
        .then(({data}) => {
            window.location.reload();
        });
	}

	render() {
		return (
			<Box className="beginning">
			<div>
				<label className="record"><b>Wins:</b> {this.state.team.wins}<br/> <b>Losses:</b> {this.state.team.losses}<br/> <b>Ties:</b> {this.state.team.ties}</label>
				<h1 className="primaryTitle"> {this.props.props.match.params.team} </h1>
				<label className="secondaryTitle"> {this.state.sportName}: {this.state.leagueName} </label>
				</div>
				{(() => {
					if(this.state.user.is_admin) {
						return (
							<div className="addPlayer">
								<AddPlayerFormModal leagueId={this.state.leagueId} teamId={this.state.teamId} teamFull={this.state.playerCapacity == this.state.players.length}/>
							</div>
						)
					}
				})()}
				{(() => {
					if (this.state.user.id == this.state.captainId) {
						return (
							<Fragment>
								<div className="captain-view">
								<input name="deleteButton" className="delete-team" type="button" value="Delete This Team" onClick={this.deleteHandler}/>
								</div>
								<br/><br/>
							</Fragment>
						)
					}
				})()}
				<div className="card_container">
					<div className="team_card">
						
						<Card style={{ width: '30rem' }}>
						  <Card.Body>
							{this.state.players.map((player, index) => (
								  <div key={index}>
									{(() => {
										if(this.state.user.is_admin || this.state.user.id == this.state.captainId) {
											if (player.id == this.state.captainId) {
												return (
													<div>
														<Card.Title><img className="profile_pic" src={player.photo_url}/>{player.display_name}</Card.Title>
														<Card.Subtitle className="mb-2 text-muted tester">Captain</Card.Subtitle>
														<hr/>
													</div>
												)
											} else {
												return (
													<Card.Text className="player_cards">
														<img className="profile_pic" src={player.photo_url}/>
														{player.display_name}
														<input name="deletePlayerButton" className="delete-player" type="button" value="Remove" onClick={()=>{this.deletePlayerHandler(player.id)}}/>
													</Card.Text>
												)
											}
										} else {
											if (player.id == this.state.captainId) {
												return (
													<div>
														<Card.Title><img className="profile_pic" src={player.photo_url}/>{player.display_name}</Card.Title>
														<Card.Subtitle className="mb-2 text-muted tester">Captain</Card.Subtitle>
														<hr/>
													</div>
												)
											} else {
												return (
													<Card.Text className="player_cards">
														<img className="profile_pic" src={player.photo_url}/>
														{player.display_name}
													</Card.Text>
												)
											}
										}
									})()}
								  </div>
								))}
						  </Card.Body>
						</Card>
					</div>
					<div className="game_card">
						<Card style={{ width: '45rem' }}>
						  <Card.Body>
						  	{(() => {
								if (this.state.gamesArray.length == 0) {
									return (
										<div className="no-games"> 
											<label>
												There are currently no games to display.
											</label>
										</div>
									);
								}
							})()}
						  {this.state.gamesArray.map((game, index) => (
								  <div key={index}>
									<Card.Title>{game.home_name} vs {game.away_name}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">{game.format_start_time}</Card.Subtitle>
									<Card.Text> Score: {game.home_score}-{game.away_score} </Card.Text><hr/>
								  </div>
								))}
						  </Card.Body>
						</Card>
					</div>
				</div>
			</Box>
		)
	}
}




export default TeamPage;